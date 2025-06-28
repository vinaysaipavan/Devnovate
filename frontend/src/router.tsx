import { createBrowserRouter } from "react-router";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import UserProfile from "./pages/user/UserProfile";
import { ProtectedRoute, ProtectedRouteHome } from "./components/ProtectedRoute";
import ResetPasswordEmail from "./pages/auth/ResetPasswordEmail";

export const router = createBrowserRouter([
    {path:"/sign-up",element : <ProtectedRoute element={<Signup/>}></ProtectedRoute>},
    {path:"/sign-in",element : <ProtectedRoute element={<Signin/>}></ProtectedRoute>},
    {path : "/profile", element : <ProtectedRouteHome element={<UserProfile/>}></ProtectedRouteHome>},
    {path:"/reset-password",element : <ProtectedRoute element={<ResetPasswordEmail/>}></ProtectedRoute>},
])