import React from 'react';
import styled from 'styled-components';


const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StyledProduct = styled.div`
  padding: 10px;
  margin-bottom: 20px;
  border-bottom: 1px solid #eee;
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


function ProductList({ products, onAddToCart }) {
  return (
    <StyledContainer>
      <h2>Product List</h2>
      {products && products.map((product) => (
        <StyledProduct key={product.id}>
          <p>
            {product.name} - {product.manufacturer} ({product.type})
          </p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Quantity in Stock: {product.quantityInStock}</p>
          <StyledButton onClick={() => onAddToCart(product)}>Add to Cart</StyledButton>
        </StyledProduct>
      ))}
    </StyledContainer>
  );
}

export default ProductList;
