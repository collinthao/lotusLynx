import { useState } from "react";

export default function PostJobForm() {
  const [JobTitle, setJobTitle] = useState("");
  const [CompanyName, setCompany] = useState("");
  const [Location, setLocation] = useState("");
  const [JobType, setJobType] = useState("");
  const [SalaryRange, setSalaryRange] = useState("");
  const [JobDescription, setJobDescription] = useState("");
  const [Requirements, setRequirements] = useState("");
  const [Responsibilities, setResponsibilities] = useState("");

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const jobData = {
      JobTitle,
      CompanyName,
      Location,
      JobType,
      SalaryRange,
      JobDescription,
      Requirements,
      Responsibilities,
    };

    // Post job data to the backend
    try {
      const response = await fetch('https://6cn9lmzip5.execute-api.us-east-1.amazonaws.com/Dev', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(jobData),
      });

      const result = await response.json();
      if (response.ok) {
        console.log('Job posted successfully:', result);
      } else {
        console.error('Error posting job:', result.error);
      }
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <form className="space-y-4" onSubmit={handleSubmit}>
      <div>
        <label htmlFor="jobTitle" className="block text-sm font-medium mb-1">
          Job Title
        </label>
        <input
          type="text"
          id="jobTitle"
          value={JobTitle}
          onChange={(e) => setJobTitle(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="company" className="block text-sm font-medium mb-1">
          Company
        </label>
        <input
          type="text"
          id="company"
          value={CompanyName}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          value={Location}
          onChange={(e) => setLocation(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="jobType" className="block text-sm font-medium mb-1">
          Job Type
        </label>
        <input
          type="text"
          id="jobType"
          value={JobType}
          onChange={(e) => setJobType(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="salaryRange" className="block text-sm font-medium mb-1">
          Salary Range
        </label>
        <input
          type="text"
          id="salaryRange"
          value={SalaryRange}
          onChange={(e) => setSalaryRange(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
          Job Description
        </label>
        <textarea
          id="jobDescription"
          rows={4}
          value={JobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="requirements" className="block text-sm font-medium mb-1">
          Requirements
        </label>
        <textarea
          id="requirements"
          rows={3}
          value={Requirements}
          onChange={(e) => setRequirements(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <div>
        <label htmlFor="responsibilities" className="block text-sm font-medium mb-1">
          Responsibilities
        </label>
        <textarea
          id="responsibilities"
          rows={3}
          value={Responsibilities}
          onChange={(e) => setResponsibilities(e.target.value)}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button type="submit" className="w-full bg-[#282041] text-white py-2 rounded-md">
        Post Job
      </button>
    </form>
  );
}
