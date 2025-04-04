import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginBackground from "../../assets/LoginBackground.png";
import LoginButton from "../../components/Buttons/LoginButton";
import { Link } from "react-router-dom";

// Types for our form and API responses
interface LoginFormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface LoginResponse {
  success: boolean;
  token?: string;
  user?: {
    id: string;
    email: string;
    name: string;
  };
  error?: string;
}

interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

export default function Login() {
  // Form state
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
    rememberMe: false,
  });

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [socialLoginLoading, setSocialLoginLoading] = useState<string | null>(
    null
  );

  const navigate = useNavigate();

  // Check if user is already logged in
  const verifyToken = React.useCallback(
    async (token: string) => {
      try {
        const response = await fetch("/api/auth/verify", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.ok) {
          // Token is valid, redirect to dashboard
          navigate("/dashboard");
        } else {
          // Token is invalid, clear it
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("authToken");
        }
      } catch (err) {
        console.error("Token verification error:", err);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      // Verify token validity with backend before redirecting
      verifyToken(token);
    }
  }, [verifyToken]);

  // Input change handler
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });

    // Clear error for this field when user starts typing
    if (errors[name as keyof ValidationErrors]) {
      setErrors({
        ...errors,
        [name]: undefined,
      });
    }
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: formData.email,
          password: formData.password,
        }),
      });

      const data: LoginResponse = await response.json();

      if (data.success && data.token) {
        handleLoginSuccess(data.token);
      } else {
        setErrors({
          general: data.error || "Login failed. Please check your credentials.",
        });
      }
    } catch (err) {
      setErrors({
        general: "Network error. Please try again later.",
      });
      console.error("Login error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Login button click handler for the new LoginButton component
  const handleLoginClick = () => {
    // This is now handled by the form submission
    // The actual logic runs in handleSubmit which is triggered by the form's onSubmit
  };

  // Social login handlers
  const handleSocialLogin = async (provider: string) => {
    setSocialLoginLoading(provider);

    try {
      // For OAuth implementations, you typically redirect to the provider's auth page
      // This is a simplified example that simulates the process
      if (provider === "google") {
        window.location.href = "/api/auth/google";
      } else if (provider === "facebook") {
        window.location.href = "/api/auth/facebook";
      }
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setSocialLoginLoading(null);
    }
  };

  // Handle successful login
  const handleLoginSuccess = (token: string) => {
    // Store token based on "remember me" preference
    if (formData.rememberMe) {
      localStorage.setItem("authToken", token);
    } else {
      sessionStorage.setItem("authToken", token);
    }

    // Redirect to dashboard
    navigate("/dashboard");
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="w-full max-w-md p-8 rounded-lg border-2 border-white backdrop-blur-sm">
        <h1 className="text-3xl font-bold text-center text-white mb-8">
          Welcome back!
        </h1>

        {errors.general && (
          <div className="mb-4 p-3 bg-red-500 bg-opacity-80 text-white rounded-md text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-white/60 bg-opacity-50 border rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email..."
            />
            {errors.email && (
              <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="mb-6">
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-white/60 bg-opacity-50 border rounded-md text-white placeholder-white focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Password..."
            />
            {errors.password && (
              <p className="mt-1 text-red-400 text-xs">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-center">
            <LoginButton isLoading={isLoading} onClick={handleLoginClick} />
          </div>

          <div className="flex items-center justify-between mt-4">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label
                htmlFor="rememberMe"
                className="ml-2 block text-sm text-white"
              >
                Remember me
              </label>
            </div>
            <div className="text-sm">
              <a
                href="/register"
                className="font-medium text-blue-300 hover:text-blue-400"
              >
                Don't have account?
              </a>
            </div>
          </div>

          <div className="mt-6 text-center text-white text-sm">
            <p>— Or Login with —</p>
            <div className="flex justify-center space-x-4 mt-4">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={socialLoginLoading !== null}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="red"
                >
                  <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                </svg>
              </button>
              <button
                type="button"
                onClick={() => handleSocialLogin("facebook")}
                disabled={socialLoginLoading !== null}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                >
                  <path d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4 20.26 20.26 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-sm text-blue-300 hover:text-blue-400"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
