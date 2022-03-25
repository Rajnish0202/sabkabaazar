import React from "react";
import { useState } from "react";
import "../styleSheets/placeOrder.css";
import { addDoc, collection } from "firebase/firestore";
import fireDB from "../fireConfig";
import { toast } from "react-toastify";

function PlaceOrder({ handleClose, cartItems }) {
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [pinCode, setPinCode] = useState("");

  const placeOrder = async () => {
    const addressInfo = {
      name,
      address,
      pinCode,
      contact,
    };
    // console.log(addressInfo);

    const orderInfo = {
      cartItems,
      addressInfo,
      email: JSON.parse(localStorage.getItem("currentUser")).user.email,
      userid: JSON.parse(localStorage.getItem("currentUser")).user.uid,
    };

    try {
      await addDoc(collection(fireDB, "order"), orderInfo);
      toast.success("Order Placed Successfully.");
      handleClose();
    } catch (error) {
      // console.log(error);
      toast.error("Order Failed.");
    }
  };

  return (
    <div className='layout'>
      <div className='orderContainer'>
        <div className='heading'>
          <p>Add Your Address</p>
        </div>
        <div className='orderContent'>
          <input
            type='text'
            className='form-control'
            placeholder='Name...'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='text'
            className='form-control'
            placeholder='address...'
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <input
            type='number'
            className='form-control'
            placeholder='Pin Code...'
            value={pinCode}
            onChange={(e) => setPinCode(e.target.value)}
          />
          <input
            type='number'
            className='form-control'
            placeholder='Contact Number...'
            value={contact}
            onChange={(e) => setContact(e.target.value)}
          />
        </div>
        <div className='buttonContainer'>
          <button onClick={placeOrder}> place order</button>
          <button onClick={handleClose}>close</button>
        </div>
      </div>
    </div>
  );
}

export default PlaceOrder;
