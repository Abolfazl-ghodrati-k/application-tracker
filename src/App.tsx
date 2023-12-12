import React, { useEffect, useState } from 'react';
import ApplicationForm from './components/ApplicationForm';
import ApplicationList from './components/ApplicationList';
import { Application } from './types';
import useLocalStorage from './hooks/useLocalStorage';

const App: React.FC = () => {
  const [applications, setApplications] = useLocalStorage<Application[]>('applications', []);
  const [isModalOpen, setIsModalOpen] = useState(false)

  const handleAddApplication = (newApplication: Application) => {
    setApplications([...applications, newApplication]);
    closeModal();
  };

  const handleAddNote = (index: number) => {
    const updatedApplications = [...applications];
    const note = prompt('Enter a note for the application:');
    if (note !== null) {
      updatedApplications[index].notes = note;
      setApplications(updatedApplications);
    }
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  useEffect(() => {
    console.log('applications: ', applications);
  }, [applications]);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <h1 className="text-3xl font-bold mb-4">Application Tracker</h1>

      <button
        className="bg-green-500 text-white py-2 px-4 rounded-full mb-4 hover:bg-green-600 focus:outline-none focus:ring focus:border-blue-300"
        onClick={openModal}
      >
        Add Application
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-4 rounded-lg shadow-lg w-96">
            <button
              className="absolute top-2 right-2 text-gray-500 hover:text-gray-700"
              onClick={closeModal}
            >
              X
            </button>
            <ApplicationForm onAddApplication={handleAddApplication} />
          </div>
        </div>
      )}

      <ApplicationList applications={applications} onAddNote={handleAddNote} />
    </div>
  );
};

export default App;
