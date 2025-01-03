import Footer from "../components/MainLayout/Footer";
import Header from "../components/MainLayout/Header";

interface props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: props) {
  return (
    <div className="min-h-screen flex flex-col">
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
