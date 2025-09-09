// require("dotenv").config();
// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const app = express();

// // Middleware
// app.use(express.json());
// app.use(cors({
//   origin: "http://localhost:3000",
//   credentials: true
// }));

// // MongoDB connection
// mongoose.connect(process.env.MONGO_URI, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// })
// .then(() => console.log("✅ MongoDB connected"))
// .catch(err => console.log("❌ MongoDB connection error:", err));

// // Routes
// const authRoutes = require("./routes/authRoutes");
// app.use("/api/auth", authRoutes);

// // Routes
// const wishlistRoutes = require("./routes/wishlistRoutes");
// app.use("/wishlist", wishlistRoutes);


// const cartRoutes = require("./routes/cartRoutes");
// app.use("/api/cart", cartRoutes);

// // Start server
// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));



require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();

// Middleware
app.use(express.json());
const allowedOrigins = [
  'http://localhost:3000', // local dev
  'https://vastraalane-frontend-ek42.vercel.app', // deployed frontend
  'https://www.vastraalane.com',
  'https://vastraalane.com'

];

app.use(cors({
  origin: function(origin, callback){
    // allow requests with no origin (like Postman)
    if(!origin) return callback(null, true);
    if(allowedOrigins.indexOf(origin) === -1){
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true // if you’re sending cookies or auth headers
}));

// MongoDB connection
mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("✅ MongoDB connected"))
  .catch((err) => console.log("❌ MongoDB connection error:", err));

// Routes
const authRoutes = require("./routes/authRoutes");
app.use("/api/auth", authRoutes);

const wishlistRoutes = require("./routes/wishlistRoutes");
app.use("/wishlist", wishlistRoutes);

const cartRoutes = require("./routes/cartRoutes");
app.use("/api/cart", cartRoutes);

// Health check route (optional but useful)
app.get("/", (req, res) => res.send("API is running..."));

// Start server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
