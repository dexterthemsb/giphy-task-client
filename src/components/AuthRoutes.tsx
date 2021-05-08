import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ROUTE_INDEX } from "../constants/routes";
import useAuth from "../hooks/useAuth";

const AuthRoutes: FC<RouteProps> = ({ children, ...props }) => {
  const { isAuthenticated } = useAuth();

  return <Route {...props}>{!isAuthenticated ? children : <Redirect to={ROUTE_INDEX} />}</Route>;
};

export default AuthRoutes;
