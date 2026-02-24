import { useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Outlet,
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
import { useAuthStore } from "./stores/useAuthStore";

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
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
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<TenantIndex />} />
            <Route path="/real-estate-page" element={<RealEstatePage />} />
            <Route
              path="/detail-real-estate-page"
              element={<DetailRealEstatePage />}
            />
            <Route path="/about-us-page" element={<AboutUsPage />} />
            <Route path="/feature-page" element={<FeaturePage />} />
            <Route
              path="/dashboard-tenant-page"
              element={<DashboardTenantPage />}
            />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
