import React, { useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home/Home";
import Cart from "./pages/Cart/Cart";
import Login from "./components/LoginPop/Login";
import Footer from "./components/Footer/Footer";
import Ticket from './pages/Ticket/Ticket'
import Event from "./pages/Event/Event";
import About from "./pages/About/About";
import Contact from "./pages/Contact/Contact";

const App = () => {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <>
      {showLogin ? <Login setShowLogin={setShowLogin} /> : <></>}
      <div className="app">
        <Navbar setShowLogin={setShowLogin} />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/cart/:id" element={<Cart />} />
          <Route path='/ticket' element={<Ticket/>}/>
          <Route path='/event' element={<Event/>}/>
          <Route path='/about' element={<About/>}/>
          <Route path='/contact' element={<Contact/>}/>
        </Routes>
       
      </div>
      <Footer />
    </>
  );
};

export default App;
