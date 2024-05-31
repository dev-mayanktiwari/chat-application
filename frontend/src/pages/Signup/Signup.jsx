import GenderCheckbox from "./GenderCheckbox";

const Signup = () => {
  return (
    <div className="flex flex-col items-center justify-center min-w-96 mx-auto">
      <div className="w-full p-6 rounded-lg shadow-md bg-gray-400 bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-0">
        <h1 className="text-3xl font-semibold text-center text-gray-300">
          SignUp
          <span className="text-blue-500"> ChatGram</span>
        </h1>
        <form>
          <div className="label p-2 mt-4">
            <span className="text-base label-text">Full Name</span>
          </div>
          <input
            type="text"
            placeholder="John Doe"
            className="w-full input input-bordered h-10"
          />
          <div className="label p-2">
            <span className="text-base label-text">Username</span>
          </div>
          <input
            type="text"
            placeholder="johndoe"
            className="w-full input input-bordered h-10"
          />
          <div className="label p-2">
            <span className="text-base label-text">Password</span>
          </div>
          <input
            type="text"
            placeholder="Enter Password"
            className="w-full input input-bordered h-10"
          />
          <div className="label p-2">
            <span className="text-base label-text">Confirm Password</span>
          </div>
          <input
            type="text"
            placeholder="Confirm Password"
            className="w-full input input-bordered h-10"
          />
          <div className="label p-2">
            <span className="text-base label-text">Gender</span>
          </div>
          <GenderCheckbox />
          <a
            href="#"
            className="text-sm hover:underline hover:text-blue-500 mt-5 inline-block"
          >
            Already have a account?
          </a>
        </form>
        <div>
          <button
            className="btn btn-block btn-sm mt-6 text-md"
            style={{ height: 20 }}
          >
            Login
          </button>
        </div>
      </div>
    </div>
  );
};

export default Signup;
