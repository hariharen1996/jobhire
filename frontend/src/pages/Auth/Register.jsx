import { Link } from "react-router-dom";

const Register = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 w-full max-w-md space-y-4">
        <h2 className="text-2xl font-bold text-center mb-4">Create Your Account</h2>
        <input
          type="text"
          name="username"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Username"
        />
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
        <input
          type="password"
          name="confirmpassword"
          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Confirm Password"
        />
        <select
          name="role"
          className="w-full border border-gray-300 px-3 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="applicant">Applicant</option>
          <option value="employer">Employer</option>
        </select>
        <button
          type="submit"
          className="px-4 py-2 w-full rounded text-white cursor-pointer bg-blue-500 transition hover:bg-blue-600 border-2 border-blue-500"
        >
          Sign Up
        </button>
      </form>
      <p className="text-sm text-gray-700">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Sign In
        </Link>
      </p>
    </main>
  );
};

export default Register;
