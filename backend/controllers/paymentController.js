import paypal from "paypal-rest-sdk";
import Order from "../models/orderModel.js";
import { sendEmail } from "../utils/sendEmail.js";
import dotenv from "dotenv";
dotenv.config();

// Configure PayPal SDK
paypal.configure({
  mode: "sandbox", // 'sandbox' or 'live'
  client_id: process.env.PAYPAL_CLIENT_ID,
  client_secret: process.env.PAYPAL_CLIENT_SECRET,
});

// @desc Create a PayPal payment
export const createPayment = async (req, res) => {
  try {
    const { amount, orderId } = req.body;

    if (!amount || isNaN(amount) || !orderId) {
      return res.status(400).json({ message: "Invalid payment data" });
    }

    const paymentJson = {
      intent: "sale",
      payer: {
        payment_method: "paypal",
      },
      redirect_urls: {
        return_url: `http://localhost:5173/payment`,
        cancel_url: `http://localhost:5173/payment/cancel`,
      },
      transactions: [
        {
          amount: {
            total: amount,
            currency: "EUR",
          },
          description: "Payment for products",
          custom: orderId, //custom: attaches orderId to track which order is being paid.
        },
      ],
    };

    paypal.payment.create(paymentJson, (error, payment) => {
      if (error) {
        return res.status(500).json({ message: error.message });
      } else {
        return res.json(payment);
      }
    });
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
};

// @desc PayPal payment success
export const paymentSuccess = async (req, res) => {
  console.log("Cookies:", req.cookies); // Add this line to log the cookies
  const { paymentId, PayerID } = req.query;

  if (!paymentId || !PayerID) {
    return res.status(400).json({ message: "Missing payment information" });
  }

  const execute_payment_json = { payer_id: PayerID };

  paypal.payment.execute(
    paymentId,
    execute_payment_json,
    async (error, payment) => {
      if (error) {
        console.error(error.response);
        return res.status(500).json({ message: "Payment execution failed" });
      } else {
        console.log("Payment executed successfully:", payment);

        try {
          const orderId = payment.transactions[0].custom;
          const order = await Order.findById(orderId).populate("user");

          if (!order) {
            return res.status(404).json({ message: "Order not found" });
          }

          order.status = "Paid";
          order.paymentDetails = {
            method: "PayPal",
            transactionId: payment.id,
            status: payment.state,
            paidAt: Date.now(),
          };

          await order.save();

          await sendEmail(
            order.user.email,
            "Order Confirmation",
            `Hi ${order.user.username},\n\nYour order (${order._id}) was successful. Thank you for shopping with us!`
          );

          res.json({ message: "Payment successful" });
        } catch (err) {
          console.error(err);
          res
            .status(500)
            .json({ message: "Something went wrong while updating order" });
        }
      }
    }
  );
};

export const paymentCancel = async (req, res) => {
  res.json({ message: "Payment cancelled by user" });
};
