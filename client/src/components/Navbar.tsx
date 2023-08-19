import React, { useState, useEffect, useCallback } from "react";
import LogoImage from "./../assets/logo.png";
import { NavLink, useNavigate } from "react-router-dom";
import { BiHomeAlt } from "react-icons/bi";
import { FcAbout } from "react-icons/fc";
import axios from "axios";
import Cookies from "js-cookie";
import jwtDecode from "jwt-decode";

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

interface UserDataDto {
  data?: {
    id?: string;
    email?: string;
    name?: string;
    user_name?: string;
  };
}

export const GlobalTopNavbar: React.FC = () => {
  const activeScrolled = "text-[#475ce9] underline underline-offset-8";
  const activeNotScrolled = "text-white underline underline-offset-8";
  const notActiveScrolled = "text-[gray] hover:text-[#475ce9]";
  const notActiveNotScrolled = "text-[gray] hover:text-white";
  const [scrolled, setScrolled] = useState(false);
  const [userData, setUserData] = useState<UserDataDto | null>(null);
  const isLogin = Cookies.get("is_login");
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();

  const handleScroll = () => {
    if (window.scrollY >= 20) {
      setScrolled(true);
    } else {
      setScrolled(false);
    }
  };

  const handleLogout = () => {
    console.log(Cookies.get("refresh_token"));
    axios
      .post(
        "http://localhost:5000/api/auth/logout",
        { refresh_token: Cookies.get("refresh_token") },
        {
          headers: {
            Authorization: `Bearer ${Cookies.get("access_token")}`,
          },
        }
      )
      .then(() => {
        // Remove cookies and navigate to login page
        Cookies.remove("access_token");
        Cookies.remove("refresh_token");
        Cookies.remove("is_login");
        navigate("/login");
      })
      .catch((error) => {
        // Handle error if logout request fails
        console.error("Logout error:", error);
      });
  };

  const refreshAccessToken = useCallback(async () => {
    try {
      const refreshToken = Cookies.get("refresh_token");
      const response = await axios.post(
        "http://localhost:5000/api/auth/refresh-token",
        {
          refresh_token: refreshToken,
        }
      );

      const newAccessToken = response.data.access_token;

      if (newAccessToken) {
        Cookies.remove("access_token");
      }
      Cookies.set("access_token", newAccessToken, {
        expires: 7,
        path: "/",
        secure: true,
        sameSite: "none",
      });

      const dataTransfered = axios.get(
        "http://localhost:5000/api/user-profiles/me",
        {
          headers: {
            Authorization: `Bearer ${newAccessToken}`,
          },
        }
      );

      setUserData((await dataTransfered).data);
      // Update the access token cookie
    } catch (error) {
      console.error("Error refreshing access token:", error);
    }
  }, []);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  useEffect(() => {
    const accessToken = Cookies.get("access_token");
    if (accessToken) {
      axios
        .get("http://localhost:5000/api/user-profiles/me", {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        })
        .then((response) => {
          setUserData(response.data);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
          const refreshTokenExp = jwtDecode<{ exp: number }>(
            Cookies.get("refresh_token") || ""
          ).exp;

          // Decode the access token to get its expiration time
          const accessTokenExp = jwtDecode<{ exp: number }>(
            Cookies.get("access_token") || ""
          ).exp;

          const currentTime = Date.now() / 1000;

          if (accessTokenExp <= currentTime && refreshTokenExp > currentTime) {
            refreshAccessToken();
          } else {
            Cookies.remove("access_token");
            Cookies.remove("refresh_token");
            Cookies.remove("is_login");
            navigate("/login");
          }
        });
    }
  }, [navigate, refreshAccessToken]);

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
        {/* If user not logged */}
        <div
          className={`flex flex-row items-center justify-between gap-x-4 ${
            isLogin === "true" ? "hidden" : ""
          }`}
        >
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

        {/* If user logged */}
        {isLogin === "true" ? (
          <div className={`flex flex-row items-center justify-between gap-x-4`}>
            <div
              className={`w-[48px] h-[48px] rounded-full shadow ${
                scrolled ? "bg-black" : "bg-white"
              }`}
              onClick={() => setShowDropdown(!showDropdown)}
            >
              <span
                className={`${
                  scrolled ? "text-white" : "text-black"
                } flex items-center justify-center w-full h-full font-bold`}
              >
                {userData?.data?.user_name
                  ? userData.data.user_name[0].toUpperCase()
                  : ""}
              </span>
            </div>
            {showDropdown && (
              <div className="absolute top-[100px] right-[20px] w-[160px] bg-white border border-gray-300 shadow-lg">
                <div className="p-2">
                  <p className="text-[#475ce9] font-bold">
                    {userData?.data?.name}
                  </p>
                </div>
                <div className="p-2 cursor-pointer" onClick={handleLogout}>
                  Logout
                </div>
              </div>
            )}
          </div>
        ) : null}
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
