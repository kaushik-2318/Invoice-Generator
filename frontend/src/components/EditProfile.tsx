import { useForm } from "react-hook-form";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

type Inputs = {
    name: string;
    email: string;
    password: string;
} & {
    serverError?: string;
};

function EditProfile() {

    const { register, handleSubmit, formState: { errors, isSubmitting }, } = useForm<Inputs>();

    const navigate = useNavigate();
    const onSubmit = async (data: Inputs) => {
        try {
            const token = localStorage.getItem("token");
            await axios.post(`${import.meta.env.VITE_REACT_API_URI}/auth/update`, data, {
                headers: {
                    Authorization: `Bearer ${token}`,
                }
            })
                .then(() => {
                    toast.success('Profile updated successfully.');
                    navigate('/');
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.error('Error updating profile:', error);
        }
    };

    return (
        <div className="bg-gray-900 text-white min-h-screen flex flex-col items-center justify-start">
            <div className='px-5 font-["Exo"] w-[70%]'>
                <h1 className='py-10 font-["Exo"] text-3xl font-bold text-white md:text-5xl w-full '>
                    Edit Profile
                </h1>

                <form className="space-y-4 md:space-y-6" onSubmit={handleSubmit(onSubmit)}>
                    <div>
                        <label htmlFor="name" className="mb-2 flex flex-row items-center justify-between text-sm font-medium text-white">
                            New Name
                            {errors.name && (
                                <span className="text-left font-light text-red-500">
                                    {errors.name.message}
                                </span>
                            )}
                        </label>
                        <input {...register("name", { minLength: { value: 3, message: "Minimum Length is 3" }, maxLength: { value: 50, message: "Maximum Length is 50" } })} type="text" name="name" id="name" className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 outline-none duration-200 focus:border-[#2563eb]" placeholder="Enter new name" />
                    </div>
                    <div>
                        <label htmlFor="email" className="mb-2 flex flex-row items-center justify-between text-sm font-medium text-white">
                            New email
                            {errors.email && (
                                <span className="text-left font-light text-red-500">
                                    {errors.email.message}
                                </span>
                            )}
                        </label>
                        <input {...register("email", { pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/, message: "Please enter a valid email" } })} type="email" name="email" id="email" className="block w-full rounded-lg border border-gray-600 bg-gray-700 p-2.5 text-white placeholder-gray-400 outline-none duration-200 focus:border-[#2563eb]" placeholder="Enter new Email" />
                    </div>

                    <button disabled={isSubmitting} type="submit" className="w-full rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white outline-none duration-200 hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400">
                        Change
                    </button>

                </form>

            </div>
        </div>
    )
}

export default EditProfile