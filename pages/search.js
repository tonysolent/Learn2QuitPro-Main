import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';

function SearchPage({ initialSearchResults }) {
  const [searchResults, setSearchResults] = useState(initialSearchResults);

  const handleSearch = async (searchTerm) => {
    const response = await fetch(`/api/search?term=${searchTerm}`);
    const data = await response.json();
    
    setSearchResults(data);
  };

  return (
    <div>
      <h1>Search Page</h1>
      <SearchBar onSearch={handleSearch} />
      <ul>
        {searchResults.map((result) => (
          <li key={result.id}>{result.name}</li>
        ))}
      </ul>
    </div>
  );
}

export async function getServerSideProps() {
  const initialSearchResults = [];

  return {
    props: {
      initialSearchResults,
    },
  };
}

export default SearchPage;
