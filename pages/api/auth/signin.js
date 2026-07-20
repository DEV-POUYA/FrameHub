import User from "@/models/users";
import { verifyPassword } from "@/utils/auth";
import connectDB from "@/utils/connectDB";
import { sign } from "jsonwebtoken";

async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  // Connect to DB
  try {
    await connectDB();
  } catch (err) {
    console.error("Database connection error:", err);
    return res
      .status(500)
      .json({ status: "failed", message: "Error In Connection to DB" });
  }

  const { email, password } = req.body;
  const secret_key = process.env.SECRET_KEY;
  const expiration = 24 * 60 * 60;

  if (!email || !password) {
    return res
      .status(422)
      .json({ status: "failed", message: "Don't leave inputs empty!" });
  }

  try {
    const existingUser = await User.findOne({ email: email });
    if (!existingUser) {
      return res
        .status(404)
        .json({ status: "failed", message: "You Don't have an account!" });
    }

    const isValidPassword = await verifyPassword(
      password,
      existingUser.password,
    );
    if (!isValidPassword) {
      return res
        .status(401)
        .json({ status: "failed", message: "Email or Password is Incorrect!" });
    }

    // create token
    const token = sign({ email }, secret_key, { expiresIn: expiration });

    return res
      .status(200)
      .setHeader("Set-Cookie", [
        `token=${token}; Path=/; HttpOnly; SameSite=Lax; Max-Age=${expiration}; ${process.env.NODE_ENV === "production" ? "Secure;" : ""}`,
      ])
      .json({
        status: "success",
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax",
        message: "Logged In",
        data: { email: existingUser.email },
      });
  } catch (err) {
    console.error("Login error:", err);
    return res.status(500).json({
      status: "failed",
      message: "Something went wrong. Please try again.",
    });
  }
}
export default handler;
