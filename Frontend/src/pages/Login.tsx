import { useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Button from "../components/Button/Button";
import { LoginProcess } from "../services/Auth";
import { toast } from "react-toastify";
import { yupResolver } from "@hookform/resolvers/yup";
import { loginValidationSchema } from "../schemas/loginSchema";

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
    <div className="flex p-5 justify-center items-center">
      <div className="md:w-3/4 md:h-3/4 flex items-center sm:flex-col-reverse lg:flex-row shadow-2xl rounded-3xl justify-between">
        <div className="flex justify-center h-full items-center lg:w-1/2 w-full">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="p-3 flex flex-col justify-center  items-center gap-8"
          >
            <h1 className="md:text-headline3 text-headline4 font-bold">
              Welcome back
            </h1>
            <h2 className="md:text-paragraph text-small text-center">
              Enter your details to get login in to your account
            </h2>

            <div className="flex flex-col gap-3 w-full">
              <input
                {...register("email")}
                placeholder="user@email.com"
                type="email"
              />
              {errors.email && (
                <span className="text-red-500 text-sm">
                  {errors.email.message}
                </span>
              )}

              <input
                {...register("password")}
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
        <div className="flex bg-[#f3ff6e] lg:w-1/2 h-full rounded-r-3xl  w-full justify-start items-center">
          <img className="object-cover lg:h-full h-48" src={image} alt="" />
        </div>
      </div>
    </div>
  );
}

export default Login;
