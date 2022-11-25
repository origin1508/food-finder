import React, { Suspense } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/global/Header';
import ErrorAlert from '../components/errorBoundary/ErrorAlert';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import LoadingCycle from '../components/loading/LoadingCycle';

const Main = React.lazy(() => import('../pages/index'));
const Login = React.lazy(() => import('../pages/login'));
const Register = React.lazy(() => import('../pages/register'));
const NotFound = React.lazy(() => import('../components/global/NotFound'));
const Recipe = React.lazy(() => import('../pages/recipe'));
const CreateRecipe = React.lazy(() => import('../pages/createRecipe'));
const CollectRecipes = React.lazy(() => import('../pages/collectRecipes'));

export const PATH = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RECIPE: '/recipe',
  CREATE_RECIPE: '/recipe/create',
  COLLECT_RECIPES: '/collectRecipes',
  NOT_FOUND: '/*',
};

const CustomRouter = () => {
  return (
    <Router>
      <ErrorBoundary fallback={({ error }) => <ErrorAlert error={error} />}>
        <Header />
        <Suspense fallback={<LoadingCycle />}>
          <Routes>
            <Route path={PATH.MAIN} element={<Main />} />
            <Route path={PATH.LOGIN} element={<Login />} />
            <Route path={PATH.REGISTER} element={<Register />} />
            <Route path={PATH.RECIPE} element={<Recipe />} />
            <Route path={PATH.CREATE_RECIPE} element={<CreateRecipe />} />
            <Route path={PATH.COLLECT_RECIPES} element={<CollectRecipes />} />
            <Route path={PATH.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default CustomRouter;
