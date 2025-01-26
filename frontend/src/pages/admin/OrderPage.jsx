import React, { useEffect, useState } from 'react';
import Navbaradmin from '../../components/Navbaradmin';
import axios from 'axios';

function OrderPage() {
  const [orders, setOrders] = useState([]);

  // Fetch orders from the backend
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:3000/order/history', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        setOrders(response.data);
      } catch (error) {
        console.error('Error fetching orders:', error);
        alert('Error fetching orders: ' + error.response?.data?.message);
      }
    };
    fetchOrders();
  }, []);

  return (
    <>
      <Navbaradmin />
      <div className="order-container">
        <h1>Order List</h1>
        <table className="order-table">
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Buyer ID</th>
              <th>Order Items</th>
              <th>Total</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {orders.map((order) => (
              <tr key={order._id}>
                <td>{order._id}</td>
                <td>{order.buyerId}</td>
                <td>
                  {order.orderItems.map(item => (
                    <div key={item.productId}>
                      {item.name} (x{item.quantity})
                    </div>
                  ))}
                </td>
                <td>₹{order.total.toFixed(2)}</td>
                <td>{order.orderStatus}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default OrderPage;
