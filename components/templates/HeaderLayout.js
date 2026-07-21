import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";
import { useRouter } from "next/router";

export default function HeaderLayout() {
  const [currentStatus, setCurrentStatus] = useState(null);

  const router = useRouter();

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("Full API Response:", data);
        if (data.status === "success") {
          setCurrentStatus(data);
        } else {
          setCurrentStatus(null);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setCurrentStatus(null);
      });
  }, []);

  let username =
    currentStatus?.data?.email?.split("@")[0] ||
    currentStatus?.data?.email ||
    "User";

  async function logoutHandler() {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        currentStatus(null);
        router.push("/");
      } else {
        console.error("Logout failed:", data);
        alert(data.message || "Logout failed. Please try again.");
      }
    } catch (err) {
      console.error("Network error during logout:", err);
    }
  }

  return (
    <header className="sticky top-0 z-50  bg-gray-900 border-b border-gray-800 backdrop-blur-md">
      <div className="max-w-7xl mx-auto h-30  flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center">
          <Image
            src={logo}
            alt="FrameHub Logo"
            width={180}
            height={60}
            priority
          />
        </Link>

        {currentStatus ? (
          <div className="flex items-center gap-4">
            <span className="text-purple-400 font-medium">Hi, {username}</span>
            <button
              onClick={logoutHandler}
              className="px-6 py-2.5 text-sm font-medium text-red-400 hover:text-red-500 
             border border-red-400/30 hover:border-red-500 rounded-2xl 
             transition-all duration-200 hover:bg-red-500/5 active:scale-95 cursor-pointer"
            >
              Logout
            </button>
          </div>
        ) : (
          <Link
            href="/signin"
            className="px-6 py-2.5 border-2 border-purple-600 hover:bg-purple-600 rounded-xl text-sm font-medium transition-all"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
}
