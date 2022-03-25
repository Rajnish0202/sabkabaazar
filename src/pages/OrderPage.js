import { collection, getDocs } from "firebase/firestore";
import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import fireDB from "../fireConfig";

function OrderPage() {
  const [orders, setOrders] = useState([]);
  // console.log(orders);
  const [loading, setLoading] = useState(false);
  const userId = JSON.parse(localStorage.getItem("currentUser")).user.uid;

  useEffect(() => {
    getdata();
  }, []);

  async function getdata() {
    setLoading(true);
    try {
      const results = await getDocs(collection(fireDB, "order"));
      const ordersArray = [];
      results.forEach((doc) => {
        ordersArray.push(doc.data());
      });
      setOrders(ordersArray);
      // console.log(ordersArray);
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  }

  return (
    <Layout loading={loading}>
      {orders
        .filter((obj) => obj.userid === userId)
        .map((order, index) => {
          return (
            <table className='table' key={index}>
              <thead>
                <tr>
                  <th>Image</th>
                  <th>Item</th>
                  <th>price</th>
                </tr>
              </thead>
              <tbody>
                {order.cartItems.map((item, index) => {
                  return (
                    <tr key={index}>
                      <td>
                        <img
                          src={item.image}
                          alt={item.title}
                          height='80'
                          width='80'
                        />
                      </td>
                      <td>{item.title}</td>
                      <td>{item.price}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          );
        })}
    </Layout>
  );
}

export default OrderPage;
