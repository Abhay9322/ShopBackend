import mongoose from "mongoose";

const orderSchema = new mongoose.Schema({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    productName: { type: String, required: true },
    quantity: { type: Number, required: true },
    status: { type: String, default: "pending" }
}, { timestamps: true });

export default mongoose.model("Order", orderSchema);