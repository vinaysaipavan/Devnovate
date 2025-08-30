// router.tsx
//import React from "react";
import { createBrowserRouter, type RouteObject } from "react-router-dom";
import Signup from "./pages/auth/Signup";
import Signin from "./pages/auth/Signin";
import UserProfile from "./pages/user/UserProfile";
import { ProtectedRoute, AdminProtectedRoute } from "./components/ProtectedRoute";
import ResetPasswordEmail from "./pages/auth/ResetPasswordEmail";
import UpdatePassword from "./pages/auth/UpdatePassword";
import CreateBlog from "./pages/blog/CreateBlog";
import Layout from "./components/Layout";
import AllBlogs from "./pages/blog/AllBlogs";
import Home from "./pages/Home";
import SingleBlogPage from "./pages/blog/SingleBlogPage";
import MyBlogs from "./pages/user/MyBlogs";
import Dashboard from "./pages/admin/Dashboard";
import AdminBlogManagement from "./pages/admin/AdminBlogManagement";
import EditBlog from "./pages/blog/EditBlog";
import CategoryBlogs from "./pages/blog/CategoryBlogs";
import About from "./pages/About";
import Contact from "./pages/Contact";
import BlogInterests from "./pages/BlogInterests";

// Define routes with type safety
const routes: RouteObject[] = [
  {
    path: "/",
    element: <Layout />,
    errorElement: (
      <div className="p-8 text-red-500">
        Something went wrong. Please try again later.
      </div>
    ),
    children: [
      { path: "", element: <Home /> },
      { path: "about", element: <About /> },
      { path: "contact", element: <Contact /> },
      { path: "blogs", element: <AllBlogs /> },
      { path: "blogs/category/:category", element: <CategoryBlogs /> },
      { path: "blog/:id", element: <SingleBlogPage /> },
      { path: "sign-in", element: <Signin /> },
      { path: "sign-up", element: <Signup /> },
      { path: "reset-password", element: <ResetPasswordEmail /> },
      { path: "reset-password/:token", element: <UpdatePassword /> },

      // Protected user routes
      { path: "my-blogs", element: <ProtectedRoute element={<MyBlogs />} /> },
      { path: "create-blog", element: <ProtectedRoute element={<CreateBlog />} /> },
      { path: "edit-blog/:id", element: <ProtectedRoute element={<EditBlog />} /> },
      { path: "profile", element: <ProtectedRoute element={<UserProfile />} /> },

      // Admin routes
      { path: "admin", element: <AdminProtectedRoute element={<Dashboard />} /> },
      { path: "admin/blogs", element: <AdminProtectedRoute element={<AdminBlogManagement />} /> },
    ],
  },
];

export const router = createBrowserRouter(routes);
