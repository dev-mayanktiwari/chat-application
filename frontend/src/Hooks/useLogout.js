import axios from "axios";
import  { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const logout = async () => {
    try {
      setLoading(true);
      const response = await axios.post(
        "/api/auth/logout",
        {},
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        // Check if the error message indicates that the user already exists
        if (response.data && response.data.error === "User already exists") {
          throw new Error("User already exists");
        } else {
          throw new Error(response.statusText);
        }
      }
      localStorage.removeItem("currentUser");
      setAuthUser(null);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {loading, logout};
};

export default useLogout;
