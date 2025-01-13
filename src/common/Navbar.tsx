import { Bitcoin, Menu, X } from "lucide-react";
import { useState, useEffect, useRef } from "react";
import { Link, useLocation } from "react-router-dom";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const location = useLocation();

  const navigationLinks = [
    { name: "Home", id: "home", path: "/" },
    { name: "Block", id: "block", path: "/block" },
    { name: "Block Chain", id: "blockchain", path: "/blockchain" },
    { name: "Distributed Blockchain", id: "distributed", path: "/distributed" },
  ];

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent): void => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <nav className="fixed top-0 w-full bg-gray-900/80 backdrop-blur-sm border-b border-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <Link to="/">
            <Bitcoin size={50} color="white" />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navigationLinks.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                className={`relative px-3 py-2 rounded-md text-sm font-md transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "text-gray-700 bg-gray-200"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }
                hover:transform hover:scale-105`}
              >
                {item.name}
              </Link>
            ))}
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-300 hover:text-white p-2"
            >
              {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Dropdown */}
        <div
          ref={menuRef}
          className={`md:hidden absolute top-16 left-0 w-full z-50 transition-all duration-300 ease-in-out ${
            isMenuOpen
              ? "max-h-64 opacity-100"
              : "max-h-0 opacity-0 pointer-events-none"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gray-900/90 backdrop-blur-sm rounded-b-lg shadow-lg mx-4">
            {navigationLinks.map((item) => (
              <Link
                key={item.id}
                to={item.path}
                onClick={() => setIsMenuOpen(false)}
                className={`block px-3 py-2 rounded-md text-base font-medium transition-all duration-200
                ${
                  location.pathname === item.path
                    ? "text-gray-700 bg-gray-200"
                    : "text-gray-300 hover:text-white hover:bg-gray-700"
                }`}
              >
                {item.name}
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
