async function handler(req, res) {
  if (req.method !== "POST") {
    return;
  }

  // Connect to DB
  try {
  } catch (err) {
    console.log(err);
  }
}

export default handler;
