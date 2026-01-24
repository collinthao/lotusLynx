"use client";

import { useState, useRef } from "react";
import { Check } from "lucide-react"; // Optional: icon for success

export default function PostJobForm({ session }: { session?: any }) {
  // Helper functions for salary formatting
  const formatNumber = (value: string) => {
    const num = value.replace(/,/g, '');
    if (!num) return '';
    return parseInt(num).toLocaleString();
  };

  const parseNumber = (value: string) => {
    return value.replace(/,/g, '');
  };

  const [formData, setFormData] = useState({
    JobTitle: "",
    Location: "",
    JobType: "",
    EmploymentType: "",
    SalaryMid: "",
    SalaryMax: "",
    SalaryPeriod: "",
    TotalCompensation: "",
    Notes: "",
    Description: "",
    Requirements: "",
    Responsibilities: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const descriptionEditorRef = useRef<HTMLDivElement>(null);
  const [showPayloadPreview, setShowPayloadPreview] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    
    // Format salary fields with commas
    if (name === 'SalaryMid' || name === 'SalaryMax') {
      const numericValue = parseNumber(value);
      if (numericValue === '' || /^\d+$/.test(numericValue)) {
        setFormData((prev) => ({ ...prev, [name]: numericValue }));
      }
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const resetForm = () => {
    setFormData({
      JobTitle: "",
      Location: "",
      JobType: "",
      EmploymentType: "",
      SalaryMid: "",
      SalaryMax: "",
      SalaryPeriod: "",
      TotalCompensation: "",
      Notes: "",
      Description: "",
      Requirements: "",
      Responsibilities: "",
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Capture HTML from contentEditable div
    const descriptionHTML = descriptionEditorRef.current?.innerHTML || "";
    // Compute SalaryRange for AWS backward compatibility
    const salaryRangeComputed =
      (formData.SalaryMid && formData.SalaryMax)
        ? `${formData.SalaryMid}-${formData.SalaryMax}`
        : "";
    
    const jobData = {
      ...formData,
      Description: descriptionHTML, // Use captured HTML
      SalaryRange: salaryRangeComputed,
      Session: session, // Safely access session if provided
    };

    // Log payload for quick verification
    console.log("Submitting job payload:", jobData);

    try {
      const response = await fetch(
        "https://6cn9lmzip5.execute-api.us-east-1.amazonaws.com/Dev",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          // Send flat payload (no nested jobData) for AWS compatibility
          body: JSON.stringify(jobData),
        }
      );

      const result = await response.json();

      if (response.ok) {
        console.log(session);
        console.log("Job posted successfully:", result);
        console.log("Job posted successfully:", jobData);
        setIsSuccess(true);
        resetForm(); // Reset form inputs
        if (descriptionEditorRef.current) {
          descriptionEditorRef.current.innerHTML = ""; // Clear rich text editor
        }
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
        <label className="block text-sm font-medium mb-1">Work Location</label>
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
        <label className="block text-sm font-medium mb-1">Employment Type</label>
        <div className="flex gap-4">
          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              id="employment-direct"
              name="EmploymentType"
              value="Direct Hire"
              checked={formData.EmploymentType === "Direct Hire"}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Direct Hire</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              id="employment-contract"
              name="EmploymentType"
              value="Contract"
              checked={formData.EmploymentType === "Contract"}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Contract</span>
          </label>

          <label className="inline-flex items-center gap-2">
            <input
              type="radio"
              id="employment-c2h"
              name="EmploymentType"
              value="Contract-to-Hire"
              checked={formData.EmploymentType === "Contract-to-Hire"}
              onChange={handleChange}
              className="h-4 w-4"
            />
            <span className="text-sm">Contract-to-Hire</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pay Range</label>
        <div className="flex flex-col gap-3">
          <div className="flex gap-3 items-center">
            <input
              type="text"
              id="salaryMin"
              name="SalaryMid"
              value={formatNumber(formData.SalaryMid)}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Min (e.g., 150,000)"
            />
            <span className="text-sm">to</span>
            <input
              type="text"
              id="salaryMax"
              name="SalaryMax"
              value={formatNumber(formData.SalaryMax)}
              onChange={handleChange}
              className="w-full px-3 py-2 border rounded-md"
              placeholder="Max (e.g., 160,000)"
            />
          </div>

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
        <label htmlFor="totalCompensation" className="block text-sm font-medium mb-1">
          Total Compensation Details
        </label>
        <textarea
          id="totalCompensation"
          name="TotalCompensation"
          rows={3}
          value={formData.TotalCompensation}
          onChange={handleChange}
          className="w-full px-3 py-2 border rounded-md"
          placeholder="Include details about bonus, equity, stock options, incentives, etc."
        />
      </div>

      <div>
        <label htmlFor="jobDescription" className="block text-sm font-medium mb-1">
          Job Description
        </label>
        <div className="border rounded-md">
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
            ref={descriptionEditorRef}
            id="jobDescription"
            className="w-full min-h-[8rem] max-h-[20rem] overflow-y-auto px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            contentEditable
            suppressContentEditableWarning
          />
        </div>
        <p className="mt-1 text-xs text-muted-foreground">Use the toolbar to format text or paste formatted content.</p>
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

      {/* Payload preview toggle */}
      <div className="flex items-center justify-between">
        <label className="inline-flex items-center gap-2 text-sm">
          <input
            type="checkbox"
            checked={showPayloadPreview}
            onChange={(e) => setShowPayloadPreview(e.target.checked)}
          />
          Show payload preview
        </label>
      </div>

      {showPayloadPreview && (
        <div className="mt-2 border rounded-md p-3 bg-gray-50 overflow-auto max-h-[16rem]">
          <pre className="text-xs">
            {(() => {
              const salaryRangeComputed = (formData.SalaryMid && formData.SalaryMax)
                ? `${formData.SalaryMid}-${formData.SalaryMax}`
                : "";
              const descriptionHTML = descriptionEditorRef.current?.innerHTML || "";
              const preview = {
                ...formData,
                Description: descriptionHTML,
                SalaryRange: salaryRangeComputed,
                Session: session,
              };
              return JSON.stringify(preview, null, 2);
            })()}
          </pre>
        </div>
      )}

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
