import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const Dashboard = () => {
  const { role } = useSelector((state) => state.user);
  const navigate = useNavigate();
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>
      <div className="mb-6">
        {role === "employer" && (
          <button
            onClick={() => {
              navigate("/job-form");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <i className="fas fa-plus"></i> Post New Job
          </button>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
