"use client";

import { useState } from "react";
import { Check } from "lucide-react"; // Optional: icon for success

export default function PostJobForm({ session }: { session?: any }) {
  const [formData, setFormData] = useState({
    JobTitle: "",
    CompanyName: "",
    Location: "",
    JobType: "",
    SalaryRange: "",
    SalaryPeriod: "",
    Notes: "",
    Description: "",
    Requirements: "",
    Responsibilities: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  // Rich text handler for Job Description
  const handleDescriptionChange = (e: React.FormEvent<HTMLDivElement>) => {
    setFormData((prev) => ({ ...prev, Description: e.currentTarget.innerHTML }));
  };

  const resetForm = () => {
    setFormData({
      JobTitle: "",
      CompanyName: "",
      Location: "",
      JobType: "",
      SalaryRange: "",
      SalaryPeriod: "",
      Notes: "",
      Description: "",
      Requirements: "",
      Responsibilities: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    const jobData = {
      ...formData,
      Session: session, // Safely access session if provided
    };

    try {
      const response = await fetch(
        "https://6cn9lmzip5.execute-api.us-east-1.amazonaws.com/Dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ jobData, Session: session }),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(session);
        console.log("Job posted successfully:", result);
        console.log("Job posted successfully:", jobData);
        setIsSuccess(true);
        resetForm(); // Reset form inputs
        setTimeout(() => setIsSuccess(false), 3000); // Hide success message after 3 seconds
      } else {
        console.error("Error posting job:", result.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setIsSubmitting(false);
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
          name="JobTitle"
          value={formData.JobTitle}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label htmlFor="location" className="block text-sm font-medium mb-1">
          Location
        </label>
        <input
          type="text"
          id="location"
          name="Location"
          value={formData.Location}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Type</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              id="type-remote"
              name="JobType"
              value="Remote"
              checked={formData.JobType === "Remote"}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Remote</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              id="type-hybrid"
              name="JobType"
              value="Hybrid"
              checked={formData.JobType === "Hybrid"}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Hybrid</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              id="type-onsite"
              name="JobType"
              value="Onsite"
              checked={formData.JobType === "Onsite"}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Onsite</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pay Range</label>
        <div className="flex gap-4 items-center">
          <input
            type="number"
            id="payAmount"
            name="SalaryRange"
            value={formData.SalaryRange}
            onChange={handleChange}
            className="w-1/3 px-3 py-2 border rounded-md"
            placeholder="Amount"
            min="0"
          />

          <div className="flex gap-3">
            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                id="period-yearly"
                name="SalaryPeriod"
                value="Yearly"
                checked={formData.SalaryPeriod === "Yearly"}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm">Yearly</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                id="period-monthly"
                name="SalaryPeriod"
                value="Monthly"
                checked={formData.SalaryPeriod === "Monthly"}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm">Monthly</span>
            </label>

            <label className="inline-flex items-center gap-2">
              <input
                type="radio"
                id="period-hourly"
                name="SalaryPeriod"
                value="Hourly"
                checked={formData.SalaryPeriod === "Hourly"}
                onChange={handleChange}
                className="h-4 w-4"
              />
              <span className="text-sm">Hourly</span>
            </label>
          </div>
        </div>
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
          Job Description
        </label>
<textarea
  id="jobDescription"
  name="Description"
  rows={5}
  value={formData.Description}
  onChange={handleChange}
  className="w-full px-3 py-2 border rounded-md"
/>

      </div>

      {/* <div>
        <label htmlFor="requirements" className="block text-sm font-medium mb-1">
          Requirements
        </label>
        <textarea
          id="requirements"
          name="Requirements"
          rows={3}
          value={formData.Requirements}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div> */}

      <div>
        <label htmlFor="responsibilities" className="block text-sm font-medium mb-1">
          Notes
        </label>
        <textarea
          id="notes"
          name="Notes"
          rows={3}
          value={formData.Notes}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
        />
      </div>

      <button
        type="submit"
        className="w-full bg-[#282041] text-white py-2 rounded-md"
        disabled={isSubmitting || isSuccess}
      >
        {isSubmitting ? (
          <span className="flex items-center gap-1">
            <span className="h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
            <span>Posting...</span>
          </span>
        ) : isSuccess ? (
          <span className="flex items-center gap-1">
            <Check className="h-4 w-4" />
            Posted!
          </span>
        ) : (
          "Post Job"
        )}
      </button>
    </form>
  );
}
