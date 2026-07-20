import { userToken } from "@/utils/auth";
import connectDB from "@/utils/connectDB";

async function handler(req, res) {
  if (req.method !== "GET") {
    return res
      .status(405)
      .json({ status: "failed", message: "The current method is not valid" });
  }

  try {
    await connectDB();
  } catch (err) {
    console.log("Database state: ", err);
    return res.status(500).json({ message: "Error In Database Connection!" });
  }

  const { token } = req.cookies;
  const secretKey = process.env.SECRET_KEY;

  if (!token) {
    return res.status(401).json({ message: "You are not logged In" });
  }

  try {
    const userStatus = userToken(token, secretKey);

    if (userStatus) {
      return res.status(200).json({ status: "success", data: userStatus });
    } else {
      return res.status(401).json({ message: "you are not authorized!" });
    }
  } catch (err) {
    console.error("Token verification error:", err);
    return res.status(401).json({
      status: "failed",
      message: "You are not authorized",
    });
  }
}

export default handler;
