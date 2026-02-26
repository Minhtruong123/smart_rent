import React, { useEffect, useState } from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuthStore } from "../stores/useAuthStore";

const ProtectedRoute = ({ allowedRoles }) => {
  const { accessToken, refresh, loading, user } = useAuthStore();
  const [init, setInit] = useState(true);
  const location = useLocation();

  useEffect(() => {
    const boot = async () => {
      try {
        if (!accessToken) {
          await refresh();
        }
      } catch (error) {
        console.error("Refresh failed:", error);
      } finally {
        setInit(false);
      }
    };
    boot();
  }, [accessToken, refresh]);

  if (init || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p>Đang kiểm tra đăng nhập...</p>
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
