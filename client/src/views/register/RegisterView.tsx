import { Link } from "react-router-dom";
import GlobalButton from "../../components/Button";
import GlobalInput from "../../components/Input";

const RegisterView: React.FC = () => {
  return (
    <>
      <div className="h-screen w-screen flex justify-center items-center bg-[#475ce9]">
        <div className="flex max-[385px]:w-full flex-col items-center w-auto rounded-lg min-[386px]:shadow-lg p-[20px] bg-white">
          <div className="py-[18px]">
            <h1 className="font-bold text-[36px] text-[#475ce9]">Sign Up</h1>
          </div>
          {/* form */}
          <form>
            <div className="grid grid-cols-2 gap-2 max-[385px]:grid-cols-1 w-full">
              <div className="flex flex-col">
                <label htmlFor="username" className="mb-1 font-semibold">
                  Username
                </label>
                <GlobalInput htmlFor={"username"} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="email" className="mb-1 font-semibold">
                  Email
                </label>
                <GlobalInput htmlFor={"email"} />
              </div>
              <div className="flex flex-col">
                <label htmlFor="name" className="mb-1 font-semibold">
                  Name
                </label>
                <GlobalInput htmlFor={"name"} />
              </div>

              <div className="flex flex-col">
                <label htmlFor="password" className="mb-1 font-semibold">
                  Password
                </label>
                <GlobalInput htmlFor={"password"} />
              </div>
              <div className="flex flex-col max-[385px]:col-span-1 col-span-2">
                <label
                  htmlFor="password_confirmation"
                  className="mb-1 font-semibold"
                >
                  Password Confirmation
                </label>
                <GlobalInput htmlFor={"password_confirmation"} />
              </div>
            </div>
            <div className="mt-[14px] full">
              <GlobalButton name="Register" />
            </div>
            <p className="text-sm text-center mt-4">
              Do you have an account?
              <span className="text-[#475ce9]">
                <Link to={"/login"}> Sign In</Link>
              </span>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default RegisterView;
