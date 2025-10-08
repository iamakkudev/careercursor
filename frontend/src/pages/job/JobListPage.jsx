import JobCard from '../../components/JobCard';
import { useJoblistStore } from '../../store/joblistStore.js';
import { useRoadmapStore } from '../../store/roadmapStore.js';
import { useNavigate, useSearchParams } from 'react-router-dom';

const JobListPage = () => {
  const { getJobRoadmap } = useRoadmapStore();
  const { list,error,isLoading } = useJoblistStore();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const type = searchParams.get("q");

  if (!type) {
    return <div className="p-8 text-center text-gray-500">No job type selected.</div>;
  }

  const joblist = list[type];
  console.log(joblist)

  const handleJob = async (job) => {
    await getJobRoadmap(job);
    navigate("/roadmap");
  };
  if(isLoading) return <div className='text-xl text-center font-bold my-auto'>Loding....</div>
  if(error) return <div className='text-center font-bold text-red-600 text-xl my-auto'>{error}</div>
  return (
    <div className="px-[10rem] py-6">
      {joblist?.data?.length > 0 ? (
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
