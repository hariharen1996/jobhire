import { useState } from "react";

const JobForm = () => {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    location: "",
    salary_range: "",
    work_mode: "",
    role: "",
    experience: "",
    application_deadline: "",
    number_of_openings: 0,
    job_skills: "",
    status: "",
  });

  const salaryOptions = [
    { value: "0-3", label: "0-3 Lakhs" },
    { value: "3-6", label: "3-6 Lakhs" },
    { value: "6-10", label: "6-10 Lakhs" },
    { value: "10-15", label: "10-15 Lakhs" },
    { value: "15-20", label: "15-20 Lakhs" },
    { value: "20+", label: "20+ Lakhs" },
  ];

  const workModeOptions = [
    { value: "WFO", label: "Work from Office" },
    { value: "hybrid", label: "Hybrid" },
    { value: "remote", label: "Remote" },
  ];

  const experienceOptions = [
    { value: "0-1", label: "0-1 years" },
    { value: "1-3", label: "1-3 years" },
    { value: "3-5", label: "3-5 years" },
    { value: "5-7", label: "5-7 years" },
    { value: "7-10", label: "7-10 years" },
    { value: "10+", label: "10+ years" },
  ];

  const statusOptions = [
    { value: "open", label: "Open" },
    { value: "closed", label: "Closed" },
    { value: "filled", label: "Filled" },
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(formData);
  };

  return (
    <div className="max-w-4xl mx-auto p-8 bg-white shadow-md rounded-lg my-10">
      <h1 className="text-2xl font-bold mb-6 text-gray-800">Post a New Job</h1>
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-6"
      >
        {[
          {
            label: "Job Title",
            name: "title",
            type: "text",
            placeholder: "e.g. Software Developer",
          },
          {
            label: "Job Location",
            name: "location",
            type: "text",
            placeholder: "e.g., Chennai, Tamil Nadu",
          },
          {
            label: "Job Description",
            name: "description",
            type: "textarea",
            placeholder:
              "Describe the responsibilities, requirements, and expectations for this job role...",
          },
          {
            label: "Role/Position",
            name: "role",
            type: "text",
            placeholder: "e.g., Frontend Developer, Data Scientist",
          },
          {
            label: "Salary Range",
            name: "salary_range",
            type: "select",
            options: salaryOptions,
          },
          {
            label: "Work Mode",
            name: "work_mode",
            type: "select",
            options: workModeOptions,
          },
          {
            label: "Experience Required",
            name: "experience",
            type: "select",
            options: experienceOptions,
          },
          {
            label: "Application Deadline",
            name: "application_deadline",
            type: "date",
            min: new Date().toISOString().split("T")[0],
          },
          {
            label: "Number of Openings",
            name: "number_of_openings",
            type: "number",
            min: "1",
            max: "100",
          },
          {
            label: "Job Status",
            name: "status",
            type: "select",
            options: statusOptions,
          },
          {
            label: "Required Skills",
            name: "job_skills",
            type: "text",
            placeholder: "e.g., React, Node.js, AWS",
          },
        ].map(({ label, name, type, ...rest }) => (
          <div
            key={name}
            className={
              "description".includes(name) ||
              "application_deadline".includes(name) ||
              "job_skills".includes(name)
                ? "md:col-span-2"
                : ""
            }
          >
            <label className="block text-gray-700 text-sm font-bold mb-1">
              {label}
            </label>
            {type === "textarea" ? (
              <textarea
                name={name}
                value={formData[name]}
                onChange={handleChange}
                rows={3}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
                placeholder={rest.placeholder}
              />
            ) : type === "select" ? (
              <select
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md"
              >
                <option value="">Select an option</option>
                {rest.options.map((opt) => (
                  <option key={opt.value} value={opt.value}>
                    {opt.label}
                  </option>
                ))}
              </select>
            ) : (
              <input
                type={type}
                name={name}
                value={formData[name]}
                onChange={handleChange}
                className={`w-full px-3 py-2 border border-gray-300 rounded-md ${
                  rest.disabled ? "bg-gray-100 cursor-not-allowed" : ""
                }`}
                {...rest}
              />
            )}
          </div>
        ))}

        <div className="md:col-span-2">
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700 w-full"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
};

export default JobForm;
