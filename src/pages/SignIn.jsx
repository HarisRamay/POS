import { useForm } from "react-hook-form";
import "./SignIn.css";
import { Link, useNavigate } from "react-router-dom";

export default function SignIn() {
    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm();

    const navigate = useNavigate();

    const Submit = (data) => {
        console.log(data);

        navigate("/mainpage")
    }
    return (
        <div className="FormContainer">
               <h1>Welcome back!</h1>
            <form onSubmit={handleSubmit(Submit)} className="form">
                <h2>Login</h2>
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
                <input type="password"
                    placeholder="Enter your password"
                    {...register("password", {
                        required: {
                            value: true,
                            message: "Password is required"
                        },
                        minLength:{
                            value:7,
                            message:"Min Value should be 7"
                        }
                    })}
                />
                {errors.password && (
                    <div className="error">
                        {errors.password.message}
                    </div>
                )}
                <button type="submit">
                    Login
                </button>
                <p>
                    Don't have an account?<Link to="/signup">Sign Up</Link>
                </p>

            </form>
        </div>
    );
}