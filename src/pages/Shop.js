import React, { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { addToCart } from "../redux/cartSlice"; 
import "../styles/Shop.css";
import shopImage from "../assets/shop-image.jpg"; 
import CactusPlant from "../assets/Cactus Plant.jpg"; 
import AloeVera from "../assets/Aloe Vera.jpg";
import Succulent from "../assets/Succulent.jpg";
import Cactus from "../assets/Cactus.jpg";
import IndoorPlant from "../assets/Indoor Plant.jpg";
import RoseSucculent from "../assets/Rose Succulent.jpg";
import CactusPlants from "../assets/Cactus Plants.jpg";
import FloweringPlant from "../assets/Flowering Plant.jpg"; 
import Pothos from "../assets/Pothos.jpg"; 
import HangingSucculent from "../assets/Hanging Succulent.jpg"; 
import Ficus from "../assets/Ficus.jpg"; 
import Bamboo from "../assets/Bamboo.jpg"; 
import MoneyTree from "../assets/Money Tree.jpg"; 
import SucculentGarden from "../assets/Succulent Garden.jpg"; 
import CactusGarden from "../assets/Cactus Garden.jpg"; 

const Shop = () => {
  const navigate = useNavigate(); 
  const location = useLocation();
  const dispatch = useDispatch();

  const queryParams = new URLSearchParams(location.search);
  const categoryParam = queryParams.get("category");
  const searchQuery = queryParams.get("query") || "";

  const [selectedCategory, setSelectedCategory] = useState(categoryParam || "All Products");
  const [priceRange, setPriceRange] = useState([10, 50]);
  const [searchTerm, setSearchTerm] = useState(searchQuery);

  useEffect(() => {
    if (categoryParam) {
      setSelectedCategory(categoryParam);
    }
  }, [categoryParam]);

  useEffect(() => {
    setSearchTerm(searchQuery);
  }, [searchQuery]);

  const products = [
    { id: 1, name: "Cactus Plant", price: 15, image: CactusPlant, category: "Cacti" },
    { id: 2, name: "Aloe Vera", price: 20, image: AloeVera, category: "Plants" },
    { id: 3, name: "Succulent", price: 13, image: Succulent, category: "Succulents" },
    { id: 4, name: "Cactus", price: 25, image: Cactus, category: "Cacti" },
    { id: 5, name: "Indoor Plant", price: 30, image: IndoorPlant, category: "Plants" },
    { id: 6, name: "Rose Succulent", price: 22, image: RoseSucculent, category: "Succulents" },
    { id: 7, name: "Cactus Plants", price: 28, image: CactusPlants, category: "Cacti" },
    { id: 8, name: "Flowering Plant", price: 35, image: FloweringPlant, category: "Plants" },
    { id: 9, name: "Pothos", price: 10, image: Pothos, category: "Plants" },
    { id: 10, name: "Hanging Succulent", price: 23, image: HangingSucculent, category: "Succulents" },
    { id: 11, name: "Ficus", price: 27, image: Ficus, category: "Plants" },
    { id: 12, name: "Bamboo", price: 18, image: Bamboo, category: "Plants" },
    { id: 13, name: "Money Tree", price: 40, image: MoneyTree, category: "Plants" },
    { id: 14, name: "Succulent Garden", price: 24, image: SucculentGarden, category: "Succulents" },
    { id: 15, name: "Cactus Garden", price: 29, image: CactusGarden, category: "Cacti" },
    { id: 16, name: "Zen Succulent", price: 33, image: shopImage, category: "Succulents" }
  ];

  const filteredProducts = selectedCategory === "All Products"
    ? products
    : products.filter((product) => product.category === selectedCategory);

  const finalFilteredProducts = filteredProducts.filter(
    (product) => product.price >= priceRange[0] && product.price <= priceRange[1]
  );

  const searchedProducts = finalFilteredProducts.filter((product) =>
    product.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddToCart = (product) => {
    dispatch(addToCart(product)); 
  };

  return (
    <div className="shop-container">
  
      
      <div className="sidebar">
        <h3>Browse by</h3>
        <ul>
          {["All Products", "Cacti", "Plants", "Succulents"].map((category) => (
            <li
              key={category}
              className={selectedCategory === category ? "active" : ""}
              onClick={() => setSelectedCategory(category)}
            >
              {category}
            </li>
          ))}
        </ul>

        <h3>Filter by</h3>
        <label>Price</label>
        <input
          type="range"
          min="10"
          max="50"
          value={priceRange[1]}
          onChange={(e) => setPriceRange([10, parseInt(e.target.value)])}
        />
        <div className="price-range">
          <span>${priceRange[0]}</span>
          <span>${priceRange[1]}</span>
        </div>

        <div className="back-home-container">
        <span className="back-home" onClick={() => navigate("/")}>Back-Home</span>
      </div>

      </div>

     
      <div className="product-grid">
        <h2>{selectedCategory}</h2>
        <div className="products">
          {searchedProducts.length > 0 ? (
            searchedProducts.map((product) => (
              <div key={product.id} className="product-card">
                <img src={product.image} alt={product.name} className="shop-image" />
                <h4>{product.name}</h4>
                <p>${product.price}</p>
                <button className="add-to-cart" onClick={() => handleAddToCart(product)}>
                  Add to Cart
                </button>
                <p className="discount">20% OFF</p>
              </div>
            ))
          ) : (
            <p>No products found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default Shop;
