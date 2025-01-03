import { useState, useEffect } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { BsDiamondHalf } from "react-icons/bs";
import { useLocation } from "react-router-dom";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

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
    <div className="flex items-center justify-between p-4">
      <div className="flex gap-2 justify-center items-center">
        <BsDiamondHalf size={30} />
        <h1 className="text-headline3 font-semibold">ONE BANK</h1>
      </div>

      {showMenu && (
        <>
          <IoMenuSharp
            className="md:hidden cursor-pointer"
            size={30}
            onClick={toggleMenu}
          />

          <div className="hidden md:flex">
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
            className={`absolute top-14 left-0 h-full w-full bg-black bg-opacity-80 md:hidden ${
              isMenuOpen ? "block" : "hidden"
            }`}
          >
            <ul className="flex flex-col items-center">
              <li className="bg-black w-full flex flex-col items-center justify-center h-14 border-b border-white">
                <a
                  href="/Simulations"
                  className={`p-2 text-white ${
                    isActive("/Simulations")
                      ? "border-b-2 border-black font-semibold"
                      : ""
                  }`}
                >
                  My simulations
                </a>
              </li>
              <li className="bg-black w-full flex flex-col items-center justify-center h-14">
                <a
                  href="/NewSimulation"
                  className={`p-2 text-white ${
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
        </>
      )}
    </div>
  );
}

export default Header;
