// components/Header.jsx
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setIsLoggedIn(true);
      const userRole = localStorage.getItem('role');
      if (userRole === 'admin') {
        setIsAdmin(true);
      }
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

  return (
    <header className="bg-white shadow-md sticky top-0 z-50">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-indigo-600">Devnovate Blog</Link>
        
        {/* Desktop Navigation */}
        <nav className="hidden md:flex space-x-6">
          <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
          <Link to="/blogs" className="text-gray-600 hover:text-indigo-600 font-medium">All Blogs</Link>
          <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium">About</Link>
          <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium">Contact</Link>
          
          {isLoggedIn ? (
            <>
              <Link to="/my-blogs" className="text-gray-600 hover:text-indigo-600 font-medium">My Blogs</Link>
              <Link to="/create-blog" className="text-gray-600 hover:text-indigo-600 font-medium">Write</Link>
              {isAdmin && <Link to="/admin" className="text-gray-600 hover:text-indigo-600 font-medium">Admin</Link>}
              <Link to="/profile" className="text-gray-600 hover:text-indigo-600 font-medium">Profile</Link>
              <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600 font-medium">Logout</button>
            </>
          ) : (
            <>
              <Link to="/sign-in" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
              <Link to="/sign-up" className="text-gray-600 hover:text-indigo-600 font-medium">Register</Link>
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
            <Link to="/" className="text-gray-600 hover:text-indigo-600 font-medium">Home</Link>
            <Link to="/blogs" className="text-gray-600 hover:text-indigo-600 font-medium">All Blogs</Link>
            <Link to="/about" className="text-gray-600 hover:text-indigo-600 font-medium">About</Link>
            <Link to="/contact" className="text-gray-600 hover:text-indigo-600 font-medium">Contact</Link>
            
            {isLoggedIn ? (
              <>
                <Link to="/my-blogs" className="text-gray-600 hover:text-indigo-600 font-medium">My Blogs</Link>
                <Link to="/create-blog" className="text-gray-600 hover:text-indigo-600 font-medium">Write</Link>
                {isAdmin && <Link to="/admin" className="text-gray-600 hover:text-indigo-600 font-medium">Admin</Link>}
                <Link to="/profile" className="text-gray-600 hover:text-indigo-600 font-medium">Profile</Link>
                <button onClick={handleLogout} className="text-gray-600 hover:text-indigo-600 font-medium text-left">Logout</button>
              </>
            ) : (
              <>
                <Link to="/sign-in" className="text-gray-600 hover:text-indigo-600 font-medium">Login</Link>
                <Link to="/sign-up" className="text-gray-600 hover:text-indigo-600 font-medium">Register</Link>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

export default Header;