import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = ({ user }) => {
  return !user ? <Outlet /> : <Navigate to="/posts" />;
};
