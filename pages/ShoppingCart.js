import React from 'react';
import styled from 'styled-components';


const StyledCartContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StyledCartItem = styled.li`
  list-style-type: none;
  margin-bottom: 10px;
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

const StyledCartList = styled.ul`
  padding: 0;
`;


function ShoppingCart({ cartItems, onAddToCart, onRemoveFromCart }) {
  return (
    <StyledCartContainer>
      <h2>Shopping Cart</h2>
      <StyledCartList>
        {cartItems && cartItems.map((item) => (
          <StyledCartItem key={item.id}>
            {item.name} - Quantity: {item.quantity}
            <StyledButton onClick={() => onAddToCart(item)}>Add</StyledButton>
            <StyledButton onClick={() => onRemoveFromCart(item)}>Remove</StyledButton>
          </StyledCartItem>
        ))}
      </StyledCartList>
    </StyledCartContainer>
  );
}

export default ShoppingCart;
