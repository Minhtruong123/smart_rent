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

const MainLayout = () => (
  <>
    <Header />
    <Outlet />
    <Footer />
  </>
);

function App() {
  return (
    <>
      <Toaster position="top-right" richColors /> 
      <Router>
        <Routes>
          <Route path="/login" element={<Auth />} />
          <Route element={<MainLayout />}>
            <Route path="/" element={<TenantIndex />} />
          </Route>
        </Routes>
      </Router>
    </>
  );
}

export default App;
