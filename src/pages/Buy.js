import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { clearCart } from "../redux/cartSlice";
import { useNavigate } from "react-router-dom";
import "../styles/Buy.css"; 
const BuyPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = cartItems.reduce((acc, item) => acc + item.price * item.quantity, 0);

  const [paymentMethod, setPaymentMethod] = useState("");
  const [bankName, setBankName] = useState("");
  const [upiId, setUpiId] = useState("");

  const handleConfirmPurchase = async () => {
    if (!paymentMethod) {
      alert("Please select a payment method.");
      return;
    }

    if (paymentMethod === "Mobile Banking" && (!bankName || !upiId)) {
      alert("Please enter bank name and UPI ID.");
      return;
    }

    if (paymentMethod === "Net Banking") {
      window.location.href = "https://pay.google.com"; 
      return;
    }

    
    const paymentData = {
      method: paymentMethod,
      bank: bankName,
      upi: upiId,
      amount: totalAmount,
      items: cartItems.map((item) => ({ name: item.name, quantity: item.quantity })),
    };

    try {
      const response = await fetch("https://api.example.com/process-payment", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(paymentData),
      });

      if (!response.ok) throw new Error("Payment failed.");

      alert("Payment successful!");
      dispatch(clearCart()); 
      navigate("/");
    } catch (error) {
      alert("Payment failed. Please try again.");
    }
  };

  return (
    <div className="buy-container">
      <h2>Confirm Your Purchase</h2>

      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <div className="order-summary">
            <h3>Order Summary</h3>
            <ul>
              {cartItems.map((item) => (
                <li key={item.id}>
                  {item.name} - ₹{item.price} x {item.quantity}
                </li>
              ))}
            </ul>
            <h3>Total Amount: ₹{totalAmount}</h3>
          </div>

          <div className="payment-methods">
            <h3>Select Payment Method</h3>

            <label className="radio-label">
              <input
                type="radio"
                name="payment"
                value="Cash on Delivery"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Cash on Delivery
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="payment"
                value="Net Banking"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Net Banking (GPay)
            </label>

            <label className="radio-label">
              <input
                type="radio"
                name="payment"
                value="Mobile Banking"
                onChange={(e) => setPaymentMethod(e.target.value)}
              />
              Mobile Banking (UPI)
            </label>

            {paymentMethod === "Mobile Banking" && (
              <div className="bank-details">
                <input
                  type="text"
                  placeholder="Enter Bank Name"
                  value={bankName}
                  onChange={(e) => setBankName(e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Enter UPI ID"
                  value={upiId}
                  onChange={(e) => setUpiId(e.target.value)}
                />
              </div>
            )}
          </div>

          <button className="confirm-btn" onClick={handleConfirmPurchase}>
            Confirm Purchase
          </button>
        </>
      )}
    </div>
  );
};

export default BuyPage;
