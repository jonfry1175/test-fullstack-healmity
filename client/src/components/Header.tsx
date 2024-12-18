import React, { useContext } from "react";
import Button from "./ui/button/Button";
import ModeToggle from "./ModeToggle";
import { useToast } from "@/hooks/useToast";
import AuthDataContext from "@/context/AuthDataContext";
import { Label } from "./ui/Label";
import { useLocation, useNavigate } from "react-router-dom";

// isLoggedIn?: boolean required if used in page without auth
const Header: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const { authData, setAuthData } = useContext(AuthDataContext);
  const handleLogout = () => {
    setTimeout(() => {
      localStorage.clear();
      setAuthData(null);
    }, 300);
    toast({
      description: "Logged out successfully",
    });
  };

  return (
    <div className="p-4">
      {isLoggedIn && (
        <Label className="text-2xl">
          {" "}
          {authData?.name ? `Hi, ${authData.name}` : ""}
        </Label>
      )}
      <div className="flex justify-end gap-2">
        <ModeToggle />
        {pathname !== "/docs" && (
          <Button onClick={() => navigate("/docs")}>Docs</Button>
        )}
        {pathname === "/docs" && (
          <Button onClick={() => navigate("/")}>Home</Button>
        )}

        {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
      </div>
    </div>
  );
};

export default Header;
