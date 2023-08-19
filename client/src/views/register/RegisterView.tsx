import { useState } from "react";
import { Link } from "react-router-dom";
import GlobalButton from "../../components/Button";
import GlobalInput from "../../components/Input";
import GlobalModal from "../../components/Modal";
import axios from "axios";

const RegisterView: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirmation, setPasswordConfirmation] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [registrationSuccess, setRegistrationSuccess] = useState(false);
  const [registrationError, setRegistrationError] = useState("");

  const handleRegistration = async (e: React.FormEvent) => {
    e.preventDefault();
    if (
      username === "" ||
      email === "" ||
      name === "" ||
      password === "" ||
      passwordConfirmation === ""
    ) {
      // give modal
      setShowModal(true);
      return;
    }
    const registrationData = {
      username,
      email,
      name,
      password,
      password_confirmation: passwordConfirmation,
    };

    try {
      const response = await axios.post(
        "http://localhost:5000/api/auth/signup",
        registrationData
      );

      if (response.status === 201) {
        // Registration successful
        setRegistrationSuccess(true); // Set the registration success state
        setShowModal(true); // Show the modal
      } else {
        setRegistrationError(response.data.error); // Set the error message
        setShowModal(true);
      }

      setUsername("");
      setEmail("");
      setName("");
      setPassword("");
      setPasswordConfirmation("");
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
        <div className="flex max-[385px]:w-full flex-col items-center w-auto rounded-lg min-[386px]:shadow-lg p-[20px] bg-white">
          <div className="py-[18px]">
            <h1 className="font-bold text-[36px] text-[#475ce9]">Sign Up</h1>
          </div>
          {/* form */}
          <form onSubmit={handleRegistration}>
            <div className="grid grid-cols-2 gap-2 max-[385px]:grid-cols-1 w-full">
              <div className="flex flex-col">
                <label htmlFor="username" className="mb-1 font-semibold">
                  Username
                </label>
                <GlobalInput
                  type="text"
                  htmlFor={"username"}
                  val={username}
                  setVal={setUsername}
                  placeHolder="Input username"
                  required={false}
                />
              </div>
              <div className="flex flex-col">
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
                <label htmlFor="name" className="mb-1 font-semibold">
                  Name
                </label>
                <GlobalInput
                  type="text"
                  htmlFor={"name"}
                  val={name}
                  setVal={setName}
                  placeHolder="Input name"
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
              <div className="flex flex-col max-[385px]:col-span-1 col-span-2">
                <label
                  htmlFor="password_confirmation"
                  className="mb-1 font-semibold"
                >
                  Password Confirmation
                </label>
                <GlobalInput
                  type="password"
                  htmlFor={"password_confirmation"}
                  val={passwordConfirmation}
                  setVal={setPasswordConfirmation}
                  placeHolder="Input password confirmation"
                  required={false}
                />
              </div>
            </div>
            <div className="mt-[14px] full">
              <GlobalButton name="Register" type="submit" />
            </div>
            <p className="text-sm text-center mt-4">
              Do you have an account?
              <span className="text-[#475ce9]">
                <Link to={"/login"}> Sign In</Link>
              </span>
            </p>
          </form>
          {showModal && (
            <GlobalModal
              message={
                registrationSuccess
                  ? "Registration successful! You can now log in."
                  : registrationError
                  ? "Registration Failed!"
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

export default RegisterView;
