import { useForm } from "react-hook-form";
import "./SignUp.css";
import { useNavigate } from "react-router-dom";

export default function SignUp() {
    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();

    const navigate = useNavigate();
    const password = watch("password");

    const Submit = (data) => {
        console.log(data);
        navigate("/")
    }
    return (
        <div className="SignUpContainer">
            <h1>Create an Account!</h1>

            <form onSubmit={handleSubmit(Submit)} className="SignUpform">
                <h2>Sign Up</h2>
                <input type="text"
                    placeholder="Enter your Name"
                    {...register("text", {
                        required: {
                            value: true,
                            message: "Name is required"
                        }
                    })}
                />
                {errors.text && (
                    <div className="error">
                        {errors.text.message}
                    </div>
                )}
                <input type="email"
                    placeholder="Enter your Email"
                    {...register("email", {
                        required: {
                            value: true,
                            message: "Email is required"
                        }
                    })}
                />
                {errors.email && (
                    <div className="error">
                        {errors.email.message}
                    </div>
                )}
                <input type="phone"
                    placeholder="Enter your Phone Num"
                    {...register("phone", {
                        required: {
                            value: true,
                            message: "Phone num is required"
                        }
                    })}
                />
                {errors.phone && (
                    <div className="error">
                        {errors.phone.message}
                    </div>
                )}
                <input type="text"
                    placeholder="Enter your Address"
                    {...register("text", {
                        required: {
                            value: true,
                            message: "Address is required"
                        }
                    })}
                />
                {errors.text && (
                    <div className="error">
                        {errors.text.message}
                    </div>
                )}
                <input type="password"
                    placeholder="Enter password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Enter Password...!"
                        }
                    })}
                />
                {errors.password && (
                    <div className="error">
                        {errors.password.message}
                    </div>
                )}
                <input type="password"
                    placeholder="Confirm Password"
                    {...register("Confirmpassword", {
                        required: {
                            value: true,
                            message: "Enter Confirm Password...!"
                        },
                        validate: (value) => value === password || "password do not match"
                    })} />
                {errors.ConfirmPassword && (
                    <div className="error">
                        {errors.ConfirmPassword.message}
                    </div>
                )}
                <button type="submit">
                    Sign Up
                </button>


            </form>
        </div>
    );
}