import React from 'react';
import styled from 'styled-components';


const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StyledList = styled.ul`
  list-style-type: none;
  padding: 0;
`;

const StyledListItem = styled.li`
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

const StyledOrderDetails = styled.div`
  margin-top: 20px;
  padding: 15px;
  border-radius: 5px;
  background-color: #f0f2f5;
`;

// Component Function
function OrderHistory({ orders, onSelectOrder, selectedOrder }) {
  return (
    <StyledContainer>
      <h2 style={{ marginLeft: '60px' }}>Order History</h2>
      <StyledList>
        {orders && orders.map((order) => (
          <StyledListItem key={order.id}>
            <StyledButton onClick={() => onSelectOrder(order)}>View Order #{order.id}</StyledButton>
          </StyledListItem>
        ))}
      </StyledList>
      {selectedOrder && (
        <StyledOrderDetails>
          <h3>Selected Order Details</h3>
          <p>Order ID: {selectedOrder.id}</p>
          <p>Order Date: {selectedOrder.date}</p>
          <p>Products:</p>
          <ul>
            {selectedOrder.products && selectedOrder.products.map((product) => (
              <li key={product.id}>
                {product.name} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </StyledOrderDetails>
      )}
    </StyledContainer>
  );
}

export default OrderHistory;
