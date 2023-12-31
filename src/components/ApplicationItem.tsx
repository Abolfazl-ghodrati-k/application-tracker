import { Link } from "react-router-dom";
import { Application } from "../types";
import { statuses } from "../constants";
import { useApplicationContext } from "../hooks/useApplicationContext";

interface ApplicationItemProps {
  application: Application;
}

const ApplicationItem = ({
  application,
}: ApplicationItemProps) => {
  const { company, description, note, salary, status, website, id } =
    application;
  const { updateApplication, deleteApplication } = useApplicationContext();

  return (
    <Link
      to={`/applications/${id}`}
      className="mb-4 p-4 bg-[#dbdbdb] border border-[#d4d4d4] hover:shadow-lg cursor-pointer 
      transition-all duration-400 w-[360px] max-w-2xl rounded-md shadow-sm relative"
    >
      <div
        onClick={(e) => {
          e.stopPropagation();
          e.preventDefault();
          deleteApplication(id);
        }}
        className="delete absolute top-4 right-4 text-[.9rem] text-[#ffa3a3] hover:text-red-600"
      >
        delete
      </div>

      <h3 className="text-xl font-bold mb-2">{company}</h3>
      <p className="text-[1.2rem]">Salary:</p>
      <div className="max-w-full truncate pl-2 text-[.95rem] text-[gray]">
        {salary ? salary : "Those Mother fuckerssss"}
      </div>
      {website && (
        <>
          <p className="text-[1.2rem]">Link to Job opt:</p>
          <div
            className="max-w-full block truncate pl-2 text-[.95rem] text-[blue] hover:font-semibold transition-all"
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              const link = website.startsWith("http")
                ? website
                : "https://" + website;
              window.open(link, "_blank");
            }}
          >
            {website}
          </div>
        </>
      )}
      {description && (
        <>
          <p className="text-[1.2rem]">Description:</p>
          <div className="max-w-full truncate pl-2 text-[.95rem] text-[gray]">
            {description ?? "Not Defined"}
          </div>
        </>
      )}
      <p className="text-[1.2rem]">Status:</p>
      {/* Status Buttons */}
      <div className="flex items-center space-x-2">
        {statuses.map((statusOption) => (
          <button
            key={statusOption}
            className={`text-[.95rem] p-2  rounded-md hover:bg-[#626262] transition-all duration-300 ${
              statusOption === "all" ? "hidden" : ""
            } ${
              status === statusOption
                ? `text-${
                    statusOption === "offered" ? "green" : "blue"
                  }-700 font-bold bg-[white]`
                : "text-gray-700"
            }`}
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              updateApplication(id, { ...application, status: statusOption });
            }}
          >
            {statusOption}
          </button>
        ))}
      </div>
      {note && (
        <>
          <p className="text-[1.2rem] mb-2">Note:</p>
          <div className="max-w-full truncate pl-2 text-[.95rem] text-[gray]">
            {note ?? "Not Defined"}
          </div>
        </>
      )}
      {/* No Note */}
      <button
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          const newNote = prompt("Enter a note for this Application: ");
          if (newNote) {
            updateApplication(id, { ...application, note: newNote });
          }
        }}
        className="bg-green-500 text-white py-1 px-4 rounded-r-full hover:bg-green-600 
        focus:outline-none focus:ring focus:border-blue-300 mt-3"
      >
        {note ? "Edit" : "Add"} Note
      </button>
    </Link>
  );
};

export default ApplicationItem;
