import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";
import Simulation from "../pages/Simulation";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import NotFound from "../pages/NotFound";
import NewSimulation from "../pages/NewSimulation";

function AppNavigation() {
  return (
    <BrowserRouter>
      <MainLayout>
        <Routes>
          <Route path="/" element={<Navigate to="/Login" />} />
          <Route path="/*" element={<NotFound />} />
          <Route path="/Login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/Simulations" element={<Simulation />} />

            <Route path="/NewSimulation" element={<NewSimulation />} />
          </Route>
        </Routes>
      </MainLayout>
    </BrowserRouter>
  );
}

export default AppNavigation;
