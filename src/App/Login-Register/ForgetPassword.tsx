import React, { useState } from "react";
import { Link } from "react-router-dom";
import LoginBackground from "../../assets/LoginBackground.png";

// Removed unused ForgotPasswordFormData interface

interface ValidationErrors {
  email?: string;
  general?: string;
}

export default function ForgotPassword() {
  // State for form data, UI states, and validation
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [isSubmitted, setIsSubmitted] = useState(false);

  // Input change handler
  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(e.target.value);

    // Clear error when user types
    if (errors.email) {
      setErrors((prev) => ({ ...prev, email: undefined }));
    }
  };

  // Validate email format
  const validateEmail = (): boolean => {
    const newErrors: ValidationErrors = {};

    if (!email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = "Please enter a valid email address";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateEmail()) {
      return;
    }

    setIsLoading(true);

    try {
      // API call to request password reset
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setIsSubmitted(true);
      } else {
        setErrors({
          general:
            data.error || "Failed to process your request. Please try again.",
        });
      }
    } catch (err) {
      setErrors({
        general: "Network error. Please try again later.",
      });
      console.error("Forgot password error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="w-full max-w-md p-8 rounded-lg border-2 border-white backdrop-blur-sm">
        {!isSubmitted ? (
          <>
            <h1 className="text-3xl font-bold text-center text-white mb-4">
              Forgot Password
            </h1>
            <p className="text-gray-300 text-center mb-8">
              Enter your email address and we'll send you instructions to reset
              your password.
            </p>

            {errors.general && (
              <div className="mb-4 p-3 bg-red-500 bg-opacity-80 text-white rounded-md text-sm">
                {errors.general}
              </div>
            )}

            <form onSubmit={handleSubmit}>
              <div className="mb-6">
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-white mb-1"
                >
                  Email Address
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  onChange={handleEmailChange}
                  className={`w-full px-3 py-2 bg-white bg-opacity-20 border rounded-md text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                    errors.email ? "border-red-500" : "border-gray-300"
                  }`}
                  placeholder="Enter your email..."
                />
                {errors.email && (
                  <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
                )}
              </div>

              {/* Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white font-medium bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
              >
                {isLoading ? "Sending..." : "Reset Password"}
              </button>

              <div className="mt-6 text-center">
                <Link
                  to="/login"
                  className="text-blue-300 hover:text-blue-400 text-sm"
                >
                  Back to Login
                </Link>
              </div>
            </form>
          </>
        ) : (
          <div className="text-center">
            <div className="bg-green-500 bg-opacity-20 p-4 rounded-full inline-flex items-center justify-center mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-10 w-10 text-green-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M5 13l4 4L19 7"
                />
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-white mb-2">
              Check Your Email
            </h2>
            <p className="text-gray-300 mb-6">
              We've sent password reset instructions to:
              <br />
              <span className="font-medium text-blue-300">{email}</span>
            </p>
            <p className="text-gray-400 text-sm mb-6">
              If you don't receive an email within a few minutes, please check
              your spam folder or try again with a different email address.
            </p>
            <div className="flex flex-col space-y-3">
              <button
                onClick={() => setIsSubmitted(false)}
                className="py-2 px-4 border border-gray-300 rounded-md text-white hover:bg-white hover:bg-opacity-10 transition-colors"
              >
                Try another email
              </button>
              <Link
                to="/login"
                className="py-2 px-4 border border-transparent text-white bg-blue-600 rounded-md hover:bg-blue-700 transition-colors"
              >
                Return to login
              </Link>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
