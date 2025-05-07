import Header from "@/components/ui/header";
import { Footer } from "@/components/footer";
import PostJobForm from "@/components/postJobForm";
import { useEffect, useState } from "react";
import { Trash2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const Dashboard = () => {
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [jobs, setJobs] = useState([]);
  const searchParams = useSearchParams();
  const Session = searchParams.get("session");
  const fetchJobs = async () => {
    try {
      const res = await fetch(
        "https://01yahy0rib.execute-api.us-east-1.amazonaws.com/Dev",
        {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const jobs = await res.json();
      return JSON.parse(jobs.body); // or use in state
    } catch (error) {
      console.error("Error fetching jobs:", error);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      const data = await fetchJobs();
      setJobs(data);
    };
    if (Session) fetchData();
  }, [Session]);

  const openDeleteConfirmation = (jobId: string) => {
    console.log(jobId);
    setJobToDelete(jobId);
  };

  const closeDeleteConfirmation = () => {
    setJobToDelete(null);
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      const response = await fetch(
        "https://mcejnt9v3g.execute-api.us-east-1.amazonaws.com/Dev",
        {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID: jobId, Session: Session }), // Ensure this passes the correct jobId
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Delete successful:", result.message);
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }

    setJobToDelete(null); // Clear confirmation state after action
  };

  return (
    <>
      <Header />

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Recruiter Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Post a New Job Form */}
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Post a New Job</h2>

            {Session && <PostJobForm session={Session} />}
          </div>

          {/* Job Listings */}
          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{job.JobTitle}</h3>
                  <button
                    className="text-[#ef4444]"
                    onClick={() => openDeleteConfirmation(job.ID)}
                  >
                    <Trash2 size={16} />
                  </button>
                </div>
                <p className="text-sm">{job.Company}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {job.Location}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                    </svg>
                    {job.JobType}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 6v6l4 2" />
                    </svg>
                    {job.Salary}
                  </div>
                  <div className="flex items-center gap-1">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="size-4"
                    >
                      <rect width="18" height="18" x="3" y="4" rx="2" ry="2" />
                      <line x1="16" x2="16" y1="2" y2="6" />
                      <line x1="8" x2="8" y1="2" y2="6" />
                      <line x1="3" x2="21" y1="10" y2="10" />
                      <path d="M8 14h.01" />
                      <path d="M12 14h.01" />
                      <path d="M16 14h.01" />
                      <path d="M8 18h.01" />
                      <path d="M12 18h.01" />
                      <path d="M16 18h.01" />
                    </svg>
                    {job.DatePosted}
                  </div>
                </div>
              </div>
            ))}

            {/* Pagination */}
            <div className="flex justify-center items-center gap-4 mt-6">
              <button className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m15 18-6-6 6-6" />
                </svg>
              </button>
              <span>Page 1</span>
              <button className="p-2">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16"
                  height="16"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="m9 18 6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <Footer />

      {/* Delete Confirmation Modal */}
      {jobToDelete !== null && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 max-w-md w-full mx-4">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-semibold">Confirm Deletion</h3>
              <button
                onClick={closeDeleteConfirmation}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>
            <p className="mb-6">
              Are you sure you want to delete this job posting?
            </p>
            <div className="flex justify-end space-x-3">
              <button
                onClick={closeDeleteConfirmation}
                className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
              >
                Cancel
              </button>
              <button
                onClick={() => handleDeleteJob(jobToDelete)}
                className="px-4 py-2 bg-[#ef4444] text-white rounded-md hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
