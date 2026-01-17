import { lazy, Suspense, useEffect, useState } from 'react';
import { Route, Routes } from 'react-router';
import Loader from './pages/Loader';
const Home = lazy(() => import('./pages/Home'));
const NotFound = lazy(() => import('./pages/NotFound'));

const App = () => {
  const [isAppLoading, setIsAppLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => setIsAppLoading(false), 1500);
  }, [setIsAppLoading]);

  return (
    <main>
      {isAppLoading ? (
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
