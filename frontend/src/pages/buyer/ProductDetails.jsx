import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './ProductDetails.css';

const ProductDetails = () => {
    const { id } = useParams();
    const [product, setProduct] = useState(null);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProductDetails = async () => {
            try {
                const response = await fetch(`http://localhost:3000/product/getproduct/${id}`);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                const data = await response.json();
                setProduct(data);
            } catch (error) {
                console.error('Error fetching product details:', error);
            }
        };

        fetchProductDetails();
    }, [id]);

    const addToCart = async () => {
        const token = localStorage.getItem('token'); // Retrieve the token

        if (!token) {
            alert('You must be logged in to add items to the cart.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3000/cart/addtocart', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ productId: product._id, quantity: 1 }),
            });

            if (response.ok) {
                alert('Product added to cart successfully');
            } else {
                console.error('Error adding product to cart:', response.statusText);
            }
        } catch (error) {
            console.error('Error adding product to cart:', error);
        }
    };

    const buyNow = async () => {
        const confirmation = window.confirm(`Do you want to place the order for ${product.name} at a price of $${product.sellerPrice}?`);
        
        if (confirmation) {
            const token = localStorage.getItem('token'); // Retrieve the token

            if (!token) {
                alert('You must be logged in to place an order.');
                return;
            }

            try {
                const response = await fetch('http://localhost:3000/order/create', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        Authorization: `Bearer ${token}`,
                    },
                    body: JSON.stringify({
                        orderItems: [{ productId: product._id, quantity: 1 }],
                    }),
                });

                if (response.ok) {
                    const orderData = await response.json();
                    alert('Order placed successfully!');
                    // Optionally redirect to order history or cart
                } else {
                    console.error('Error creating order:', response.statusText);
                    alert('Error creating order. Please try again.');
                }
            } catch (error) {
                console.error('Error creating order:', error);
                alert('Error creating order. Please try again.');
            }
        }
    };

    if (!product) return <div>Loading...</div>;

    return (
        <div className="product-details">
            <h1>{product.name}</h1>
            <img src={product.images[0]} alt={product.name} />
            <p>{product.description}</p>
            <p>Category: {product.category}</p>
            <p>Price: ${product.sellerPrice}</p>
            <p>Available Quantity: {product.quantity}</p>
            <button onClick={addToCart}>Add to Cart</button>
            <button onClick={buyNow}>Buy Now</button>
        </div>
    );
};

export default ProductDetails;
