import { Suspense, lazy } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from '../components/global/Header';
import ErrorAlert from '../components/errorBoundary/ErrorAlert';
import ErrorBoundary from '../components/errorBoundary/ErrorBoundary';
import LoadingCycle from '../components/loading/LoadingCycle';

const Main = lazy(() => import('../pages/index'));
const Login = lazy(() => import('../pages/login'));
const Register = lazy(() => import('../pages/register'));
const NotFound = lazy(() => import('../components/global/NotFound'));
const Recipe = lazy(() => import('../pages/recipe'));
const CreateRecipe = lazy(() => import('../pages/createRecipe'));
const CollectRecipes = lazy(() => import('../pages/collectRecipes'));
const Profile = lazy(() => import('../pages/profile'));

export const PATH = {
  MAIN: '/',
  LOGIN: '/login',
  REGISTER: '/register',
  RECIPE: '/recipe',
  CREATE_RECIPE: '/recipe/create',
  COLLECT_RECIPES: '/collectRecipes',
  PROFILE: '/profile',
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
            <Route path={PATH.PROFILE} element={<Profile />} />
            <Route path={PATH.NOT_FOUND} element={<NotFound />} />
          </Routes>
        </Suspense>
      </ErrorBoundary>
    </Router>
  );
};

export default CustomRouter;
