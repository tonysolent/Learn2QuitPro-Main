import React from 'react';

function OrderHistory({ orders, onSelectOrder, selectedOrder }) {
  return (
    <div>
      <h2>Order History</h2>
      <ul>
        {orders.map((order) => (
          <li key={order.id}>
            <button onClick={() => onSelectOrder(order)}>View Order #{order.id}</button>
          </li>
        ))}
      </ul>
      {selectedOrder && (
        <div>
          <h3>Selected Order Details</h3>
          <p>Order ID: {selectedOrder.id}</p>
          <p>Order Date: {selectedOrder.date}</p>
          <p>Products:</p>
          <ul>
            {selectedOrder.products.map((product) => (
              <li key={product.id}>
                {product.name} - Quantity: {product.quantity}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
}

export default OrderHistory;
