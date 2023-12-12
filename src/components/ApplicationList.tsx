import React, { useState } from 'react';
import { Application } from '../types';

interface ApplicationListProps {
  applications: Application[];
  onAddNote: (index: number) => void;
}

const ApplicationList: React.FC<ApplicationListProps> = ({ applications, onAddNote }) => {
    const [activeTab, setActiveTab] = useState('applied'); // Default active tab
    const [searchTerm, setSearchTerm] = useState('');
  
    const handleTabClick = (status: string) => {
      setActiveTab(status);
    };
  
    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(e.target.value);
    };
  
    const filteredApplications = applications
      .filter((app) => app.status === activeTab)
      .filter((app) =>
        app.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
  
    const renderTabs = () => {
      const statuses = ['applied', 'interviewed', 'offered']; // Add more statuses as needed
  
      return (
        <div className="flex mb-4">
          {statuses.map((status) => (
            <button
              key={status}
              onClick={() => handleTabClick(status)}
              className={`py-2 px-4 my-2 mx-[2px] shadow-sm rounded-md ${
                activeTab === status
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-200 text-gray-700'
              } focus:outline-none focus:ring focus:border-blue-300`}
            >
              {status.charAt(0).toUpperCase() + status.slice(1)}
            </button>
          ))}
        </div>
      );
    };
  
    const renderApplications = () => {
      return (
        <ul>
          {filteredApplications.map((application, index) => (
            <li key={index} className="mb-4 p-4 border rounded-md">
              <h3 className="text-xl font-bold mb-2">{application.company}</h3>
              <p>Desired Salary: {application.salary}</p>
              <p>Website: {application.website}</p>
              <p>Description: {application.description}</p>
              <p>Status: {application.status}</p>
              <p>Notes: {application.notes}</p>
              <button
                onClick={() => onAddNote(index)}
                className="bg-green-500 text-white py-1 px-2 rounded-full hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
              >
                Add Note
              </button>
            </li>
          ))}
        </ul>
      );
    };
  
    return (
      <div>
        {renderTabs()}
        <div className="mb-4">
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