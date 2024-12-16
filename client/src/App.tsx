import React, { Suspense, useState } from "react";
import Appointments from "./pages/Appointments/Appointments";
import { Route, Routes } from "react-router-dom";
import Loading from "./components/Loading";
import Auth from "./pages/Auth";
import { Toaster } from "./components/ui/Toaster";
import AuthDataContext from "./context/AuthDataContext";

const App: React.FC = () => {
  const [authData, setAuthData] = useState(
    JSON.parse(localStorage.getItem("user") as string) ?? null
  );

  return (
    <>
      <Suspense fallback={<Loading />}>
        <AuthDataContext.Provider value={{ authData, setAuthData }}>
          <div className="h-screen">
            <Toaster />
            <Routes>
              <Route path="/" element={<Appointments />} />
              <Route path="/login" element={<Auth />} />
              <Route path="/register" element={<Auth />} />
            </Routes>
          </div>
        </AuthDataContext.Provider>
      </Suspense>
    </>
  );
};

export default App;
