import { compare, hash } from "bcryptjs";
import { verify, jwt } from "jsonwebtoken";
// import jwt from "jsonwebtoken";

async function hashingPassword(password) {
  const hashedPassword = await hash(password, 15);
  return hashedPassword;
}

function verifyPassword(password, hashedPassword) {
  const verifyPassword = compare(password, hashedPassword);
  return verifyPassword;
}

function userToken(token, secretKey) {
  try {
    const userStateVerification = verify(token, secretKey);
    return {
      email: userStateVerification.email,
      username: userStateVerification.username,
    };
  } catch (err) {
    console.log("session state: ", err);
  }
}

function userStatus(token, secretKey) {
  try {
    return jwt.verify(token, secretKey);
  } catch (err) {
    return null;
  }
}

export { hashingPassword, verifyPassword, userToken, userStatus };
