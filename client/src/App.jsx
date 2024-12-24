import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Home from "./components/Home";
import AddReview from "./components/AddReview";
import EditReview from "./components/editReview.jsx";

import Header from './components/Header.jsx';

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/add" element={<AddReview />} />
        <Route path="/edit/:id" element={<EditReview />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;


