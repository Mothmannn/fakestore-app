import { Routes, Route } from "react-router-dom";
import HomePage from "./components/HomePage";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import AddProduct from "./components/AddProduct";
import EditProduct from "./components/EditProduct";
import NavBar from "./components/NavBar";
import './App.css'

function App() {


  return (
    <>
      <NavBar />
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products" element={<Products />} />
        <Route path="/ProductDetails/:id" element={<ProductDetails />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/edit-product/:id" element={<EditProduct />} />
    </Routes>
    </>
  );
}

export default App;
