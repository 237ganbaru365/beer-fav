import { Navigate, Outlet } from "react-router-dom";

export const PrivateRoutes = ({ user }) => {
  return user ? <Outlet /> : <Navigate to="/login" />;
};
