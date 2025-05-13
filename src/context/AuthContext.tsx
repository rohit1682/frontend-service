import React, { createContext, useContext, ReactNode } from "react";
import { useAppSelector, useAppDispatch } from "../store/hooks";
import { login, logout, UserData } from "../store/authSlice";

interface AuthContextType {
  isLoggedIn: boolean;
  userData: UserData | null;
  login: (token: string, userData: UserData) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const dispatch = useAppDispatch();
  const { isLoggedIn, userData } = useAppSelector((state) => state.auth);

  const loginHandler = (token: string, userData: UserData) => {
    dispatch(login({ token, userData }));
  };

  const logoutHandler = () => {
    dispatch(logout());
  };

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        userData,
        login: loginHandler,
        logout: logoutHandler,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
