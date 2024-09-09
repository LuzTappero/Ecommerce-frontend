import { useContext, useId } from "react";
import { useFilters } from "../../hooks/useFilters";
import { CategoryContext } from '../../Context/categoryContext'
import "./filters.css";

export function Filters() {
    const { filters, handleChangeCategory,handleChangeMaxPrice, handleChangeMinPrice, handleChangeName, handleChangeSortOrder } = useFilters();
    const { categories } = useContext(CategoryContext)
    const minPriceFilterId = useId();
    const maxPriceFilterId = useId();
    const categoryFilterId = useId();
    const nameFilterId = useId();
    const sortOrderFilterId = useId();

    return (
        <section className="filters">
            <div>
            <label htmlFor={categoryFilterId}>Category</label>
            <select className="select_filter" onChange={handleChangeCategory}>
                <option value="all">All Categories</option>
                {categories.map((category) => (
                <option key={category.category_id} value={category.category_id}>
                    {category.name}
                </option>
            ))}
            </select>
            </div>
            <div>
            <label htmlFor={nameFilterId}>Product</label>
            <input
                className="input__text"
                id={nameFilterId}
                type="text"
                value={filters.name}
                onChange={handleChangeName}
                placeholder="Search by name"
            />
            </div>
            <div>
                <label htmlFor={minPriceFilterId}>Min Price</label>
                <input
                    className="input__range"
                    id={minPriceFilterId}
                    type="range"
                    min="0"
                    max={filters.maxPrice}
                    value={filters.minPrice}
                    onChange={handleChangeMinPrice}
                />
                <span className="filters__span-price">${filters.minPrice}</span>
            </div>
            <div>
                <label htmlFor={maxPriceFilterId}>Max Price</label>
                <input
                    className="input__range"
                    id={maxPriceFilterId}
                    type="range"
                    min={filters.minPrice}
                    max="400"
                    value={filters.maxPrice}
                    onChange={handleChangeMaxPrice}
                />
                <span className="filters__span-price">${filters.maxPrice}</span>
            </div>
            <div>
                <label htmlFor={sortOrderFilterId}>Price ordered by</label>
                <select className="select_filter" id={sortOrderFilterId} onChange={handleChangeSortOrder} value=  {filters.sortOrder}>
                    <option value="asc">Low to High</option>
                    <option value="desc"> High to Low</option>
                </select>
            </div>
        </section>
    );
}
