import { createContext, useState, useEffect } from "react";
import { getCategories } from "../services/categories/getCategories";

export const CategoryContext = createContext();

export const CategoryProvider = ({ children }) => {
    const [categories, setCategories] = useState([]);

    useEffect(() => {
    const fetchCategories = async () => {
        try {
        const response = await getCategories();
        setCategories(response.data.categories);
        } catch (err) {
        console.error("Error fetching categories");
        }
    };
    fetchCategories();
    }, []);

    return (
    <CategoryContext.Provider value={{ categories, setCategories }}>
        {children}
    </CategoryContext.Provider>
    );
};
