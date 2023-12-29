import { useEffect, useRef, useState } from "react";
import { useUserContext } from "../hooks/useUserContext";
import { useNavigate } from "react-router-dom";
import { deleteAllStorage } from "../helpers";

const Profile = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { user } = useUserContext();
  const menuRef = useRef<HTMLDivElement>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Check if the click occurred outside the menu
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    // Add click event listener to the entire document
    document.addEventListener("click", handleClickOutside);

    // Clean up the event listener on component unmount
    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative" ref={menuRef}>
      <div
        onClick={() => {
          setIsMenuOpen(!isMenuOpen);
        }}
        className="flex items-center justify-center p-2 bg-white rounded-full px-4 cursor-pointer"
      >
        {user?.email?.slice(0, 1)}
      </div>
      <div
        className={`w-[200px] flex flex-col items-center justify-center gap-2 bg-white py-2 rounded-md menu ${
          isMenuOpen ? "active fade-in-slide" : ""
        }`}
        onClick={() => {
          setIsMenuOpen(false);
        }}
      >
        {/* Your menu content goes here */}
        <button
          onClick={() => {
            deleteAllStorage()
            navigate('/')
          }}
          className="hover:bg-[gray] hover:text-white transition-all duration-300 w-full py-1"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default Profile;
