export default function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ status: "failed", message: "Method not allowed" });
  }

  try {
    res.setHeader("Set-Cookie", [
      "token=; Path=/; HttpOnly; Expires=Thu, 01 Jan 1970 00:00:00 GMT; SameSite=Lax; Max-Age=0;",
    ]);

    return res.status(200).json({
      status: "success",
      message: "Logged out successfully",
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      status: "failed",
      message: "Logout failed",
    });
  }
}
