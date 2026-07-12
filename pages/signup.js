import React, { useState } from "react";

function signup() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signupHandler = async () => {
    const res = await fetch("/api/auth/signup", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });
    const data = await res.json();
    if (data) {
      res.status(200).json({ message: "Successful operation!" });
    }
  };

  return (
    <div>
      <h1>signup</h1>
      <input
        type="text"
        placeholder="example123@gmail.com"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="text"
        placeholder="example123@gmail.com"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={signupHandler}>SIGN UP</button>
    </div>
  );
}

export default signup;
