import mongoose from "mongoose";

const orderSchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    cart: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Cart",
      required: true,
    },
    paymentDetails: {
      method: String,
      transactionId: String,
      status: String,
      paidAt: Date,
    },
    totalAmount: {
      type: Number,
      required: true,
    },
    status: {
      type: String,
      enum: ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

const Order = mongoose.model("Order", orderSchema);
export default Order;

/* Why do we have cart as a foreign key inside Order?
In a typical e-commerce app before payment, the user adds products to a Cart (temporary storage of selected products).

When the user places the order and pays, we "convert" the Cart into an Order.

We keep a reference to the original Cart to know exactly what products were ordered, what quantities, etc.

👉 In short:

Cart = Temporary, editable while shopping.

Order = Final, saved after checkout (not editable usually).

Referencing the Cart inside the Order lets you later see what the user purchased without copying all the products again. (Though sometimes apps directly save the ordered products inside Order instead of linking to Cart — both are valid designs.) */
