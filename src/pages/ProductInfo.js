import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import { getDoc, doc } from "firebase/firestore";
import fireDB from "../fireConfig";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "../styleSheets/ProductInfo.css";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";

function ProductInfo() {
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(false);

  const params = useParams();

  const { cartItems } = useSelector((state) => state.cartReducer);
  const dispatch = useDispatch();

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    setLoading(true);
    try {
      const productTemp = await getDoc(
        doc(fireDB, "products", params.productId)
      );
      setProduct(productTemp.data());
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = () => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  return (
    <Layout loading={loading}>
      <div className='product_container'>
        {product && (
          <div className='productInfo'>
            <p>
              <b>{product.title}</b>
            </p>
            <div className='imgBox'>
              <img
                src={product.image}
                alt={product.title}
                className='product-info-img'
              />
            </div>
            <hr />
            <p className='desc'>{product.description}</p>
            <div className='buttonContainer'>
              <button className='addToCart' onClick={addToCart}>
                Add To Cart
              </button>
              <Link to='/' className='back'>
                Back
              </Link>
            </div>
          </div>
        )}
      </div>
    </Layout>
  );
}

export default ProductInfo;
