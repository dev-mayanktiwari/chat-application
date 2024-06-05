import { useState } from "react";
import toast from "react-hot-toast";
import axios from "axios";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
  const [loading, setLoading] = useState(false);
  const { setAuthUser } = useAuthContext();

  const signup = async ({
    fullName,
    username,
    password,
    confirmPassword,
    gender,
  }) => {
    const success = handleInputErrors({
      fullName,
      username,
      password,
      confirmPassword,
      gender,
    });
    if (!success) {
      return;
    }
    setLoading(true);
    try {
      const response = await axios.post(
        "/api/auth/signup",
        {
          fullName,
          username,
          password,
          confirmPassword,
          gender,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      // console.log(response); //remove it from here
      if (response.status !== 201) {
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
  return { loading, signup };
};

function handleInputErrors({
  fullName,
  username,
  password,
  confirmPassword,
  gender,
}) {
  if (!fullName || !username || !password || !confirmPassword || !gender) {
    toast.error("Please fill all the fields.");
    return false;
  }
  if (password !== confirmPassword) {
    toast.error("Passwords don't match.");
    return false;
  }
  if (password.length < 6) {
    toast.error("Password is too short.");
    return false;
  }
  return true;
}

export default useSignup;
