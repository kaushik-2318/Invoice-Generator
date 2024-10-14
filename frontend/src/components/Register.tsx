import { Link, useNavigate } from "react-router-dom";
import { useForm, SubmitHandler } from "react-hook-form"
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

    const { register, handleSubmit, clearErrors, setError, formState: { errors, isSubmitting }, } = useForm<Inputs>()

    const navigate = useNavigate();

    const onSubmit: SubmitHandler<Inputs> = async (data) => {
        try {
            const res = await axios.post(`https://pdf-generator-r879.onrender.com/auth/register`, data);
            console.log(res);
            toast.success(res.data.message);
            navigate("/login");
        } catch (err) {
            if (axios.isAxiosError(err)) {
                const errorMessage = err.response?.data?.message || "Registration failed!";
                setError("serverError", { message: errorMessage });
                toast.error(errorMessage);
            } else {
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
            <div className="flex bg-gray-900 items-center justify-center h-screen w-full flex-col gap-5">
                <div>
                    <img className="w-60" src={Logo} alt="logo" />
                </div>
                <div className="w-full  rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl font-bold leading-tight tracking-tight text-white md:text-2xl ">
                            Create an account
                        </h1>

                        {errors.serverError && (<div className="text-red-500">{errors.serverError.message}</div>)}

                        <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)} onChange={handleInputChange}>
                            <div>
                                <label htmlFor="name" className="mb-2 text-sm font-medium text-white flex justify-between items-center flex-row" >
                                    Full Name
                                    {errors.name && (<span className="text-red-500 font-light text-left">{errors.name.message}</span>)}
                                </label>
                                <input  {...register("name", { required: "Name is required", minLength: { value: 3, message: "Minimum Length is 3" }, maxLength: { value: 50, message: "Maximum Length is 50" } })} type="text" name="name" id="name" className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-[#2563eb] block w-full p-2.5  placeholder-gray-400 outline-none duration-200" placeholder="Full Name" required />
                            </div>
                            <div>
                                <label htmlFor="email" className="mb-2 text-sm font-medium text-white flex justify-between items-center flex-row">
                                    Your email
                                    {errors.email && (<span className="text-red-500 font-light text-left">{errors.email.message}</span>)}
                                </label>
                                <input  {...register("email", { required: "Email is required", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email", } })} type="email" name="email" id="email" className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-[#2563eb] block w-full p-2.5  placeholder-gray-400 outline-none duration-200" placeholder="example@example.com" required />
                            </div>

                            <div>
                                <label htmlFor="password" className="mb-2 text-sm font-medium text-white flex justify-between items-center flex-row">
                                    Password
                                    {errors.password && (<span className="text-red-500 font-light text-left">{errors.password.message}</span>)}
                                </label>
                                <input  {...register("password", { required: "Password is required", minLength: { value: 8, message: "Minimum Length is 8" }, maxLength: { value: 12, message: "Maximum Length is 12" } })} type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-700 border border-gray-600 text-white rounded-lg focus:border-[#2563eb] block w-full p-2.5  placeholder-gray-400 outline-none duration-200" required
                                />
                            </div>

                            <button disabled={isSubmitting} type="submit" className="w-full text-white bg-blue-700 hover:bg-blue-600 disabled:bg-blue-400 disabled:cursor-not-allowed outline-none font-medium rounded-lg text-sm px-5 py-2.5 text-center duration-200">
                                Create Account
                            </button>

                            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                                Already have Account?{" "}
                                <Link to="/login" className="font-medium text-[#3b82f6] hover:underline "  >
                                    Sign In
                                </Link>
                            </p>
                        </form>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Register
