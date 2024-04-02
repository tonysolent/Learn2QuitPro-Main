import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = () => {
    onSearch(searchTerm);
  };

  return (
    <div style={{ textAlign: 'center', margin: '20px' }}>
      <h2>Search Bar</h2>
      <input
        type="text"
        placeholder="Search products"
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
        style={{
          padding: '10px',
          width: '60%',
          margin: '10px 0',
          border: '1px solid #ccc',
          borderRadius: '5px'
        }}
      />
      <button
        onClick={handleSearch}
        style={{
          backgroundColor: '#0052cc',
          color: 'white',
          padding: '10px 15px',
          border: 'none',
          borderRadius: '5px',
          cursor: 'pointer',
          transition: 'background-color 0.3s'
        }}
      >
        Search
      </button>
    </div>
  );
}

export default SearchBar;
