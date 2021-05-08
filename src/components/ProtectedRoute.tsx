import { FC } from "react";
import { Route, Redirect, RouteProps } from "react-router-dom";
import { ROUTE_LOGIN } from "../constants/routes";
import useAuth from "../hooks/useAuth";

const ProtectedRoute: FC<RouteProps> = ({ children, ...props }) => {
  const { isAuthenticated } = useAuth();

  return <Route {...props}>{isAuthenticated ? children : <Redirect to={ROUTE_LOGIN} />}</Route>;
};

export default ProtectedRoute;
