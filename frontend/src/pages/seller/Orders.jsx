import React, { useState,useEffect } from 'react';
import Navbarseller from '../../components/Navbarseller';
import axios from 'axios';

function Orders() {
  const [statuses, setStatuses] = useState({});
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
  }, [refresh]); // Add refresh as a dependency

  const handleStatusChange = (productId, newStatus) => {
    setStatuses(prevStatuses => ({
      ...prevStatuses,
      [productId]: newStatus,
    }));
  };

  return (
    <>
      <Navbarseller />
      <div className="product-container">
        <h1>Orders List</h1>
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
              <th>Status</th> {/* New Status Column */}
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
                    value={statuses[product._id] || ''} 
                    onChange={(e) => handleStatusChange(product._id, e.target.value)}
                  >
                    <option value="">Select Status</option>
                    <option value="Approved">Approved</option>
                    <option value="Dispatched">Dispatched</option>
                    <option value="Delivered">Delivered</option>
                  </select>
                </td> {/* Dropdown for Status */}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default Orders;
