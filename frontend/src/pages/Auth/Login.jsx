import { Link } from "react-router-dom";

const Login = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Login to Your Account</h2>
        <input
          type="email"
          name="email"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Email"
        />
        <input
          type="password"
          name="password"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Password"
        />
        <button
          type="submit"
          className="px-4 py-2 w-full rounded text-white cursor-pointer bg-blue-500 transition hover:bg-blue-600 border-2 border-blue-500"
        >
          Sign In
        </button>
      </form>
      <p className="text-sm text-gray-700">
        Need an account?{" "}
        <Link to="/register" className="text-blue-500 hover:underline">
          Sign Up
        </Link>
      </p>
    </main>
  );
};

export default Login;
