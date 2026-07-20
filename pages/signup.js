import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
  });

  const [fieldErrors, setFieldErrors] = useState({
    username: "",
    email: "",
    password: "",
  });
  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const router = useRouter();

  

  // Password requirement checks
  const hasMinLength = formData.password.length >= 8;
  const hasSpecialChar = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/.test(
    formData.password,
  );

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    // Clear error when user starts typing
    if (fieldErrors[name]) {
      setFieldErrors({ ...fieldErrors, [name]: "" });
    }
    if (generalError) setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError("");

    // Client-side validation before sending to API
    const errors = {};
    let isValid = true;

    if (!formData.username || !formData.username.trim()) {
      errors.username = "Don't Leave Inputs Empty";
      isValid = false;
    } else if (
      formData.username.trim().length < 4 ||
      formData.username.trim().length > 30
    ) {
      errors.username = "Username must be between 4 and 30 characters long";
      isValid = false;
    }

    if (!formData.email || !formData.email.trim()) {
      errors.email = "Don't Leave Inputs Empty";
      isValid = false;
    } else {
      const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!validEmail.test(formData.email.trim())) {
        errors.email = "Invalid email format";
        isValid = false;
      }
    }

    if (!formData.password || !formData.password.trim()) {
      errors.password = "Don't Leave Inputs Empty";
      isValid = false;
    } else {
      const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/;
      if (!specialCharRegex.test(formData.password)) {
        errors.password =
          "Password must include at least one special character (e.g., @, #, $, %)";
        isValid = false;
      } else if (formData.password.length < 8) {
        errors.password = "Password must be at least 8 characters long";
        isValid = false;
      }
    }

    setFieldErrors(errors);

    if (!isValid) {
      setLoading(false);
      return;
    }

    try {
      const token = await window.grecaptcha.execute(
        process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY,
        { action: "register" },
      );

      const res = await fetch("/api/auth/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          ...formData,
          recaptchaToken: token,
        }),
      });

      const data = await res.json();

      if (res.ok) {
        setSuccess(true);
        setTimeout(() => {
          router.push("/signin");
        }, 1000);
      } else {
        if (data.fieldErrors) {
          setFieldErrors(data.fieldErrors);
        } else {
          setGeneralError(data.message || "Registration failed");
        }
      }
    } catch (err) {
      console.error(err);
      setGeneralError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-green-500 mb-4">
            Account Created Successfully!
          </h2>
          <p className="text-gray-400">
            You can now sign in with your credentials.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-3">
            Create Account
          </h1>
          <p className="text-gray-400">Join the FrameHub community</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-3xl p-10 border border-gray-800"
        >
          <div className="space-y-6">
            {/* Username */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Username
              </label>
              <input
                type="text"
                name="username"
                placeholder="Write a unique name"
                value={formData.username}
                onChange={handleChange}
                className="w-full bg-gray-950 border border-gray-700 focus:border-purple-500 rounded-2xl px-6 py-4 text-white outline-none transition-all"
                required
              />
              {fieldErrors.username && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.username}
                </p>
              )}
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                placeholder="example@gmail.com"
                value={formData.email}
                onChange={handleChange}
                className="w-full bg-gray-950 border border-gray-700 focus:border-purple-500 rounded-2xl px-6 py-4 text-white outline-none transition-all"
                required
              />
              {fieldErrors.email && (
                <p className="text-red-500 text-sm mt-1">{fieldErrors.email}</p>
              )}
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="........."
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-950 border border-gray-700 focus:border-purple-500 rounded-2xl px-6 py-4 text-white outline-none transition-all"
                required
              />

              {/* Password requirements */}
              <div className="mt-3 space-y-1 text-sm">
                <p
                  className={`transition-colors ${hasMinLength ? "text-green-500" : "text-gray-500"}`}
                >
                  Password should contain at least 8 characters
                </p>
                <p
                  className={`transition-colors ${hasSpecialChar ? "text-green-500" : "text-gray-500"}`}
                >
                  Use special character in your password like #,@,%,!
                </p>
              </div>

              {fieldErrors.password && (
                <p className="text-red-500 text-sm mt-1">
                  {fieldErrors.password}
                </p>
              )}
            </div>

            {/* General Error */}
            {generalError && (
              <p className="text-red-500 text-sm text-center bg-red-900/30 p-3 rounded-xl">
                {generalError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 active:bg-purple-700 py-4 rounded-2xl text-white font-medium text-lg transition-all duration-200 disabled:opacity-70"
            >
              {loading ? "Creating Account..." : "SIGN UP"}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Already have an account?{" "}
          <a href="/signin" className="text-purple-400 hover:text-purple-300">
            Sign in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
