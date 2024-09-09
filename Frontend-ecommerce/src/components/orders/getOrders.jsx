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
        const ordersArray = Object.values(response);
        if (Array.isArray(ordersArray)) {
          setOrders(ordersArray);
        } else {
          console.error("Data is not in the expected format:", response);
          setError("Unexpected data format");
        }
      } catch (err) {
        console.error(err);
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
