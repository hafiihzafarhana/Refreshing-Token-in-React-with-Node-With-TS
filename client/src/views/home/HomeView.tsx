import { GlobalBottomNavbar, GlobalTopNavbar } from "../../components/Navbar";

const HomeView: React.FC = () => {
  return (
    <div className="max-w-screen flex flex-col">
      {/* Top Navbar */}
      <GlobalTopNavbar />

      {/* Bottom Navbar */}
      <GlobalBottomNavbar />

      {/* Home Content */}
      <div className="min-h-[1920px] bg-gray-700">
        <div className="mt-[144px]">hafi</div>
      </div>

      {/* Footer */}
    </div>
  );
};

export default HomeView;
