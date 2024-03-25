import { Link, useLocation } from "react-router-dom";
import { useEffect, useState } from "react";
// import menuData from "../data/menuData";
import { HiShoppingCart } from "react-icons/hi";
import { FaRegUser, FaUser } from "react-icons/fa6";

const Header = () => {
  const user = JSON.parse(localStorage.getItem("user")) || null;
  const menuData = [
    {
      title: "HOME",
      path: "/",
    },
    {
      title: "PARENT",
      path: "/parent",
    },
    {
      title: "CHILD",
      path: "/child",
    },
    {
      title : "RECOGNITION",
      path :"/recognition"
    }
  ];

  // Navbar toggle
  const [navbarOpen, setNavbarOpen] = useState(false);
  const navbarToggleHandler = () => {
    setNavbarOpen(!navbarOpen);
  };

  // Sticky Navbar
  const [sticky, setSticky] = useState(false);
  const handleStickyNavbar = () => {
    if (window.scrollY >= 80) {
      setSticky(true);
    } else {
      setSticky(false);
    }
  };
  useEffect(() => {
    window.addEventListener("scroll", handleStickyNavbar);
  });

  //paths
  const location = useLocation();
  const currentPath = location.pathname;

  // submenu handler
  const [openIndex, setOpenIndex] = useState(-1);
  const handleSubmenu = (index) => {
    if (openIndex === index) {
      setOpenIndex(-1);
    } else {
      setOpenIndex(index);
    }
  };

  return (
    <>
      <header
        className={`header left-0 top-0 z-40 flex w-full items-center ${
          sticky
            ? "dark:bg-gray-dark dark:shadow-sticky-dark fixed z-[9999]   !bg-opacity-80 shadow-sticky backdrop-blur-sm transition"
            : "absolute bg-transparent"
        }`}
      >
        <div
          className={`container text-white ${
            sticky ? "bg-black" : "text-white"
          } `}
        >
          <div className="relative -mx-4 flex items-center justify-between">
            <div className="w-auto max-w-full px-4 xl:mr-12 ">
              <Link
                href="/"
                className={`header-logo items-center  w-full flex ${
                  sticky ? "py-4 lg:py-2" : "py-4"
                } `}
              >
                {/* <img src={logo} alt="logo" className=" dark:hidden w-16 h-16" /> */}
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  class="w-10 h-10 text-white p-2 bg-purple-900 rounded-full"
                  viewBox="0 0 24 24"
                >
                  <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
                </svg>
                <p className="text-lg font-semibold ml-2">Learno</p>
                <img
                  src="/vite.svg"
                  alt="logo"
                  width={140}
                  height={30}
                  className="hidden w-full dark:block"
                />
                {/* <p>YWS</p> */}
              </Link>
            </div>
            <div className="flex w-full items-center justify-between px-4">
              <div>
                <button
                  onClick={navbarToggleHandler}
                  id="navbarToggler"
                  aria-label="Mobile Menu"
                  className="absolute right-4 top-1/2 block translate-y-[-50%] rounded-lg px-3 py-[6px] ring-primary focus:ring-2 lg:hidden"
                >
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[7px] rotate-45" : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? "opacity-0 " : " "
                    }`}
                  />
                  <span
                    className={`relative my-1.5 block h-0.5 w-[30px] bg-black transition-all duration-300 dark:bg-white ${
                      navbarOpen ? " top-[-8px] -rotate-45" : " "
                    }`}
                  />
                </button>
                <nav
                  id="navbarCollapse"
                  className={`navbar absolute right-0 z-30 w-[250px] rounded border-[.5px] border-body-color/50 bg-white px-6 py-4 duration-300 dark:border-body-color/20 dark:bg-dark lg:visible lg:static lg:w-auto lg:border-none lg:!bg-transparent lg:p-0 lg:opacity-100 ${
                    navbarOpen
                      ? "visibility top-full opacity-100"
                      : "invisible top-[120%] opacity-0"
                  }`}
                >
                  <ul className="block lg:flex lg:space-x-12">
                    {menuData.map((menuItem, index) => (
                      <li key={index} className="group relative">
                        {menuItem.path ? (
                          <Link
                            to={menuItem.path}
                            className={`flex py-2 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-6 ${
                              currentPath === menuItem.path
                                ? "text-sky-600 dark:text-white"
                                : "text-dark hover:text-waves dark:text-white/70 dark:hover:text-white"
                            }`}
                          >
                            {menuItem.title == "Admin Dashboard" && user
                              ? "Admin Dashboard"
                              : menuItem.title}
                          </Link>
                        ) : (
                          <>
                            <p
                              onClick={() => handleSubmenu(index)}
                              className="flex cursor-pointer items-center justify-between py-2 text-base text-dark group-hover:text-primary dark:text-white/70 dark:group-hover:text-white lg:mr-0 lg:inline-flex lg:px-0 lg:py-6"
                            >
                              {menuItem.title == "Admin Dashboard" && user
                                ? "Admin Dashboard"
                                : menuItem.title}
                              <span className="pl-3">
                                <svg width="25" height="24" viewBox="0 0 25 24">
                                  <path
                                    fillRule="evenodd"
                                    clipRule="evenodd"
                                    d="M6.29289 8.8427C6.68342 8.45217 7.31658 8.45217 7.70711 8.8427L12 13.1356L16.2929 8.8427C16.6834 8.45217 17.3166 8.45217 17.7071 8.8427C18.0976 9.23322 18.0976 9.86639 17.7071 10.2569L12 15.964L6.29289 10.2569C5.90237 9.86639 5.90237 9.23322 6.29289 8.8427Z"
                                    fill="currentColor"
                                  />
                                </svg>
                              </span>
                            </p>
                            <div
                              className={`submenu relative left-0 top-full rounded-sm bg-white transition-[top] duration-300 group-hover:opacity-100 dark:bg-dark lg:invisible lg:absolute lg:top-[110%] lg:block lg:w-[250px] lg:p-4 lg:opacity-0 lg:shadow-lg lg:group-hover:visible lg:group-hover:top-full ${
                                openIndex === index ? "block" : "hidden"
                              }`}
                            >
                              {menuItem.submenu.map((submenuItem, index) => (
                                <Link
                                  to={submenuItem.path}
                                  key={index}
                                  className={`flex py-1 text-base lg:mr-0 lg:inline-flex lg:px-0 lg:py-3 ${
                                    currentPath === submenuItem.path
                                      ? "text-waves dark:text-white"
                                      : "text-dark hover:text-primary dark:text-white/70 dark:hover:text-white"
                                  }`}
                                >
                                  {submenuItem.title}
                                </Link>
                              ))}
                            </div>
                          </>
                        )}
                      </li>
                    ))}
                  </ul>
                </nav>
              </div>
              {/* <div className=" flex items-center justify-center gap-3">
                <Link
                  to={"cart"}
                  className="mr-4 gap-2 flex items-center justify-end pr-16 sm:pr-0 hover:text-orange-600 transition-colors"
                >
                  <p>Cart</p>
                  <HiShoppingCart className="text-2xl" />
                </Link>
                <Link to="/admin" className="md:block lg:mr-0 mr-16 hidden hover:text-orange-600 transition-colors">
                  <FaUser className="text-xl" />
                </Link>
              </div> */}
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
