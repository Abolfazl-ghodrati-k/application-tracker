// ApplicationContext.tsx

import React, { createContext, ReactNode } from "react";
import { Application } from "../types";
import useLocalStorage from "../hooks/useLocalStorage";

interface ApplicationContextProps {
  children: ReactNode;
}

interface ApplicationContextValue {
  applications: Application[];
  addApplication: (newApplication: Application) => void;
  updateApplication: (
    id: string,
    status: string
  ) => void;
  deleteApplication: (id: string) => void;
  addNoteToApplication: (id: string, note: string) => void;
}

export const ApplicationContext = createContext<
  ApplicationContextValue | undefined
>(undefined);

export const ApplicationContextProvider: React.FC<ApplicationContextProps> = ({
  children,
}) => {
  const [applications, setApplications] = useLocalStorage<Application[]>(
    "applications",
    []
  );

  const addApplication = (newApplication: Application) => {
    setApplications((prevApplications) => [
      ...prevApplications,
      newApplication,
    ]);
  };

  const updateApplication = (id: string, status: string) => {
    setApplications((prevApps) =>
      prevApps.map((application) => {
        if (application.id === id) {
          return { ...application, status };
        }
        return application;
      })
    );
  };

  const addNoteToApplication = (id: string, note: string) => {
    setApplications((prevApplications) =>
      prevApplications.map((application) => {
        if (application.id === id) {
          application.note = note;
        }
        return application;
      })
    );
  };

  const deleteApplication = (id: string) => {
    setApplications((prevApplications) =>
      prevApplications.filter((application) => application.id !== id)
    );
  };

  const contextValue: ApplicationContextValue = {
    applications,
    addApplication,
    updateApplication,
    deleteApplication,
    addNoteToApplication,
  };

  return (
    <ApplicationContext.Provider value={contextValue}>
      {children}
    </ApplicationContext.Provider>
  );
};

// eslint-disable-next-line react-refresh/only-export-components
