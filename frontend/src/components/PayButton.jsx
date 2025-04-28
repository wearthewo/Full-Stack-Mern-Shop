import { createPayments } from "../utils/paymentsApi";

export const PayButton = ({ amount, orderId }) => {
  const handlePay = async () => {
    try {
      // Call the backend API to create payment
      const { data } = await createPayments(amount, orderId);

      // Look for the PayPal approval URL from the response links
      const approvalUrl = data.links.find(
        (link) => link.rel === "approval_url"
      )?.href;

      if (approvalUrl) {
        // Redirect user to PayPal to complete payment
        window.location.href = approvalUrl;
      } else {
        // Handle case if approval URL is not found
        console.error("Approval URL not found in PayPal response.");
      }
    } catch (error) {
      // Handle and log errors from the API request
      console.error(error.response?.data?.message || error.message);
    }
  };

  return (
    <button
      onClick={handlePay}
      className="bg-blue-500 text-white px-4 py-2 rounded"
    >
      Pay with PayPal
    </button>
  );
};
