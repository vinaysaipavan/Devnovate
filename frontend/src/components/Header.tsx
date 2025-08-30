import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";

const Header: React.FC = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation(); // <-- get current path

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userRole = localStorage.getItem('role');
      if (userRole === 'admin') setIsAdmin(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    setIsLoggedIn(false);
    setIsAdmin(false);
    navigate('/');
  };

  // Helper function to apply active styles
  const getLinkClass = (path: string) =>
    location.pathname === path
      ? "text-indigo-600 font-semibold" // active link style
      : "text-gray-600 hover:text-indigo-600 font-medium"; // default

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          Devnovate Blog
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className={getLinkClass("/")}>Home</Link>
          <Link to="/blogs" className={getLinkClass("/blogs")}>All Blogs</Link>
          <Link to="/about" className={getLinkClass("/about")}>About</Link>
          <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>

          {isLoggedIn ? (
            <>
              <Link to="/my-blogs" className={getLinkClass("/my-blogs")}>My Blogs</Link>
              <Link to="/create-blog" className={getLinkClass("/create-blog")}>Write</Link>
              {isAdmin && <Link to="/admin" className={getLinkClass("/admin")}>Admin</Link>}
              <Link to="/profile" className={getLinkClass("/profile")}>Profile</Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600 font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className={getLinkClass("/sign-in")}>Login</Link>
              <Link to="/sign-up" className={getLinkClass("/sign-up")}>Register</Link>
            </>
          )}
        </nav>

        {/* Mobile menu button */}
        <button 
          className="md:hidden text-gray-600 focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            {isMenuOpen ? (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            ) : (
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            )}
          </svg>
        </button>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <div className="md:hidden bg-white py-4 px-4 border-t">
          <div className="flex flex-col space-y-3">
            <Link to="/" className={getLinkClass("/")}>Home</Link>
            <Link to="/blogs" className={getLinkClass("/blogs")}>All Blogs</Link>
            <Link to="/about" className={getLinkClass("/about")}>About</Link>
            <Link to="/contact" className={getLinkClass("/contact")}>Contact</Link>

            {isLoggedIn ? (
              <>
                <Link to="/my-blogs" className={getLinkClass("/my-blogs")}>My Blogs</Link>
                <Link to="/create-blog" className={getLinkClass("/create-blog")}>Write</Link>
                {isAdmin && <Link to="/admin" className={getLinkClass("/admin")}>Admin</Link>}
                <Link to="/profile" className={getLinkClass("/profile")}>Profile</Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600 font-medium text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className={getLinkClass("/sign-in")}>Login</Link>
                <Link to="/sign-up" className={getLinkClass("/sign-up")}>Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;














