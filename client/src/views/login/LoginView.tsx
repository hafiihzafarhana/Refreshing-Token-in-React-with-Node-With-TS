import { Link } from "react-router-dom";
import GlobalInput from "../../components/Input";
import GlobalButton from "../../components/Button";
import { useState } from "react";
import axios from "axios";
import GlobalModal from "../../components/Modal";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const LoginView: React.FC = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("farhana2023@gmail.com");
  const [password, setPassword] = useState("Farhana2023");
  const [showModal, setShowModal] = useState(false);
  const [loginError, setLoginError] = useState("");

  // handle login
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();

    if (email === "" || password === "") {
      // give modal
      console.log(1);
      setShowModal(true);
      return;
    }

    const loginData = {
      email,
      password,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signin",
        loginData
      );

      if (response.status === 200) {
        // Registration successful

        Cookies.set("refresh_token", response.data.refresh_token, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "none",
        });

        Cookies.set("access_token", response.data.access_token, {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "none",
        });

        Cookies.set("is_login", "true", {
          expires: 7,
          path: "/",
          secure: true,
          sameSite: "none",
        });

        navigate("/");
      } else {
        setLoginError(response.data.error); // Set the error message
        setShowModal(true);
      }

      setEmail("farhana2023@gmail.com");
      setPassword("Farhana2023");
    } catch (error) {
      console.error("Registration error:", error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-[#475ce9] px-3">
        <div className="flex flex-col items-center w-[400px] h-[400px] rounded-lg min-[386px]:shadow-lg p-[20px] bg-white">
          <div className="py-[18px]">
            <h1 className="font-bold text-[36px] text-[#475ce9]">Sign In</h1>
          </div>
          {/* form */}
          <form onSubmit={handleLogin}>
            <div className="grid grid-cols-1 gap-2 w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="mb-1 font-semibold">
                  Email
                </label>
                <GlobalInput
                  type="email"
                  htmlFor={"email"}
                  val={email}
                  setVal={setEmail}
                  placeHolder="Input email"
                  required={false}
                />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 font-semibold">
                  Password
                </label>
                <GlobalInput
                  type="password"
                  htmlFor={"password"}
                  val={password}
                  setVal={setPassword}
                  placeHolder="Input password"
                  required={false}
                />
              </div>
            </div>
            <div className="mt-[14px] full">
              <GlobalButton name="Login" />
            </div>
            <p className="text-sm text-center mt-4">
              You don't have an account?
              <span className="text-[#475ce9]">
                <Link to={"/register"}> Sign Up</Link>
              </span>
            </p>
          </form>
          {showModal && (
            <GlobalModal
              message={
                loginError
                  ? "login Failed!"
                  : "Please fill in all required fields"
              }
              onClose={closeModal}
            />
          )}
        </div>
      </div>
    </>
  );
};

export default LoginView;
