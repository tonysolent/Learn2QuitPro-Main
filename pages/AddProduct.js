import React, { useState } from 'react';
import styled from 'styled-components';


const StyledForm = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 10px;
  margin-bottom: 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
`;

const StyledButton = styled.button`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 10px 15px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;
  &:hover {
    background-color: ${props => props.theme.colors.secondary};
  }
`;


function AddProduct({ onAddProduct }) {
  const [productName, setProductName] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [productType, setProductType] = useState('');
  const [price, setPrice] = useState(0);
  const [quantity, setQuantity] = useState(0);

  const handleAddProduct = () => {
    if (!productName || !manufacturer || !productType || isNaN(price) || isNaN(quantity) || price <= 0 || quantity <= 0) {
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
    <StyledForm>
      <h2>Add Product</h2>
      <StyledLabel>
        Product Name:
        <StyledInput type="text" value={productName} onChange={(e) => setProductName(e.target.value)} />
      </StyledLabel>
      <StyledLabel>
        Manufacturer:
        <StyledInput type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
      </StyledLabel>
      <StyledLabel>
        Product Type:
        <StyledInput type="text" value={productType} onChange={(e) => setProductType(e.target.value)} />
      </StyledLabel>
      <StyledLabel>
        Price:
        <StyledInput type="number" value={price} onChange={(e) => setPrice(parseFloat(e.target.value))} />
      </StyledLabel>
      <StyledLabel>
        Quantity:
        <StyledInput type="number" value={quantity} onChange={(e) => setQuantity(parseInt(e.target.value))} />
      </StyledLabel>
      <StyledButton onClick={handleAddProduct}>Add Product</StyledButton>
    </StyledForm>
  );
}

export default AddProduct;
