import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../styles/Home.css";
import Navbar from "../components/Navbar";

import cactusImg from "../assets/p1.jpg";
import plantsImg from "../assets/p2.jpg";
import succulentsImg from "../assets/p3.jpg";
import aboutImg from "../assets/about.jpg";
import offerImg from "../assets/offer.jpg";

const HomePage = () => {
   const navigate = useNavigate();

   const contactRef = useRef(null);
   const aboutRef = useRef(null);

   const scrollToContact = () => {
      if (contactRef.current) {
         contactRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
         });
      }
   };

   const scrollToAbout = () => {
      if (aboutRef.current) {
         aboutRef.current.scrollIntoView({
            behavior: "smooth",
            block: "start",
         });
      }
   };

   const [contact, setContact] = useState({
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      message: "",
   });

   const [contactMessage, setContactMessage] = useState("");

   const handleContactSubmit = async (e) => {
      e.preventDefault();
      try {
         const response = await axios.post(
            "https://your-api.com/contact",
            contact
         );
         if (response.status === 200) {
            setContactMessage("Message sent successfully!");
            setContact({
               firstName: "",
               lastName: "",
               email: "",
               phone: "",
               message: "",
            });
         } else {
            setContactMessage("Failed to send message.");
         }
      } catch (error) {
         setContactMessage("Error sending message. Try again.");
      }
   };

   const handleShopNavigation = (category) => {
      navigate(`/shop?category=${category}`);
   };

   return (
      <div>
         <Navbar
            scrollToContact={scrollToContact}
            scrollToAbout={scrollToAbout}
         />

         <div className="home-container">
            <div className="content">
               <p className="established">
                  ESTB <span className="divider">•</span> 2025
               </p>
               <h1 className="title">PRICKLES & CO</h1>
               <p className="subtitle">BRING NATURE INDOORS</p>
               <button
                  className="shop-button"
                  onClick={() => navigate("/shop")}
               >
                  Shop Now
               </button>
            </div>
         </div>

         <div className="card-section">
            {[
               { title: "Cacti", img: cactusImg },
               { title: "Plants", img: plantsImg },
               { title: "Succulents", img: succulentsImg },
            ].map((item, index) => (
               <div className="card" key={index}>
                  <h3 className="card-title">{item.title}</h3>
                  <div className="underline"></div>
                  <button
                     className="shop-button"
                     onClick={() => handleShopNavigation(item.title)}
                  >
                     Shop Collection
                  </button>
                  <img src={item.img} alt={item.title} className="card-image" />
               </div>
            ))}
         </div>

         <div ref={aboutRef} className="about-section">
            <div className="about-text">
               <h2 className="about-title">ABOUT US</h2>
               <div className="underline"></div>
               <p>
                  Learn more about our journey and commitment to providing the
                  best indoor plants.
               </p>
               <p>
                  We bring nature indoors with our wide range of plants and
                  succulents, perfect for any home or office.
               </p>
            </div>
            <div className="about-image">
               <img src={aboutImg} alt="About Us" />
            </div>
         </div>

         <div className="offer-section">
            <div className="offer-image">
               <img src={offerImg} alt="Offer" />
            </div>
            <div className="offer-text">
               <h2 className="offer-title">BUY ONLINE NOW & GET 20% OFF!</h2>
               <button
                  className="shop-button"
                  onClick={() => navigate("/shop")}
               >
                  Shop Now
               </button>
            </div>
         </div>

         <div ref={contactRef} className="contact-section">
            <h2 className="contact-title">Get In Touch</h2>
            <div className="underline"></div>
            <form className="contact-form" onSubmit={handleContactSubmit}>
               <div className="form-group">
                  <input
                     type="text"
                     placeholder="First Name"
                     required
                     value={contact.firstName}
                     onChange={(e) =>
                        setContact({ ...contact, firstName: e.target.value })
                     }
                  />
                  <input
                     type="text"
                     placeholder="Last Name"
                     required
                     value={contact.lastName}
                     onChange={(e) =>
                        setContact({ ...contact, lastName: e.target.value })
                     }
                  />
               </div>
               <div className="form-group">
                  <input
                     type="email"
                     placeholder="Email"
                     required
                     value={contact.email}
                     onChange={(e) =>
                        setContact({ ...contact, email: e.target.value })
                     }
                  />
                  <input
                     type="tel"
                     placeholder="Phone Number"
                     required
                     value={contact.phone}
                     onChange={(e) =>
                        setContact({ ...contact, phone: e.target.value })
                     }
                  />
               </div>
               <textarea
                  placeholder="Message"
                  rows="5"
                  required
                  value={contact.message}
                  onChange={(e) =>
                     setContact({ ...contact, message: e.target.value })
                  }
               ></textarea>
               <button type="submit" className="send-button">
                  Send
               </button>
               {contactMessage && (
                  <p className="subscribe-message">{contactMessage}</p>
               )}
            </form>
         </div>
      </div>
   );
};

export default HomePage;
