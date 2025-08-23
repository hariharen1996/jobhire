const ApplicantProfile = () => {
  return (
    <main className="min-h-screen flex flex-col justify-center items-center px-4">
      <div className="pt-5 w-full max-w-md">
        <form className="bg-white shadow-md rounded px-8 pt-6 pb-6 mb-4 space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">
            Applicant Profile Form
          </h2>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Address
            </label>
            <input
              type="text"
              name="address"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Bio
            </label>
            <textarea
              name="bio"
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Education
            </label>
            <input
              type="text"
              name="education"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              CGPA
            </label>
            <input
              type="number"
              name="cgpa"
              step="0.01"
              min="0"
              max="10"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>

          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Skills (comma separated)
            </label>
            <input
              type="text"
              name="skills"
              placeholder="e.g., Java, Spring Boot, React, SQL, AWS"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Work Experience
            </label>
            <input
              type="text"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Profile Picture (JPG/JPEG/PNG)
            </label>
            <input
              type="file"
              name="profilePic"
              accept="image/jpg,image/jpeg,image/png"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <div>
            <label className="block text-gray-700 text-sm font-bold mb-1">
              Resume (PDF/DOC/DOCX)
            </label>
            <input
              type="file"
              name="resume"
              accept=".pdf,.doc,.docx"
              className="w-full px-3 py-2 border border-gray-300 rounded-md"
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 rounded text-white cursor-pointer bg-blue-500 hover:bg-blue-600 transition"
          >
            Create Profile
          </button>
        </form>
      </div>
    </main>
  );
};

export default ApplicantProfile;
