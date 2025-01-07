import Footer from "../components/MainLayout/Footer";
import Header from "../components/MainLayout/Header";
import { Outlet } from "react-router-dom";

function MainLayout() {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-[70px] shadow-md">
        <Header />
      </header>

      <main className="flex-grow flex justify-center">
        <Outlet /> {/* Aquí se renderizarán las rutas hijas */}
      </main>

      <footer className="h-20 bg-black">
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
