async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  // Connect to DB
  try {
  } catch (err) {
    console.log(err);
  }

  const { email, password } = req.body;

  if (!email || !password) {
    res.status(422).json({ message: "Invalid Data!" });
  }
}

export default handler;
