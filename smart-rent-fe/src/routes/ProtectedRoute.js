import { useAuthStore } from "../stores/useAuthStore";
import { useEffect, useState } from "react";
import { Navigate, Outlet } from "react-router-dom";

export default function ProtectedRoute() {
  const { accessToken, refresh, loading } = useAuthStore();
  const [init, setInit] = useState(true);

  useEffect(() => {
    const boot = async () => {
      if (!accessToken) {
        await refresh();
      }
      setInit(false);
    };
    boot();
  }, []);

  if (init || loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        Đang kiểm tra đăng nhập...
      </div>
    );
  }

  if (!accessToken) {
    return <Navigate to="/login" replace />;
  }

  return <Outlet />;
}
