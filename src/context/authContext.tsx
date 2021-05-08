import { AxiosResponse } from "axios";
import { createContext, FC, useEffect, useState } from "react";
import axiosInstance from "../utils/axios";

export interface ISavedGIF {
  id: string;
  url: string;
  fixed_size_url: string;
}

export interface IAuthContext {
  _id: string;
  email: string;
  saved: Array<ISavedGIF>;
  mounting: boolean;
  isAuthenticated: boolean;
  setID: Function;
  setEmail: Function;
  setSaved: Function;
  setMounting: Function;
  setIsAuthenticated: Function;
}

const initialContext: IAuthContext = {
  _id: "",
  email: "",
  saved: [],
  mounting: true,
  isAuthenticated: false,
  setID: () => {},
  setEmail: () => {},
  setSaved: () => {},
  setMounting: () => {},
  setIsAuthenticated: () => {}
};

const AuthContext = createContext<IAuthContext>(initialContext);

export const AuthContextProvider: FC = ({ children }) => {
  const [_id, setID] = useState<string>(initialContext._id);
  const [email, setEmail] = useState<string>(initialContext.email);
  const [mounting, setMounting] = useState<boolean>(initialContext.mounting);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(initialContext.isAuthenticated);
  const [saved, setSaved] = useState<Array<ISavedGIF>>(initialContext.saved);

  useEffect(() => {
    const validateSession = async () => {
      const localToken = localStorage.getItem("token");

      const config = { headers: { Authorization: localToken } };

      if (!!localToken) {
        try {
          const res: AxiosResponse = await axiosInstance.get("validate-session", config);

          localStorage.setItem("token", res.data.token);

          setEmail(res.data.user.email);
          setID(res.data.user._id);

          setSaved(res.data.user.saved);

          setIsAuthenticated(true);
          setMounting(false);
        } catch (err) {
          localStorage.setItem("token", "");

          setEmail("");
          setID("");

          setSaved([]);

          setIsAuthenticated(false);
          setMounting(false);
        }
      } else {
        setMounting(false);
      }
    };

    validateSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        _id,
        email,
        mounting,
        saved,
        isAuthenticated,
        setID,
        setEmail,
        setSaved,
        setMounting,
        setIsAuthenticated
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
