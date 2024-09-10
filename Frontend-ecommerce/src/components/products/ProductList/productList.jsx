import { useState, useContext } from 'react';
import { useFilters } from '../../../hooks/useFilters';
import { useCart } from '../../../hooks/useCart';
import { Filters } from '../../filters/Filters';
import { AuthContext } from '../../../Context/authContext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { getProducts } from '../../../services/products/productAPI';
import { useProducts } from '../../../Context/productContext';
import ReactModal from 'react-modal';
import ProductDeleteModal from '../CRUD/ProductDelete';
import ProductEditModal from '../CRUD/EditProduct';
import ProductCreateModal from '../CRUD/CreateProduct';
import ProductItem from './productItem/productItem';
import Cart from '../../cart/Cart';
import './products.css';

ReactModal.setAppElement('#root');

function ProductList() {
    const { filterProducts } = useFilters();
    const { addToCart, removeFromCart, cart } = useCart();
    const { isAuthenticated, user } = useContext(AuthContext);
    const { products, setProducts } = useProducts();
    const [productIdToDelete, setProductIdToDelete] = useState(null);
    const [currentProduct, setCurrentProduct] = useState(null);
    const [isModalDeleteOpen, setIsModalDeleteOpen] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setOpenEditModal] = useState(false);
    const navigate = useNavigate();

    const openModal = () => setIsModalOpen(true);
    const closeModal = () => setIsModalOpen(false);

    const closeModalDelete = () => setIsModalDeleteOpen(false);

    const openModalDelete = (productId) => {
        setProductIdToDelete(productId);
        setIsModalDeleteOpen(true);
    };

    const openEditModal = (product) => {
        setCurrentProduct(product);
        setOpenEditModal(true);
    };

    const closeEditModal = () => {
        setOpenEditModal(false);
        setCurrentProduct(null);
    };

    const productListUpdated = async () => {
        const newProducts = await getProducts();
        setProducts(newProducts);
    };

    const filteredProducts = Array.isArray(products)
        ? filterProducts(products)
        : [];
    const handleAddToCart = (product) => {
        if (isAuthenticated && user?.role !== 'admin') {
        const isProductInCart = cart.some(
            (item) => item.product_id === product.product_id
        );
        if (isProductInCart) {
            removeFromCart(product);
            toast.success('Product removed from cart!');
        } else {
            addToCart(product);
            toast.success('Product added to cart!');
        }
        } else {
        toast.error('You need to be logged in to add products to the cart.');
        setTimeout(()=>{
            navigate('/auth');
        }, 1000)
        }
    };

    return (
    <>
        <Filters />
        <main className="products">
        {user && user?.role === 'admin' && (
            <button className="button__add-new " onClick={openModal}>
            <FontAwesomeIcon className="icon__fa-plus" icon={faPlus} />
            ADD NEW PRODUCT
            </button>
        )}
        <ul>
            {filteredProducts.length > 0 ? (
            filteredProducts.map((product) => (
                <ProductItem
                key={product.product_id}
                product={product}
                user={user}
                handleAddToCart={handleAddToCart}
                handleEditProduct={() => {
                    openEditModal(product);
                    setOpenEditModal(true);
                }}
                handleDeleteProduct={() => openModalDelete(product.product_id)}
                />
            ))
            ) : (
            <p>No products available</p>
            )}
        </ul>
        <ProductCreateModal
            isOpen={isModalOpen}
            onClose={closeModal}
            onProductCreated={productListUpdated}
        />
        <ProductEditModal
            isOpen={isEditModalOpen}
            onClose={closeEditModal}
            product={currentProduct}
            onProductUpdated={productListUpdated}
        />
        <ProductDeleteModal
            isOpen={isModalDeleteOpen}
            closeModal={closeModalDelete}
            productId={productIdToDelete}
            onDelete={productListUpdated}
        />
        <Cart cart={cart} />
        </main>
    </>

    );
}

export default ProductList;
