import { useState } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
  });

  const handleLogin = (e) => {
    e.preventDefault();
    await login(loginData)
  }
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          Login
          <span className="text-blue-500"> ChatGram</span>
        </h1>
        <form onSubmit={handleLogin}>
          <div className="label p-2 mt-4">
            <span className="text-base label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="Enter Username"
            value={loginData.username}
            onChange={(e) => setLoginData({...loginData, username: e.target.value})}
            className="w-full input input-bordered h-10"
          />
          <div className="label p-2">
            <span className="text-base label-text">Password</span>
          </div>
          <input
            type="password"
            value={loginData.password}
            onChange={(e) => setLoginData({...loginData, password: e.target.value})}
            placeholder="Enter Password"
            className="w-full input input-bordered h-10"
          />
          <Link
            to="/signup"
            className="text-sm hover:underline hover:text-blue-500 mt-5 inline-block"
          >
            {"Don't"} have a account?
          </Link>
        <div>
          <button
            type="submit"
            className="btn btn-block btn-sm mt-6 text-md"
            style={{ height: 20 }}
          >
            Login
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
