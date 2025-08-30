import { Link } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { selectLoggedInUser} from '../reducers/auth/authReducer'; // assuming logoutUser action exists

import type { AppDispatch } from '../reducers/store';
import { logOutUser } from '../reducers/auth/authReducer';
import { useNavigate } from 'react-router-dom';

const NavLinks = () => {
  const user = useSelector(selectLoggedInUser);
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()
  
  

  return (
    <div className="hidden md:flex gap-4 capitalize text-sm ms-auto">
      <Link to="/">Home</Link>
      <Link to="/all-videos">All Videos</Link>

      {!user ? (
        <>
          <Link to="/sign-in">SignIn</Link>
          <Link to="/sign-up">SignUp</Link>
        </>
      ) : (
        <>
          <Link to="/profile">Profile</Link>
          <button
            onClick={() => dispatch(logOutUser(navigate))}
            className="text-red-500 hover:underline"
          >
            Logout
          </button>
        </>
      )}
    </div>
  );
};

export default NavLinks;
