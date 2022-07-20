import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

export const PrivateRoutes = () => {
  const isAuth = useSelector((state) => state.user.auth.isLogin);

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};
