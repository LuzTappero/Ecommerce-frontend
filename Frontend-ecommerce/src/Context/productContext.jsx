/* eslint-disable react-refresh/only-export-components */
import { createContext, useState, useEffect, useContext } from 'react';
import { getProducts, deleteProduct } from '../services/products/productAPI';

const ProductContext = createContext();

export const ProductProvider = ({ children }) => {
    const [products, setProducts] = useState([]);

    useEffect(() => {
    const fetchProducts = async () => {
        const fetchedProducts = await getProducts();
        setProducts(fetchedProducts);
    };
    fetchProducts();
    }, []);

    const deleteProd = async (productId) => {
    try {
        const response = await deleteProduct(productId);
        if (response.status === 204) {
        setProducts((prevProducts) =>
            prevProducts.filter((product) => product.product_id !== productId)
        );
        return { success: true, message: 'Product deleted successfully' };
        } else if (response.status === 400) {
        const errorMessage =
            response.data?.message ||
            'Cannot delete product because it is referenced in other records.';
        throw new Error(errorMessage);
        } else {
        throw new Error('Failed to delete the product');
        }
    } catch (error) {
        const errorMessage =
        error.response?.data?.message ||
        error.message ||
        'An unexpected error occurred';
        return { success: false, message: errorMessage };
    }
};

return (
    <ProductContext.Provider value={{ products, setProducts, deleteProd }}>
        {children}
    </ProductContext.Provider>
    );
};

export const useProducts = () => {
    return useContext(ProductContext);
};
