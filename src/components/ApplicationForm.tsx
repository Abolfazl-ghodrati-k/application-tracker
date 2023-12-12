import React, { useState } from 'react';
import { Application } from '../types';

interface ApplicationFormProps {
  onAddApplication: (application: Application) => void;
}


const ApplicationForm: React.FC<ApplicationFormProps> = ({ onAddApplication }) => {
    const [company, setCompany] = useState('');
    const [salary, setSalary] = useState('');
    const [website, setWebsite] = useState('');
    const [description, setDescription] = useState('');
  
    const handleSubmit = (e: React.FormEvent) => {
      e.preventDefault();
  
      const newApplication: Application = {
        company,
        salary,
        website,
        description,
        status: 'applied',
        notes: '',
      };
  
      onAddApplication(newApplication);
  
      setCompany('');
      setSalary('');
      setWebsite('');
      setDescription('');
    };
  
    return (
      <form onSubmit={handleSubmit}>
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
          Add Application
        </button>
      </form>
    );
  };
  
  export default ApplicationForm;