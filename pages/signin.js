import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";

function Signin() {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [generalError, setGeneralError] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (generalError) setGeneralError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setGeneralError("");

    try {
      const res = await fetch("/api/auth/signin", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (res.ok) {
        // Redirect to homepage or dashboard after successful login
        router.push("/movies");
      } else {
        setGeneralError(data.message || "Invalid email or password");
      }
    } catch (err) {
      console.error(err);
      setGeneralError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center px-6 py-12">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <h1 className="text-5xl font-bold tracking-tight text-white mb-3">
            Welcome Back
          </h1>
          <p className="text-gray-400">Sign in to your FrameHub account</p>
        </div>

        <form
          onSubmit={handleSubmit}
          className="bg-gray-900 rounded-3xl p-10 border border-gray-800"
        >
          <div className="space-y-6">
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
                className="w-full bg-gray-950 border border-gray-700 focus:border-purple-500 rounded-2xl px-6 py-4 text-white outline-none transition-all placeholder-gray-500"
                required
              />
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm text-gray-400 mb-2">
                Password
              </label>
              <input
                type="password"
                name="password"
                placeholder="••••••••"
                value={formData.password}
                onChange={handleChange}
                className="w-full bg-gray-950 border border-gray-700 focus:border-purple-500 rounded-2xl px-6 py-4 text-white outline-none transition-all placeholder-gray-500"
                required
              />
            </div>

            {/* General Error */}
            {generalError && (
              <p className="text-red-500 text-sm text-center bg-red-900/30 p-4 rounded-2xl">
                {generalError}
              </p>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-purple-600 hover:bg-purple-500 active:bg-purple-700 py-4 rounded-2xl text-white font-semibold text-lg transition-all duration-200 disabled:opacity-70 mt-2"
            >
              {loading ? "Signing In..." : "SIGN IN"}
            </button>
          </div>
        </form>

        <p className="text-center text-gray-500 text-sm mt-8">
          Don't have an account?{" "}
          <Link
            href="/signup"
            className="text-purple-400 hover:text-purple-300 transition-colors"
          >
            Create one
          </Link>
        </p>
      </div>
    </div>
  );
}

export default Signin;
