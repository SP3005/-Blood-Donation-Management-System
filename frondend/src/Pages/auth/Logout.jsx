import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const Logout = ({ setUserRole }) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Local Storage se token & role remove karein
    localStorage.removeItem("role");
    localStorage.removeItem("authToken");

    // User role update karein (state reset karein)
    setUserRole("");

    // Redirect to login page
    navigate("/");
  }, [setUserRole, navigate]);

  return null; // No UI needed
};

export default Logout;
