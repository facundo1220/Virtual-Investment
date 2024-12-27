import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button/Button";
import { LoginProcess } from "../services/Auth";

import image from "../assets/loginImage.png";

interface FormData {
  email: string;
  password: string;
}

function Login() {
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    try {
      const loginResponse = await LoginProcess({
        email: data.email,
        password: data.password,
      });

      if (loginResponse.token) {
        localStorage.setItem("access_token", loginResponse.token);

        localStorage.setItem("user_id", loginResponse.user.id);
        navigate("/Simulations");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      } else {
        alert("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center h-full ">
      <div className="w-3/4 h-3/4 flex sm:flex-col-reverse lg:flex-row shadow-2xl rounded-xl justify-between">
        <div className="flex h-full justify-center items-center lg:w-1/2 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 flex flex-col h-full justify-center  items-center gap-3"
          >
            <h1 className="text-3xl font-mono font-bold">Welcome back</h1>
            <h2 className="text-lg text-center">
              Enter your details to get login in to your account
            </h2>

            <div className="flex flex-col gap-3 w-full">
              <input
                {...register("email", {
                  required: "Email is required",
                  pattern: {
                    value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/,
                    message: "Invalid email address",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm h-12 rounded-full w-full p-2.5 focus:outline-none focus:border-black"
                placeholder="user@email.com"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}

              <input
                {...register("password", {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters",
                  },
                })}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm h-12 rounded-full w-full p-2.5 focus:outline-none focus:border-black"
                placeholder="******"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-sm">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              title="Login"
              className="bg-black rounded-full text-white hover:text-black hover:bg-[#f3ff6e] w-full"
            />
          </form>
        </div>
        <div className="flex bg-[#f3ff6e] lg:w-1/2 w-full justify-start items-center">
          <img className="object-cover lg:h-full h-48" src={image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
