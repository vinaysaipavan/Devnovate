import React, { useState, type ReactNode } from "react";
import { Menu, X } from "lucide-react";
import { FaGithub, FaLinkedin, FaTwitter } from "react-icons/fa";
import { Link,useLocation} from "react-router-dom";  // ✅ make sure you're using `react-router-dom` if using v6
import Sidebar from "./SideBar";
import { Outlet } from "react-router-dom";
import NavLinks from "./NavLinks";



const Layout: React.FC = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const location = useLocation();

  // ✅ Check if current route is user profile
  const isUserProfile = location.pathname === "/profile" || location.pathname == "/upload" || location.pathname == "/my-videos" || location.pathname == "/update-video" || location.pathname == "/dashboard"; // <-- adjust if needed

  return (
    <div className="min-h-screen bg-bgTwo flex flex-col relative">
      {/* Navbar */}
      <nav className="flex items-center justify-between bg-bgFive p-4 text-white fixed top-0 w-full z-50 border-b border-black">
        {isUserProfile && (
          <button className="lg:hidden" onClick={() => setShowSidebar(!showSidebar)}>
            <Menu size={28} />
          </button>
        )}

        {/* Navigation links (only visible on md and lg) */}
        {/* <div className="hidden md:flex gap-4 capitalize text-sm ms-auto">
          <Link to="/">Home</Link>
          <Link to="/all-videos">All Videos</Link>
          <Link to="/sign-in">SignIn</Link>
          <Link to="/sign-up">SignUp</Link>
        </div> */}

        <NavLinks />

        {/* Brand title only on small screens */}
        <div className="block md:hidden text-lg font-semibold ms-auto">
          My Video Hub
        </div>
      </nav>

      <div className="mt-16" />

      <div className="flex w-full">
        {/* ✅ Conditionally show sidebar only on /user-profile */}
        {isUserProfile && (
          <>
            {/* Sidebar overlay (sm/md only) */}
            <div
              className={`fixed top-16 left-0 h-[calc(100%-4rem)] w-64 bg-white shadow-md z-50 transform transition-transform duration-300 lg:hidden ${
                showSidebar ? "translate-x-0" : "-translate-x-full"
              }`}
            >
              <div className="flex justify-end p-4">
                <button onClick={() => setShowSidebar(false)}>
                  <X size={24} />
                </button>
              </div>
              <Sidebar />
            </div>

            {/* Sidebar always visible on lg */}
            <div className="hidden lg:block lg:w-64">
              <Sidebar />
            </div>
          </>
        )}

        <div className="flex-grow  min-h-screen p-2"><Outlet /></div>
      </div>

      {/* Footer */}
      <footer className="bg-bgFive text-white py-6 mt-10">
        <div className="container mx-auto px-4 flex flex-col items-center gap-4 sm:flex-row sm:justify-between">
          <div className="flex gap-6">
            <a href="#" className="hover:text-gray-400 text-2xl" target="_blank" rel="noreferrer">
              <FaGithub />
            </a>
            <a href="#" className="hover:text-blue-400 text-2xl" target="_blank" rel="noreferrer">
              <FaLinkedin />
            </a>
            <a href="#" className="hover:text-sky-400 text-2xl" target="_blank" rel="noreferrer">
              <FaTwitter />
            </a>
          </div>

          <div className="text-center sm:text-right text-sm leading-6">
            <p>Share and Enjoy</p>
            <p>&copy; 2025 AbdulRahman. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Layout;



