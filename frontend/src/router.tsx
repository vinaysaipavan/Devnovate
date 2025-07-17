import { createBrowserRouter } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import UserProfile from "./pages/user/UserProfile";
import { ProtectedRoute, ProtectedRouteHome } from "./components/ProtectedRoute";
import ResetPasswordEmail from "./pages/auth/ResetPasswordEmail";
import UpdatePassword from "./pages/auth/UpdatePassword";
import Upload from "./pages/upload/Upload"
import Layout from "./components/Layout"
import AllVideos from "./pages/AllVideos";
import Home from "./pages/Home";
import SingleVideoPage from "./pages/SingleVideoPage";
import MyVideos from "./pages/MyVideos";
import Dashboard from "./pages/user/Dashboard";

export const router = createBrowserRouter([
    {
      path: '/',
      element: <Layout/>, // ✅ layout wraps nested routes
      errorElement: <div className="p-8 text-red-500">Something went wrong. Please try again later.</div>,
      children: [
        { path : '', element : <Home /> },
        { path : 'my-videos', element : <ProtectedRouteHome element={<MyVideos />} /> },
        { path : 'update-video', element : <ProtectedRouteHome element={<Upload />} /> }, // Assuming Upload component handles both upload and update
        { path : 'video/:id', element : <SingleVideoPage />},
        { path : 'dashboard', element : <ProtectedRouteHome element={<Dashboard />} />},
        { path: 'sign-in', element: <Signin /> },
        { path: 'sign-up', element: <ProtectedRoute element={<Signup />} /> },
        { path: 'reset-password', element: <ResetPasswordEmail /> },
        { path: 'reset-password/:token', element: <UpdatePassword /> },
        { path: "all-videos" , element : <AllVideos/>},
        { path: 'profile', element: <ProtectedRouteHome element={<UserProfile />} /> },
        { path: 'upload', element: <ProtectedRouteHome element={<Upload />} /> },
      ]
    }
  ]);