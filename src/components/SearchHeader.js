import FilterBar from "./FilterBar";

const SearchHeader = ({ filters, setFilters }) => {
  return (
    <div className="search-container">
      <div className="col1"></div>
      <div className="filters-price">
        {/* CHECKBOX ORDER-PRICE */}
        <div className="checkbox-orderPrice-container">
          <span>Trier par prix : </span>
          <span className="checkbox-order-price">
            <div
              className="btn-price-order-container"
              onClick={() => {
                const newFilters = { ...filters };
                newFilters.checkOrder =
                  newFilters.checkOrder === "price-asc"
                    ? (newFilters.checkOrder = "price-desc")
                    : (newFilters.checkOrder = "price-asc");
                setFilters(newFilters);
              }}
            >
              <div
                className="knob"
                style={{
                  left: filters.checkOrder === "price-asc" ? 2 : 23,
                }}
              >
                {filters.checkOrder === "price-desc" ? (
                  <span>⇣</span>
                ) : (
                  <span>⇡</span>
                )}
              </div>
            </div>
          </span>
        </div>

        {/* PRICE BETWEEN */}
        <div className="filters-price-between">
          <span>Prix entre : </span>
          <span>
            <FilterBar filters={filters} setFilters={setFilters} />
          </span>
        </div>
      </div>
      <div className="col3"></div>
    </div>
  );
};

export default SearchHeader;
