import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Provider } from 'react-redux';
import { useSelector } from 'react-redux';
import { GoogleOAuthProvider } from '@react-oauth/google';  // Import GoogleOAuthProvider
import store from './redux/store'; 
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Register from './pages/register';
import Login from './pages/Login';
import Shop from './pages/Shop';
import FAQ from './pages/Faq';
import Buy from './pages/Buy'

// Your AppContent component
const AppContent = () => {
  const cartCount = useSelector((state) => state.cart.items.length); 

  return (
    <Router>
      <div>
        <Navbar cartCount={cartCount} /> 
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/faq" element={<FAQ />} />
          <Route path="/Buy" element={<Buy />} />
        </Routes>
      </div>
    </Router>
  );
};

// Main App component with GoogleOAuthProvider
function App() {
  return (
    <Provider store={store}>
     
      <GoogleOAuthProvider clientId="YOUR_GOOGLE_CLIENT_ID">
        <AppContent />
      </GoogleOAuthProvider>
    </Provider>
  );
}

export default App;
