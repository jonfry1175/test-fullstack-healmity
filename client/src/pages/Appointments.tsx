import Header from "@/components/Header";
import DataTable from "@/components/ui/DataTable";
import React from "react";

const Appointments: React.FC = () => {
  return (
    <div className="container mx-auto">
      <Header isLoggedIn={true} />
      <div className="flex justify-center">
        <DataTable />
      </div>
    </div>
  );
};

export default Appointments;
