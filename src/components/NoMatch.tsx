import { Link } from "react-router-dom";

const NoMatch = () => {
  return (
    <div className="flex flex-col items-center justify-center w-full min-h-screen bg-white">
      NoMatch bro
      <Link to="/" className="text-[purple] ">Go back to Home</Link>
    </div>
  );
};

export default NoMatch;
