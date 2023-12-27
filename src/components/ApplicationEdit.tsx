import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Application } from "../types";
import { useNavigate } from "react-router-dom";
import ApplicationForm from "./ApplicationForm"; // Import the updated form
import { useApplicationContext } from "../hooks/useApplicationContext";

const ApplicationEdit = () => {
  const { id } = useParams();
  const { applications, updateApplication } = useApplicationContext();
  const [application, setApplication] = useState<Application | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const foundApplication = applications.find((app) => app.id === id);

    if (foundApplication) {
      setApplication(foundApplication);
    } else {
      navigate("/not-found");
    }
  }, [applications, id, navigate]);

  const handleEditApplication = (id: string, editedApplication: Application) => {
    updateApplication(id, editedApplication);
    navigate("/"); // Redirect to the home page after editing
  };

  const closeModal = () => {
    navigate("/");
  };

  return (
    <div className="p-2 flex flex-col gap-7">
      <h2>Edit Application: {id}</h2>
      {application && (
        <ApplicationForm
          onAddApplication={handleEditApplication}
          closeModal={closeModal}
          initialData={application}
        />
      )}
    </div>
  );
};

export default ApplicationEdit;
