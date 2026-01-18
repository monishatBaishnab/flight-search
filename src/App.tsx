import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Loader from './pages/Loader';
import { useGetTokenMutation } from './redux/features/auth/auth.api';
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);
  const [getToken, { isLoading }] = useGetTokenMutation();

  useEffect(() => {
    getToken();
  }, [getToken]);

  useEffect(() => {
    setTimeout(() => setIsAppLoading(false), 1500);
  }, [setIsAppLoading]);

  return (
    <main>
      {isAppLoading || isLoading ? (
        <Loader />
      ) : (
        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      )}
    </main>
  );
};

export default App;
