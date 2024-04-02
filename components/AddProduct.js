import React, { useState } from 'react';

function AddProduct({ onAddProduct }) {
  const [productName, setProductName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleAddProduct = () => {
    if (!productName || !manufacturer || !productType || price <= 0 || quantity <= 0) {
      alert('Please fill out all fields and enter valid values for price and quantity.');
      return;
    }

    const newProduct = {
      name: productName,
      manufacturer,
      type: productType,
      price,
      quantity,
      id: Date.now(),
    };

    onAddProduct(newProduct);

    setProductName('');
    setManufacturer('');
    setProductType('');
    setPrice(0);
    setQuantity(0);
  };

  return (
    <div>
      <h2>Add Product</h2>
      <label>
        Product Name:
        <input type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </label>
      <br />
      <label>
        Manufacturer:
        <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
      </label>
      <br />
      <label>
        Product Type:
        <input type="text" value={productType} onChange={(e) => setProductType(e.target.value)} />
      </label>
      <br />
      <label>
        Price:
        <input type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      </label>
      <br />
      <label>
        Quantity:
        <input type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
      </label>
      <br />
      <button onClick={handleAddProduct}>Add Product</button>
    </div>
  );
}

export default AddProduct;
