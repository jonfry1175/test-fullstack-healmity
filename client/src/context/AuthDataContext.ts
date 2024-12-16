import { createContext } from "react";
type AuthDataContextType = {
  authData: null | Record<string, unknown>;
  setAuthData: React.Dispatch<
    React.SetStateAction<null | Record<string, unknown>>
  >;
};
const AuthDataContext = createContext<AuthDataContextType>({
  authData: null,
  setAuthData: () => null,
});
export default AuthDataContext;
