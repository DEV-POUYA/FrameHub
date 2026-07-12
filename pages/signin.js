import React, { useState } from "react";

function signin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const signinHandler = async () => {
    const res = await fetch("/api/auth/signin", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      headers: { "Content-Type": "application/json" },
    });

    const data = await res.json();
    if (data) {
      res.status(200).json({ message: "Logged In Successfuly" });
    }
  };

  return (
    <div>
      <h1>SignIn</h1>
      <input
        type="text"
        placeholder="example@gmail.com"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <input
        type="text"
        placeholder="example@gmail.com"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <button onClick={signinHandler}>Signin</button>
    </div>
  );
}

export default signin;
