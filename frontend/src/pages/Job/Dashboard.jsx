import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchJobs } from "../../features/job/jobSlice";
import JobCard from "./JobCard";

const Dashboard = () => {
  const { role, token } = useSelector((state) => state.user);
  const { status, jobs } = useSelector((state) => state.jobs);
  console.log(jobs)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(fetchJobs())
  }, [dispatch, token]);

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
      {status === "loading" ? (
        <div className="text-center py-12">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-t-2 border-b-2 border-blue-500"></div>
          <p className="mt-2 text-gray-600">Loading jobs...</p>
        </div>
      ) : status === "failed" ? (
        <div
          className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative max-w-xl mx-auto mt-4"
          role="alert"
        >
          <strong className="font-bold">Error:</strong>
          <span className="block sm:inline">
            {" "}
            Failed to load jobs. Please try again later.
          </span>
        </div>
      ) : (

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {jobs.map((job) => (
              <JobCard
                key={job.id}
                job={job}
              />
            ))}
          </div>
      )}
    </div>
  );
};

export default Dashboard;
