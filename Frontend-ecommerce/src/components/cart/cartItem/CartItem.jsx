import { faTrash, faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useCart } from "../../../hooks/useCart";
import './cartItem.css'

function CartItem({ product }){
    const {addToCart, removeFromCart, decreaseQuantity} = useCart()

return (
    <li className="cart__item">
        <img
            className="cart__item-image"
            src={product.imagePath}
            alt={product.name}
        />
        <div className="cart__item-details">
            <strong className="cart__item-name">{product.name}</strong>
            <span className="cart__item-price">${product.price}</span>
        </div>
    <footer className="cart__item-footer">
        <small className="cart__item-quantity">{product.quantity}</small>
        <button
            className="cart__item-button"
            onClick={() => addToCart(product)}
        >
        <FontAwesomeIcon icon={faPlus} />
        </button>
        <button
            className="cart__item-button"
            onClick={() => decreaseQuantity(product)}
        >
            <FontAwesomeIcon icon={faMinus} />
        </button>
        <button
            className="cart__item-button"
            onClick={() => removeFromCart(product)}
        >
            <FontAwesomeIcon icon={faTrash} />
        </button>
    </footer>
    </li>
    );
}

export default CartItem