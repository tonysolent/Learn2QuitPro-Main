import React, { useState } from 'react';

function ProductListAdmin({ products, onEditProduct, onDeleteProduct }) {
  const [editingProductId, setEditingProductId] = useState(null);
  const [editedProduct, setEditedProduct] = useState({});

  const handleEditClick = (productId) => {
    setEditingProductId(productId);
    const productToEdit = products.find((product) => product.id === productId);
    setEditedProduct({ ...productToEdit });
  };

  const handleSaveClick = () => {
    onEditProduct(editedProduct);
    setEditingProductId(null);
    setEditedProduct({});
  };

  const handleDeleteClick = (productId) => {
    onDeleteProduct(productId);
  };

  return (
    <div>
      <h2>Product List (Admin)</h2>
      <table>
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Manufacturer</th>
            <th>Type</th>
            <th>Price</th>
            <th>Quantity in Stock</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product.id}>
              <td>{product.id}</td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  />
                ) : (
                  product.name
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={editedProduct.manufacturer}
                    onChange={(e) => setEditedProduct({ ...editedProduct, manufacturer: e.target.value })}
                  />
                ) : (
                  product.manufacturer
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="text"
                    value={editedProduct.type}
                    onChange={(e) => setEditedProduct({ ...editedProduct, type: e.target.value })}
                  />
                ) : (
                  product.type
                )}
              </td>
              <td>
                {editingProductId === product.id ? (
                  <input
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                  />
                ) : (
                  `$${product.price.toFixed(2)}`
                )}
              </td>
              <td>{product.quantityInStock}</td>
              <td>
                {editingProductId === product.id ? (
                  <button onClick={handleSaveClick}>Save</button>
                ) : (
                  <>
                    <button onClick={() => handleEditClick(product.id)}>Edit</button>
                    <button onClick={() => handleDeleteClick(product.id)}>Delete</button>
                  </>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ProductListAdmin;
