const JobCard = ({ job }) => {
  console.log(job);
  const getDaysAgo = () => {
    if (!job.posted_time && !job.created_at) return "recently";

    try {
      const postedDate = new Date(job.posted_time || job.created_at);
      if (isNaN(postedDate.getTime())) return "recently";

      const currentDate = new Date();
      console.log(currentDate);
      const diffTime = Math.abs(currentDate - postedDate);
      const diffDays = Math.floor(diffTime / (1000 * 60 * 60 * 24));
      console.log(diffTime, diffDays);

      if (diffDays === 0) return "today";
      if (diffDays === 1) return "1 day ago";
      return `${diffDays} days ago`;
    } catch (error) {
      return "recently";
    }
  };

  const daysAgo = getDaysAgo();

  const formatSalary = () => {
    if (job.min_salary !== undefined && job.max_salary !== undefined) {
      if (job.max_salary >= 100000) {
        return `₹${job.min_salary}+ LPA`;
      }
      return `₹${job.min_salary} - ₹${job.max_salary} LPA`;
    }
    if (job.salary_range) {
      return `${job.salary_range.replace("-", " - ")} LPA`;
    }
    return "Salary not specified";
  };

  const companyName =
    job.company_name || job.employer?.company_name || "Company not specified";
  const companyLogo = job.company_logo || job.employer?.company_logo;

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow duration-300 border-l-4 border-blue-500">
      <div className="p-6">
        <div className="flex justify-between items-start mb-4">
          <div className="flex-1">
            <h2 className="text-xl font-bold text-gray-800 mb-1">
              {job.title}
            </h2>
            <p className="text-gray-600 text-sm">{companyName}</p>
          </div>
          {companyLogo ? (
            <img
              src={`http://127.0.0.1:8000${companyLogo}`}
              alt={companyName}
              className="w-10 h-10 rounded-md object-cover"
              onError={(e) => {
                e.target.style.display = "none";
                e.target.nextSibling.style.display = "flex";
              }}
            />
          ) : null}
          <div
            className={`bg-blue-600 text-white rounded-md w-10 h-10 flex items-center justify-center ${
              companyLogo ? "hidden" : "flex"
            }`}
          >
            <span className="font-bold text-sm">
              {companyName.charAt(0).toUpperCase()}
            </span>
          </div>
        </div>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="bg-blue-100 text-blue-800 px-3 py-1 rounded-full text-xs">
            {job.experience || "0-1 years"}
          </span>
          <span className="bg-green-100 text-green-800 px-3 py-1 rounded-full text-xs">
            {job.location || "Location not specified"}
          </span>
          <span
            className={`px-3 py-1 rounded-full text-xs ${
              job.work_mode === "remote"
                ? "bg-purple-100 text-purple-800"
                : job.work_mode === "hybrid"
                ? "bg-yellow-100 text-yellow-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {job.work_mode ? job.work_mode.toUpperCase() : "Not specified"}
          </span>
        </div>

        <p className="text-gray-700 mb-4 line-clamp-3 text-sm">
          {job.description || "No description provided"}
        </p>

        <div className="flex justify-between items-center mb-4">
          <div>
            <p className="font-semibold text-blue-600 text-sm">
              {formatSalary()}
            </p>
            <p className="text-xs text-gray-500">Posted {daysAgo}</p>
          </div>
          <span
            className={`px-2 py-1 text-xs rounded ${
              job.status === "open"
                ? "bg-green-100 text-green-800"
                : job.status === "filled"
                ? "bg-blue-100 text-blue-800"
                : "bg-gray-100 text-gray-800"
            }`}
          >
            {job.status ? job.status.toUpperCase() : "UNKNOWN"}
          </span>
        </div>

        <div className="mb-4">
          <p className="text-xs text-gray-500">
            Skills: {job.job_skills || "Not specified"}
          </p>
        </div>

        <div className="flex justify-between gap-4 pt-4 border-t border-gray-100">
          <button className="text-blue-600 hover:text-blue-800 font-medium text-sm">
            Edit
          </button>
          <button className="text-red-600 hover:text-red-800 font-medium text-sm">
            Delete
          </button>
        </div>
      </div>
    </div>
  );
};

export default JobCard;
