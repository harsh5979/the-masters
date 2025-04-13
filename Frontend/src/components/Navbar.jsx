import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuthStore } from "../../store/AuthStore";

const Navbar = () => {
  const { isAuthenticated ,user,isRole} = useAuthStore();
  const navigate = useNavigate();
  const role = user?.profile?.role || isRole;


  const [isSticky, setisSticky] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      setisSticky(window.scrollY > 1);
    };

    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const [dropDownVisible, setDropDownVisible] = useState(false);
  const toggleDropDown = () => {
    setDropDownVisible(!dropDownVisible);
  };

  const handleAboutClick = async (e) => {
    e.preventDefault();
    navigate("/");
    setTimeout(() => {
      const aboutSection = document.getElementById("about-section");
      if (aboutSection) {
        aboutSection.scrollIntoView({ behavior: "smooth", block: "center" });
      }
    }, 200);
  };
  const handleContactClick = async (e) => {
    e.preventDefault();
    navigate("/");

    // Add a slight delay before scrolling to the contact section
    setTimeout(() => {
      const contactSection = document.getElementById("contact-section");
      if (contactSection) {
        contactSection.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }, 200);
  };

  return (
    <nav
      className={`flex flex-row justify-between  w-full     backdrop-blur-md shadow-inherit select-none 
        sticky top-0 z-20 ${isSticky ? "bg-white " : "bg-transparent"}
       lg:h-[9vh] md:h-[9vh] h-[10vh] my-auto items-center shadow-md backdrop-blur-2xl `}
    >
      <div className="text-center mx-11 w-[200px] ">
        <NavLink className="removeLinkHover p-0 h-0 " to="/">
          <h2 className="rubfont cursor-pointer   text-yellow-600 hover:text-[#ea2525c5]  text-4xl">
            INNNNNO
          </h2>
        </NavLink>
      </div>
      <div className="lg:hidden  mx-2">
        <img
          className="invert-1 p-2 cursor-pointer mx-1"
          src={menuOpen ? "/img/close.svg" : "/img/hamburger.svg"}
          onClick={toggleMenu}
          alt="menu"
        />
      </div>
      <div
        className={`fixed inset-0 bg-transparent  bg-opacity-50 transition-opacity duration-300 ${menuOpen
          ? "lg:opacity-0 opacity-100 "
          : "opacity-0 pointer-events-none"
          }`}
        onClick={toggleMenu}
      ></div>
      <div
        className={`humbar  fixed z-50 md:top-[9vh] top-[10vh] lg:top-0 right-0  h-full    transform ${menuOpen ? "translate-x-0 " : "translate-x-full"
          } transition-transform duration-300 ease-in-out lg:relative lg:transform-none lg:translate-x-0 lg:flex lg:items-center`}
      >
        <ul className="flex flex-col  lg:flex-row lg:items-center  lg:bg-transparent bg-[#0a131d] lg:w-auto   ">

          <div className=" lg:flex gap-5 lg:mx-24 md:mx-1  w-[250px]   lg:w-[750px] justify-center ">
            <li className="p-4 lg:p-0">
              <NavLink
                to="/"
                className={(e) =>
                  `aa block  lg:inline-block py-2  px-4 font-bold md:hover:bg-transparent ${e.isActive
                    ? "text-[#443aa1] after:w-[100%] after:bg-[#2a5688]"
                    : ""
                  }`
                }
                onClick={toggleMenu}
              >
                HOME
              </NavLink>
            </li>

            {role === "Freelancer" && (<>




              <li className="p-4 lg:p-0">
                <NavLink
                  to="/jobs"
                  className={(e) =>
                    `aa block lg:inline-block py-2 px-4 font-bold   md:hover:bg-transparent ${e.isActive
                      ? "text-[#443aa1] after:w-[100%] after:bg-[#2a5688]"
                      : ""
                    }`
                  }
                  onClick={toggleMenu}
                >
                  JOBS
                </NavLink>
              </li>
              
              <li className="p-4 lg:p-0">
                <NavLink
                  to="/dashboard"
                  className={(e) =>
                    `aa block lg:inline-block py-2 px-4 font-bold   md:hover:bg-transparent ${e.isActive
                      ? "text-[#443aa1] after:w-[100%] after:bg-[#2a5688]"
                      : ""
                    }`
                  }
                  onClick={toggleMenu}
                >
                  DASHBOARD
                </NavLink>
              </li>
            </>) }
            {
              role === 'Client' &&  (<>

                <li className="p-4 lg:p-0">
                  <NavLink
                    to="/clientdashboard"
                    className={(e) =>
                      `aa block lg:inline-block py-2 px-4 font-bold   md:hover:bg-transparent ${e.isActive
                        ? "text-[#443aa1] after:w-[100%] after:bg-[#2a5688]"
                        : ""
                      }`
                    }
                    onClick={toggleMenu}
                  >
                    DASHBOARD
                  </NavLink>
                </li>
              </>)
            }


            <li className="p-4 lg:p-0">
              <NavLink
                to="/profile"
                className={(e) =>
                  `aa block lg:inline-block py-2 px-4 font-bold   md:hover:bg-transparent ${e.isActive
                    ? "text-[#443aa1] after:w-[100%] after:bg-[#2a5688]"
                    : ""
                  }`
                }
                onClick={toggleMenu}
              >
                PROFILE
              </NavLink>
            </li>

            <li className="p-4 md:p-0">
              <NavLink
                to="/about"
                className={(e) =>
                  `aa block md:inline-block font-bold py-2 px-4   md:hover:bg-transparent ${e.isActive ? "  after:w-[100%] after:bg-[#2a5688]" : ""
                  }`
                }
                onClick={toggleMenu}
              >
                <div onClick={handleContactClick} className="cursor-pointer">
                  ABOUT
                </div>
              </NavLink>
            </li>
            <li className="p-4 md:p-0">
              <NavLink
                to="/contactus"
                className={(e) =>
                  `aa block md:inline-block py-2 px-4   md:hover:bg-transparent ${e.isActive
                    ? "text-[#443aa1]  after:w-[100%] after:bg-[#2a5688]"
                    : ""
                  }`
                }
                onClick={toggleMenu}
              >
                <div className="c font-bold">
                  CONTACT US
                </div>
              </NavLink>
            </li>
          </div>
          <div className=" mr-5 lg:w-[280px]  ">
            <li className="p-4 lg:p-0">
              {isAuthenticated ? (
                <NavLink
                  to="/logout"
                  className=" removeLinkHover w-fit block lg:inline-block py-2 px-4 bg-red-500 text-white  rounded "
                  onClick={toggleMenu}
                >
                  <span className="text-white ">Logout</span>
                </NavLink>
              ) : (
                <div className="gap-2 flex flex-col lg:flex-row ">
                  {/* <NavLink
                    to="/adminlogin"
                    className="removeLinkHover w-fit block   py-2 px-5 bg-[#29303d] text-white hover:text-white hover:bg-slate-500 rounded "
                    onClick={toggleMenu}
                  >
                    Admin Login
                  </NavLink> */}
                  <NavLink
                    to="/login"
                    className="  w-fit block   py-2 px-4 bg-[#29303d] text-white hover:text-white hover:bg-slate-500 rounded mt-2 md:mt-0 md:ml-2"
                    onClick={toggleMenu}
                  >
                    Login
                  </NavLink>
                  <NavLink
                    to="/signup"
                    className="  w-fit block   py-2 px-4 bg-[#29303d] text-white hover:text-white hover:bg-slate-500 rounded mt-2 md:mt-0 md:ml-2"
                    onClick={toggleMenu}
                  >
                    Sign up
                  </NavLink>
                </div>
              )}
            </li>
          </div>
        </ul>
      </div >
    </nav >
  );
};

export default Navbar;
