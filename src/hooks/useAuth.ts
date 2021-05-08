import { useContext } from "react";
import AuthContext, { IAuthContext } from "../context/authContext";

const useAuth = (): IAuthContext => useContext(AuthContext);

export default useAuth;
