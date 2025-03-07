import React from 'react';

const Searchbar = ({ handleSearch }) => {
  const handleChange = (event) => {
    const query = event.target.value;
    handleSearch(query);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    // perform search here
  };

  return (
    <div className="search-bar">
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <input
            type="text"
            className="form-control"
            placeholder="Search..."
            onChange={handleChange}
          />
          <div className="input-group-append">
            <button className="btn btn-primary" type="submit">
              Search
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Searchbar;
