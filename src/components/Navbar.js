import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { FaShoppingCart, FaSearch, FaTimes, FaTrash, FaBars } from "react-icons/fa";
import { removeFromCart, clearCart } from "../redux/cartSlice";
import "../styles/navbar.css";

const Navbar = ({ scrollToContact, scrollToAbout }) => {
   const navigate = useNavigate();
   const location = useLocation();
   const dispatch = useDispatch();
   const navbarHeight = 50;

   const [isCartOpen, setIsCartOpen] = useState(false);
   const [isMenuOpen, setIsMenuOpen] = useState(false); // State for mobile menu
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
      setIsMenuOpen(false); // Close menu on navigation
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

               {/* Hamburger Menu Icon */}
               <div className="mobile-menu-icon" onClick={() => setIsMenuOpen(!isMenuOpen)}>
                  {isMenuOpen ? <FaTimes /> : <FaBars />}
               </div>
            </div>
         </div>

         {/* Mobile Navigation Menu */}
         <div className={`nav-bottom ${isMenuOpen ? "open" : ""}`}>
            <ul className={`nav-links ${isMenuOpen ? "open" : ""}`}>
               <li>
                  <a href="/faq" onClick={() => setIsMenuOpen(false)}>FAQ</a>
               </li>
               <li>
                  <a href="/shop" onClick={() => setIsMenuOpen(false)}>Shop</a>
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

         {isCartOpen && (
            <div className="overlay" onClick={() => setIsCartOpen(false)} />
         )}
      </nav>
   );
};

export default Navbar;
