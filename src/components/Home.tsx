import { useState } from "react";
import ApplicationForm from "./ApplicationForm";
import ApplicationList from "./ApplicationList";
import { Application } from "../types";
import { useApplicationContext } from "../hooks/useApplicationContext";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { applications, updateApplication } = useApplicationContext();

  const handleAddApplication = (id: string, newApplication: Application) => {
    updateApplication(id, newApplication);
    closeModal();
  };

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="bg-gray-100 p-2">
      <div className="min-h-screen  flex flex-col items-start max-w-[1216px] 2xl:mt-5 mx-auto justify-start ">
        <div className="flex items-center justify-between w-full gap-3">
          <h1 className="md:text-3xl font-bold">Application Tracker</h1>

          <button
            className="bg-green-500 text-white py-2 px-4 rounded-full  hover:bg-green-600 
            flex items-center justify-center text-[1.1rem]
            focus:outline-none focus:ring focus:border-blue-300"
            onClick={openModal}
          >
            +
          </button>
        </div>
        <div className="h-[1px] w-full bg-black mt-2"></div>

        {isModalOpen && (
          <div className="fixed inset-0 z-10 bg-black bg-opacity-50 flex items-center justify-center">
            <div className="bg-white p-4 rounded-lg shadow-lg w-96">
              <ApplicationForm
                onAddApplication={handleAddApplication}
                closeModal={closeModal}
              />
            </div>
          </div>
        )}

        <ApplicationList applications={applications} />
      </div>
    </div>
  );
};

export default Home;
