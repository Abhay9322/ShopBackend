import Order from "../models/orderModel.js";

export const createOrder = async (req, res) => {
    try {
        const { productName, quantity } = req.body;
        const userId = req.user.id;

        const order = await Order.create({ userId, productName, quantity });
        res.status(201).json({ message: "Order created", order });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const getOrders = async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id });
        res.status(200).json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};

export const updateOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const updatedOrder = await Order.findByIdAndUpdate(
            { _id: orderId, userId: req.user.id },
            req.body,
            { new: true }
        );

        if (!updateOrder) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order updated", updateOrder });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};


export const deleteOrder = async (req, res) => {
    try {
        const orderId = req.params.id;
        const deleteOrder = await Order.findByIdAndDelete({ _id: orderId, userId: req.user.id });
        if (!deleteOrder) return res.status(404).json({ message: "Order not found" });
        res.status(200).json({ message: "Order deleted " });
    } catch (error) {
        res.status(500).json({ message: "Server error", error: error.message });
    }
};