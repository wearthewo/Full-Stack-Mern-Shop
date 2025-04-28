import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { paymentsSuccess } from "../utils/paymentsApi";
import { clearCart } from "../utils/cartApi";

const Payment = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(true);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  const params = new URLSearchParams(location.search);
  const paymentId = params.get("paymentId");
  const payerId = params.get("PayerID");

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      if (!paymentId || !payerId) {
        setError("Missing payment information.");
        setLoading(false);
        return;
      }

      try {
        await paymentsSuccess(paymentId, payerId);
        await clearCart();
        setSuccess(true); // ✅ Set success state
        setTimeout(() => {
          navigate("/orders");
        }, 3000); // ✅ Wait 3 seconds then redirect
      } catch (err) {
        console.error(err);
        setError(err.response?.data?.message || err.message);
      } finally {
        setLoading(false);
      }
    };

    handlePaymentSuccess();
  }, [paymentId, payerId, navigate]);

  if (loading) {
    return (
      <div className="text-center mt-20 text-xl font-semibold text-gray-700">
        Confirming your payment...
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center mt-20 text-red-600 text-lg">
        Payment failed: {error}
      </div>
    );
  }

  if (success) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <div
          className="bg-green-100 border border-green-400 text-green-700 px-6 py-4 rounded relative"
          role="alert"
        >
          <strong className="font-bold text-2xl">Payment Successful!</strong>
          <span className="block sm:inline mt-2">
            {" "}
            Redirecting to your orders...
          </span>
        </div>
      </div>
    );
  }

  return null;
};

export default Payment;
