import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form";
import Logo from "/logo.svg";
import axios from "axios";
import { toast } from "react-toastify";

type Inputs = {
  name: string;
  email: string;
  password: string;
} & {
  serverError?: string;
};

const Register: React.FC = () => {
  const {
    register,
    handleSubmit,
    clearErrors,
    setError,
    formState: { errors, isSubmitting },
  } = useForm<Inputs>();

  const navigate = useNavigate();

  const onSubmit: SubmitHandler<Inputs> = async (data) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_REACT_API_URI}/auth/register`,
        data,
      );
      console.log(res);
      toast.success(res.data.message);
      navigate("/login");
    } catch (err) {
      if (axios.isAxiosError(err)) {
        const errorMessage =
          err.response?.data?.message || "Registration failed!";
        setError("serverError", { message: errorMessage });
        toast.error(errorMessage);
      } else {
        console.log(err);

        setError("serverError", { message: "An unknown error occurred!" });
        toast.error("An unknown error occurred!");
      }
    }
  };

  const handleInputChange = () => {
    clearErrors();
  };

  return (
    <>
      <div className="flex h-screen w-full flex-col items-center justify-center gap-5 bg-gray-900 p-5">
        <div>
          <img className="w-60" src={Logo} alt="logo" />
        </div>
        <div className="w-full rounded-lg border border-gray-700 bg-gray-800 font-['Montserrat'] shadow sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="font-['Exo'] text-xl font-bold leading-tight tracking-tight text-white md:text-2xl">
              Create an account
            </h1>

            {errors.serverError && (
              <div className="text-red-500">{errors.serverError.message}</div>
            )}

            <form
              className="space-y-4 md:space-y-6"
              onSubmit={handleSubmit(onSubmit)}
              onChange={handleInputChange}
            >
              <div>
                <label
                  htmlFor="name"
                  className="mb-2 flex flex-row items-center justify-between text-sm font-medium text-white"
                >
                  Full Name
                  {errors.name && (
                    <span className="text-left font-light text-red-500">
                      {errors.name.message}
                    </span>
                  )}
                </label>
                <input
                  {...register("name", {
                    required: "Name is required",
                    minLength: { value: 3, message: "Minimum Length is 3" },
                    maxLength: { value: 50, message: "Maximum Length is 50" },
                  })}
                  type="text"
                  name="name"
                  id="name"
                  className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 outline-none duration-200 focus:border-[#2563eb]"
                  placeholder="Full Name"
                  required
                />
              </div>
              <div>
                <label
                  htmlFor="email"
                  className="mb-2 flex flex-row items-center justify-between text-sm font-medium text-white"
                >
                  Your email
                  {errors.email && (
                    <span className="text-left font-light text-red-500">
                      {errors.email.message}
                    </span>
                  )}
                </label>
                <input
                  {...register("email", {
                    required: "Email is required",
                    pattern: {
                      value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                      message: "Please enter a valid email",
                    },
                  })}
                  type="email"
                  name="email"
                  id="email"
                  className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 outline-none duration-200 focus:border-[#2563eb]"
                  placeholder="example@example.com"
                  required
                />
              </div>

              <div>
                <label
                  htmlFor="password"
                  className="mb-2 flex flex-row items-center justify-between text-sm font-medium text-white"
                >
                  Password
                  {errors.password && (
                    <span className="text-left font-light text-red-500">
                      {errors.password.message}
                    </span>
                  )}
                </label>
                <input
                  {...register("password", {
                    required: "Password is required",
                    minLength: { value: 8, message: "Minimum Length is 8" },
                    maxLength: { value: 12, message: "Maximum Length is 12" },
                  })}
                  type="password"
                  name="password"
                  id="password"
                  placeholder="••••••••"
                  className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 outline-none duration-200 focus:border-[#2563eb]"
                  required
                />
              </div>

              <button
                disabled={isSubmitting}
                type="submit"
                className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white outline-none duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
              >
                Create Account
              </button>

              <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                Already have Account?{" "}
                <Link
                  to="/login"
                  className="font-medium text-[#3b82f6] hover:underline"
                >
                  Sign In
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
