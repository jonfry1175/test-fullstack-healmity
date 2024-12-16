import AuthDataContext from "@/context/AuthDataContext";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";

const CheckAuth = (
  WrappedComponent: React.ComponentType,
  isAuthPage: boolean
) => {
  const AuthHOC = (props: React.ComponentProps<typeof WrappedComponent>) => {
    const { authData } = useContext(AuthDataContext);
    if (isAuthPage) {
      if (authData) {
        return <Navigate to="/" />;
      }
      return <WrappedComponent {...props} />;
    } else {
      if (!authData) {
        return <Navigate to="/login" />;
      }
      return <WrappedComponent {...props} />;
    }
  };

  return AuthHOC;
};

export default CheckAuth;
