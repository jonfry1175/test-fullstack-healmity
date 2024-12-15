import React from "react";
import Button from "./ui/button/Button";
import ModeToggle from "./ModeToggle";
import { useNavigate } from "react-router-dom";
import { useToast } from "@/hooks/useToast";

// isLoggedIn?: boolean required if used in page without auth
const Header: React.FC<{ isLoggedIn?: boolean }> = ({ isLoggedIn }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const handleLogout = () => {
    localStorage.clear();
    toast({
      description: "Logged out successfully",
    });
    navigate("/login");
  };
  return (
    <div className="flex justify-end p-4 gap-2">
      <ModeToggle />
      {isLoggedIn && <Button onClick={handleLogout}>Logout</Button>}
    </div>
  );
};

export default Header;
