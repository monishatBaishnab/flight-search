import { configureStore } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';
import { authReducer } from './features/auth/auth.slice';
import { flightReducer } from './features/flight/flight.slice';
import { appService } from './services/appService';

export const store = configureStore({
  reducer: {
    [appService.reducerPath]: appService.reducer,
    auth: authReducer,
    flight: flightReducer,
  },
  devTools: import.meta.env.VITE_NODE_ENV !== 'production',
  middleware: (getDefaultMiddleware) => {
    return getDefaultMiddleware().concat(appService.middleware);
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<RootState>();

export default store;
