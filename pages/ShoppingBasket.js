import React from 'react';
import styled from 'styled-components';


const StyledBasketContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StyledBasketItem = styled.li`
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

const StyledTotal = styled.p`
  font-weight: bold;
`;

const StyledBasketList = styled.ul`
  padding: 0;
`;


function ShoppingBasket({ cartItems, onRemoveFromCart, onCheckout }) {

  if (!cartItems || cartItems.length === 0) {
    return (
      <StyledBasketContainer>
        <h2>Shopping Basket</h2>
        <p>Your shopping basket is empty.</p>
      </StyledBasketContainer>
    );
  }

  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <StyledBasketContainer>
      <h2>Shopping Basket</h2>
      <StyledBasketList>
        {cartItems.map((item) => (
          <StyledBasketItem key={item.id}>
            {item.name} - {item.manufacturer} - {item.type} - Quantity: {item.quantity} - Price: ${item.price * item.quantity}
            <StyledButton onClick={() => onRemoveFromCart(item)}>Remove</StyledButton>
          </StyledBasketItem>
        ))}
      </StyledBasketList>
      <StyledTotal>Total Amount: ${totalAmount.toFixed(2)}</StyledTotal>
      <StyledButton onClick={onCheckout}>Checkout</StyledButton>
    </StyledBasketContainer>
  );
}

export default ShoppingBasket;
