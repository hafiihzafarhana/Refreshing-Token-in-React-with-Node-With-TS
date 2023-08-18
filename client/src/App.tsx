import "./App.css";
import { Route, Routes } from "react-router-dom";
import HomeView from "./views/home/HomeView";
import LoginView from "./views/login/LoginView";
import RegisterView from "./views/register/RegisterView";

const App: React.FC = () => {
  return (
    <div>
      {/* Routing */}
      <Routes>
        <Route path="/" element={<HomeView />} />
        <Route path="/login" element={<LoginView />} />
        <Route path="/register" element={<RegisterView />} />
      </Routes>
    </div>
  );
};

export default App;
