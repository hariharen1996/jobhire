import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../../features/auth/userSlice";

const Navbar = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const token = localStorage.getItem("token");
  const isLoggedIn = !!token;

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("email");
    localStorage.removeItem("role");
    localStorage.removeItem("user");
    localStorage.removeItem("username")

    dispatch(clearUser());

    navigate("/login", { replace: true });
  };

  return (
    <nav className="navbar-bg flex flex-col md:flex-row md:justify-between items-center gap-2 md:gap-0 px-3 py-2">
      <div className="text-2xl font-bold">
        <h1 className="text-white">Jobhire</h1>
      </div>
      <div className="flex gap-2">
        <Link to="/">
          <button className="flex items-center gap-2 px-2 py-1 rounded text-white cursor-pointer home-btn transition hover:bg-blue-600 border-1 border-blue-500">
            <i className="fas fa-laptop-house"></i> Home
          </button>
        </Link>
        {isLoggedIn && (
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-2 py-1 rounded text-white cursor-pointer home-btn transition hover:bg-blue-600 border-1 border-blue-500"
          >
            <i className="fas fa-sign-out-alt"></i> Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
