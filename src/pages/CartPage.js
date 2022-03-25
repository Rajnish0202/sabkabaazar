import React, { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import Layout from "../components/Layout";
import PlaceOrder from "../components/PlaceOrder";
import "../styleSheets/Cart.css";

function CartPage() {
  const { cartItems } = useSelector((state) => state.cartReducer);
  const [total, setTotal] = useState(0);

  const dispatch = useDispatch();

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    let temp = 0;
    cartItems.forEach((cartItem) => {
      temp = Number(temp) + Number(cartItem.price);
    });
    setTotal(temp.toFixed(2));
  }, [cartItems]);

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const deleteFromCart = (item) => {
    dispatch({ type: "DELETE_FROM_CART", payload: item });
  };

  return (
    <Layout>
      {cartItems.length === 0 ? (
        <div className='emptyCart'>
          <h3>Your cart Is empty</h3>
          <Link to='/' className='cartBack'>
            Back
          </Link>
        </div>
      ) : (
        <table className='table'>
          <thead>
            <tr>
              <th>Image</th>
              <th>Item</th>
              <th>Price</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {cartItems.map((item, index) => {
              // console.log(item);
              const { image, title, price } = item;
              return (
                <tr key={index}>
                  <td>
                    <img src={image} alt={title} height='80' width='80' />
                  </td>
                  <td>{title}</td>
                  <td>{price}</td>
                  <td>
                    <FaTrash
                      className='trash'
                      onClick={() => deleteFromCart(item)}
                    />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}

      <div className='totalAmount'>
        <h4 className='total'>
          Total Amount : $<span>{total}</span>
        </h4>
      </div>

      <button onClick={handleShow} className='placeOrder'>
        Place Order
      </button>
      {show && <PlaceOrder handleClose={handleClose} cartItems={cartItems} />}
    </Layout>
  );
}

export default CartPage;
