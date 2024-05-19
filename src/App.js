import React, { useState } from 'react';
import axios from 'axios';
import '../src/product.css';
import ProductList from './productlist';

const App = () => {

  const [showProductList, setShowProductList] = useState(false);

  const handleClick = () => {
    setShowProductList(!showProductList);
  };


  const [formData, setFormData] = useState({
    productName: '',
    productImage: null,
    productCode: '',
    productPrice: '',
    productDescriptions: '',
  });

  const handleChange = (e) => {
    const { name, value, type } = e.target;
    const val = type === 'file' ? e.target.files[0] : value;

    setFormData({
      ...formData,
      [name]: val,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const formDataToSend = new FormData();
      formDataToSend.append('productName', formData.productName);
      formDataToSend.append('productImage', formData.productImage);
      formDataToSend.append('productCode', formData.productCode);
      formDataToSend.append('productPrice', formData.productPrice);
      formDataToSend.append('productDescriptions', formData.productDescriptions);

      const response = await axios.post('http://localhost:8080/products', formDataToSend, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      console.log('Response:', response.data);
      alert('Product added successfully!');
      setFormData({
        productName: '',
        productImage: null,
        productCode: '',
        productPrice: '',
        productDescriptions: '',
      });
    } catch (error) {
      console.error('Error adding product:', error);
      alert('Error adding product. Please check console for details.');
    }
  };

  return (
    <div className="product-form-container">
      <h2>Add Minda Product</h2>
      <form onSubmit={handleSubmit} className="product-form">
        <div className="form-group">
          <label htmlFor="productName">Product Name:</label>
          <input
            type="text"
            name="productName"
            value={formData.productName}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productImage">Product Image:</label>
          <input
            type="file"
            name="productImage"
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productCode">Product Code:</label>
          <input
            type="text"
            name="productCode"
            value={formData.productCode}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productPrice">Product Price:</label>
          <input
            type="number"
            name="productPrice"
            value={formData.productPrice}
            onChange={handleChange}
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="productDescriptions">Product Descriptions:</label>
          <input
            type="text"
            name="productDescriptions"
            value={formData.productDescriptions}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Add Product</button>
      </form>
      <div className='data-type'>
      <button type="button" onClick={handleClick}>
        Show Product List
      </button>
      {showProductList && <ProductList />}
    </div>
    </div>
  );
};

export default App;
