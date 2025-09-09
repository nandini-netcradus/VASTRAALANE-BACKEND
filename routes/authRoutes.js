// const express = require("express");
// const router = express.Router();
// const { registerUser, loginUser, getProfile } = require("../controllers/authController");
// const auth = require("../middleware/auth");

// // Routes
// router.post("/register", registerUser);
// router.post("/login", loginUser);
// router.get("/profile", auth, getProfile);

// module.exports = router;


const express = require("express");
const router = express.Router();
const { login, getProfile } = require("../controllers/authController");
const authenticateToken = require("../middleware/authmiddleware");

// Login route
router.post("/login", login);

// Profile route with auth middleware
router.get("/profile", authenticateToken, getProfile);

module.exports = router;
