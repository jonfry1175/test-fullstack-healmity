import React from "react";
import Header from "@/components/Header";
import DataTable from "@/components/ui/DataTable";
import CreateAppointMent from "./components/CreateAppointMent";
import { AppointmentsContext } from "@/context/AppointmentsContext";
import CheckAuth from "@/hoc/CheckAuth";

const AppointmentPage: React.FC = () => {
  const [visibleModalCreate, setVisibleModalCreate] = React.useState(false);

  return (
    <div className="container mx-auto">
      <AppointmentsContext.Provider
        value={{ visibleModalCreate, setVisibleModalCreate }}
      >
        <Header isLoggedIn={true} />
        <div className="flex justify-center">
          <DataTable />
        </div>
        <CreateAppointMent />
      </AppointmentsContext.Provider>
    </div>
  );
};

const Appointments = CheckAuth(AppointmentPage, false);
export default Appointments;
