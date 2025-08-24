import jobhireimage from "../../assets/jobhire.jpg";
import { Link } from 'react-router-dom'


const HomePage = () => {
  return (
    <main className="home-container pt-5 pb-5 md:pt-0 md:pb-0 flex flex-col md:flex-row justify-between items-center gap-10 min-h-screen px-[5%]">
      <div className="card max-w-md flex-1">
        <h1 className="text-3xl font-semibold">
          Step into your future with
          <span className="uppercase font-bold text-blue-600"> Jobhire</span>
        </h1>
        <p className="text-lg mt-2">Find your dream job now</p>
        <div className="flex flex-wrap gap-3 mt-4">
        <Link to="/applicant-profile">  
          <button className="flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 text-sm rounded text-white cursor-pointer home-btn transition hover:bg-blue-600 border-1 border-blue-500">
            <i className="fas fa-user-circle"></i> Create Profile
          </button>
        </Link>
          <button className="flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 text-sm rounded text-white cursor-pointer home-btn transition hover:bg-blue-600 border-1 border-blue-500">
            <i className="fas fa-chart-line"></i> Dashboard
          </button>
        <Link to="/applicant-details">  
          <button className="flex items-center gap-2 px-2 py-2 md:px-4 md:py-2 text-sm rounded text-white cursor-pointer home-btn transition hover:bg-blue-600 border-1 border-blue-500">
            <i className="fa fa-eye"></i> View Profile
          </button>
        </Link>  
        </div>
      </div>
      <div className="flex-5 md:flex-1">
        <img
          src={jobhireimage}
          alt="jobhire"
          className="rounded-xl w-full h-auto max-w-md mx-auto"
        />
      </div>
    </main>
  );
};

export default HomePage;
