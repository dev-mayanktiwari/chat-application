import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useLogin = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();
  const login = async ({ username, password }) => {
    const success = handleInputErrors({ username, password });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/login",
        {
          username,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      if (response.status !== 200) {
        if (response.data && response.data.error === "User already exists") {
          throw new Error("User already exists");
        } else {
          throw new Error(response.statusText);
        }
      }
      localStorage.setItem("currentUser", JSON.stringify(response));
      setAuthUser(response);
    } catch (error) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };
  return {loading, login}
};

const handleInputErrors = ({ username, password }) => {
  if (!username || !password) {
    toast.error("Fill all the fields.");
    return false;
  }
  return true;
};

export default useLogin;
