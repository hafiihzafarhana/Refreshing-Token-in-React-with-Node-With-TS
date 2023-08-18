import React, { useState, useEffect } from "react";
import LogoImage from "./../assets/logo.png";
import { NavLink } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";

const navigations = [
  {
    key: "1",
    name: "Home",
    to: "/",
    icon: <BiHomeAlt />,
  },
  {
    key: "2",
    name: "About",
    to: "/about",
    icon: <FcAbout />,
  },
];

export const GlobalTopNavbar: React.FC = () => {
  const activeScrolled = "text-[#475ce9] underline underline-offset-8";
  const activeNotScrolled = "text-white underline underline-offset-8";
  const notActiveScrolled = "text-[gray] hover:text-[#475ce9]";
  const notActiveNotScrolled = "text-[gray] hover:text-white";
  const [scrolled, setScrolled] = useState(false);

  const handleScroll = () => {
    if (window.scrollY >= 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <nav
      className={`fixed w-full p-1 top-0 left-0 transition duration-300 shadow-lg max-[690px]:px-[20px] ${
        scrolled ? "bg-white" : "bg-transparent"
      }`}
    >
      <div className="container w-full mx-auto py-2 flex flex-row justify-between items-center">
        <div className="flex items-center justify-between gap-x-4">
          <div className="text-white font-bold text-xl flex items-center animate__animated animate__bounce">
            <img src={LogoImage} alt="Logo" className="h-[92px] mr-2" />
          </div>
          <ul className="flex space-x-4">
            {navigations.map((navigation) => (
              <li key={navigation.key}>
                <NavLink
                  className={`rounded-md px-1 py-2 font-medium hidden md:block ${
                    scrolled && window.location.pathname === navigation.to
                      ? activeScrolled
                      : !scrolled && window.location.pathname == navigation.to
                      ? activeNotScrolled
                      : scrolled && window.location.pathname !== navigation.to
                      ? notActiveScrolled
                      : notActiveNotScrolled
                  }`}
                  to={navigation.to}
                >
                  {navigation.name}
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
        <div className="flex flex-row items-center justify-between gap-x-4">
          <NavLink
            to={"/login"}
            id="signin"
            className="bg-[#475ce9] text-white hover:text-[#e3e3e3] shadow-lg font-bold cursor-pointer text-center"
          >
            Sign In
          </NavLink>
          <NavLink
            to={"/register"}
            id="signup"
            className="signup bg-white shadow-lg text-[#475ce9] hover:text-[#273592] font-bold hover:shadow-md cursor-pointer text-center hidden md:block"
          >
            Sign Up
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export const GlobalBottomNavbar: React.FC = () => {
  const active = "text-[#475ce9] underline underline-offset-8";
  const notActive = "text-[gray] hover:text-[#475ce9]";

  return (
    <div className="md:hidden block">
      <nav className="mobile-navbar-container max-w-[968px] ml-[1rem] mr-[1rem] min-[1024]:ml-auto min-[1024]:mr-auto">
        <div className="nav__menu">
          <ul className="flex justify-around min-[576px]:justify-center min-[576px]:gap-[3rem]">
            {navigations.map((navigation) => (
              <li key={navigation.key}>
                <NavLink
                  to={navigation.to}
                  className={`flex flex-col items-center gap-[4px] font-bold relative ${
                    window.location.pathname === navigation.to
                      ? active
                      : notActive
                  }`}
                >
                  {navigation.icon}
                  <span className="nav__name">{navigation.name}</span>
                </NavLink>
              </li>
            ))}
          </ul>
        </div>
      </nav>
    </div>
  );
};
