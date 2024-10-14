import { Link, useNavigate } from "react-router-dom";
import Logo from "/logo.svg";
import { useForm, SubmitHandler } from "react-hook-form"
import axios from "axios";
import { toast } from "react-toastify";


type Inputs = {
    email: string
    password: string
} & {
    serverError?: string;
};

const Login: React.FC = () => {

    const { register, handleSubmit, setError, clearErrors, formState: { errors, isSubmitting }, } = useForm<Inputs>()
    const navigate = useNavigate();


    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const response = await axios.post(`https://pdf-generator-r879.onrender.com/auth/login`, data);
            const token = response.data.token;
            if (token) {
                localStorage.setItem("token", token);
                toast.success(response.data.message);
                navigate("/addproduct");
            } else {
                setError("serverError", { message: "No token received!" });
            }
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || "Login failed!";
                setError("serverError", { message: errorMessage });
            } else if (err instanceof Error) {
                setError("serverError", { message: err.message });
            } else {
                setError("serverError", { message: "An unknown error occurred!" });
            }
        }
    };


    const handleInputChange = () => {
        clearErrors();
    };

    return (
        <>
            <div className="flex bg-gray-900 items-center justify-center h-screen w-full flex-col gap-5">
                <div>
                    <img className="w-60" src={Logo} alt="logo" />
                </div>
                <div className="w-full rounded-lg shadow dark:border md:mt-0 sm:max-w-sm xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
                            Sign in to your account
                        </h1>

                        {errors.serverError && (<div className="text-red-500">{errors.serverError.message}</div>)}

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)} onChange={handleInputChange}>
                            <div>
                                <label htmlFor="email" className="mb-2 text-sm font-medium text-white flex flex-row justify-between" >
                                    Your email
                                    {errors.email && (<span className="text-red-500 font-light">{errors.email.message}</span>)}
                                </label>
                                <input {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email", } })} type="email" name="email" id="email" className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-[#2563eb] block w-full p-2.5  placeholder-gray-400 outline-none duration-200" placeholder="example@example.com" required />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 text-sm font-medium text-white flex flex-row justify-between">
                                    Password
                                    {errors.password && (<span className="text-red-500 font-light">{errors.password.message}</span>)}

                                </label>
                                <input {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum Length is 8" }, maxLength: { value: 12, message: "Maximum Length is 12" } })} type="password" name="password" id="password" className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-[#2563eb] block w-full p-2.5  placeholder-gray-400 outline-none duration-200" placeholder="••••••••" required />
                            </div>

                            <button type="submit" disabled={isSubmitting} className="w-full text-white bg-blue-700 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-200">
                                Sign in
                            </button>
                        </form>

                        <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                            Don’t have an account yet?{" "}
                            <Link to="/register" className="font-medium text-[#3b82f6] hover:underline "  >
                                Sign up
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </>
    );
}

export default Login;
