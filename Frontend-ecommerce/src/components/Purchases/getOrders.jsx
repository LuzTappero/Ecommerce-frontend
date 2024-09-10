import { useEffect, useState } from "react";
import { getUserPurchases } from "../../services/orders/ordersAPI";
import "./orders.css";

const UserPurchases = ({ isVisible }) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const fetchPurchases = async () => {
      try {
        const token = sessionStorage.getItem("access_token");
        if (!token) {
          setError("User is not authenticated");
          return;
        }
        const response = await getUserPurchases();


        if (response && typeof response === 'object') {
          const ordersArray = Object.values(response);
            if (Array.isArray(ordersArray)) {
              setOrders(ordersArray);
            } else {
              setError("Unexpected data format");
            }
        } else {
          null
        }
      } catch (err) {
        console.error(err);
        setError("Failed to fetch purchases");
      } finally {
        setLoading(false);
      }
    };
    fetchPurchases();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }
  if (!Array.isArray(orders)) {
    return <div>Error: Orders data is not available</div>;
  }

  return (
    <div className={`purchases ${isVisible ? "show" : ""}`}>
      <h2>MY PURCHASES</h2>
      {orders.length > 0 ? (
        <ul>
          {orders.map((order) => {
            const totalPrice = order.OrderItemModels.reduce((total, item) => total + item.price * item.quantity, 0);

            const orderDate = new Date(order.OrderItemModels[0].created_at).toLocaleDateString("en-US", {
              year: "numeric",
              month: "long",
              day: "numeric",
              hour: "2-digit",
              minute: "2-digit",
            });

            return (
              <li key={order.order_id}>
                <h3>Order N°: {order.order_id}</h3>
                <ul>
                  {order.OrderItemModels.map((item, index) => (
                    <li key={index}>
                      <p>
                        <strong>Product Name:</strong> {item.ProductModel.name}
                      </p>
                      <p>
                        <strong>Quantity:</strong> {item.quantity}
                      </p>
                      <p>
                        <strong>Price:</strong> ${Number(item.price).toFixed(2)}
                      </p>
                      <p><strong>Delivery Option:</strong> {order.delivery_option}</p>
                    </li>
                  ))}
                </ul>
                <p>
                  <strong>Total Price:</strong> ${totalPrice.toFixed(2)}
                </p>
                <p>
                  <strong>Date:</strong> {orderDate}
                </p>
              </li>
            );
          })}
        </ul>
      ) : (
        <p>No purchases found.</p>
      )}
    </div>
  );
};
export default UserPurchases;
