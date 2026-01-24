import Header from "@/components/ui/header";
import { Footer } from "@/components/footer";
import PostJobForm from "@/components/postJobForm";
import { useEffect, useState, useRef } from "react";
import { Trash2, X } from "lucide-react";
import { useSearchParams } from "next/navigation";

export const Dashboard = () => {
  const [jobToDelete, setJobToDelete] = useState<string | null>(null);
  const [jobToEdit, setJobToEdit] = useState<any>(null);
  const [editFormData, setEditFormData] = useState({
    JobTitle: "",
    Location: "",
    JobType: "",
    EmploymentType: "",
    SalaryMin: "",
    SalaryMax: "",
    SalaryPeriod: "",
    TotalCompensation: "",
    DatePosted: "",
    Description: "",
    Notes: "",
  });
  const [jobs, setJobs] = useState([]);
  const searchParams = useSearchParams();
  const Session = searchParams.get("session");
  const editDescriptionRef = useRef<HTMLDivElement>(null);

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
      return JSON.parse(jobs.body);
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
          body: JSON.stringify({ ID: jobId, Session: Session }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Delete successful:", result);
        const updated = await fetchJobs();
        setJobs(updated);
      } else {
        console.error("Delete failed:", result.error);
      }
    } catch (error) {
      console.error("Error deleting job:", error);
    }

    setJobToDelete(null);
  };

  const openEditModal = (job: any) => {
    setJobToEdit(job);
    setEditFormData({
      JobTitle: job.JobTitle,
      Location: job.Location,
      JobType: job.JobType || "",
      EmploymentType: job.EmploymentType || "",
      SalaryMin: job.SalaryMin || "",
      SalaryMax: job.SalaryMax || "",
      SalaryPeriod: job.SalaryPeriod ?? "",
      TotalCompensation: job.TotalCompensation || "",
      DatePosted: job.DatePosted,
      Description: job.Description || "",
      Notes: job.Notes || "",
    });
    // Set contentEditable content after state updates
    setTimeout(() => {
      if (editDescriptionRef.current) {
        editDescriptionRef.current.innerHTML = job.Description || "";
      }
    }, 0);
  };

  const handleEditJob = async (jobId: string, updatedData: any) => {
    try {
      const response = await fetch(
        `https://6cn9lmzip5.execute-api.us-east-1.amazonaws.com/Dev`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ID: jobId, Session: Session, ...updatedData }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log("Edit successful:", result);
        const updated = await fetchJobs();
        setJobs(updated);
      } else {
        console.error("Edit failed:", result.message);
      }
    } catch (error) {
      console.error("Error editing job:", error);
    }
  };

  return (
    <>
      <Header />
      <main className="flex-grow container mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold mb-8">Recruiter Dashboard</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="border rounded-lg p-6">
            <h2 className="text-lg font-semibold mb-4">Post a New Job</h2>
            {Session && <PostJobForm session={Session} />}
          </div>

          <div className="space-y-4">
            {jobs.map((job, index) => (
              <div key={index} className="border rounded-lg p-4">
                <div className="flex justify-between">
                  <h3 className="font-semibold">{job.JobTitle}</h3>
                  <div className="flex space-x-2">
                    <button
                      className="text-blue-600"
                      onClick={() => openEditModal(job)}
                    >
                      ✏️
                    </button>
                    <button
                      className="text-[#ef4444]"
                      onClick={() => openDeleteConfirmation(job.ID)}
                    >
                      <Trash2 size={16} />
                    </button>
                  </div>
                </div>
                <p className="text-sm">{job.Company}</p>
                <div className="flex flex-wrap gap-4 mt-2 text-sm">
                  <div className="flex items-center gap-1">{job.Location}</div>
                  <div className="flex items-center gap-1">{job.JobType}</div>
                  {job.EmploymentType && (
                    <div className="flex items-center gap-1">{job.EmploymentType}</div>
                  )}
                  <div className="flex items-center gap-1">{job.Salary}</div>
                  <div className="flex items-center gap-1">
                    {job.DatePosted}
                  </div>
                </div>
              </div>
            ))}

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

      {/* Edit Job Modal */}
      {jobToEdit && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-2xl max-h-[90vh] flex flex-col">
            <div className="flex justify-between items-center p-6 border-b">
              <h3 className="text-lg font-semibold">Edit Job</h3>
              <button
                onClick={() => setJobToEdit(null)}
                className="text-gray-500 hover:text-gray-700"
              >
                <X size={20} />
              </button>
            </div>

            <div className="overflow-y-auto flex-1 p-6">
              <form
                onSubmit={async (e) => {
                  e.preventDefault();
                  console.log(jobToEdit);
                  // Capture HTML from contentEditable div
                  const descriptionHTML = editDescriptionRef.current?.innerHTML || "";
                  // Compute SalaryRange for AWS backward compatibility
                  const salaryRangeComputed =
                    (editFormData.SalaryMin && editFormData.SalaryMax)
                      ? `${editFormData.SalaryMin}-${editFormData.SalaryMax}`
                      : "";
                  const updatedData = { ...editFormData, Description: descriptionHTML, SalaryRange: salaryRangeComputed };
                  // Log payload for quick verification
                  console.log("Updating job payload:", updatedData);
                  await handleEditJob(jobToEdit.ID, updatedData);
                  setJobToEdit(null);
                }}
                className="space-y-4"
                id="edit-job-form"
              >
                <div>
                  <label className="block text-sm font-medium text-gray-700">Job Title</label>
                  <input
                    type="text"
                    value={editFormData.JobTitle}
                    onChange={(e) => setEditFormData({ ...editFormData, JobTitle: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Location</label>
                  <input
                    type="text"
                    value={editFormData.Location}
                    onChange={(e) => setEditFormData({ ...editFormData, Location: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Work Location</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="editJobType"
                        value="Remote"
                        checked={editFormData.JobType === "Remote"}
                        onChange={() => setEditFormData({ ...editFormData, JobType: "Remote" })}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Remote</span>
                    </label>

                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="editJobType"
                        value="Hybrid"
                        checked={editFormData.JobType === "Hybrid"}
                        onChange={() => setEditFormData({ ...editFormData, JobType: "Hybrid" })}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Hybrid</span>
                    </label>

                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="editJobType"
                        value="Onsite"
                        checked={editFormData.JobType === "Onsite"}
                        onChange={() => setEditFormData({ ...editFormData, JobType: "Onsite" })}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Onsite</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">Employment Type</label>
                  <div className="flex gap-4">
                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="editEmploymentType"
                        value="Direct Hire"
                        checked={editFormData.EmploymentType === "Direct Hire"}
                        onChange={() => setEditFormData({ ...editFormData, EmploymentType: "Direct Hire" })}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Direct Hire</span>
                    </label>

                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="editEmploymentType"
                        value="Contract"
                        checked={editFormData.EmploymentType === "Contract"}
                        onChange={() => setEditFormData({ ...editFormData, EmploymentType: "Contract" })}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Contract</span>
                    </label>

                    <label className="inline-flex items-center gap-2">
                      <input
                        type="radio"
                        name="editEmploymentType"
                        value="Contract-to-Hire"
                        checked={editFormData.EmploymentType === "Contract-to-Hire"}
                        onChange={() => setEditFormData({ ...editFormData, EmploymentType: "Contract-to-Hire" })}
                        className="h-4 w-4"
                      />
                      <span className="text-sm">Contract-to-Hire</span>
                    </label>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Pay Range</label>
                  <div className="flex flex-col gap-3">
                    <div className="flex gap-3 items-center">
                      <input
                        type="text"
                        value={editFormData.SalaryMin ? parseInt(editFormData.SalaryMin).toLocaleString() : ''}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/,/g, '');
                          if (numericValue === '' || /^\d+$/.test(numericValue)) {
                            setEditFormData({ ...editFormData, SalaryMin: numericValue });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Min (e.g., 150,000)"
                      />
                      <span className="text-sm">to</span>
                      <input
                        type="text"
                        value={editFormData.SalaryMax ? parseInt(editFormData.SalaryMax).toLocaleString() : ''}
                        onChange={(e) => {
                          const numericValue = e.target.value.replace(/,/g, '');
                          if (numericValue === '' || /^\d+$/.test(numericValue)) {
                            setEditFormData({ ...editFormData, SalaryMax: numericValue });
                          }
                        }}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md"
                        placeholder="Max (e.g., 160,000)"
                      />
                    </div>

                    <div className="flex gap-3">
                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="editSalaryPeriod"
                          value="Yearly"
                          checked={editFormData.SalaryPeriod === "Yearly"}
                          onChange={() => setEditFormData({ ...editFormData, SalaryPeriod: "Yearly" })}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">Yearly</span>
                      </label>

                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="editSalaryPeriod"
                          value="Monthly"
                          checked={editFormData.SalaryPeriod === "Monthly"}
                          onChange={() => setEditFormData({ ...editFormData, SalaryPeriod: "Monthly" })}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">Monthly</span>
                      </label>

                      <label className="inline-flex items-center gap-2">
                        <input
                          type="radio"
                          name="editSalaryPeriod"
                          value="Hourly"
                          checked={editFormData.SalaryPeriod === "Hourly"}
                          onChange={() => setEditFormData({ ...editFormData, SalaryPeriod: "Hourly" })}
                          className="h-4 w-4"
                        />
                        <span className="text-sm">Hourly</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Total Compensation Details</label>
                  <textarea
                    value={editFormData.TotalCompensation}
                    onChange={(e) => setEditFormData({ ...editFormData, TotalCompensation: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows={3}
                    placeholder="Include details about bonus, equity, stock options, incentives, etc."
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Date Posted</label>
                  <input
                    type="text"
                    value={editFormData.DatePosted}
                    onChange={(e) => setEditFormData({ ...editFormData, DatePosted: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                  />
                </div>

                <div>
                  <label htmlFor="editJobDescription" className="block text-sm font-medium text-gray-700 mb-1">
                    Job Description
                  </label>
                  <div className="border border-gray-300 rounded-md">
                    <div className="flex gap-1 p-2 border-b bg-gray-50">
                      <button
                        type="button"
                        onClick={() => document.execCommand('bold', false)}
                        className="px-2 py-1 hover:bg-gray-200 rounded text-sm font-bold"
                        title="Bold"
                      >
                        B
                      </button>
                      <button
                        type="button"
                        onClick={() => document.execCommand('italic', false)}
                        className="px-2 py-1 hover:bg-gray-200 rounded text-sm italic"
                        title="Italic"
                      >
                        I
                      </button>
                      <button
                        type="button"
                        onClick={() => document.execCommand('underline', false)}
                        className="px-2 py-1 hover:bg-gray-200 rounded text-sm underline"
                        title="Underline"
                      >
                        U
                      </button>
                      <button
                        type="button"
                        onClick={() => document.execCommand('removeFormat', false)}
                        className="px-2 py-1 hover:bg-gray-200 rounded text-sm"
                        title="Clear Formatting"
                      >
                        Clear
                      </button>
                    </div>
                    <div
                      ref={editDescriptionRef}
                      id="editJobDescription"
                      className="w-full min-h-[6rem] max-h-[12rem] overflow-y-auto px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      contentEditable
                      suppressContentEditableWarning
                    />
                  </div>
                  <p className="mt-1 text-xs text-gray-500">Use the toolbar to format text or clear formatting from pasted content.</p>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700">Additional Notes</label>
                  <textarea
                    value={editFormData.Notes}
                    onChange={(e) => setEditFormData({ ...editFormData, Notes: e.target.value })}
                    className="mt-1 block w-full border border-gray-300 rounded-md p-2"
                    rows={3}
                    placeholder="Internal notes or additional information"
                  />
                </div>

              <div className="flex justify-end space-x-3 pt-2">
                <button
                  type="button"
                  onClick={() => setJobToEdit(null)}
                  className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                  form="edit-job-form"
                >
                  Save Changes
                </button>
              </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
