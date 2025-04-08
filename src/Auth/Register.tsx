import React, { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import LoginBackground from "../assets/LoginBackground.png";

// Types for our form and API responses
interface RegisterFormData {
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
  agreeToTerms: boolean;
}

interface RegisterResponse {
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
  fullName?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  agreeToTerms?: string;
  general?: string;
}

export default function Register() {
  // Form state
  const [formData, setFormData] = useState<RegisterFormData>({
    fullName: "",
    email: "",
    password: "",
    confirmPassword: "",
    agreeToTerms: false,
  });

  // UI state
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errors, setErrors] = useState<ValidationErrors>({});
  const [passwordStrength, setPasswordStrength] = useState<number>(0);
  const [socialRegisterLoading, setSocialRegisterLoading] = useState<
    string | null
  >(null);
  const [photo, setPhoto] = useState<File | null>(null);
  const [photoPreview, setPhotoPreview] = useState<string | null>(null);

  const navigate = useNavigate();

  // Check if user is already logged in
  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      try {
        // Parse the token to get user info
        const tokenData = JSON.parse(atob(token.split(".")[1]));
        const now = Date.now() / 1000;

        if (tokenData && tokenData.exp > now) {
          // Token is valid, redirect to Home
          navigate("/");
        } else {
          // Token is expired, clear it
          localStorage.removeItem("authToken");
          sessionStorage.removeItem("authToken");
        }
      } catch (err) {
        console.error("Token verification error:", err);
        localStorage.removeItem("authToken");
        sessionStorage.removeItem("authToken");
      }
    }
  }, [navigate]);

  // Calculate password strength
  useEffect(() => {
    if (!formData.password) {
      setPasswordStrength(0);
      return;
    }

    let strength = 0;
    // Length check
    if (formData.password.length >= 8) strength += 25;
    // Contains number
    if (/\d/.test(formData.password)) strength += 25;
    // Contains lowercase
    if (/[a-z]/.test(formData.password)) strength += 25;
    // Contains uppercase or special char
    if (
      /[A-Z]/.test(formData.password) ||
      /[^a-zA-Z0-9]/.test(formData.password)
    )
      strength += 25;

    setPasswordStrength(strength);
  }, [formData.password]);

  // Handle photo change and preview
  const handlePhotoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setPhoto(file);

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    } else {
      setPhotoPreview(null);
    }
  };

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

  // Get strength color for password meter
  const getStrengthColor = () => {
    if (passwordStrength < 50) return "bg-red-500";
    if (passwordStrength < 75) return "bg-yellow-500";
    return "bg-green-500";
  };

  // Get strength text
  const getStrengthText = () => {
    if (passwordStrength === 0) return "";
    if (passwordStrength < 50) return "Weak";
    if (passwordStrength < 75) return "Medium";
    if (passwordStrength < 100) return "Strong";
    return "Very Strong";
  };

  // Form validation
  const validateForm = (): boolean => {
    const newErrors: ValidationErrors = {};

    // Full name validation
    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required";
    }

    // Email validation
    if (!formData.email) {
      newErrors.email = "Email is required";
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Email is invalid";
    }

    // Password validation
    if (!formData.password) {
      newErrors.password = "Password is required";
    } else if (formData.password.length < 8) {
      newErrors.password = "Password must be at least 8 characters";
    } else if (passwordStrength < 50) {
      newErrors.password = "Password is too weak";
    }

    // Confirm password validation
    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your password";
    } else if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match";
    }

    // Terms agreement validation
    if (!formData.agreeToTerms) {
      newErrors.agreeToTerms = "You must agree to the terms and conditions";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Mock API call for registration
  const mockRegisterApi = async (
    fullName: string,
    email: string,
    photoUrl?: string
  ): Promise<RegisterResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Check if email is already registered (mock check)
    const isEmailTaken = Math.random() < 0.2; // 20% chance email is taken for demo

    if (isEmailTaken) {
      return {
        success: false,
        error: "Email is already registered",
      };
    }

    // Create user ID
    const userId = `user-${Date.now()}`;

    // Create a mock JWT token with expiration
    const now = Date.now();
    const expiresIn = 60 * 60 * 24; // 24 hours in seconds

    const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
    const payload = btoa(
      JSON.stringify({
        sub: userId,
        name: fullName,
        email: email,
        photo: photoUrl,
        iat: Math.floor(now / 1000),
        exp: Math.floor(now / 1000) + expiresIn,
      })
    );
    const signature = btoa("mock-signature");

    const token = `${header}.${payload}.${signature}`;

    return {
      success: true,
      token,
      user: {
        id: userId,
        email: email,
        name: fullName,
      },
    };
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Process photo if available
      let photoUrl = null;
      if (photo && photoPreview) {
        photoUrl = photoPreview;
      }

      const data = await mockRegisterApi(
        formData.fullName,
        formData.email,
        formData.password
      );

      if (data.success && data.token) {
        // Store token in localStorage
        localStorage.setItem("authToken", data.token);

        // Store user profile data
        const userData = {
          fullName: formData.fullName,
          email: formData.email,
          photo: photoUrl,
          favorites: [],
        };
        localStorage.setItem("userData", JSON.stringify(userData));

        // Redirect to Home
        navigate("/");
      } else {
        setErrors({
          general: data.error || "Registration failed. Please try again.",
        });
      }
    } catch (err) {
      setErrors({
        general: "Network error. Please try again later.",
      });
      console.error("Registration error:", err);
    } finally {
      setIsLoading(false);
    }
  };

  // Social registration handlers
  const handleSocialRegister = async (provider: string) => {
    setSocialRegisterLoading(provider);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create a mock user for social registration
      const socialUser = {
        id: `social-${provider}-${Date.now()}`,
        email: `${provider}.user@example.com`,
        name: `${provider.charAt(0).toUpperCase() + provider.slice(1)} User`,
      };

      // Create mock token
      const now = Date.now();
      const expiresIn = 60 * 60 * 24; // 24 hours in seconds

      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          sub: socialUser.id,
          name: socialUser.name,
          email: socialUser.email,
          provider,
          iat: Math.floor(now / 1000),
          exp: Math.floor(now / 1000) + expiresIn,
        })
      );
      const signature = btoa("mock-signature");

      const token = `${header}.${payload}.${signature}`;

      // Store token in localStorage
      localStorage.setItem("authToken", token);

      // Store user profile data
      const userData = {
        fullName: socialUser.name,
        email: socialUser.email,
        photo: null,
        favorites: [],
      };
      localStorage.setItem("userData", JSON.stringify(userData));

      // Redirect to Home
      navigate("/");
    } catch (err) {
      console.error(`${provider} registration error:`, err);
      setErrors({
        general: `${provider} registration failed. Please try again later.`,
      });
    } finally {
      setSocialRegisterLoading(null);
    }
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="w-full max-w-md p-6 sm:p-8 rounded-lg border-2 border-white backdrop-blur-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8">
          Create Account
        </h1>

        {errors.general && (
          <div className="mb-4 p-2 bg-red-500 bg-opacity-80 text-white rounded-md text-xs sm:text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          {/* Profile photo upload */}
          <div className="mb-4 flex flex-col items-center">
            <div className="w-20 h-20 bg-white/60 rounded-full mb-2 overflow-hidden flex items-center justify-center">
              {photoPreview ? (
                <img
                  src={photoPreview}
                  alt="Profile Preview"
                  className="w-full h-full object-cover"
                />
              ) : (
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  className="w-12 h-12 text-gray-400"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1}
                    d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                  />
                </svg>
              )}
            </div>
            <label
              htmlFor="photo"
              className="cursor-pointer text-xs text-blue-300 hover:text-blue-400"
            >
              {photoPreview ? "Change photo" : "Add profile photo"}
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handlePhotoChange}
                className="hidden"
              />
            </label>
          </div>

          <div className="mb-3">
            <label
              htmlFor="fullName"
              className="block text-xs sm:text-sm text-white mb-1"
            >
              Full Name
            </label>
            <input
              type="text"
              id="fullName"
              name="fullName"
              value={formData.fullName}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-white/60 border rounded-md text-black placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] ${
                errors.fullName ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Your full name"
            />
            {errors.fullName && (
              <p className="mt-1 text-red-400 text-xs">{errors.fullName}</p>
            )}
          </div>

          <div className="mb-3">
            <label
              htmlFor="email"
              className="block text-xs sm:text-sm text-white mb-1"
            >
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

          <div className="mb-3">
            <label
              htmlFor="password"
              className="block text-xs sm:text-sm text-white mb-1"
            >
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
              placeholder="Create a password"
            />
            {/* Password strength meter */}
            {formData.password && (
              <div className="mt-1">
                <div className="w-full bg-gray-300 rounded-full h-1.5">
                  <div
                    className={`h-1.5 rounded-full ${getStrengthColor()}`}
                    style={{ width: `${passwordStrength}%` }}
                  ></div>
                </div>
                <p className="text-xs text-white mt-1">
                  Password strength: {getStrengthText()}
                </p>
              </div>
            )}
            {errors.password && (
              <p className="mt-1 text-red-400 text-xs">{errors.password}</p>
            )}
          </div>

          <div className="mb-4">
            <label
              htmlFor="confirmPassword"
              className="block text-xs sm:text-sm text-white mb-1"
            >
              Confirm Password
            </label>
            <input
              type="password"
              id="confirmPassword"
              name="confirmPassword"
              value={formData.confirmPassword}
              onChange={handleChange}
              className={`w-full px-3 py-2 bg-white/60 border rounded-md text-black placeholder-gray-600 text-sm focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] ${
                errors.confirmPassword ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Confirm your password"
            />
            {errors.confirmPassword && (
              <p className="mt-1 text-red-400 text-xs">
                {errors.confirmPassword}
              </p>
            )}
          </div>

          <div className="mb-5">
            <div className="flex items-start">
              <input
                id="agreeToTerms"
                name="agreeToTerms"
                type="checkbox"
                checked={formData.agreeToTerms}
                onChange={handleChange}
                className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded mt-0.5"
              />
              <label
                htmlFor="agreeToTerms"
                className="ml-2 block text-xs text-white"
              >
                I agree to the{" "}
                <a
                  href="/terms"
                  className="text-blue-300 hover:text-blue-400 underline"
                >
                  Terms of Service
                </a>{" "}
                and{" "}
                <a
                  href="/privacy"
                  className="text-blue-300 hover:text-blue-400 underline"
                >
                  Privacy Policy
                </a>
              </label>
            </div>
            {errors.agreeToTerms && (
              <p className="mt-1 text-red-400 text-xs">{errors.agreeToTerms}</p>
            )}
          </div>

          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-[#FF0E4D] text-white font-medium rounded-md hover:opacity-90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[#FF0E4D] disabled:opacity-50"
          >
            {isLoading ? (
              <div className="flex items-center justify-center">
                <svg
                  className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <circle
                    className="opacity-25"
                    cx="12"
                    cy="12"
                    r="10"
                    stroke="currentColor"
                    strokeWidth="4"
                  ></circle>
                  <path
                    className="opacity-75"
                    fill="currentColor"
                    d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                  ></path>
                </svg>
                Creating Account...
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          <div className="mt-5 text-center text-white text-xs sm:text-sm">
            <p>— Or Register with —</p>
            <div className="flex justify-center space-x-4 mt-3">
              <button
                type="button"
                onClick={() => handleSocialRegister("google")}
                disabled={socialRegisterLoading !== null}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center"
                aria-label="Sign up with Google"
              >
                {socialRegisterLoading === "google" ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="red"
                  >
                    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.95-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
                  </svg>
                )}
              </button>
              <button
                type="button"
                onClick={() => handleSocialRegister("facebook")}
                disabled={socialRegisterLoading !== null}
                className="p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50 flex items-center justify-center"
                aria-label="Sign up with Facebook"
              >
                {socialRegisterLoading === "facebook" ? (
                  <svg
                    className="animate-spin h-5 w-5 text-gray-600"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle
                      className="opacity-25"
                      cx="12"
                      cy="12"
                      r="10"
                      stroke="currentColor"
                      strokeWidth="4"
                    ></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                    ></path>
                  </svg>
                ) : (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="#1877F2"
                  >
                    <path d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4 20.26 20.26 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="mt-4 text-center">
            <p className="text-sm text-white">
              Already have an account?{" "}
              <Link to="/login" className="text-blue-300 hover:text-blue-400">
                Login here
              </Link>
            </p>
          </div>
        </form>
      </div>
    </section>
  );
}
