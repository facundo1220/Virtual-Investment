import { useState, useEffect } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { BsDiamondHalf } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  const isActive = (path: string): boolean => location.pathname === path;

  const showMenu =
    location.pathname === "/Simulations" ||
    location.pathname === "/NewSimulation";

  useEffect(() => {
    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }
  }, [isMenuOpen]);

  return (
    <div className="flex justify-between items-center p-4">
      <div className="flex justify-center items-center gap-2">
        <BsDiamondHalf size={30} />
        <h1 className="text-headline3 font-semibold">ONE BANK</h1>
      </div>

      {showMenu && (
        <>
          <IoMenuSharp
            className="lg:hidden cursor-pointer"
            size={30}
            onClick={toggleMenu}
          />

          <div className="hidden lg:flex">
            <ul className="flex space-x-4">
              <li>
                <a
                  href="/Simulations"
                  className={`text-small ${
                    isActive("/Simulations")
                      ? "border-b-2 border-black font-semibold"
                      : ""
                  }`}
                >
                  My simulations
                </a>
              </li>
              <li>
                <a
                  href="/NewSimulation"
                  className={`text-small ${
                    isActive("/NewSimulation")
                      ? "border-b-2 border-black font-semibold"
                      : ""
                  }`}
                >
                  New simulation
                </a>
              </li>
            </ul>
          </div>

          <div
            className={`lg:hidden absolute top-14 left-0 h-full w-full bg-black bg-opacity-80 ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col items-center">
              <li className="flex flex-col justify-center items-center w-full h-14 bg-black border-b border-white">
                <a href="/Simulations" className="p-2 text-white">
                  My simulations
                </a>
              </li>
              <li className="flex flex-col justify-center items-center w-full h-14 bg-black">
                <a href="/NewSimulation" className="p-2 text-white">
                  New simulation
                </a>
              </li>
            </ul>
          </div>
        </>
      )}
    </div>
  );
}

export default Header;
