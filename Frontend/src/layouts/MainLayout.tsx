import Footer from "../components/MainLayout/Footer";
import Header from "../components/MainLayout/Header";

interface props {
  children: JSX.Element | JSX.Element[];
}

function MainLayout({ children }: props) {
  return (
    <div className="h-screen flex flex-col justify-between">
      <header className="h-14">
        <Header />
      </header>

      <main className="flex-grow h-full">{children}</main>

      <footer className="h-20 bg-black">
        <Footer />
      </footer>
    </div>
  );
}

export default MainLayout;
