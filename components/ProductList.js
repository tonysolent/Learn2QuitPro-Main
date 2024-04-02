import React from 'react';

function ProductList({ products, onAddToCart }) {
  return (
    <div>
      <h2>Product List</h2>
      {products.map((product) => (
        <div key={product.id}>
          <p>
            {product.name} - {product.manufacturer} ({product.type})
          </p>
          <p>Price: ${product.price.toFixed(2)}</p>
          <p>Quantity in Stock: {product.quantityInStock}</p>
          <button onClick={() => onAddToCart(product)}>Add to Cart</button>
          <hr /> 
        </div>
      ))}
    </div>
  );
}

export default ProductList;
