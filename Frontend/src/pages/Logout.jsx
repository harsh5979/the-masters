import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

const Logout = () => {
  const { logout } = useAuthStore();
  const navigate = useNavigate();

  useEffect(() => {
    try {
      logout();
      navigate("/");
    } catch (error) {}
  }, [logout]);
  return <div></div>;
};

export default Logout;
