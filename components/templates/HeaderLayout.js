import Image from "next/image";
import Link from "next/link";
import logo from "@/assets/logo.png";
import { useEffect, useState } from "react";

export default function HeaderLayout() {
  const [currentStatus, setCurrentStatus] = useState(null);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch");
        return res.json();
      })
      .then((data) => {
        console.log("Full API Response:", data); // ← Debug full response
        if (data.status === "success") {
          setCurrentStatus(data); // Keep full object
          console.log("currentStatus updated to:", data); // ← See updated value
        } else {
          setCurrentStatus(null);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setCurrentStatus(null);
      });
  }, []);

  console.log("Current currentStatus value:", currentStatus); // ←

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
            <span className="text-purple-400 font-medium">
              Hi, {currentStatus.data.username || currentStatus.data.email}
            </span>
            <Link
              href="/logout"
              className="text-sm text-red-400 hover:text-red-500"
            >
              Logout
            </Link>
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
