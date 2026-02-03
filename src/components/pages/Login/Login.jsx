import React, { useState } from "react";
import "./Login.css";
import { useForm } from "react-hook-form";
import useAuth from "../../../hook/useAuth";
import { useNavigate } from "react-router-dom";

const AuthCard = () => {
    const navigate = useNavigate();
    const { createUser, loginUser, googleLogin } = useAuth(); // hook থেকে সব auth functions
    const [mode, setMode] = useState("login");

    // react-hook-form setup
    const {
        register,
        handleSubmit,
        reset,
        formState: { errors },
    } = useForm();

    // LOGIN SUBMIT
    const onLogin = (data) => {
        console.log("Login Data:", data);

        loginUser(data.email, data.password) // <-- Login uses loginUser
            .then((result) => {
                console.log("Logged in user:", result.user);
                navigate("/"); // navigate after login
            })
            .catch((error) => {
                console.error("Login Error:", error.message);
                alert(error.message);
            });

        reset();
    };

    // SIGN UP SUBMIT
    const onSignup = (data) => {
        console.log("Signup Data:", data);

        createUser(data.email, data.password) // <-- Signup uses createUser
            .then((result) => {
                console.log("Created user:", result.user);
                navigate("/"); // navigate after signup
            })
            .catch((error) => {
                console.error("Signup Error:", error.message);
                alert(error.message);
            });

        reset();
    };

    // GOOGLE LOGIN
    const handleGoogleLogin = () => {
        googleLogin()
            .then((result) => {
                console.log("Google user:", result.user);
                navigate("/");
            })
            .catch((error) => console.error("Google login error:", error.message));
    };

    return (
        <div className="auth-page lg:mt-10 md:mt-20 mt-12">
            <div className="auth-card">
                {/* Tabs */}
                <div className="auth-tabs">
                    <button
                        className={mode === "login" ? "active" : ""}
                        onClick={() => {
                            setMode("login");
                            reset();
                        }}
                    >
                        Login
                    </button>

                    <button
                        className={mode === "signup" ? "active" : ""}
                        onClick={() => {
                            setMode("signup");
                            reset();
                        }}
                    >
                        Sign Up
                    </button>

                    <div className={`tab-indicator ${mode}`} />
                </div>

                {/* FORMS */}
                <div className="form-wrapper">
                    {mode === "login" ? (
                        /* LOGIN FORM */
                        <form className="auth-form" onSubmit={handleSubmit(onLogin)}>
                            <label>Email address</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <small className="error">{errors.email.message}</small>}

                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Enter your password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                })}
                            />
                            {errors.password && <small className="error">{errors.password.message}</small>}

                            <button className="primary-btn" type="submit">
                                Log In
                            </button>

                            <div className="divider">OR</div>

                            <button type="button" className="social-btn google" onClick={handleGoogleLogin}>
                                Continue with Google
                            </button>
                        </form>
                    ) : (
                        /* SIGN UP FORM */
                        <form className="auth-form" onSubmit={handleSubmit(onSignup)}>
                            <div className="name-row">
                                <div>
                                    <label>First name</label>
                                    <input
                                        type="text"
                                        placeholder="First name"
                                        {...register("firstName", { required: "First name required" })}
                                    />
                                    {errors.firstName && <small className="error">{errors.firstName.message}</small>}
                                </div>

                                <div>
                                    <label>Last name</label>
                                    <input
                                        type="text"
                                        placeholder="Last name"
                                        {...register("lastName", { required: "Last name required" })}
                                    />
                                    {errors.lastName && <small className="error">{errors.lastName.message}</small>}
                                </div>
                            </div>

                            <label>Email address</label>
                            <input
                                type="email"
                                placeholder="Enter your email address"
                                {...register("email", { required: "Email is required" })}
                            />
                            {errors.email && <small className="error">{errors.email.message}</small>}

                            <label>Mobile number</label>
                            <input
                                type="tel"
                                placeholder="01XXXXXXXXX"
                                {...register("mobile", {
                                    required: "Mobile number required",
                                    pattern: { value: /^01[0-9]{9}$/, message: "Invalid Bangladeshi number" },
                                })}
                            />
                            {errors.mobile && <small className="error">{errors.mobile.message}</small>}

                            <label>Password</label>
                            <input
                                type="password"
                                placeholder="Create a password"
                                {...register("password", {
                                    required: "Password is required",
                                    minLength: { value: 6, message: "Minimum 6 characters" },
                                })}
                            />
                            {errors.password && <small className="error">{errors.password.message}</small>}

                            <button className="primary-btn" type="submit">
                                Create an account
                            </button>

                            <div className="divider">OR</div>

                            <button type="button" className="social-btn google" onClick={handleGoogleLogin}>
                                Continue with Google
                            </button>
                        </form>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AuthCard;
