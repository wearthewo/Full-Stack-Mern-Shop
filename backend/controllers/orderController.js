import Order from "../models/orderModel.js";
import Cart from "../models/cartModel.js";

// @desc Create an order after payment success
export const createOrder = async (req, res) => {
  try {
    const { cartId, paymentDetails } = req.body;

    const cart = await Cart.findById(cartId);
    if (!cart) {
      return res.status(404).json({ message: "Cart not found" });
    }

    const order = new Order({
      user: req.user._id,
      cart: cartId,
      paymentDetails,
      totalAmount: cart.totalPrice,
      status: "Pending",
    });

    const createdOrder = await order.save();

    // ✅ Remove cart after creating order
    await Cart.findByIdAndDelete(cartId);

    res.status(201).json(createdOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

//admin only
export const getAllOrders = async (req, res) => {
  try {
    const orders = await Order.find().populate("user cart");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Get a single order by ID
//admin or user
export const getOrderById = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id).populate("user cart");
    if (!order) return res.status(404).json({ message: "Order not found" });

    res.json(order);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// @desc    Get current user's orders
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("cart");
    res.json(orders);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
// get currents user orders

export const getUserOrders = async (req, res) => {
  try {
    const orders = await Order.find({ user: req.user._id }).populate("cart");
    return res.json(orders);
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc    Update order status (e.g., from admin panel)
//admin
export const updateOrderStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    order.status = status || order.status;
    const updatedOrder = await order.save();

    res.json(updatedOrder);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// @desc    Delete an order
//admin
export const deleteOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id);
    if (!order) return res.status(404).json({ message: "Order not found" });

    await order.remove();
    res.json({ message: "Order deleted" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
