// backend/seeder.js
import mongoose from "mongoose";
import dotenv from "dotenv";
import connectDB from "../db/configDB.js";
import Product from "../models/productModel.js";
import User from "../models/userModel.js"; // make sure path is correct

dotenv.config();
connectDB();

const products = [
  {
    name: "Razer Mechanical Keyboard",
    category: "keyboards",
    price: 79.99,
    image: "keyboard_1.png",
    countInStock: 15,
    description: "High-performance keyboard with anti-ghosting.",
  },
  {
    name: "Logitech Mechanical Keyboard",
    category: "keyboards",
    price: 59.99,
    image: "keyboard_2.png",
    countInStock: 10,
    description: "High-performance keyboard with anti-ghosting.",
  },
  {
    name: "Razer Mechanical Keyboard",
    category: "keyboards",
    price: 59.99,
    image: "keyboard_3.png",
    countInStock: 10,
    description: "High-performance keyboard with anti-ghosting.",
  },
  {
    name: "Logitech Mechanical Keyboard",
    category: "keyboards",
    price: 59.99,
    image: "keyboard_4.png",
    countInStock: 10,
    description: "High-performance keyboard with anti-ghosting.",
  },

  {
    name: "Razer Kraken X",
    category: "keyboards",
    price: 89.99,
    image: "keyboard_5.png",
    countInStock: 20,
    description: "Surround sound headset with noise-cancelling mic.",
  },
  {
    name: "Logitech Mechanical Keyboard",
    category: "keyboards",
    price: 59.99,
    image: "keyboard_6.png",
    countInStock: 10,
    description: "High-performance keyboard with anti-ghosting.",
  },
  {
    name: "JBL Tune 510BT",
    category: "headsets",
    price: 69.99,
    image: "headset_1.png",
    countInStock: 8,
    description: "Headset with immersive audio quality.",
  },
  {
    name: "Razer Kraken X",
    category: "headsets",
    price: 69.99,
    image: "headset_2.png",
    countInStock: 8,
    description: "Lightweight headset with immersive audio quality.",
  },
  {
    name: "Sony WH-1000XM4",
    category: "headsets",
    price: 69.99,
    image: "headset_3.png",
    countInStock: 8,
    description: "Professional headset with immersive audio quality.",
  },
  {
    name: "Turbo Gaming Headset",
    category: "headsets",
    price: 69.99,
    image: "headset_4.png",
    countInStock: 8,
    description: "Gaming headset with immersive audio quality.",
  },
  {
    name: "Samsung Galaxy Buds Pro",
    category: "headsets",
    price: 69.99,
    image: "headset_5.png",
    countInStock: 8,
    description: "Exquisite headset with immersive audio quality.",
  },
  {
    name: "Apple AirPods Pro",
    category: "headsets",
    price: 69.99,
    image: "headset_6.png",
    countInStock: 8,
    description: "Lightweight headset with immersive audio quality.",
  },
];

const importData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();

    const createdUsers = await User.insertMany([
      {
        username: "admin",
        email: "admin@example.com",
        password: "123456", // hash it if your model pre-save hook handles it
        role: "admin",
      },
    ]);

    const adminUser = createdUsers[0]._id;

    const sampleProducts = products.map((product) => ({
      ...product,
      user: adminUser, // assign user field
    }));

    await Product.insertMany(sampleProducts);

    console.log("🌱 Product Data Imported!");
    process.exit();
  } catch (error) {
    console.error("❌ Error importing:", error);
    process.exit(1);
  }
};

importData();
