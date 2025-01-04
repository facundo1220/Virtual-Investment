import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";

import { LoginProcess } from "../services/Auth";
import { loginValidationSchema } from "../schemas/loginSchema";

import Button from "../components/Button/Button";

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
  } = useForm<FormData>({ resolver: yupResolver(loginValidationSchema) });

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
        toast.error(error.message);
      } else {
        toast.error("An unknown error occurred");
      }
    }
  };

  return (
    <div className="flex justify-center items-center p-5">
      <div className="flex flex-col-reverse lg:flex-row lg:w-3/4 lg:h-3/4 justify-between items-center shadow-2xl rounded-3xl">
        <div className="flex justify-center items-center h-full w-full lg:w-1/2">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col justify-center items-center p-3 gap-8"
          >
            <h1 className="text-headline4 lg:text-headline3 font-bold">
              Welcome back
            </h1>
            <h2 className="text-small lg:text-paragraph text-center">
              Enter your details to get login in to your account
            </h2>

            <div className="flex flex-col w-full gap-3">
              <input
                {...register("email")}
                placeholder="user@email.com"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-small">
                  {errors.email.message}
                </span>
              )}

              <input
                {...register("password")}
                placeholder="******"
                type="password"
              />
              {errors.password && (
                <span className="text-red-500 text-small">
                  {errors.password.message}
                </span>
              )}
            </div>

            <Button
              title="Login"
              className="bg-black rounded-full text-white hover:text-black hover:bg-primary_green w-full"
            />
          </form>
        </div>
        <div className="flex justify-start items-center h-full w-full lg:w-1/2 rounded-r-3xl bg-primary_green">
          <img className="object-cover lg:h-full h-48" src={image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
