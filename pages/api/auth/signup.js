import connectDB from "../../../utils/connectDB";
import User from "@/models/users";
import { hashingPassword } from "@/utils/auth";

async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method not allowed" });
  }

  // Database Connection
  try {
    await connectDB();
  } catch (err) {
    console.error("Database connection error:", err);
    res
      .status(500)
      .json({ status: "failed", message: "Error In Connection to DB" });
  }

  let { username, email, password, recaptchaToken } = req.body || {};

  if (!username || !email || !password) {
    return res.status(422).json({ message: "Don't Leave Inputs Empty" });
  }

  // Safe Input Sanitization
  username = (username || "").toString().trim();
  email = (email || "").toString().trim().toLowerCase();
  password = (password || "").toString().trim();

  const trimmedUsername = username.toLowerCase();

  // reCAPTCHA Verification
  if (!recaptchaToken) {
    return res
      .status(422)
      .json({ message: "reCAPTCHA verification is required" });
  }

  try {
    const recaptchaRes = await fetch(
      `https://www.google.com/recaptcha/api/siteverify?secret=${process.env.RECAPTCHA_SECRET_KEY}&response=${recaptchaToken}`,
      { method: "POST" },
    );

    const recaptchaData = await recaptchaRes.json();

    if (!recaptchaData.success || recaptchaData.score < 0.5) {
      return res.status(422).json({
        message: "reCAPTCHA verification failed. Please try again.",
      });
    }
  } catch (recaptchaError) {
    console.error("reCAPTCHA error:", recaptchaError);
    return res.status(500).json({ message: "Verification service error" });
  }

  // Username Validation
  if (trimmedUsername.length < 4 || trimmedUsername.length > 30) {
    return res.status(422).json({
      status: "failed",
      message: "Username must be between 4 and 30 characters long",
    });
  }

  // checking the user account's state

  const existingUser = await User.findOne({ email: email });
  const existingUsername = await User.findOne({
    username: trimmedUsername,
  });

  if (existingUser || existingUsername) {
    return res
      .status(409)
      .json({ status: "failed", message: "user has an account" });
  }

  const validEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!validEmail.test(email)) {
    return res
      .status(422)
      .json({ status: "failed", message: "Invalid email format" });
  }

  // Password Validation
  const specialCharRegex = /[!@#$%^&*()_+\-=\[\]{};:"\\|,.<>\/?]/;
  if (!specialCharRegex.test(password)) {
    return res.status(422).json({
      status: "failed",
      message:
        "Password must include at least one special character (e.g., @, #, $, %)",
    });
  }

  if (password.length < 8) {
    return res.status(422).json({
      status: "failed",
      message: "Password must be at least 8 characters long",
    });
  }

  const hashedPassword = await hashingPassword(password);

  try {
    await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res
      .status(201)
      .json({ status: "success", message: "user created successfully" });
  } catch (err) {
    console.log(err);
    res
      .status(500)
      .json({ status: "failed", message: "Failed to create user" });
  }
}

export default handler;
