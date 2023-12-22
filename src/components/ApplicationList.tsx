import React, { useMemo, useState } from "react";
import { Application } from "../types";
import ApplicationItem from "./ApplicationItem";
import { statuses } from "../constants";
import { useApplicationContext } from "../hooks/useApplicationContext";

interface ApplicationListProps {
  applications: Application[];
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications }) => {
  const [activeTab, setActiveTab] = useState("all"); // Default active tab
  const [searchTerm, setSearchTerm] = useState("");
  const { deleteApplication, updateApplication, addNoteToApplication } =
    useApplicationContext();

  const filteredApplications = useMemo(
    () =>
      applications
        .filter((app) => (activeTab === "all" ? app : app.status === activeTab))
        .filter((app) =>
          app.company.toLowerCase().includes(searchTerm.toLowerCase())
        ),
    [activeTab, applications, searchTerm]
  );

  const onDeleteApplication = (id: string) => {
    deleteApplication(id);
  };

  const handleAddNote = (id: string) => {
    const note = prompt("Enter a note for the application: ");
    if (note !== null) {
      addNoteToApplication(id, note);
    }
  };

  const onChangeStatus = (id: string, status: string) => {
    updateApplication(id, status);
  };

  const handleTabClick = (status: string) => {
    setActiveTab(status);
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const renderTabs = () => {
    return (
      <div className="flex flex-col items-start sm:flex-row sm:items-center gap-1 mb-4">
        <span className="mr-2 mt-2 sm:mt-0">Filter by status: </span>
        <div className="flex items-center gap-1">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleTabClick(status)}
              className={`py-2 px-4 my-2 shadow-sm rounded-md ${
                activeTab === status
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-700"
              } focus:outline-none focus:ring focus:border-blue-300`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      </div>
    );
  };

  const renderApplications = () => {
    // const aspectRatio = 1 // width / height which is 1
    return (
      <div className="flex items-center justify-start gap-2 flex-wrap">
        {filteredApplications.map((application) => (
          <ApplicationItem
            key={application.id}
            onAddNote={handleAddNote}
            onDeleteApplication={onDeleteApplication}
            onChangeStatus={onChangeStatus}
            application={application}
          />
        ))}
      </div>
    );
  };

  return (
    <div className="w-full max-w-[1216px]">
      {renderTabs()}
      <div className="mb-4 max-w-[520px]">
        <input
          type="text"
          placeholder="Search by company name"
          value={searchTerm}
          onChange={handleSearch}
          className="w-full border p-2 rounded-md"
        />
      </div>
      {renderApplications()}
    </div>
  );
};

export default ApplicationList;
