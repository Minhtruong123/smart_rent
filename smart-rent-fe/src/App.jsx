import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
  Navigate,
} from "react-router-dom";
import { Toaster } from "sonner";
import Header from "./components/tenant/Header/Header";
import Footer from "./components/tenant/Footer/Footer";
import TenantIndex from "./components/tenant/TenantIndex/TenantIndex";
import Auth from "./components/auth/Auth";
import RealEstatePage from "./components/tenant/RealEstatePage/RealEstatePage";
import DetailRealEstatePage from "./components/tenant/DetailRealEstatePage/DetailRealEstatePage";
import AboutUsPage from "./components/tenant/AboutUsPage/AboutUsPage";
import FeaturePage from "./components/tenant/FeaturePage/FeaturePage";
import DashboardTenantPage from "./components/tenant/DashboardTenantPage/DashboardTenantPage";
import ScrollToTop from "./components/ScrollToTop";
import Sidebar from "./components/host/Sidebar/Sidebar";
import OwnerDashboard from "./components/host/OwnerDashboard/OwnerDashboard";
import RealEstateManagement from "./components/host/RealEstateManagement/RealEstateManagement";
import OwnerStatistical from "./components/host/OwnerStatistical/OwnerStatistical";
import OwnerCalendar from "./components/host/OwnerCalendar/OwnerCalendar";

import ProtectedRoute from "./routes/ProtectedRoute";
import { useAuthStore } from "./stores/useAuthStore";

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

const OwnerLayout = () => (
  <>
    <Sidebar />
    <Outlet />
  </>
);

function App() {
  const { fetchMe, accessToken } = useAuthStore();

  useEffect(() => {
    if (accessToken) {
      fetchMe();
    }
  }, [accessToken, fetchMe]);

  return (
    <>
      <Toaster position="top-right" richColors />
      <Router>
        <ScrollToTop />
        <Routes>
          <Route
            path="/login"
            element={!accessToken ? <Auth /> : <Navigate to="/" />}
          />

          <Route element={<MainLayout />}>
            <Route path="/" element={<TenantIndex />} />
            <Route path="/real-estate-page" element={<RealEstatePage />} />
            <Route
              path="/detail-real-estate-page/:id"
              element={<DetailRealEstatePage />}
            />
            <Route path="/about-us-page" element={<AboutUsPage />} />
            <Route path="/feature-page" element={<FeaturePage />} />
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["TENANT"]} />}>
            <Route element={<MainLayout />}>
              <Route
                path="/dashboard-tenant-page"
                element={<DashboardTenantPage />}
              />
            </Route>
          </Route>

          <Route element={<ProtectedRoute allowedRoles={["OWNER"]} />}>
            <Route element={<OwnerLayout />}>
              <Route path="/owner/dashboard" element={<OwnerDashboard />} />
              <Route
                path="/owner/real-estate"
                element={<RealEstateManagement />}
              />
              <Route path="/owner/statistical" element={<OwnerStatistical />} />
              <Route path="/owner/calendar" element={<OwnerCalendar />} />
            </Route>
          </Route>

          <Route
            path="*"
            element={
              <div className="p-20 text-center">404 - Trang không tồn tại</div>
            }
          />
        </Routes>
      </Router>
    </>
  );
}

export default App;
