import React, { useState, useEffect } from "react";
import Layout from "../components/Layout";
import {
  collection,
  getDocs,
  setDoc,
  doc,
  addDoc,
  deleteDoc,
} from "firebase/firestore";
import fireDB from "../fireConfig";
import { FaEdit, FaTrash } from "react-icons/fa";
import { toast } from "react-toastify";

function AdminPage() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [product, setProduct] = useState({
    title: "",
    price: "",
    image: "",
    category: "",
    description: "",
  });

  const [add, setAdd] = useState(false);

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

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const editHandler = (item) => {
    setProduct(item);
    setShow(true);
  };

  const addHandler = () => {
    setAdd(true);
    handleShow();
  };

  const updateProduct = async () => {
    try {
      await setDoc(doc(fireDB, "products", product.id), product);
      toast.success("Product Updated Successfully.");
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Product Update Failed.");
    }
  };

  const addProduct = async () => {
    try {
      await addDoc(collection(fireDB, "products"), product);
      toast.success("Product added Successfully.");
      setShow(false);
      window.location.reload();
    } catch (error) {
      console.log(error);
      toast.error("Product add Failed.");
    }
  };

  const deleteProduct = async (item) => {
    try {
      await deleteDoc(doc(fireDB, "products", item.id));
      toast.success("Product deleted Successfully.");
      getdata();
    } catch (error) {
      console.log(error);
      toast.error("Product delete Failed.");
    }
  };

  return (
    <Layout loading={loading}>
      <div className='heading addProduct'>
        <h3>
          Product List
          <span> {products.length}</span>
        </h3>
        <div className='addBtn'>
          <button onClick={addHandler}>Add Products</button>
        </div>
      </div>
      <table className='table'>
        <thead>
          <tr>
            <th>Image</th>
            <th>Title</th>
            <th>Category</th>
            <th>Price</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((item, index) => {
            // console.log(item);
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
                <td>{item.category}</td>
                <td>{item.price}</td>
                <td className='arrange'>
                  <FaTrash
                    className='trash'
                    onClick={() => deleteProduct(item)}
                  />
                  <FaEdit className='edit' onClick={() => editHandler(item)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      {show && (
        <div className='adminEdit'>
          <div className='layout'>
            <div className='orderContainer'>
              <div className='heading'>
                <p>{add ? "Add a product" : "Product update"}</p>
              </div>
              <div className='orderContent'>
                <input
                  type='text'
                  className='form-control'
                  placeholder='Title..'
                  value={product.title}
                  onChange={(e) =>
                    setProduct({ ...product, title: e.target.value })
                  }
                />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Image Url..'
                  value={product.image}
                  onChange={(e) =>
                    setProduct({ ...product, image: e.target.value })
                  }
                />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Category..'
                  value={product.category}
                  onChange={(e) =>
                    setProduct({ ...product, category: e.target.value })
                  }
                />
                <input
                  type='text'
                  className='form-control'
                  placeholder='Description..'
                  value={product.description}
                  onChange={(e) =>
                    setProduct({ ...product, description: e.target.value })
                  }
                />
                <input
                  type='number'
                  className='form-control'
                  placeholder='Price..'
                  value={product.price}
                  onChange={(e) =>
                    setProduct({ ...product, price: e.target.value })
                  }
                />
              </div>
              <div className='buttonContainer'>
                <button onClick={handleClose}>close</button>
                {add ? (
                  <button onClick={addProduct}> add</button>
                ) : (
                  <button onClick={updateProduct}> save</button>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
}

export default AdminPage;
