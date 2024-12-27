import { useState } from "react";
import { IoMenuSharp } from "react-icons/io5";
import { BsDiamondHalf } from "react-icons/bs";

function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div className="flex items-center justify-between p-4">
      <div className="flex gap-2 justify-center items-center">
        <BsDiamondHalf size={30} />
        <h1 className="text-3xl font-mono font-bold">One Bank</h1>
      </div>

      <IoMenuSharp
        className="md:hidden cursor-pointer"
        size={30}
        onClick={toggleMenu}
      />

      <div className="hidden md:flex">
        <ul className="flex space-x-4">
          <li>
            <a href="/Simulations">My simulations</a>
          </li>
          <li>
            <a href="/NewSimulation">New simulation</a>
          </li>
        </ul>
      </div>

      <div
        className={`absolute top-14 left-0 h-full w-full bg-black bg-opacity-80 md:hidden  ${
          isMenuOpen ? "block" : "hidden"
        }`}
      >
        <ul className="flex flex-col items-center">
          <li className="bg-black  w-full flex flex-col items-center justify-center h-14  border-b border-white">
            <a href="/Simulations" className="p-2 text-white">
              My simulations
            </a>
          </li>
          <li className="bg-black  w-full flex flex-col items-center justify-center h-14">
            <a href="/NewSimulation" className="p-2 text-white">
              New simulation
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
}

export default Header;
