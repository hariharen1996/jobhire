import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchApplicantProfile,
  saveApplicantProfile,
  clearMessage,
} from "../../features/profile/applicantProfileSlice";
import { useNavigate } from "react-router-dom";

const ApplicantProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { username, email } = useSelector((state) => state.user);

  const { profile, loading, saving, message } = useSelector(
    (state) => state.profile
  );

  const [formData, setFormData] = useState({
    name: username || "",
    email: email || "",
    address: "",
    bio: "",
    skills: "",
    experience: "",
    education: "",
    cgpa: "",
    profilePic: null,
    resume: null,
  });

  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (username && email) {
      dispatch(fetchApplicantProfile());
    }
  }, [dispatch, username, email]);

  useEffect(() => {
    if (profile) {
      setFormData({
        name: username || "",
        email: email || "",
        address: profile.user_location || "",
        bio: profile.user_bio || "",
        skills: profile.user_skills_list?.join(", ") || "",
        experience: profile.work_experience || "",
        education: profile.user_education || "",
        cgpa: profile.user_cgpa || "",
        profilePic: null,
        resume: null,
      });
    }
  }, [profile, username, email]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (files) {
      setFormData((prev) => ({ ...prev, [name]: files[0] }));
    } else {
      const newValue = name === "cgpa" ? parseFloat(value) : value;
      setFormData((prev) => ({ ...prev, [name]: newValue }));
    }

    setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
    }

    if (!formData.education.trim()) {
      newErrors.education = "Education is required";
    }

    if (!formData.bio.trim()) {
      newErrors.bio = "Bio is required";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
    }

    const cgpaValue = parseFloat(formData.cgpa);
    console.log(typeof cgpaValue);
    if (isNaN(cgpaValue) || cgpaValue < 1 || cgpaValue > 10) {
      newErrors.cgpa = "CGPA must be between 0 and 10";
    }

    if (!formData.experience.trim()) {
      newErrors.experience = "Experience is required";
    }

    if (!formData.skills.trim()) {
      newErrors.skills = "Skills are required";
    } else if (formData.skills.split(",").length < 3) {
      newErrors.skills = "At least 3 skills are required";
    }

    if (!profile && !profile?.user_image) {
      newErrors.profilePic = "Profile picture is required";
    }
    
    if (!profile && !profile?.user_resume) {
      newErrors.resume = "Resume is required";
    }
    

    setErrors(newErrors);
    console.log(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    const formDataToSend = new FormData();
    formDataToSend.append("user_bio", formData.bio);
    formDataToSend.append("user_education", formData.education);
    formDataToSend.append("user_cgpa", formData.cgpa);
    formDataToSend.append("work_experience", formData.experience);
    formDataToSend.append("user_location", formData.address);
    formDataToSend.append("user_skills", formData.skills);

    if (formData.profilePic) {
      formDataToSend.append("user_image", formData.profilePic);
    }
    if (formData.resume) {
      formDataToSend.append("user_resume", formData.resume);
    }

    const isUpdate = !!profile;

    dispatch(saveApplicantProfile({ formData: formDataToSend, isUpdate }));
  };

  useEffect(() => {
    if (message.includes("✅")) {
      setTimeout(() => {
        dispatch(clearMessage());
        navigate("/applicant-details");
      }, 1500);
    }
  }, [message, navigate, dispatch]);

  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="pt-5 w-full max-w-md">
        {message && (
          <div
            className={`mb-4 text-sm px-4 py-2 rounded ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 space-y-4"
        >
          <h2 className="text-2xl font-bold text-center mb-4">
            {loading
              ? "Loading profile..."
              : profile
              ? "Update Your Profile"
              : "Complete Your Profile"}
          </h2>

          {[
            { label: "Name", name: "name", type: "text", disabled: true },
            { label: "Email", name: "email", type: "email", disabled: true },
            { label: "Address", name: "address", type: "text" },
            { label: "Bio", name: "bio", type: "textarea" },
            { label: "Education", name: "education", type: "text" },
            {
              label: "CGPA",
              name: "cgpa",
              type: "number",
              step: "0.01",
              min: "0",
              max: "10",
            },
            {
              label: "Skills (comma separated)",
              name: "skills",
              type: "text",
              placeholder: "e.g., Java, React, SQL",
            },
            { label: "Work Experience", name: "experience", type: "text" },
          ].map(({ label, name, type, ...rest }) => (
            <div key={name}>
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
                />
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
              {errors[name] && (
                <p className="text-red-500 text-xs mt-1">*{errors[name]}</p>
              )}
            </div>
          ))}

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Profile Picture
            </label>
            {profile?.user_image && (
              <p className="text-sm text-gray-600 mb-2">
                Current: {profile.user_image}
              </p>
            )}
            <input
              type="file"
              name="profilePic"
              accept="image/png, image/jpeg"
              onChange={handleChange}
              className="block w-full text-sm text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        dark:hover:file:bg-blue-400"
            />
            {errors.profilePic && (
              <p className="text-red-500 text-xs mt-1">*{errors.profilePic}</p>
            )}
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Resume
            </label>
            {profile?.user_resume && (
              <p className="text-sm text-gray-600 mb-2">
                Current: {profile.user_resume}
              </p>
            )}
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              onChange={handleChange}
              className=" block w-full text-sm text-gray-500
        file:me-4 file:py-2 file:px-4
        file:rounded-lg file:border-0
        file:text-sm file:font-semibold
        file:bg-blue-600 file:text-white
        hover:file:bg-blue-700
        file:disabled:opacity-50 file:disabled:pointer-events-none
        dark:text-neutral-500
        dark:file:bg-blue-500
        dark:hover:file:bg-blue-400"
            />
            {errors.resume && (
              <p className="text-red-500 text-xs mt-1">*{errors.resume}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={saving}
            className="w-full py-2 rounded text-white bg-blue-500 hover:bg-blue-600 transition"
          >
            {saving
              ? "Processing..."
              : profile
              ? "Update Profile"
              : "Save Profile"}
          </button>
        </form>
      </div>
    </main>
  );
};

export default ApplicantProfile;
