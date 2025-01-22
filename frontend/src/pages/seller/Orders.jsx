import React, { useEffect, useState } from 'react';
import Navbarseller from '../../components/Navbarseller';
import axios from 'axios';

function Orders() {
  const [products, setProducts] = useState([]);
  const [refresh, setRefresh] = useState(false); // Add a refresh state
// console.log(products)
  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          alert('No token found. Please log in.');
          return;
        }

        const response = await axios.get('http://localhost:3000/product/getproductforseller', {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (Array.isArray(response.data)) {
          setProducts(response.data);
        } else {
          console.error('API response is not an array:', response.data);
          setProducts([]);
        }
      } catch (error) {
        console.error('Error fetching products:', error);
        alert('Error fetching products: ' + error.response?.data?.message);
      }
    };
    fetchProducts();
  }, [refresh]);

  

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await axios.patch(`/api/orders/${orderId}`, { status: newStatus });
      // Optionally, refresh the orders list or update the state
    } catch (error) {
      console.error("Error updating order status:", error);
    }
  };

  return (
    <>
      <Navbarseller />
      <div className="product-container">
        <h1>Order List</h1>
        <table className="product-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Name</th>
              <th>Description</th>
              <th>Quantity</th>
              <th>Stock</th>
              <th>Seller Price</th>
              <th>Category</th>
              <th>Order Status</th> {/* New column for Order Status */}
            </tr>
          </thead>
          <tbody>
            {products.map((product) => (
              <tr key={product._id}>
                <td>
                  <img
                    src={`http://localhost:3000/uploads/${product?.images}`} 
                    alt={product.name}
                    className="product-image"                   
                  />
                </td>
                <td>{product.name}</td>
                <td>{product.description}</td>
                <td>{product.quantity}</td>
                <td>{product.stock}</td>
                <td>₹{product.sellerPrice.toFixed(2)}</td>
                <td>{product.category}</td>
                <td>
                  <select 
                    value={product.orderStatus} 
                    onChange={(e) => handleStatusChange(product._id, e.target.value)}
                  >
                    <option value="Approved">Approved</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;