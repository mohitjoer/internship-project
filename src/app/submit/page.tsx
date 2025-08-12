"use client";

import BackButton from "@/components/backbutton";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { useState } from "react";

export default function SubmitComplaintPage() {
  const [formData, setFormData] = useState({  // default state for the form data
    title: "",
    description: "",
    category: "Product",
    priority: "Low",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);  //alert for the form
  const [alertState, setAlertState] = useState<{
    type: "success" | "error" | "";
    message: string;
  }>({ type: "", message: "" });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {  // this function handles the form submission
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/complaints", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setAlertState({ type: "success", message: "Complaint submitted successfully!" });
        setFormData({ title: "", description: "", category: "Product", priority: "Low" });
      } else {
        setAlertState({ type: "error", message: "Failed to submit complaint. Please try again." });
      }
    } catch {
      setAlertState({ type: "error", message: "Something went wrong. Please try again." });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-200 p-5">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-lg shadow-sm p-6">
          <div className="flex flex-row items-center mb-7 p-3 gap-2  border-neutral-400 border-b-2">
            <BackButton />
            <div className="flex-1 flex justify-center items-center">
              <h1 className="text-3xl font-semibold text-gray-900 mb-2">Submit a Complaint</h1>
            </div>
          </div>
          {/* Shows alert comes returns Success or Error */}
          {alertState.type && (
            <Alert
              className={`mb-6 ${
                alertState.type === "success"
                  ? "bg-green-100 border-green-400 text-green-800"
                  : "bg-red-100 border-red-400 text-red-800"
              }`}
            >
              <AlertTitle>
                {alertState.type === "success" ? "Success!" : "Error"}
              </AlertTitle>
              <AlertDescription>{alertState.message}</AlertDescription>
            </Alert>
          )}


          <form onSubmit={handleSubmit} className="space-y-6">
            {/* this is title input */}
            <div>
              <label
                htmlFor="title"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What&apos;s the main issue?
              </label>
              <Input
                id="title"
                type="text"
                name="title"
                value={formData.title}
                className="focus:ring-blue-500 focus:border-0 border-gray-300"
                onChange={handleChange}
                placeholder="Brief description of the issue..."
                required
              />
            </div>

            {/* this is  description input */}
            <div>
              <label
                htmlFor="description"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Tell us more about what happened
              </label>
              <textarea
                id="description"
                name="description"
                rows={5}
                value={formData.description}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
                placeholder="Please provide details about the issue you experienced..."
                required
              ></textarea>
            </div>

            {/* this is category input*/}
            <div>
              <label
                htmlFor="category"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                What type of issue is this?
              </label>
              <select
                id="category"
                name="category"
                value={formData.category}
                onChange={handleChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
                <option value="Product">Product Issue</option>
                <option value="Service">Service Problem</option>
                <option value="Support">Support Experience</option>
              </select>
            </div>

            {/* this is priority input */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-3">
                How urgent is this issue?
              </label>
              <div className="flex gap-6">
                {[
                  { value: "Low", color: "text-green-600" },
                  { value: "Medium", color: "text-yellow-600" },
                  { value: "High", color: "text-red-600" },
                ].map((option) => (
                  <label
                    key={option.value}
                    className="flex items-center cursor-pointer"
                  >
                    <input
                      type="radio"
                      name="priority"
                      value={option.value}
                      checked={formData.priority === option.value}
                      onChange={handleChange}
                      className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                    />
                    <span className={`ml-2 text-sm ${option.color}`}>
                      {option.value}
                    </span>
                  </label>
                ))}
              </div>
            </div>
            <div className="pt-4">   {/* this is Submit button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
              >
                {isSubmitting ? "Submitting..." : "Submit Complaint"} {/* this workes as a animated text on button while submitting  */}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
