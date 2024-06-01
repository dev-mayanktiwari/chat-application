import { Link } from "react-router-dom";
import GenderCheckbox from "./GenderCheckbox";
import { useState } from "react";
import useSignup from "../../Hooks/useSignup";

const Signup = () => {
  const { loading, signup } = useSignup();

  const [input, setInput] = useState({
    fullName: "",
    username: "",
    password: "",
    confirmPassword: "",
    gender: "",
  });

  const handleGender = (gender) => {
    setInput({ ...input, gender });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    await signup(input);
  };

  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-blue-500"> ChatGram</span>
        </h1>
        <form onSubmit={handleSubmit}>
          <div className="label p-2 mt-4">
            <span className="text-base label-text">Full Name</span>
          </div>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full input input-bordered h-10"
            value={input.fullName}
            onChange={(e) => setInput({ ...input, fullName: e.target.value })}
          />
          <div className="label p-2">
            <span className="text-base label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="johndoe"
            className="w-full input input-bordered h-10"
            value={input.username}
            onChange={(e) => setInput({ ...input, username: e.target.value })}
          />
          <div className="label p-2">
            <span className="text-base label-text">Password</span>
          </div>
          <input
            type="password"
            placeholder="Enter Password"
            className="w-full input input-bordered h-10"
            value={input.password}
            onChange={(e) => setInput({ ...input, password: e.target.value })}
          />
          <div className="label p-2">
            <span className="text-base label-text">Confirm Password</span>
          </div>
          <input
            type="password"
            placeholder="Confirm Password"
            className="w-full input input-bordered h-10"
            value={input.confirmPassword}
            onChange={(e) =>
              setInput({ ...input, confirmPassword: e.target.value })
            }
          />
          <div className="label p-2">
            <span className="text-base label-text">Gender</span>
          </div>
          <GenderCheckbox input={input.gender} onChange={handleGender} />
          <Link
            to="/login"
            className="text-sm hover:underline hover:text-blue-500 mt-5 inline-block"
          >
            Already have a account?
          </Link>
          <div>
            <button
              type="submit"
              disabled={loading}
              className="btn btn-block btn-sm mt-6 text-md"
              style={{ height: 20 }}
            >
              {loading ? <span className="loading loading-spinner"> </span> : "Signup"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Signup;
