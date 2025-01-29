

const express = require("express");
const User = require("../models/User");

const router = express.Router();

// ✅ Register New User
router.post("/register", async (req, res) => {
  const { name, email, password, organization } = req.body;

  try {
    const userExists = await User.findOne({ email });
    if (userExists) return res.status(400).json({ message: "User already exists" });

    const user = new User({ name, email, password, organization });
    await user.save();

    res.status(201).json({
      message: "User created successfully",
      _id: user._id,
      email: user.email,
      organization: user.organization
    });
  } catch (error) {
    res.status(500).json({ error: "Something went wrong" });
  }
});

module.exports = router;
