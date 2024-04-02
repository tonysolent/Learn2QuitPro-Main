
import React from 'react';

function ShoppingBasket({ cartItems, onRemoveFromCart, onCheckout }) {
  const totalAmount = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);

  return (
    <div>
      <h2>Shopping Basket</h2>
      <ul>
        {cartItems.map((item) => (
          <li key={item.id}>
            {item.name} - {item.manufacturer} - {item.type} - Quantity: {item.quantity} - Price: {item.price * item.quantity}
            <button onClick={() => onRemoveFromCart(item)}>Remove</button>
          </li>
        ))}
      </ul>
      <p>Total Amount: {totalAmount}</p>
      <button onClick={onCheckout}>Checkout</button>
    </div>
  );
}

export default ShoppingBasket;
