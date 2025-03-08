import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart, FaSearch, FaTimes, FaTrash } from "react-icons/fa";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import "../styles/navbar.css";

const Navbar = ({ scrollToContact, scrollToAbout }) => {
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const navbarHeight = 50;

   const [isCartOpen, setIsCartOpen] = useState(false);
   const [searchQuery, setSearchQuery] = useState("");

   const cartItems = useSelector((state) => state.cart.items) || [];
   const totalQuantity =
      useSelector((state) =>
         state.cart.items.reduce((acc, item) => acc + item.quantity, 0)
      ) || 0;
   const totalPrice = useSelector((state) =>
      state.cart.items.reduce(
         (acc, item) => acc + item.price * item.quantity,
         0
      )
   );
   const totalUniqueItems = cartItems.length;

   useEffect(() => {
      if (location.state?.scrollTo === "contact" && scrollToContact) {
         window.scrollBy({ top: -navbarHeight, behavior: "smooth" });
         scrollToContact();
      } else if (location.state?.scrollTo === "about" && scrollToAbout) {
         window.scrollBy({ top: -navbarHeight, behavior: "smooth" });
         scrollToAbout();
      }
   }, [location, scrollToContact, scrollToAbout, navbarHeight]);

   const handleNavigation = (target) => {
      if (location.pathname !== "/") {
         navigate("/", { state: { scrollTo: target } });
      } else {
         if (target === "contact" && scrollToContact) {
            window.scrollBy({ top: -navbarHeight, behavior: "smooth" });
            scrollToContact();
         } else if (target === "about" && scrollToAbout) {
            window.scrollBy({ top: -navbarHeight, behavior: "smooth" });
            scrollToAbout();
         }
      }
   };

   const handleSearchChange = (e) => {
      setSearchQuery(e.target.value);
   };

   const handleSearch = () => {
      if (searchQuery.trim() !== "") {
         navigate(`/shop?query=${searchQuery}`);
      }
   };

   return (
      <nav className="navbar">
         <div className="nav-top">
            <h2 className="logo" onClick={() => navigate("/")}>
               Gray GARDEN
            </h2>

            <div className="search-bar">
               <input
                  type="text"
                  placeholder="Search for products..."
                  value={searchQuery}
                  onChange={handleSearchChange}
                  onKeyDown={(e) => e.key === "Enter" && handleSearch()}
               />
               <button className="search-button" onClick={handleSearch}>
                  <FaSearch />
               </button>
            </div>

            <div className="nav-right">
               <span className="auth-links">
                  <a href="/login">Login</a> | <a href="/register">Register</a>
               </span>
               <div
                  className="cart-container"
                  onClick={() => setIsCartOpen(!isCartOpen)}
               >
                  <FaShoppingCart className="cart-icon" />
                  {totalQuantity > 0 && (
                     <span className="cart-count">{totalQuantity}</span>
                  )}
               </div>
            </div>
         </div>

         <div className="nav-bottom">
            <ul className="nav-links">
               <li>
                  <a href="/faq">FAQ</a>
               </li>
               <li>
                  <a href="/shop">Shop</a>
               </li>
               <li>
                  <button
                     onClick={() => handleNavigation("about")}
                     className="nav-button"
                  >
                     About
                  </button>
               </li>
               <li>
                  <button
                     onClick={() => handleNavigation("contact")}
                     className="nav-button"
                  >
                     Contact
                  </button>
               </li>
            </ul>
         </div>

         <div className={`cart-sidebar ${isCartOpen ? "open" : ""}`}>
            <div className="cart-header">
               <h3>Shopping Cart</h3>
               <FaTimes
                  className="close-icon"
                  onClick={() => setIsCartOpen(false)}
               />
            </div>

            <div className="cart-content">
               {cartItems.length === 0 ? (
                  <p>Cart is empty</p>
               ) : (
                  <>
                     {cartItems.map((item) => (
                        <div className="cart-item" key={item.id}>
                           <p>{item.name}</p>
                           <p>Quantity: {item.quantity}</p>
                           <p>Price: ₹{item.price * item.quantity}</p>
                           <FaTrash
                              className="delete-icon"
                              onClick={() => dispatch(removeFromCart(item.id))}
                           />
                        </div>
                     ))}
                     <div className="cart-summary">
                        <h4>Total Unique Items: {totalUniqueItems}</h4>
                        <h4>Total Quantity: {totalQuantity}</h4>
                        <h4>Total Amount: ₹{totalPrice}</h4>

                        {/* Updated Buy Now Button */}
                        <button onClick={() => navigate("/buy")}>
                           Buy Now
                        </button>
                        <button onClick={() => dispatch(clearCart())}>
                           Clear Cart
                        </button>
                     </div>
                  </>
               )}
            </div>
         </div>

         {isCartOpen && (
            <div className="overlay" onClick={() => setIsCartOpen(false)} />
         )}
      </nav>
   );
};

export default Navbar;
