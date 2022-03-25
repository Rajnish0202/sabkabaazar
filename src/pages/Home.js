import React, { useCallback, useEffect, useState } from "react";
import Layout from "../components/Layout";
import { collection, getDocs } from "firebase/firestore";
import fireDB from "../fireConfig";
import "../styleSheets/Home.css";
// import { fireproducts } from "../firecommerce-product";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";

function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [category, setCategory] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("");

  const { cartItems } = useSelector((state) => state.cartReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    setLoading(true);
    try {
      const products = await getDocs(collection(fireDB, "products"));
      const productsArray = [];
      products.forEach((product) => {
        const obj = {
          id: product.id,
          ...product.data(),
        };
        productsArray.push(obj);
      });
      setProducts(productsArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    dispatch({ type: "ADD_TO_CART", payload: product });
  };

  const categorySet = useCallback(() => {
    const allCategories = [...new Set(products.map((item) => item.category))];
    // console.log(allCategories);
    setCategory(allCategories);
  }, [products]);

  useEffect(() => {
    categorySet();
  }, [categorySet]);

  return (
    <Layout loading={loading}>
      <div className='container'>
        <div className='searchContainer'>
          <input
            type='text'
            className='form_control'
            placeholder='Search...'
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
          <select
            className='form_control'
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
          >
            <option value=''>All</option>
            {category.map((list, index) => (
              <option key={index} value={list}>
                {list}
              </option>
            ))}
          </select>
        </div>
        <div className='row'>
          {products
            .filter((obj) => obj.title.toLowerCase().includes(search))
            .filter((obj) => obj.category.toLowerCase().includes(filter))
            .map((product, index) => {
              const { title, image, price } = product;
              return (
                <div className='product-row' key={index}>
                  <div className='box'>
                    <p className='title'>{title}</p>
                    <div className='productImg'>
                      <img src={image} alt={title} />
                    </div>
                    <p className='price'>
                      $ <span>{price}</span>
                    </p>
                    <div className='btn_container'>
                      <button
                        className='addToCart'
                        onClick={() => addToCart(product)}
                      >
                        Add to cart
                      </button>
                      <button
                        className='view'
                        onClick={() => navigate(`/product-info/${product.id}`)}
                      >
                        view
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </Layout>
  );
}

export default Home;
