import { useCallback, useEffect, useRef, useState } from "react";
import ApplicationForm from "./ApplicationForm";
import ApplicationList from "./ApplicationList";
import { Application } from "../types";
import { useApplicationContext } from "../hooks/useApplicationContext";
import { supabase } from "../supabaseClient";
import { toast } from "react-toastify";
import Profile from "./Profile";
import withAuthentication from "../hoc/withAuth";

const Home = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { applications, updateApplication } = useApplicationContext();
  const [loading, setLoading] = useState(false);
  const isInitialRender = useRef(true);

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

  const syncApplications = useCallback(async () => {
    const user = JSON.parse(localStorage.getItem("user")!);

    if (user.id) {
      setLoading(true);
      const { error, status } = await supabase
        .from("Applications")
        .update({ applications: JSON.stringify(applications) })
        .eq("user_id", user.id);
      setLoading(false);
      if (!error && status === 204) {
        toast.success("Updated Successfully! :(");
      }
    }
  }, [applications]);

  useEffect(() => {
    if (isInitialRender.current) {
      // Skip syncApplications on the first render
      isInitialRender.current = false;
      return;
    } else {
      syncApplications();
    }
  }, [applications, syncApplications]);

  return (
    <div className="relative">
      <div className="bg-gray-100 p-2">
        {loading && (
          <div className="w-full h-full absolute top-0 right-0 left-0 bottom-0 z-10 bg-[rgba(195,195,195,0.8)] flex items-center justify-center">
            <p className="bg-white p-2 rounded">
              Saving Applications to data base ...
            </p>
          </div>
        )}
        <div className="min-h-screen  flex flex-col items-start max-w-[1216px] 2xl:mt-5 mx-auto justify-start ">
          <div className="flex items-center justify-between w-full gap-3">
            <h1 className="md:text-3xl font-bold">Application Tracker</h1>

            <div className="flex items-center justify-end gap-1">
              <button
                className="bg-green-500 text-white py-2 px-4 rounded-full hover:bg-green-600 
            flex items-center justify-center text-[1.1rem]
            focus:outline-none focus:ring focus:border-blue-300"
                onClick={openModal}
              >
                +
              </button>
              <Profile />
            </div>
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
    </div>
  );
};

export default withAuthentication(Home);
