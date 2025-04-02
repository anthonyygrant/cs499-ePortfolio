require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const User = require("./app_api/models/user"); // Adjust the path if necessary

mongoose.connect(process.env.MONGODB_URI || "mongodb://127.0.0.1/travlr", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

async function updatePassword() {
  try {
    const user = await User.findOne({ email: "travlr@test.com" }); // Replace with the user's email

    if (!user) {
      console.error("User not found");
      return;
    }

    const newPasswordHash = await bcrypt.hash("password", 10); // Replace with the actual password

    user.hash = newPasswordHash;
    await user.save();

    console.log("Password updated successfully");
  } catch (error) {
    console.error("Error updating password:", error);
  } finally {
    mongoose.disconnect();
  }
}

updatePassword();