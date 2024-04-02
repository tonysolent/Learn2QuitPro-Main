import React, { useState } from 'react';
import styled from 'styled-components';


const StyledContainer = styled.div`
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  margin-bottom: 20px;
`;

const StyledTable = styled.table`
  width: 100%;
  border-collapse: collapse;
`;

const StyledTh = styled.th`
  background-color: ${props => props.theme.colors.primary};
  color: white;
  padding: 10px;
  text-align: left;
`;

const StyledTd = styled.td`
  padding: 10px;
  border-bottom: 1px solid #eee;
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
    <StyledContainer>
      <h2>Product List (Admin)</h2>
      <StyledTable>
        <thead>
          <tr>
            <StyledTh>ID</StyledTh>
            <StyledTh>Name</StyledTh>
            <StyledTh>Manufacturer</StyledTh>
            <StyledTh>Type</StyledTh>
            <StyledTh>Price</StyledTh>
            <StyledTh>Quantity in Stock</StyledTh>
            <StyledTh>Action</StyledTh>
          </tr>
        </thead>
        <tbody>
          {products && products.map((product) => (
            <tr key={product.id}>
              <StyledTd>{product.id}</StyledTd>
              <StyledTd>
                {editingProductId === product.id ? (
                  <StyledInput
                    type="text"
                    value={editedProduct.name}
                    onChange={(e) => setEditedProduct({ ...editedProduct, name: e.target.value })}
                  />
                ) : (
                  product.name
                )}
              </StyledTd>
              <StyledTd>
                {editingProductId === product.id ? (
                  <StyledInput
                    type="text"
                    value={editedProduct.manufacturer}
                    onChange={(e) => setEditedProduct({ ...editedProduct, manufacturer: e.target.value })}
                  />
                ) : (
                  product.manufacturer
                )}
              </StyledTd>
              <StyledTd>
                {editingProductId === product.id ? (
                  <StyledInput
                    type="text"
                    value={editedProduct.type}
                    onChange={(e) => setEditedProduct({ ...editedProduct, type: e.target.value })}
                  />
                ) : (
                  product.type
                )}
              </StyledTd>
              <StyledTd>
                {editingProductId === product.id ? (
                  <StyledInput
                    type="number"
                    value={editedProduct.price}
                    onChange={(e) => setEditedProduct({ ...editedProduct, price: parseFloat(e.target.value) })}
                  />
                ) : (
                  `$${product.price.toFixed(2)}`
                )}
              </StyledTd>
              <StyledTd>{product.quantityInStock}</StyledTd>
              <StyledTd>
                {editingProductId === product.id ? (
                  <StyledButton onClick={handleSaveClick}>Save</StyledButton>
                ) : (
                  <>
                    <StyledButton onClick={() => handleEditClick(product.id)}>Edit</StyledButton>
                    <StyledButton onClick={() => handleDeleteClick(product.id)}>Delete</StyledButton>
                  </>
                )}
              </StyledTd>
            </tr>
          ))}
        </tbody>
      </StyledTable>
    </StyledContainer>
  );
}

export default ProductListAdmin;
