import React from "react";
import { BsCart } from "react-icons/bs";
import { FaBars, FaUser } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

function Header() {
  const { cartItems } = useSelector((state) => state.cartReducer);

  // Toggle Bar Menu
  const toggleBar = () => {
    const Nav = document.querySelector(".navMenu");
    Nav.classList.toggle("active");
  };

  const { user } = JSON.parse(localStorage.getItem("currentUser"));

  const logout = () => {
    localStorage.removeItem("currentUser");
    window.location.reload();
  };

  return (
    <nav className='navbar'>
      <div className='navContainer'>
        <Link to='/' className='logo'>
          <h5>
            Sabka <span>Bazar</span>
          </h5>
        </Link>

        <div className='navMenu'>
          <ul className='navList'>
            <li>
              <Link to='/' className='link'>
                <FaUser />
                {user.email.substring(0, user.email.length - 10)}
              </Link>
            </li>
            <li>
              <Link to='/orders' className='link'>
                orders
              </Link>
            </li>
            <li>
              <Link to='/' className='link' onClick={logout}>
                logout
              </Link>
            </li>

            <Link to='/cart' className='link'>
              <BsCart className='cart' />
              <p>{cartItems.length}</p>
            </Link>
          </ul>
        </div>
      </div>
      <button className='toggleBtn' onClick={toggleBar}>
        <FaBars />
      </button>
    </nav>
  );
}

export default Header;
