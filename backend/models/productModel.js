import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    subCategory: { type: String },
    bestSeller: { type: Boolean, default: false },
    sizes: { type: Array, required: true },
    image: { type: [String], required: true },
    date: { type: Date, default: Date.now }
});

// Register model correctly
const Product = mongoose.model("Product", productSchema);

export default Product;  // Correct export

