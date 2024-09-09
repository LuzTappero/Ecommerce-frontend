import { useId } from 'react';
import { FaShoppingCart } from 'react-icons/fa';
import { AuthContext } from '../../Context/authContext';
import { useContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useCart } from '../../hooks/useCart';
import { getProfileByUserId } from '../../services/profile/profileAPI';
import { useUserProfile } from '../../Context/profileContext';
import ConfirmPurchaseModal from './confirmModal/confirmModal';
import CartItem from './cartItem/CartItem';
import useHandleBuy from './HandleBuy';
import ReactModal from 'react-modal';
import ConfettiEffect from './succesModal/ConfettiEffect';
import './cart.css'

ReactModal.setAppElement('#root');

function Cart() {
  const [isConfirmModalOpen, setConfirmModalOpen] = useState(false);
  const [isSuccessModalOpen, setSuccessModalOpen] = useState(false);
  const [deliveryOption, setDeliveryOption] = useState('pickup');
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { profile, setProfile } = useUserProfile();
  const { cart, clearCart } =useCart();
  const { isAuthenticated, user } = useContext(AuthContext);
  const { handleBuy } = useHandleBuy();
  const cartCheckboxId = useId();
  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated && user) {
      const fetchProfile = async () => {
        if (!profile) {
          const data = await getProfileByUserId(user.userId);
          if (data && data.exists) {
            setProfile(data.profile);
          }
        }
      };
      fetchProfile();
    }
  }, [isAuthenticated, user, profile, setProfile]);

  const handleDeliveryOptionChange = (e) => {
    setDeliveryOption(e.target.value);
  };

  const totalPrice = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  if (!isAuthenticated || user?.role === 'admin') {
    return null;
  }

  const handleCloseModal = () => setConfirmModalOpen(false);
  const handleOpenSuccessModal = () => setSuccessModalOpen(true);

  const handleCloseSuccessModal = () => {
    setSuccessModalOpen(false);
    clearCart();
  };

  const handleCartToggle = () => {
    setIsCartOpen((prev) => !prev);
  };

  const handleOpenModal = () => {
    if (
      deliveryOption === 'homeDelivery' &&
      (!profile || !profile.address || !profile.phone)
    ) {
      toast.error(
        'Your address and phone information is missing. You will be redirected to update your profile in 1.5 seconds.',
        {
          position: 'top-center',
          autoClose: 1500,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: false,
          draggable: false,
          progress: undefined,
        }
      );
      setTimeout(
        () => navigate('/profile-create', { state: { fromCart: true } }),
        1500
      );
      return;
    }
    setIsCartOpen(false);
    setConfirmModalOpen(true);
  };

  const handleConfirmPurchase = async () => {
    try {
      await handleBuy(cart, deliveryOption);
      handleCloseModal();
      handleOpenSuccessModal();
    } catch (error) {
      console.error('Error confirming purchase:', error);
    }
  };


  return (
    <>
      <label className="cart__toggle" htmlFor={cartCheckboxId}>
        <FaShoppingCart />
      </label>
      <input
        id={cartCheckboxId}
        type="checkbox"
        hidden
        checked={isCartOpen}
        onChange={handleCartToggle}
      />
      <aside className="cart">
        <ul>
            {cart.length > 0 ? (
              cart.map((product) => (
                <CartItem
                  key={product.product_id}
                  product={product}
                />
              ))
            ) : (
              <p>Your cart is empty</p>
            )}
        </ul>
        {cart.length > 0 && (
          <>
            <h3 className="subtitle__totalprice">
              Total Price: $
              {cart
                .reduce((total, item) => total + item.price * item.quantity, 0)
                .toFixed(2)}
            </h3>
            <div className="delivery-option">
              <label>
                <input
                  type="radio"
                  value="pickup"
                  checked={deliveryOption === 'pickup'}
                  onChange={handleDeliveryOptionChange}
                />
                Pickup in Store
              </label>
              <label>
                <input
                  type="radio"
                  value="homeDelivery"
                  checked={deliveryOption === 'homeDelivery'}
                  onChange={handleDeliveryOptionChange}
                />
                Send to home
              </label>
            </div>
            {deliveryOption === 'homeDelivery' && (
              <div className="delivery-details">
                <p>
                  Ensure your address and phone number are updated in your
                  profile; The purchase will be sent to that address! If you
                  have any questions about the order, please contact us! We will
                  notify you via email of the tracking of your shipment.
                </p>
              </div>
            )}
            {deliveryOption === 'pickup' && (
              <div className="delivery-details">
                <p>
                  If you have selected -Pickup in Store- please visit our
                  location at the following address:
                </p>
                <strong>Address:123 Street, City, Country</strong>

                <p>
                  For any questions or further assistance regarding your order,
                  please feel free to contact us through the information
                  provided in the footer of our website. We look forward to
                  seeing you soon!
                </p>
              </div>
            )}
            <button className="cart__button-buy" onClick={handleOpenModal}>
              BUY NOW
            </button>
          </>
        )}
      </aside>
      <ConfirmPurchaseModal
        isOpen={isConfirmModalOpen}
        onRequestClose={handleCloseModal}
        cart={cart}
        totalPrice={totalPrice}
        deliveryOption={deliveryOption}
        profile={profile}
        handleConfirmPurchase={handleConfirmPurchase}
      />
      <ConfettiEffect
        isOpen={isSuccessModalOpen}
        onClose={handleCloseSuccessModal}
      />
    </>
  );
}

export default Cart;
