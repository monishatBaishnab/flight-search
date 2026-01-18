import { appService } from '@/redux/services/appService';
import { setAuth } from './auth.slice';

export const authApi = appService.injectEndpoints({
  endpoints: (builder) => ({
    getToken: builder.mutation<{ access_token: string }, void>({
      query: () => {
        const body = new URLSearchParams({
          grant_type: 'client_credentials',
          client_id: import.meta.env.VITE_CLIENT_ID!,
          client_secret: import.meta.env.VITE_CLIENT_SECRET!,
        }).toString();

        return {
          url: '/v1/security/oauth2/token',
          method: 'POST',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded', // very important
          },
          body,
        };
      },
      async onQueryStarted(_, { queryFulfilled, dispatch }) {
        try {
          const { data } = await queryFulfilled;
          const accessToken = data?.access_token;

          if (accessToken) {
            dispatch(setAuth(accessToken));
          }
        } catch (err) {
          console.error('Failed to fetch token:', err);
        }
      },
    }),
  }),
});

export const { useGetTokenMutation } = authApi;
