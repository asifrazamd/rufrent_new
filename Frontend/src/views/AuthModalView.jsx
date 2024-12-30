/* eslint-disable react/prop-types */
// eslint-disable-next-line no-unused-vars
import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router";
import { Check, X } from "lucide-react";
import axios from "axios";
import Cookies from "js-cookie";
import { useRoleStore } from "../store/roleStore";

const EmailSuggestions = ({
  inputValue,
  onSelect,
  show,
  focusIndex,
  onKeyNavigation,
}) => {
  const emailDomains = [
    "@gmail.com",
    "@outlook.com",
    "@yahoo.com",
    "@hotmail.com",
    "@icloud.com",
  ];
  const lastAtIndex = inputValue.lastIndexOf("@");
  const beforeAt =
    lastAtIndex !== -1 ? inputValue.slice(0, lastAtIndex) : inputValue;

  if (!show) return null;
  return (
    <div className="absolute z-10 w-full mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
      {emailDomains.map((domain, index) => (
        <div
          key={domain}
          className={`px-3 py-1.5 cursor-pointer text-sm ${
            focusIndex === index
              ? "bg-blue-50 text-blue-700"
              : "hover:bg-gray-100"
          }`}
          onClick={() => onSelect(beforeAt + domain)}
          onMouseEnter={() => onKeyNavigation(index)}
        >
          {beforeAt + domain}
        </div>
      ))}
    </div>
  );
};

const PasswordValidation = ({ password }) => {
  const criteria = [
    { label: "8+ characters", valid: password.length >= 8 },
    { label: "Uppercase letter", valid: /[A-Z]/.test(password) },
    { label: "Lowercase letter", valid: /[a-z]/.test(password) },
    { label: "Special character", valid: /[\W]/.test(password) },
  ];

  if (!password) return null;

  return (
    <div className="absolute left-full top-0 ml-2 bg-white p-2 rounded-md shadow-lg border border-gray-200 w-48 text-xs">
      {criteria.map((criterion, index) => (
        <div key={index} className="flex items-center gap-2 mb-1">
          {criterion.valid ? (
            <Check size={14} className="text-green-500" />
          ) : (
            <X size={14} className="text-red-500" />
          )}
          <span className={criterion.valid ? "text-green-600" : "text-red-600"}>
            {criterion.label}
          </span>
        </div>
      ))}
    </div>
  );
};

const AuthModal = ({ isOpen, onClose }) => {
  const setRole = useRoleStore((state) => state.setRole);
  const setId = useRoleStore((state) => state.setId);
  const setUserName = useRoleStore((state) => state.setUserName);

  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    user_name: "",
    email_id: "",
    password: "",
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);
  const [showEmailSuggestions, setShowEmailSuggestions] = useState(false);
  const [suggestionFocusIndex, setSuggestionFocusIndex] = useState(-1);
  const [captchaVerified, setCaptchaVerified] = useState(false);
  const [showPasswordValidation, setShowPasswordValidation] = useState(false);

  const emailInputRef = useRef(null);
  const history = useNavigate();
  const emailDomains = [
    "@gmail.com",
    "@outlook.com",
    "@yahoo.com",
    "@hotmail.com",
    "@icloud.com",
  ];

  // // Temporary in-memory user database
  // const [users, setUsers] = useState([
  //   { email: "demo1@gmail.com", password: "Demo123@" },
  // ]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        emailInputRef.current &&
        !emailInputRef.current.contains(event.target)
      ) {
        setShowEmailSuggestions(false);
        setSuggestionFocusIndex(-1);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleEmailKeyDown = (e) => {
    if (!showEmailSuggestions) return;

    switch (e.key) {
      case "ArrowDown":
        e.preventDefault();
        setSuggestionFocusIndex((prev) =>
          prev < emailDomains.length - 1 ? prev + 1 : 0
        );
        break;
      case "ArrowUp":
        e.preventDefault();
        setSuggestionFocusIndex((prev) =>
          prev > 0 ? prev - 1 : emailDomains.length - 1
        );
        break;
      case "Enter":
        e.preventDefault();
        if (suggestionFocusIndex >= 0) {
          const lastAtIndex = formData.email_id.lastIndexOf("@");
          const beforeAt =
            lastAtIndex !== -1
              ? formData.email_id.slice(0, lastAtIndex)
              : formData.email_id;
          handleEmailSelect(beforeAt + emailDomains[suggestionFocusIndex]);
        }
        break;
      case "Escape":
        setShowEmailSuggestions(false);
        setSuggestionFocusIndex(-1);
        break;
      default:
        break;
    }
  };
  const validate = () => {
    const formErrors = {};
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\W).{8,}$/;

    if (!isLogin && !formData.user_name)
      formErrors.user_name = "Name is required";
    if (!formData.email_id || !emailRegex.test(formData.email_id))
      formErrors.email_id = "Invalid email";
    if (!formData.password || !passwordRegex.test(formData.password)) {
      formErrors.password = "Invalid password format";
    }
    // if (!captchaVerified) {
    //   formErrors.captcha = "Please verify captcha";
    // }

    setErrors(formErrors);
    return Object.keys(formErrors).length === 0;
  };

  const handleEmailChange = (e) => {
    const value = e.target.value;
    setFormData({ ...formData, email_id: value });
    const shouldShowSuggestions = value.includes("@") && !value.includes(".");
    setShowEmailSuggestions(shouldShowSuggestions);
    if (shouldShowSuggestions && suggestionFocusIndex === -1) {
      setSuggestionFocusIndex(0);
    }
  };

  const handleEmailSelect = (email_id) => {
    setFormData({ ...formData, email_id });
    setShowEmailSuggestions(false);
    setSuggestionFocusIndex(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate form before proceeding
    if (!validate()) {
      return;
    }

    // Set initial states
    setLoading(true);
    setMessage("");
    setErrors({ ...errors, auth: "" });

    try {
      // Determine the endpoint based on isLogin flag
      const endpoint = isLogin
        ? "http://localhost:5000/api/login"
        : "http://localhost:5000/api/signup";

      // Make the axios request
      const response = await axios({
        method: "POST",
        url: endpoint,
        headers: {
          "Content-Type": "application/json",
        },
        data: formData,
      });

      // Axios automatically throws for non-2xx responses, so if we get here, it was successful
      const data = response.data;

      // Set success message
      setMessage(
        isLogin ? "Login successful!" : "Account created successfully!"
      );

      // Store the token if provided
      if (data.token) {
        setRole(data.role);
        setId(data.id);
        setUserName(data.user_name);
        Cookies.set("jwtToken", data.token, { expires: 1 });
      }

      if (isLogin) {
        history(`/${data.role}`);
        onClose(true);
      } else {
        setIsLogin(false);
      }
    } catch (error) {
      // Handle errors - Axios provides error.response.data
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "An error occurred. Please try again.";

      setErrors({
        ...errors,
        auth: errorMessage,
      });
    } finally {
      setLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white w-full max-w-sm rounded-lg shadow-lg relative">
        <div className="p-5">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">
            {isLogin ? "Login" : "Sign Up"}
          </h2>

          {message && <p className="text-sm text-green-500 mb-3">{message}</p>}
          {errors.auth && (
            <p className="text-sm text-red-500 mb-3">{errors.auth}</p>
          )}

          <form onSubmit={handleSubmit} className="space-y-3">
            {!isLogin && (
              <div>
                <input
                  type="text"
                  value={formData.user_name}
                  onChange={(e) =>
                    setFormData({ ...formData, user_name: e.target.value })
                  }
                  placeholder="Name"
                  className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
                />
                {errors.user_name && (
                  <p className="text-red-500 text-xs mt-1">{errors.user_name}</p>
                )}
              </div>
            )}

            <div ref={emailInputRef} className="relative">
              <input
                type="email"
                value={formData.email_id}
                onChange={handleEmailChange}
                onKeyDown={handleEmailKeyDown}
                onFocus={() => {
                  if (
                    formData.email_id.includes("@") &&
                    !formData.email_id.includes(".")
                  ) {
                    setShowEmailSuggestions(true);
                    setSuggestionFocusIndex(0);
                  }
                }}
                placeholder="Email"
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              <EmailSuggestions
                inputValue={formData.email_id}
                onSelect={handleEmailSelect}
                show={showEmailSuggestions}
                focusIndex={suggestionFocusIndex}
                onKeyNavigation={setSuggestionFocusIndex}
              />
              {errors.email_id && (
                <p className="text-red-500 text-xs mt-1">{errors.email}</p>
              )}
            </div>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={(e) =>
                  setFormData({ ...formData, password: e.target.value })
                }
                onFocus={() => setShowPasswordValidation(true)}
                onBlur={() => setShowPasswordValidation(false)}
                placeholder="Password"
                className="w-full px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-1 focus:ring-gray-400"
              />
              {showPasswordValidation && (
                <PasswordValidation password={formData.password} />
              )}
              {errors.password && (
                <p className="text-red-500 text-xs mt-1">{errors.password}</p>
              )}
            </div>

            <div className="flex items-center text-sm">
              <input
                type="checkbox"
                checked={showPassword}
                onChange={() => setShowPassword(!showPassword)}
                className="mr-2"
              />
              <label className="text-gray-600">Show password</label>
            </div>

            {/* Compact Captcha */}
            <div className="border rounded-md p-2">
              <div className="text-xs text-gray-600 mb-1">
                Verify you&apos;re human:
              </div>
              <div className="bg-gray-50 h-4 flex items-center justify-center text-sm text-gray-500">
                Captcha placeholder
              </div>
              {errors.captcha && (
                <p className="text-red-500 text-xs mt-1">{errors.captcha}</p>
              )}
            </div>

            <button
              type="submit"
              className={`w-full py-2 text-sm font-semibold rounded-md transition-colors ${
                loading ? "bg-gray-400" : "bg-blue-600 hover:bg-blue-700"
              } text-white`}
              disabled={loading}
            >
              {loading ? "Processing..." : isLogin ? "Login" : "Sign Up"}
            </button>
          </form>

          <p className="text-center text-xs text-gray-500 mt-4">
            {isLogin ? "Need an account?" : "Have an account?"}{" "}
            <span
              onClick={() => {
                setIsLogin(!isLogin), setMessage(""), setErrors({});
              }}
              className="text-blue-600 cursor-pointer hover:underline"
            >
              {isLogin ? "Sign Up" : "Login"}
            </span>
          </p>

          {isLogin && (
            <div className="mt-4">
              <div className="relative flex items-center justify-center text-xs text-gray-500">
                <div className="border-t w-full absolute"></div>
                <span className="bg-white px-2 relative">or continue with</span>
              </div>

              <div className="mt-3 space-y-2">
                <button className="w-full py-2 px-3 text-sm border rounded-md hover:bg-gray-50 flex items-center justify-center gap-2">
                  <img
                    src="https://e7.pngegg.com/pngimages/704/688/png-clipart-google-google.png"
                    alt="Google"
                    className="w-4 h-4"
                  />
                  Google
                </button>
                <button className="w-full py-2 px-3 text-sm bg-blue-600 text-white rounded-md hover:bg-blue-700 flex items-center justify-center gap-2">
                  Facebook
                </button>
              </div>
            </div>
          )}
        </div>

        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-600"
        >
          ✕
        </button>
      </div>
    </div>
  );
};

export default AuthModal;
