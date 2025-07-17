import type { ReactElement, ReactNode } from "react";
import { Navigate } from "react-router-dom";


interface RouteProps{
    element : ReactElement
}

export const ProtectedRouteHome : React.FC<RouteProps>= ({element})=>{
  const token = localStorage.getItem("token");
  return token ? element : <Navigate to={"/sign-in"} replace/>
}
export const ProtectedRoute : React.FC<RouteProps>= ({element})=>{
  const token = localStorage.getItem("token");
  return token ? <Navigate to={"/profile"} replace/> : element
}