import React from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from './Register';
import Login from './Login';
import Home from './Home';
import Auction from './Auction';
import CreateAuction from './CreateAuction';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login/>}/>
        <Route path="/register" element={<Register/>} />
        <Route path="/home" element={<Home />} />
        <Route path="/auction" element={<Auction/>}/>
        <Route path="/createauction" element={<CreateAuction/>}/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;