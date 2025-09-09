// const CartItem = require("../models/CartItem");

// // ✅ Get all cart items
// exports.getCart = async (req, res) => {
//   try {
//     const cart = await CartItem.find();
//     res.json(cart);
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };

// // ✅ Add new item to cart
// exports.addToCart = async (req, res) => {
//   try {
//     const newItem = new CartItem(req.body);
//     const savedItem = await newItem.save();
//     res.status(201).json(savedItem);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// };

// // ✅ Delete item from cart
// exports.removeFromCart = async (req, res) => {
//   try {
//     const id = req.params.id;
//     await CartItem.findByIdAndDelete(id);
//     res.json({ message: "Item removed" });
//   } catch (err) {
//     res.status(500).json({ message: err.message });
//   }
// };


const CartItem = require("../models/CartItem");

// ✅ Get all cart items
exports.getCart = async (req, res) => {
  try {
    const cart = await CartItem.find();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ✅ Add new item to cart
exports.addToCart = async (req, res) => {
  try {
    const newItem = new CartItem(req.body);
    await newItem.save();

    // 🔑 yaha pura cart return karna better hai
    const cart = await CartItem.find();
    res.status(201).json(cart);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};

// ✅ Delete item from cart
exports.removeFromCart = async (req, res) => {
  try {
    const id = req.params.id;
    await CartItem.findByIdAndDelete(id);

    // 🔑 delete ke baad bhi updated cart return
    const cart = await CartItem.find();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
