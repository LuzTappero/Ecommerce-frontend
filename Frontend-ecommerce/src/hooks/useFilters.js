import { useContext } from "react";
import { FilterContext } from "../Context/filterContext";

export function useFilters(){
  const { filters, setFilters } = useContext(FilterContext);

  const filterProducts = (products) => {
    return products.filter(product => {
      return (
        product.price >= filters.minPrice &&
        product.price <= filters.maxPrice &&
        (filters.category === "all" || product.category_id == filters.category) &&
        (filters.name === '' || product.name.toLowerCase().includes(filters.name.toLowerCase()))
      );
    })
    .sort((a, b) => {
      if (filters.sortOrder === 'asc') {
        return a.price - b.price;
      } else {
        return b.price - a.price;
      }
    });
};

  const handleChangeCategory = (e) => {
    setFilters({
      ...filters,
      category: e.target.value,

    });
  };


  const handleChangeMinPrice = (e) => {
    const newMinPrice = parseFloat(e.target.value);
    setFilters((prevFilters) => ({
        ...prevFilters,
        minPrice: newMinPrice > prevFilters.maxPrice ? prevFilters.maxPrice : newMinPrice
    }));
};

const handleChangeMaxPrice = (e) => {
  const newMaxPrice = parseFloat(e.target.value);
  setFilters((prevFilters) => ({
      ...prevFilters,
      maxPrice: newMaxPrice < prevFilters.minPrice ? prevFilters.minPrice : newMaxPrice
  }));
};

  const handleChangeName = (e) => {
    setFilters({
      ...filters,
      name: e.target.value,
    });
  };

  const handleChangeSortOrder = (e) => {
    setFilters({
      ...filters,
      sortOrder: e.target.value,
    });
  };

  return {
    filters,
    filterProducts,
    handleChangeCategory,
    handleChangeMinPrice,
    handleChangeMaxPrice,
    handleChangeName,
    handleChangeSortOrder
  };
}
