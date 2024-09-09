import ReactModal from "react-modal";
import './confirmModal.css'

const ConfirmPurchaseModal = ({
    isOpen,
    onRequestClose,
    cart,
    totalPrice,
    deliveryOption,
    profile,
    handleConfirmPurchase,
}) =>{
    return (
        <ReactModal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        contentLabel="Confirm Purchase Modal"
        className="confirm-modal"
        overlayClassName="modal-overlay"
        >
        <h2>CONFIRM YOUR PURCHASE</h2>
        <p>You are about to purchase the following items:</p>
        <div className="confirm-modal-container">
            <ul>
                {cart.map((item) => (
                <li key={item.product_id}>
                    {item.name} - ${item.price} x {item.quantity}
                </li>
                ))}
            </ul>
            <p>Total Price: ${totalPrice.toFixed(2)}</p>
        </div>
        <p>
            Delivery Option:{' '}
            {deliveryOption === 'homeDelivery'
                ? 'Home delivery'
                : 'Pickup in Store'}
        </p>
            {deliveryOption === 'homeDelivery' ? (
            profile ? (
        <div>
            <p>
                Delivery Address: <strong>{profile.address}</strong>
            </p>
        </div>
        ) : (
            <p>
                Your address information is missing. Please update your profile with a delivery address.
            </p>
        )
        ) : (
            <p>
                Pickup in Store
                <strong> Address:</strong> 123 Street, City, Country
            </p>
        )}

        <div className="confirm-modal-buttons">
        <button className="btn-confirm" onClick={handleConfirmPurchase}>
            Confirm
        </button>
        <button className="btn-cancel" onClick={onRequestClose}>
            Cancel
        </button>
        </div>
    </ReactModal>
    );
};

export default ConfirmPurchaseModal