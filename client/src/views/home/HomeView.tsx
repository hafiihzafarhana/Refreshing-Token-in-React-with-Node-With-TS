import { GlobalBottomNavbar, GlobalTopNavbar } from "../../components/Navbar";
import Cookies from "js-cookie";
import ResumeImage from "./../../assets/resume.png";
import LoginFirst from "./../../assets/login_first.png";
import { AiFillGithub, AiFillLinkedin } from "react-icons/ai";
import { HiPresentationChartBar } from "react-icons/hi";
import GlobalFooter from "../../components/Footer";

const HomeView: React.FC = () => {
  const isLogin = Cookies.get("is_login");

  return (
    <div className="max-w-screen flex flex-col">
      {/* Top Navbar */}
      <GlobalTopNavbar />

      {/* Bottom Navbar */}
      <GlobalBottomNavbar />

      {/* Home Content */}
      <div className="min-h-screen bg-gray-700 px-[40px]">
        <div
          className={`mt-[144px] bg-white w-full h-auto md:h-full py-[14px] md:py-[0px] mb-[100px] md:mb-[0px] px-[40px] rounded-lg flex justify-center md:flex-row flex-col ${
            isLogin === "true" ? "" : "hidden"
          }`}
        >
          <div className="w-full flex flex-col justify-center items-center">
            <div className="text-center">
              <h1 className="font-bold text-[#475ce9] text-[28px]">
                Welcome to Nine Fox Lab
              </h1>
              <div className="flex flex-col">
                <span className="font-bold text-[24px]">This is Mine</span>
                <div className="flex flex-row items-center justify-center mt-[14px] gap-2">
                  <a href="https://github.com/hafiihzafarhana">
                    <AiFillGithub size={32} />
                  </a>
                  <a href="">
                    <HiPresentationChartBar size={32} />
                  </a>
                  <a href="https://www.linkedin.com/in/hafi-ihza-farhana/">
                    <AiFillLinkedin size={32} />
                  </a>
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            <img src={ResumeImage} />
          </div>
        </div>
        <div
          className={`mt-[144px] bg-white w-full h-auto md:h-full py-[14px] md:py-[0px] mb-[100px] md:mb-[0px] px-[40px] rounded-lg flex justify-center md:flex-row flex-col ${
            isLogin === "true" ? "hidden" : ""
          }`}
        >
          <div className="w-full flex flex-col justify-center items-center">
            <div className="text-center">
              <h1 className="font-bold text-[#475ce9] text-[28px]">
                Hi, You should login first
              </h1>
            </div>
          </div>
          <div className="w-full">
            <img src={LoginFirst} />
          </div>
        </div>
      </div>

      {/* Footer */}
      <GlobalFooter />
    </div>
  );
};

export default HomeView;
