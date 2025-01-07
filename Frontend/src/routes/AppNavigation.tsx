import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "../pages/Login";
import MainLayout from "../layouts/MainLayout";
import Simulation from "../pages/Simulation";
import PrivateRoute from "../components/PrivateRoute/PrivateRoute";
import NotFound from "../pages/NotFound";
import NewSimulation from "../pages/NewSimulation";

function AppNavigation() {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<MainLayout />}>
          <Route path="/" element={<Login />} />
          <Route path="/Login" element={<Login />} />

          <Route element={<PrivateRoute />}>
            <Route path="/Simulations" element={<Simulation />} />
            <Route path="/NewSimulation" element={<NewSimulation />} />
          </Route>
        </Route>

        <Route path="/*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppNavigation;
