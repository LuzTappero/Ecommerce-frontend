import { useContext, useState } from "react";
import { AuthContext } from "../../Context/authContext";
import { saveCart } from "../../services/orders/ordersAPI";
import { toast } from 'react-toastify';

function useHandleBuy () {
    const { user, isAuthenticated } = useContext(AuthContext);
    const [deliveryOption, setDeliveryOption] = useState('pickup');

    const handleDeliveryOptionChange = (e) => {
        setDeliveryOption(e.target.value);
    };

    const handleBuy = async (cart, deliveryOption) => {
    if (!isAuthenticated || user?.role !== 'client'){
        toast.error('Please log in to complete the purchase.');
        return;
    }

    if (!Array.isArray(cart)){
        console.error('Cart is not an array:', cart);
        toast.error('Invalid cart data.');
        return;
    }

    const profileData = {
        user_id: user.userId,
        cartItems: cart.map(({ product_id, quantity, price }) => ({
            product_id,
            quantity,
            price
        })),
        address: deliveryOption === 'delivery' ? user.address : null,
        delivery_option: deliveryOption
    };

    try{
        const response = await saveCart(profileData)
            if (response.status === 201) {
                const { message } = response.data;
                toast.success(message);
            }
            else {
                toast.error('Failed to complete purchase. Please try again.');
            }
    }catch(error){
        console.error('Error processing purchase:', error);
        toast.error('Failed to complete purchase');
    }
};

    return {
        handleBuy,
        deliveryOption,
        handleDeliveryOptionChange,
    }
}

export default useHandleBuy;