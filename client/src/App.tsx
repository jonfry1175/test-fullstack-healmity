import React, { Suspense } from "react";
import Appointments from "./pages/Appointments";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import { Toaster } from "./components/ui/Toaster";

const App: React.FC = () => {
  return (
    <>
      <Suspense fallback={<Loading />}>
        <div className="h-screen">
          <Toaster />
          <Routes>
            <Route path="/" element={<Appointments />} />
            <Route path="/login" element={<Auth />} />
            <Route path="/register" element={<Auth />} />
          </Routes>
        </div>
      </Suspense>
    </>
  );
};

export default App;
