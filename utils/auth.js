import { compare, hash } from "bcryptjs";
import { verify, jwt } from "jsonwebtoken";

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
    };
  } catch (err) {
    console.log("session state: ", err);
  }
}

export { hashingPassword, verifyPassword, userToken };
