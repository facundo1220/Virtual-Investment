import Footer from "../components/MainLayout/Footer";
import Header from "../components/MainLayout/Header";

interface mainLayoutProps {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: mainLayoutProps) {
  return (
    <div className="flex flex-col min-h-screen">
      <header className="h-[70px] shadow-md">
        <Header />
      </header>

      <main className="flex-grow flex justify-center">{children}</main>

      <footer className="h-20 bg-black">
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
