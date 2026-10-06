import { useEffect, useState } from "react";

export function useAuthUser() {
  const [currentStatus, setCurrentStatus] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/user")
      .then((res) => res.json())
      .then((data) => {
        if (data.status === "success") {
          setCurrentStatus(data);
        } else {
          setCurrentStatus(null);
        }
      })
      .catch((err) => {
        console.error("Fetch error:", err);
        setCurrentStatus(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const logout = async () => {
    try {
      const res = await fetch("/api/auth/logout", {
        method: "POST",
      });

      const data = await res.json();

      if (res.ok) {
        setCurrentStatus(null);
        window.location.href = "/";
      } else {
        console.error("Logout failed:", data);
        alert(data.message || "Logout failed. Please try again.");
      }
    } catch (err) {
      console.error("Network error during logout:", err);
    }
  };

  const email = currentStatus?.data?.email;

  const username =
    email?.split("@")[0] ||
    email ||
    "User";

  return {
    currentStatus,
    username,
    isAuthenticated: Boolean(currentStatus),
    loading,
    logout,
  };
}