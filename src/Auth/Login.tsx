import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginBackground from "../assets/LoginBackground.png";

// Form data structure
interface LoginFormData {
  email: string;
  password: string;
}

// Validation errors structure
interface ValidationErrors {
  email?: string;
  password?: string;
  general?: string;
}

// API response type
interface LoginApiResponse {
  success: boolean;
  error?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<LoginFormData>({
    email: "",
    password: "",
  });

  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const navigate = useNavigate();

  // Handle input changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Validate form
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mock API for login
  const mockLoginApi = async (
    email: string,
    password: string
  ): Promise<LoginApiResponse> => {
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Example implementation with proper type handling
    if (email === "test@example.com" && password === "password123") {
      return { success: true };
    } else {
      return { success: false, error: "Invalid credentials" };
    }
  };

  // Handle form submission
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      const response = await mockLoginApi(formData.email, formData.password);

      if (response.success) {
        navigate("/");
      } else {
        setErrors({
          general: response.error || "Login failed. Please try again.",
        });
      }
    } catch (err) {
      setErrors({ general: "Something went wrong. Please try again." });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="w-full max-w-md p-6 rounded-lg border-2 border-white backdrop-blur-sm">
        <h1 className="text-2xl font-bold text-center text-white mb-6">
          Welcome back!
        </h1>

        {errors.general && (
          <div className="mb-4 p-2 bg-red-500 bg-opacity-80 text-white rounded-md text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3">
            <label htmlFor="email" className="block text-sm text-white mb-1">
              Email
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-white/60 border rounded-md text-black placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your email address"
            />
            {errors.email && (
              <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="mb-4">
            <label htmlFor="password" className="block text-sm text-white mb-1">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-white/60 border rounded-md text-black placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your password"
            />
            {errors.password && (
              <p className="mt-1 text-red-400 text-xs">{errors.password}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-[#FF0E4D] text-white font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0E4D] disabled:opacity-50"
          >
            {isLoading ? "Logging in..." : "Login"}
          </button>

          <div className="mt-4 text-center">
            <p className="text-sm text-white">
              Don't have an account?{" "}
              <Link
                to="/register"
                className="text-blue-300 hover:text-blue-400"
              >
                Register here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
