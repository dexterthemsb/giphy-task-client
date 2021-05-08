import { FC } from "react";
import { Redirect, Switch } from "react-router";
import AuthRoutes from "./components/AuthRoutes";
import FullPageLoading from "./components/Layout/FullPageLoading";
import Navigation from "./components/Navigation";
import ProtectedRoute from "./components/ProtectedRoute";
import {
  ROUTE_INDEX,
  ROUTE_LOGIN,
  ROUTE_REG,
  ROUTE_SAVED,
  ROUTE_TRENDING
} from "./constants/routes";
import useAuth from "./hooks/useAuth";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Saved from "./pages/Saved";
import Trending from "./pages/Trending";

const App: FC = () => {
  const { mounting, isAuthenticated } = useAuth();

  return (
    <>
      {mounting && <FullPageLoading />}

      {!mounting && (
        <>
          {isAuthenticated && <Navigation />}

          <Switch>
            <ProtectedRoute exact path={ROUTE_INDEX}>
              <Redirect to="/trending" />
            </ProtectedRoute>

            <ProtectedRoute exact path={ROUTE_TRENDING}>
              <Trending />
            </ProtectedRoute>

            <ProtectedRoute exact path={ROUTE_SAVED}>
              <Saved />
            </ProtectedRoute>

            <AuthRoutes exact path={ROUTE_LOGIN}>
              <Login />
            </AuthRoutes>

            <AuthRoutes exact path={ROUTE_REG}>
              <Register />
            </AuthRoutes>
          </Switch>
        </>
      )}
    </>
  );
};

export default App;
