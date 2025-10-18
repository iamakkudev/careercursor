import JobCard from '../../components/JobCard';
import { useJoblistStore } from '../../store/joblistStore.js';
import { useRoadmapStore } from '../../store/roadmapStore.js';
import { useNavigate, useSearchParams } from 'react-router-dom';
import {joblist} from '../../info.js'

const JobListPage = () => {
  const { getJobRoadmap } = useRoadmapStore();
  const { list, error, isLoading } = useJoblistStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("q");

  // if (!type) {
  //   return <div className="p-8 text-center text-gray-500">No job type selected.</div>;
  // }

  // const joblist = list[type];

  const handleJob = async (job) => {
    // try {
    //   await getJobRoadmap(job);
    //   navigate("/roadmap");
    // } catch (err) {
    //   console.error(err);
    //   alert("Failed to fetch roadmap. Try again.");
    // }
  };

  return (
    <div className="px-15 md:px-10 lg:px-40 py-6 min-h-screen">
      {isLoading ? (
        <div className="text-xl text-center font-bold my-10">Loading...</div>
      ) : error ? (
        <div className="text-center font-bold text-red-600 text-xl my-10">{error}</div>
      ) : joblist?.data?.length > 0 ? (
        joblist.data.map((item, idx) => (
          <JobCard key={idx} {...item} handleJob={handleJob} />
        ))
      ) : (
        <p className="text-center text-gray-500">No jobs available for this category.</p>
      )}
    </div>
  );
};

export default JobListPage;
