"use client";

import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import logo from "@/assets/logo.png";
import { useAuthUser } from "../hooks/useAuthUser";

export default function HeaderLayout() {
  const router = useRouter();

  const { username, isAuthenticated, logout, loading } = useAuthUser();

  return (
    <header className="sticky top-0 z-50 backdrop-brightness-75 backdrop-blur-md">
      <div className="mx-auto flex h-20 max-w-6xl items-center justify-between">
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

        {/* Authentication */}
        <div>
          {!loading && (
            <>
              {isAuthenticated ? (
                <div className="flex items-center gap-4">
                  <span className="font-medium text-purple-400">
                    Hi, {username}
                  </span>

                  <button
                    onClick={logout}
                    className="
                    cursor-pointer
                    rounded-2xl
                    border
                    border-red-400/30
                    px-6
                    py-2.5
                    text-sm
                    font-medium
                    text-red-400
                    transition-all
                    duration-200
                    hover:border-red-500
                    hover:bg-red-500/5
                    hover:text-red-500
                    active:scale-95
                  "
                  >
                    Logout
                  </button>
                </div>
              ) : (
                <Link
                  href="/signin"
                  className="
                  rounded-xl
                  border-2 
                  border-purple-600
                  px-6
                  py-2.5
                  mx-3
                  text-sm
                  font-medium
                  transition-all
                  hover:bg-purple-600
                "
                >
                  Login
                </Link>
              )}
            </>
          )}
          <Link
            href="/movies"
            className="
                rounded-xl
                border-2 
                border-purple-600
                px-6
                py-2.5
                mx-3
                text-sm
                font-medium
                transition-all
                hover:bg-purple-600
                "
          >
            Movies
          </Link>
        </div>
      </div>
    </header>
  );
}
