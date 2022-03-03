import { lazy, Suspense } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';


const Loading = () => (
  <div className="fixed inset-0 flex items-center justify-center">
    <div className="trippleSpinner" />
  </div>
);

const IndexScreen = lazy(() => import('~/components/screens/Index'));
const Page404Screen = lazy(() => import('~/components/screens/404'));
const DrumsScreen = lazy(() => import('~/components/screens/DrumsScreen'));
const BeatsScreen = lazy(() => import('~/components/screens/BeatsScreen'));

export const Router = () => {
  return (
    <BrowserRouter>
      <Suspense fallback={<Loading />}>
        <Switch>
          <Route exact path="/">
            <IndexScreen />
          </Route>
          <Route exact path="/drums">
            <DrumsScreen />
          </Route>
          <Route exact path="/beats">
            <BeatsScreen />
          </Route>
          <Route path="*">
            <Page404Screen />
          </Route>
        </Switch>
      </Suspense>
    </BrowserRouter>
  );
};
