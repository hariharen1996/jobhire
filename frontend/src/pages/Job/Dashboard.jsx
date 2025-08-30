import { useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import {
  clearEditJob,
  deleteJobs,
  fetchJobs,
  resetFilters,
  selectFilteredJobs,
  setCurrentPage,
  setEditJob,
} from "../../features/job/jobSlice";
import JobCard from "./JobCard";
import ConfirmationDialog from "../../components/dialog/ConfirmationDialog";
import Pagination from "../../components/Pagination/Pagination";
import JobFilters from "../../components/filters/JobFilters";

const Dashboard = () => {
  const [dialogOpen, setDialogOpen] = useState(false);
  const [jobToDelete, setJobToDelete] = useState(null);
  const [showFilters, setShowFilters] = useState(false);
  const { role, token } = useSelector((state) => state.user);
  const { status, jobs, currentPage, jobsPerPage, filters } = useSelector(
    (state) => state.jobs
  );
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const filteredJobs = useSelector(selectFilteredJobs);

  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);
  console.log(totalPages);
  const startIndex = (currentPage - 1) * jobsPerPage;
  console.log(startIndex);
  const endIndex = startIndex + jobsPerPage;
  console.log(endIndex);
  const currentJobs = filteredJobs.slice(startIndex, endIndex);
  console.log(currentJobs);

  const handlePageChange = useCallback(
    (page) => {
      dispatch(setCurrentPage(page));
    },
    [dispatch]
  );

  useEffect(() => {
    dispatch(fetchJobs());
  }, [dispatch, token]);

  const handleEdit = useCallback(
    (job) => {
      dispatch(setEditJob(job));
      navigate("/job-form");
    },
    [dispatch, navigate]
  );

  const handleDeleteClick = useCallback((job) => {
    setJobToDelete(job);
    setDialogOpen(true);
  }, []);

  const handleConfirmDelete = () => {
    if (jobToDelete && jobToDelete.id) {
      dispatch(deleteJobs(jobToDelete.id));
    }
    setDialogOpen(false);
    setJobToDelete(null);
  };

  const handleCancelDelete = () => {
    setDialogOpen(false);
    setJobToDelete(null);
  };

  const handleShowAllJobs = () => {
    dispatch(resetFilters());
    dispatch(setCurrentPage(1));
    setShowFilters(false);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-center mb-8">Dashboard</h1>

      <div className="mb-6 flex gap-3 flex-wrap mb-6">
        {role === "employer" && (
          <button
            onClick={() => {
              dispatch(clearEditJob());
              navigate("/job-form");
            }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
          >
            <i className="fas fa-plus"></i> Post New Job
          </button>
        )}

        {!showFilters && !filters.length && (
          <button
            onClick={() => setShowFilters(true)}
            className="flex items-center gap-2 px-4 py-2 bg-gray-200 text-gray-800 rounded hover:bg-gray-300 transition"
          >
            <i className="fas fa-filter"></i> Filters
          </button>
        )}

        {showFilters && (
          <button
            onClick={handleShowAllJobs}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Show All Jobs
          </button>
        )}
      </div>

      {showFilters && (
        <JobFilters
          onClose={() => setShowFilters(false)}
          currentFilters={filters}
        />
      )}

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
      ) : filteredJobs.length === 0 ? (
        <div className="text-center py-8">
          <p className="text-gray-600 mb-4">
            No jobs found matching your criteria.
          </p>
          <button
            onClick={handleShowAllJobs}
            className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
          {currentJobs.map((job) => (
            <JobCard
              key={job.id}
              job={job}
              isEmployer={role === "employer"}
              handleEdit={() => handleEdit(job)}
              handleDelete={() => handleDeleteClick(job)}
            />
          ))}
        </div>
      )}

      <ConfirmationDialog
        isOpen={dialogOpen}
        onClose={handleCancelDelete}
        onConfirm={handleConfirmDelete}
        title="Confirm Deletion"
        message={`Are you sure you want to delete the job "${jobToDelete?.title}"? This action cannot be undone.`}
      />

      <div>
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            handlePageChange={handlePageChange}
          />
        )}
      </div>
    </div>
  );
};

export default Dashboard;
