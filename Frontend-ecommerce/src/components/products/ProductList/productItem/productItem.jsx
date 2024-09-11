import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faShoppingCart,  faTrash, faEdit} from '@fortawesome/free-solid-svg-icons';
import { AuthContext } from '../../../../Context/authContext';
import { useContext } from 'react';
import { CartContext } from '../../../../Context/cartContext';
import './productItem.css'

const ProductItem = ({
    product,
    handleAddToCart,
    handleEditProduct,
    handleDeleteProduct,
}) => {
    const { cart } = useContext(CartContext);
    const { user } = useContext(AuthContext);
    const isProductInCart = cart?.some(
        (item) => item.product_id === product.product_id
    );

    return (
        <li className='item'>
        <h3>{product.name}</h3>
        <span>{product.description}</span>
        <span>$ {product.price}</span>
        <div className="item__img-container">
            {product.imagePath ? (
            <img
                className="item__img"
                src={product.imagePath}
                alt={product.name}
            />
            ) : (
            <p>No image available</p>
            )}
        </div>
        <div>
            {user && user.role === 'admin' ? (
            <>
                <div className='item__button-container'>
                    <button
                    className="item__button-edit--admin"
                    onClick={handleEditProduct}
                    >
                    <FontAwesomeIcon icon={faEdit} />
                    </button>
                    <button
                    className="item__button-delete--admin"
                    onClick={handleDeleteProduct}
                    >
                    <FontAwesomeIcon icon={faTrash} />
                    </button>
                </div>
            </>
            ) : (
                <div className='item__button-container'>
                    <button
                        className="item__button-add"
                        onClick={() => handleAddToCart(product)}
                    >
                        <FontAwesomeIcon
                        icon={isProductInCart ? faTrash : faShoppingCart}
                        />
                    </button>
                </div>
            )}
        </div>
        </li>
    );
};

export default ProductItem;
