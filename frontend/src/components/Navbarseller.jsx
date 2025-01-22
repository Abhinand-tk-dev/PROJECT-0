import React from "react";
import '../components/Navbar.css'
//yyyyyyyyyyy
function Navbarseller() {
  return (
    <>
      <div className="navbar">
        <nav>
          <a href="/" className="home">
            Shopy <br />
            <a href="" className="home12">
              Explore <span>plus</span>{" "}
            </a>
          </a>
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search for products, brands, and more..."
            />
          </div>
          <ul>
            <li>
              <a href="#">Dashboard</a>
            </li>
            <li>
              <a href="/seller/addproduct">Add Products</a>
            </li>
            <li>
              <a href="/seller/getproductforseller">View Products</a>
            </li>
            <li>
              <a href="/seller/orders">Orders</a>
            </li>
            <li >
              <a href="/seller/login" className="text-yellow-600">Login</a>
            </li>

            <li>
              <a href="#">Profile</a>
            </li>
          </ul>
        </nav>
      </div>
    </>
  );
}

export default Navbarseller;