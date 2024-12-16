import Header from "@/components/Header";
import DataTable from "@/components/ui/DataTable";
import React from "react";
import CreateAppointMent from "./components/CreateAppointMent";
import { AppointmentsContext } from "@/context/AppointmentsContext";

const Appointments: React.FC = () => {
  const [visibleModalCreate, setVisibleModalCreate] = React.useState(true);

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

export default Appointments;
