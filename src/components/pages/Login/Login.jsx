import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Eye, EyeOff, Mail, Lock, User, Phone, CheckCircle2, XCircle } from "lucide-react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import api from "../../../API/Axios";
import "./Login.css";

const AuthCard = () => {
    const navigate = useNavigate();
    const { createUser, loginUser, googleLogin } = useAuth();
    const [mode, setMode] = useState("login");
    const [showPassword, setShowPassword] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0,
        feedback: [],
        isValid: false
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    // Watch password field for real-time validation
    const password = watch("password", "");

    // Password strength validation
    React.useEffect(() => {
        if (mode === "signup" || password) {
            validatePasswordStrength(password);
        }
    }, [password, mode]);

    const validatePasswordStrength = (pwd) => {
        const feedback = [];
        let score = 0;

        // Check minimum length (8 characters)
        if (pwd.length >= 8) {
            feedback.push({ met: true, text: "At least 8 characters" });
            score++;
        } else {
            feedback.push({ met: false, text: "At least 8 characters" });
        }

        // Check uppercase letter
        if (/[A-Z]/.test(pwd)) {
            feedback.push({ met: true, text: "One uppercase letter (A-Z)" });
            score++;
        } else {
            feedback.push({ met: false, text: "One uppercase letter (A-Z)" });
        }

        // Check lowercase letter
        if (/[a-z]/.test(pwd)) {
            feedback.push({ met: true, text: "One lowercase letter (a-z)" });
            score++;
        } else {
            feedback.push({ met: false, text: "One lowercase letter (a-z)" });
        }

        // Check number
        if (/[0-9]/.test(pwd)) {
            feedback.push({ met: true, text: "One number (0-9)" });
            score++;
        } else {
            feedback.push({ met: false, text: "One number (0-9)" });
        }

        setPasswordStrength({
            score,
            feedback,
            isValid: score === 4
        });
    };

    // Get password strength label and color
    const getStrengthInfo = () => {
        if (!password) return { label: "", color: "" };

        switch (passwordStrength.score) {
            case 0:
            case 1:
                return { label: "Weak", color: "#ef4444" };
            case 2:
                return { label: "Fair", color: "#f59e0b" };
            case 3:
                return { label: "Good", color: "#3b82f6" };
            case 4:
                return { label: "Strong", color: "#10b981" };
            default:
                return { label: "", color: "" };
        }
    };

    // LOGIN SUBMIT
    const onLogin = async (data) => {
        setIsLoading(true);
        try {
            const result = await loginUser(data.email, data.password);

            // ✅ JWT GENERATE HERE
            const res = await api.post("/jwt", { email: data.email });
            localStorage.setItem("access-token", res.data.token);

            toast.success("Welcome back! 🎉");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setIsLoading(false);
            reset();
        }
    };


    // SIGN UP SUBMIT
    const onSignup = async (data) => {
        // Additional validation for signup
        if (!passwordStrength.isValid) {
            toast.error("Please meet all password requirements", {
                position: "top-right",
            });
            return;
        }

        setIsLoading(true);
        try {
            // Create user with Firebase Authentication
            await createUser(data.email, data.password);

            // Save user data to MongoDB via backend API
            const userData = {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                mobile: data.mobile
            };

            const response = await api.post("/register", userData);

            if (response.data.success) {
                toast.success("Account created successfully! 🎉", {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate("/");
            } else {
                toast.error(response.data.message || "Registration failed", {
                    position: "top-right",
                    autoClose: 4000,
                });
            }
        } catch (error) {
            toast.error(error.message || "Sign up failed. Please try again.", {
                position: "top-right",
                autoClose: 4000,
            });
        } finally {
            setIsLoading(false);
            reset();
        }
    };

    // GOOGLE LOGIN
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            // Login with Google via Firebase
            const result = await googleLogin();

            // Extract user info from Firebase result
            const user = result.user;
            const googleUserData = {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL
            };

            // Save/update user in MongoDB via backend API
            const response = await api.post("/google-login", googleUserData);

            if (response.data.success) {
                toast.success("Login successful! 🎉", {
                    position: "top-right",
                    autoClose: 3000,
                });
                navigate("/");
            } else {
                toast.error("Google login failed", {
                    position: "top-right",
                    autoClose: 4000,
                });
            }
        } catch (error) {
            toast.error(error.message || "Google login failed.", {
                position: "top-right",
                autoClose: 4000,
            });
        } finally {
            setIsLoading(false);
        }
    };

    // Switch between login and signup
    const switchMode = (newMode) => {
        setMode(newMode);
        reset();
        setShowPassword(false);
        setPasswordStrength({ score: 0, feedback: [], isValid: false });
    };

    const strengthInfo = getStrengthInfo();

    return (
        <div className="modern-auth-container mt-20">
            <div className="modern-auth-card">
                {/* Header with mode toggle */}
                <div className="auth-header">
                    <h1 className="auth-title">
                        {mode === "login" ? "Welcome Back" : "Create Account"}
                    </h1>
                    <p className="auth-subtitle">
                        {mode === "login"
                            ? "Sign in to continue to your account"
                            : "Sign up to get started"}
                    </p>
                </div>

                {/* Tab Toggle */}
                <div className="mode-toggle">
                    <button
                        type="button"
                        className={`toggle-btn ${mode === "login" ? "active" : ""}`}
                        onClick={() => switchMode("login")}
                        disabled={isLoading}
                    >
                        Login
                    </button>
                    <button
                        type="button"
                        className={`toggle-btn ${mode === "signup" ? "active" : ""}`}
                        onClick={() => switchMode("signup")}
                        disabled={isLoading}
                    >
                        Sign Up
                    </button>
                    <div className={`toggle-indicator ${mode}`} />
                </div>

                {/* Forms */}
                <div className="form-container">
                    {mode === "login" ? (
                        /* LOGIN FORM */
                        <form
                            className="auth-form fade-in"
                            onSubmit={handleSubmit(onLogin)}
                            noValidate
                        >
                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="login-email" className="form-label">
                                    Email Address
                                </label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={20} />
                                    <input
                                        id="login-email"
                                        type="email"
                                        className={`form-input ${errors.email ? "error" : ""}`}
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="error-message">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* Password Field */}
                            <div className="form-group">
                                <label htmlFor="login-password" className="form-label">
                                    Password
                                </label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={20} />
                                    <input
                                        id="login-password"
                                        type={showPassword ? "text" : "password"}
                                        className={`form-input ${errors.password ? "error" : ""}`}
                                        placeholder="Enter your password"
                                        autoComplete="current-password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 6,
                                                message: "Password must be at least 6 characters"
                                            }
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>
                                {errors.password && (
                                    <span className="error-message">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    "Log In"
                                )}
                            </button>

                            {/* Divider */}
                            <div className="divider">
                                <span>or continue with</span>
                            </div>

                            {/* Google Login */}
                            <button
                                type="button"
                                className="google-btn"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                            >
                                <svg className="google-icon" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
                                Continue with Google
                            </button>
                        </form>
                    ) : (
                        /* SIGN UP FORM */
                        <form
                            className="auth-form fade-in"
                            onSubmit={handleSubmit(onSignup)}
                            noValidate
                        >
                            {/* Name Fields */}
                            <div className="name-row">
                                <div className="form-group">
                                    <label htmlFor="firstName" className="form-label">
                                        First Name
                                    </label>
                                    <div className="input-wrapper">
                                        <User className="input-icon" size={20} />
                                        <input
                                            id="firstName"
                                            type="text"
                                            className={`form-input ${errors.firstName ? "error" : ""}`}
                                            placeholder="First name"
                                            autoComplete="given-name"
                                            {...register("firstName", {
                                                required: "First name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Too short"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.firstName && (
                                        <span className="error-message">
                                            {errors.firstName.message}
                                        </span>
                                    )}
                                </div>

                                <div className="form-group">
                                    <label htmlFor="lastName" className="form-label">
                                        Last Name
                                    </label>
                                    <div className="input-wrapper">
                                        <User className="input-icon" size={20} />
                                        <input
                                            id="lastName"
                                            type="text"
                                            className={`form-input ${errors.lastName ? "error" : ""}`}
                                            placeholder="Last name"
                                            autoComplete="family-name"
                                            {...register("lastName", {
                                                required: "Last name is required",
                                                minLength: {
                                                    value: 2,
                                                    message: "Too short"
                                                }
                                            })}
                                        />
                                    </div>
                                    {errors.lastName && (
                                        <span className="error-message">
                                            {errors.lastName.message}
                                        </span>
                                    )}
                                </div>
                            </div>

                            {/* Email Field */}
                            <div className="form-group">
                                <label htmlFor="signup-email" className="form-label">
                                    Email Address
                                </label>
                                <div className="input-wrapper">
                                    <Mail className="input-icon" size={20} />
                                    <input
                                        id="signup-email"
                                        type="email"
                                        className={`form-input ${errors.email ? "error" : ""}`}
                                        placeholder="Enter your email"
                                        autoComplete="email"
                                        {...register("email", {
                                            required: "Email is required",
                                            pattern: {
                                                value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                                message: "Invalid email address"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.email && (
                                    <span className="error-message">
                                        {errors.email.message}
                                    </span>
                                )}
                            </div>

                            {/* Mobile Field */}
                            <div className="form-group">
                                <label htmlFor="mobile" className="form-label">
                                    Mobile Number
                                </label>
                                <div className="input-wrapper">
                                    <Phone className="input-icon" size={20} />
                                    <input
                                        id="mobile"
                                        type="tel"
                                        className={`form-input ${errors.mobile ? "error" : ""}`}
                                        placeholder="01XXXXXXXXX"
                                        autoComplete="tel"
                                        {...register("mobile", {
                                            required: "Mobile number is required",
                                            pattern: {
                                                value: /^01[0-9]{9}$/,
                                                message: "Invalid Bangladeshi number"
                                            }
                                        })}
                                    />
                                </div>
                                {errors.mobile && (
                                    <span className="error-message">
                                        {errors.mobile.message}
                                    </span>
                                )}
                            </div>

                            {/* Password Field with Strength Indicator */}
                            <div className="form-group">
                                <label htmlFor="signup-password" className="form-label">
                                    Password
                                </label>
                                <div className="input-wrapper">
                                    <Lock className="input-icon" size={20} />
                                    <input
                                        id="signup-password"
                                        type={showPassword ? "text" : "password"}
                                        className={`form-input ${errors.password ? "error" : ""}`}
                                        placeholder="Create a strong password"
                                        autoComplete="new-password"
                                        {...register("password", {
                                            required: "Password is required",
                                            minLength: {
                                                value: 8,
                                                message: "Password must be at least 8 characters"
                                            },
                                            validate: () => passwordStrength.isValid || "Password does not meet requirements"
                                        })}
                                    />
                                    <button
                                        type="button"
                                        className="password-toggle"
                                        onClick={() => setShowPassword(!showPassword)}
                                        aria-label={showPassword ? "Hide password" : "Show password"}
                                    >
                                        {showPassword ? (
                                            <EyeOff size={20} />
                                        ) : (
                                            <Eye size={20} />
                                        )}
                                    </button>
                                </div>

                                {/* Password Strength Indicator */}
                                {password && (
                                    <div className="password-strength">
                                        <div className="strength-bar-container">
                                            <div
                                                className="strength-bar"
                                                style={{
                                                    width: `${(passwordStrength.score / 4) * 100}%`,
                                                    backgroundColor: strengthInfo.color
                                                }}
                                            />
                                        </div>
                                        <span
                                            className="strength-label"
                                            style={{ color: strengthInfo.color }}
                                        >
                                            {strengthInfo.label}
                                        </span>
                                    </div>
                                )}

                                {/* Password Requirements */}
                                {password && (
                                    <div className="password-requirements">
                                        {passwordStrength.feedback.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`requirement ${item.met ? "met" : "unmet"}`}
                                            >
                                                {item.met ? (
                                                    <CheckCircle2 size={16} />
                                                ) : (
                                                    <XCircle size={16} />
                                                )}
                                                <span>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                )}

                                {errors.password && (
                                    <span className="error-message">
                                        {errors.password.message}
                                    </span>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button
                                type="submit"
                                className="submit-btn"
                                disabled={isLoading}
                            >
                                {isLoading ? (
                                    <span className="loading-spinner"></span>
                                ) : (
                                    "Create Account"
                                )}
                            </button>

                            {/* Divider */}
                            <div className="divider">
                                <span>or continue with</span>
                            </div>

                            {/* Google Login */}
                            <button
                                type="button"
                                className="google-btn"
                                onClick={handleGoogleLogin}
                                disabled={isLoading}
                            >
                                <svg className="google-icon" viewBox="0 0 24 24">
                                    <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                                    <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                                    <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                                    <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                                </svg>
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