// App.js
import React, { useState, useEffect } from "react";
import axios from "axios";
import "../src/product.css";

const ProductList = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetchProducts();
  }, []);

  const fetchProducts = async () => {
    try {
      const response = await axios.get("http://localhost:8080/products");
      setProducts(response.data);
    } catch (error) {
      console.error("Error fetching products:", error);
    }
  };

  return (
    <div className="product-list">
      {products.map((product, index) => (
        <div key={index} className="product-card">
          <img
            src={product.productImage}
            className="product-image"
          />

          <div className="product-info">
            <h2 className="product-name">Name:{product.productName}</h2>
            <p className="product-code">Code: {product.productCode}</p>
            <p className="product-price">Price: ${product.productPrice}</p>
            <p className="product-description">
              Descriptions:{product.productDescriptions}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ProductList;
