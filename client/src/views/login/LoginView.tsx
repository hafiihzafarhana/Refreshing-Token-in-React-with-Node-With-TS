import { Link } from "react-router-dom";
import GlobalInput from "../../components/Input";
import GlobalButton from "../../components/Button";
const LoginView: React.FC = () => {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-[#475ce9]">
        <div className="flex flex-col items-center w-[400px] h-[400px] rounded-lg min-[386px]:shadow-lg p-[20px] bg-white">
          <div className="py-[18px]">
            <h1 className="font-bold text-[36px] text-[#475ce9]">Sign In</h1>
          </div>
          {/* form */}
          <form>
            <div className="grid grid-cols-1 gap-2 w-full">
              <div className="flex flex-col w-full">
                <label htmlFor="email" className="mb-1 font-semibold">
                  Email
                </label>
                <GlobalInput htmlFor={"email"} />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 font-semibold">
                  Password
                </label>
                <GlobalInput htmlFor={"password"} />
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
        </div>
      </div>
    </>
  );
};

export default LoginView;
