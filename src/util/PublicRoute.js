import { useSelector } from "react-redux";
import { Navigate, Outlet } from "react-router-dom";

export const PublicRoutes = () => {
  const { isLogin } = useSelector((state) => state.user);
  return !isLogin ? <Outlet /> : <Navigate to="/posts" />;
};
