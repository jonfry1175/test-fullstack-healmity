import { createContext } from "react";

type AppointmentsContextType = {
  visibleModalCreate: boolean;
  setVisibleModalCreate: React.Dispatch<React.SetStateAction<boolean>>;
};

export const AppointmentsContext = createContext<AppointmentsContextType>({
  visibleModalCreate: false,
  setVisibleModalCreate: () => {},
});
