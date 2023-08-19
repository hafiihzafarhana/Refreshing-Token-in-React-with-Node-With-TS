import GlobalFooter from "../../components/Footer";
import { GlobalBottomNavbar, GlobalTopNavbar } from "../../components/Navbar";

const AboutView: React.FC = () => {
  return (
    <div className="max-w-screen flex flex-col">
      {/* Top Navbar */}
      <GlobalTopNavbar />

      {/* Bottom Navbar */}
      <GlobalBottomNavbar />

      <div className="min-h-screen bg-gray-700 px-[40px]">
        <div
          className={`mt-[144px] bg-white w-full h-auto md:h-full py-[14px] md:py-[0px] mb-[100px] md:mb-[0px] px-[40px] rounded-lg flex justify-center md:flex-row flex-col `}
        >
          <h3 className="font-bold text-[44px] text-center">Welcome</h3>
        </div>
      </div>

      {/* Footer */}
      <GlobalFooter />
    </div>
  );
};

export default AboutView;
