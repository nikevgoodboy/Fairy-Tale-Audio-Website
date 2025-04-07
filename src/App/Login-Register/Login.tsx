import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import LoginBackground from "../../assets/LoginBackground.png";
import LoginButton from "../../components/Buttons/LoginButton";
import { Link } from "react-router-dom";

// Mock user database
const MOCK_USERS = [
  {
    id: "user-1",
    email: "user@example.com",
    password: "password123",
    name: "Demo User",
  },
  {
    id: "user-2",
    email: "ksdf71464@gmail.com",
    password: "Admin1245",
    name: "Admin User",
  },
];

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
        // Mock token verification delay
        setIsLoading(true);
        await new Promise((resolve) => setTimeout(resolve, 800));

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
      } finally {
        setIsLoading(false);
      }
    },
    [navigate]
  );

  useEffect(() => {
    const token =
      localStorage.getItem("authToken") || sessionStorage.getItem("authToken");
    if (token) {
      // Verify token validity before redirecting
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

  // Mock API call to simulate backend authentication
  const mockLoginApi = async (
    email: string,
    password: string
  ): Promise<LoginResponse> => {
    // Simulate API delay
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Find user in our mock database
    const user = MOCK_USERS.find(
      (u) => u.email === email && u.password === password
    );

    if (user) {
      // Create a mock JWT token with expiration
      const now = Date.now();
      const expiresIn = 60 * 60 * 24; // 24 hours in seconds

      const header = btoa(JSON.stringify({ alg: "HS256", typ: "JWT" }));
      const payload = btoa(
        JSON.stringify({
          sub: user.id,
          name: user.name,
          email: user.email,
          iat: Math.floor(now / 1000),
          exp: Math.floor(now / 1000) + expiresIn,
        })
      );
      const signature = btoa("mock-signature"); // In real world, this would be cryptographically signed

      const token = `${header}.${payload}.${signature}`;

      return {
        success: true,
        token,
        user: {
          id: user.id,
          email: user.email,
          name: user.name,
        },
      };
    } else {
      // Failed login attempt
      return {
        success: false,
        error: "Invalid email or password",
      };
    }
  };

  // Form submission handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsLoading(true);

    try {
      // Call our mock API instead of a real backend
      const data = await mockLoginApi(formData.email, formData.password);

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

  // Login button click handler
  const handleLoginClick = () => {
    // This is now handled by form submission
    // The actual logic runs in handleSubmit which is triggered by the form's onSubmit
  };

  // Social login handlers
  const handleSocialLogin = async (provider: string) => {
    setSocialLoginLoading(provider);

    try {
      // Simulate OAuth flow delay
      await new Promise((resolve) => setTimeout(resolve, 1500));

      // Create a mock user for social login
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

      // Store token in localStorage (social login typically remembers user)
      localStorage.setItem("authToken", token);

      // Redirect to Home
      navigate("/");
    } catch (err) {
      console.error(`${provider} login error:`, err);
      setErrors({
        general: `${provider} login failed. Please try again later.`,
      });
    } finally {
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

    // Redirect to Home
    navigate("/");
  };

  return (
    <section
      className="min-h-screen flex items-center justify-center bg-cover bg-center p-4"
      style={{ backgroundImage: `url(${LoginBackground})` }}
    >
      <div className="w-full max-w-sm sm:max-w-md p-6 sm:p-8 rounded-lg border-2 border-white backdrop-blur-sm">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-white mb-6 sm:mb-8">
          Welcome back!
        </h1>

        {errors.general && (
          <div className="mb-3 p-2 bg-red-500 bg-opacity-80 text-white rounded-md text-xs sm:text-sm">
            {errors.general}
          </div>
        )}

        <form onSubmit={handleSubmit}>
          <div className="mb-3 sm:mb-4">
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
              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/60 bg-opacity-50 border rounded-md text-white placeholder-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] ${
                errors.email ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Email..."
            />
            {errors.email && (
              <p className="mt-1 text-red-400 text-xs">{errors.email}</p>
            )}
          </div>

          <div className="mb-4 sm:mb-6">
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
              className={`w-full px-2 sm:px-3 py-1.5 sm:py-2 bg-white/60 bg-opacity-50 border rounded-md text-white placeholder-white text-sm sm:text-base focus:outline-none focus:ring-2 focus:ring-[#FF0E4D] ${
                errors.password ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Password..."
            />
            {errors.password && (
              <p className="mt-1 text-red-400 text-xs">{errors.password}</p>
            )}
          </div>

          <div className="flex justify-center mb-3 sm:mb-4">
            <LoginButton isLoading={isLoading} onClick={handleLoginClick} />
          </div>

          <div className="flex flex-col sm:flex-row items-center justify-between gap-2 sm:gap-0 text-xs sm:text-sm mt-2 sm:mt-4">
            <div className="flex items-center">
              <input
                id="rememberMe"
                name="rememberMe"
                type="checkbox"
                checked={formData.rememberMe}
                onChange={handleChange}
                className="h-3 sm:h-4 w-3 sm:w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="rememberMe" className="ml-2 text-white">
                Remember me
              </label>
            </div>
            <Link to="/register" className="text-blue-300 hover:text-blue-400">
              Don't have account?
            </Link>
          </div>

          <div className="mt-4 sm:mt-6 text-center text-white text-xs sm:text-sm">
            <p>— Or Login with —</p>
            <div className="flex justify-center space-x-3 sm:space-x-4 mt-3 sm:mt-4">
              <button
                type="button"
                onClick={() => handleSocialLogin("google")}
                disabled={socialLoginLoading !== null}
                className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
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
                className="p-1.5 sm:p-2 bg-white rounded-full hover:bg-gray-100 transition-colors disabled:opacity-50"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="#1877F2"
                >
                  <path d="M20.9 2H3.1A1.1 1.1 0 0 0 2 3.1v17.8A1.1 1.1 0 0 0 3.1 22h9.58v-7.75h-2.6v-3h2.6V9a3.64 3.64 0 0 1 3.88-4 20.26 20.26 0 0 1 2.33.12v2.7H17.3c-1.26 0-1.5.6-1.5 1.47v1.93h3l-.39 3H15.8V22h5.1a1.1 1.1 0 0 0 1.1-1.1V3.1A1.1 1.1 0 0 0 20.9 2z" />
                </svg>
              </button>
            </div>
          </div>

          <div className="mt-3 sm:mt-4 text-center">
            <Link
              to="/forgot-password"
              className="text-xs sm:text-sm text-blue-300 hover:text-blue-400"
            >
              Forgot your password?
            </Link>
          </div>
        </form>
      </div>
    </section>
  );
}
