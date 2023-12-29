import React, { useState } from "react";
import { Application } from "../types";
import uuidv4 from "uuidv4";

interface ApplicationFormProps {
  onAddApplication: (id: string, application: Application) => void;
  closeModal: () => void;
  initialData?: Application; // Added for editing
}

const ApplicationForm: React.FC<ApplicationFormProps> = ({
  onAddApplication,
  closeModal,
  initialData = null, // Added for editing
}) => {
  const [company, setCompany] = useState(initialData?.company || "");
  const [salary, setSalary] = useState(initialData?.salary || "");
  const [website, setWebsite] = useState(initialData?.website || "");
  const [description, setDescription] = useState(
    initialData?.description || ""
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    const newApplication: Application = {
      company,
      salary,
      website,
      description,
      status: "applied",
      note: "",
      created_at: new Date().toISOString(),
      id: initialData?.id || uuidv4(), // Use existing ID for editing or generate a new one
    };

    onAddApplication(newApplication.id, newApplication);

    setCompany("");
    setSalary("");
    setWebsite("");
    setDescription("");
  };

  return (
    <form onSubmit={handleSubmit}>
      {!initialData?.id && (
        <button
          className="text-gray-500 hover:text-gray-700 ml-auto mb-2"
          onClick={closeModal}
        >
          x
        </button>
      )}

      <label className="block mb-2">
        Company:
        <input
          type="text"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </label>
      <label className="block mb-2">
        Desired Salary:
        <input
          type="text"
          value={salary}
          onChange={(e) => setSalary(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </label>
      <label className="block mb-2">
        Website:
        <input
          type="text"
          value={website}
          onChange={(e) => setWebsite(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </label>
      <label className="block mb-2">
        Job Description:
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border rounded-md p-2"
        />
      </label>
      <button
        type="submit"
        className="bg-blue-500 text-white py-2 px-4 rounded-full hover:bg-blue-600 focus:outline-none focus:ring focus:border-blue-300"
      >
        {initialData ? "Update Application" : "Add Application"}
      </button>
    </form>
  );
};

export default ApplicationForm;
