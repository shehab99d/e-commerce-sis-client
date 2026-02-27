import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import useAuth from "../../../hook/useAuth";
import api from "../../../API/Axios";
import './Login.css';
import {
    Eye,
    EyeOff,
    Mail,
    Lock,
    User,
    Phone,
    CheckCircle2,
    XCircle,
    LogIn,
    UserPlus,
} from "lucide-react";

const AuthCard = () => {
    const navigate = useNavigate();
    const { createUser, loginUser, googleLogin } = useAuth();

    const [mode, setMode] = useState("login");
    const [isLoading, setIsLoading] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [passwordStrength, setPasswordStrength] = useState({
        score: 0, isValid: false, feedback: [],
    });

    const {
        register,
        handleSubmit,
        reset,
        watch,
        formState: { errors },
    } = useForm();

    const password = watch("password", "");

    /* ── Mode switch ── */
    const switchMode = (newMode) => {
        setMode(newMode);
        setShowPassword(false);
        reset();
    };

    /* ── Password strength ── */
    useEffect(() => {
        if (!password) {
            setPasswordStrength({ score: 0, isValid: false, feedback: [] });
            return;
        }
        const checks = [
            { met: password.length >= 8, text: "At least 8 characters" },
            { met: /[A-Z]/.test(password), text: "One uppercase letter" },
            { met: /[a-z]/.test(password), text: "One lowercase letter" },
            { met: /[0-9]/.test(password), text: "One number" },
        ];
        const score = checks.filter(c => c.met).length;
        setPasswordStrength({ score, isValid: score === 4, feedback: checks });
    }, [password]);

    const strengthLabel = ["", "Weak", "Fair", "Good", "Strong"][passwordStrength.score];

    /* ── Login ── */
    const onLogin = async (data) => {
        setIsLoading(true);
        try {
            await loginUser(data.email, data.password);
            toast.success("Welcome back!");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Login failed");
        } finally {
            setIsLoading(false);
            reset();
        }
    };

    /* ── Sign up ── */
    const onSignup = async (data) => {
        if (!passwordStrength.isValid) {
            toast.error("Password does not meet requirements");
            return;
        }
        setIsLoading(true);
        try {
            await createUser(data.email, data.password);
            const res = await api.post("/register", {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                mobile: data.mobile,
            });
            if (!res.data.success) throw new Error(res.data.message || "Registration failed");
            toast.success("Account created successfully!");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Signup failed");
        } finally {
            setIsLoading(false);
            reset();
        }
    };

    /* ── Google login ── */
    const handleGoogleLogin = async () => {
        setIsLoading(true);
        try {
            const result = await googleLogin();
            const user = result.user;
            await api.post("/google-login", {
                displayName: user.displayName,
                email: user.email,
                photoURL: user.photoURL,
            });
            toast.success("Login successful!");
            navigate("/");
        } catch (error) {
            toast.error(error.message || "Google login failed");
        } finally {
            setIsLoading(false);
        }
    };

    /* ── Google SVG ── */
    const GoogleIcon = () => (
        <svg className="google-icon" viewBox="0 0 24 24" width="18" height="18">
            <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
            <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
            <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
            <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
        </svg>
    );

    return (
        <div className="auth-page mt-20">
            <div className="auth-card">

                {/* ── Header ── */}
                <div className="auth-header">
                    <div className="auth-icon-wrap">
                        {mode === "login" ? <LogIn size={22} /> : <UserPlus size={22} />}
                    </div>
                    <h1 className="auth-title">
                        {mode === "login" ? "Welcome back" : "Create account"}
                    </h1>
                    <p className="auth-subtitle">
                        {mode === "login"
                            ? "Sign in to continue to your account"
                            : "Sign up to get started today"}
                    </p>
                </div>

                {/* ── Tab Toggle ── */}
                <div className="auth-tabs">
                    <div className={`auth-tab-slider${mode === "signup" ? " signup" : ""}`} />
                    {["login", "signup"].map(m => (
                        <button
                            key={m}
                            type="button"
                            className={`auth-tab${mode === m ? " active" : ""}`}
                            onClick={() => switchMode(m)}
                            disabled={isLoading}
                        >
                            {m === "login" ? "Login" : "Sign Up"}
                        </button>
                    ))}
                </div>

                {/* ══════════ LOGIN FORM ══════════ */}
                {mode === "login" && (
                    <form onSubmit={handleSubmit(onLogin)} noValidate className="auth-form" key="login">

                        {/* Email */}
                        <div className="fc">
                            <label className="fc-label">Email Address</label>
                            <div className="fc-input-wrap">
                                <span className="fc-icon"><Mail size={15} /></span>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className={`fc-input${errors.email ? " is-error" : ""}`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && <span className="fc-error">{errors.email.message}</span>}
                        </div>

                        {/* Password */}
                        <div className="fc">
                            <label className="fc-label">Password</label>
                            <div className="fc-input-wrap">
                                <span className="fc-icon"><Lock size={15} /></span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Enter your password"
                                    autoComplete="current-password"
                                    className={`fc-input${errors.password ? " is-error" : ""}`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 6, message: "Minimum 6 characters" },
                                    })}
                                />
                                <button
                                    type="button"
                                    className="pw-toggle"
                                    onClick={() => setShowPassword(v => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {errors.password && <span className="fc-error">{errors.password.message}</span>}
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? <span className="spinner" /> : "Log In"}
                        </button>

                        {/* Divider */}
                        <div className="auth-divider"><span>OR CONTINUE WITH</span></div>

                        {/* Google */}
                        <button type="button" className="google-btn" onClick={handleGoogleLogin} disabled={isLoading}>
                            <GoogleIcon />
                            Continue with Google
                        </button>

                    </form>
                )}

                {/* ══════════ SIGNUP FORM ══════════ */}
                {mode === "signup" && (
                    <form onSubmit={handleSubmit(onSignup)} noValidate className="auth-form" key="signup">

                        {/* Name row */}
                        <div className="name-grid">
                            <div className="fc">
                                <label className="fc-label">First Name</label>
                                <div className="fc-input-wrap">
                                    <span className="fc-icon"><User size={15} /></span>
                                    <input
                                        type="text"
                                        placeholder="First"
                                        autoComplete="given-name"
                                        className={`fc-input${errors.firstName ? " is-error" : ""}`}
                                        {...register("firstName", {
                                            required: "Required",
                                            minLength: { value: 2, message: "Too short" },
                                        })}
                                    />
                                </div>
                                {errors.firstName && <span className="fc-error">{errors.firstName.message}</span>}
                            </div>
                            <div className="fc">
                                <label className="fc-label">Last Name</label>
                                <div className="fc-input-wrap">
                                    <span className="fc-icon"><User size={15} /></span>
                                    <input
                                        type="text"
                                        placeholder="Last"
                                        autoComplete="family-name"
                                        className={`fc-input${errors.lastName ? " is-error" : ""}`}
                                        {...register("lastName", {
                                            required: "Required",
                                            minLength: { value: 2, message: "Too short" },
                                        })}
                                    />
                                </div>
                                {errors.lastName && <span className="fc-error">{errors.lastName.message}</span>}
                            </div>
                        </div>

                        {/* Email */}
                        <div className="fc">
                            <label className="fc-label">Email Address</label>
                            <div className="fc-input-wrap">
                                <span className="fc-icon"><Mail size={15} /></span>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    autoComplete="email"
                                    className={`fc-input${errors.email ? " is-error" : ""}`}
                                    {...register("email", {
                                        required: "Email is required",
                                        pattern: {
                                            value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                            message: "Invalid email address",
                                        },
                                    })}
                                />
                            </div>
                            {errors.email && <span className="fc-error">{errors.email.message}</span>}
                        </div>

                        {/* Mobile */}
                        <div className="fc">
                            <label className="fc-label">Mobile Number</label>
                            <div className="fc-input-wrap">
                                <span className="fc-icon"><Phone size={15} /></span>
                                <input
                                    type="tel"
                                    placeholder="01XXXXXXXXX"
                                    autoComplete="tel"
                                    className={`fc-input${errors.mobile ? " is-error" : ""}`}
                                    {...register("mobile", {
                                        required: "Mobile number is required",
                                        pattern: {
                                            value: /^01[0-9]{9}$/,
                                            message: "Invalid Bangladeshi number",
                                        },
                                    })}
                                />
                            </div>
                            {errors.mobile && <span className="fc-error">{errors.mobile.message}</span>}
                        </div>

                        {/* Password */}
                        <div className="fc">
                            <label className="fc-label">Password</label>
                            <div className="fc-input-wrap">
                                <span className="fc-icon"><Lock size={15} /></span>
                                <input
                                    type={showPassword ? "text" : "password"}
                                    placeholder="Create a strong password"
                                    autoComplete="new-password"
                                    className={`fc-input${errors.password ? " is-error" : ""}`}
                                    {...register("password", {
                                        required: "Password is required",
                                        minLength: { value: 8, message: "Minimum 8 characters" },
                                        validate: () => passwordStrength.isValid || "Password does not meet requirements",
                                    })}
                                />
                                <button
                                    type="button"
                                    className="pw-toggle"
                                    onClick={() => setShowPassword(v => !v)}
                                    aria-label={showPassword ? "Hide password" : "Show password"}
                                >
                                    {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                </button>
                            </div>
                            {errors.password && <span className="fc-error">{errors.password.message}</span>}

                            {/* Strength meter */}
                            {password && (
                                <div className="pw-strength">
                                    <div className="pw-strength-bar-row">
                                        <div className="pw-strength-track">
                                            <div
                                                className="pw-strength-fill"
                                                data-score={passwordStrength.score}
                                            />
                                        </div>
                                        <span
                                            className="pw-strength-label"
                                            data-score={passwordStrength.score}
                                        >
                                            {strengthLabel}
                                        </span>
                                    </div>
                                    <div className="pw-checklist">
                                        {passwordStrength.feedback.map((item, i) => (
                                            <div key={i} className={`pw-check ${item.met ? "met" : "unmet"}`}>
                                                {item.met
                                                    ? <CheckCircle2 size={12} />
                                                    : <XCircle size={12} />
                                                }
                                                <span>{item.text}</span>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            )}
                        </div>

                        {/* Submit */}
                        <button type="submit" className="submit-btn" disabled={isLoading}>
                            {isLoading ? <span className="spinner" /> : "Create Account"}
                        </button>

                        {/* Divider */}
                        <div className="auth-divider"><span>OR CONTINUE WITH</span></div>

                        {/* Google */}
                        <button type="button" className="google-btn" onClick={handleGoogleLogin} disabled={isLoading}>
                            <GoogleIcon />
                            Continue with Google
                        </button>

                    </form>
                )}

            </div>
        </div>
    );
};

export default AuthCard;