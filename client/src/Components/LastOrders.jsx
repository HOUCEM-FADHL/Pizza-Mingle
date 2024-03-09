// Importing React, useState, useEffect, axios, and react-bootstrap components
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Form } from 'react-bootstrap';
import { RiDeleteBin5Line } from "react-icons/ri";

// LastOrders component for displaying and managing user's last orders
const LastOrders = () => {
    // State variable to store user's last orders
    const [orders, setOrders] = useState([]);
    // Get user's ID from local storage
    const idx = window.localStorage.getItem('userId');

    // useEffect to fetch user's last orders when the component mounts
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pizzas/${idx}`, {
            withCredentials: true,
        })
        .then(res => {
            // Filter and sort orders by createdAt date
            const filterOrders = res.data;
            const sortedOrders = filterOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
            setOrders(sortedOrders.filter(order => order.pur === true));
        })
        .catch(err => console.log(err))
    }, []);

    // Function to handle the submission of the favorite checkbox
    const submitHandler = (e, orderId) => {
        e.preventDefault();
        axios
        .patch(`http://localhost:8000/api/updatePizza/${orderId}`, { fav: e.target.checked }, {
            withCredentials: true,
        })
        .then((res) => {
            // Update state with the modified order
            setOrders(orders.map(order => ( order._id === res.data._id ? res.data : order)))
        })
        .catch((err) => console.log(err));
    };

    // Function to handle the deletion of an order
    const deleteOrder = (e, orderId) => {
        e.preventDefault();
        axios
        .delete(`http://localhost:8000/api/deletePizza/${orderId}`, {
            withCredentials: true,
        })
        .then((res) => {
            // Update state by removing the deleted order
            setOrders(orders.filter((order) => order._id !== orderId));
        })
        .catch((err) => console.log(err));
    }

    // Rendering the LastOrders component
    return (
        <div>
            {/* Display each order as a card */}
            {orders.map(order => (
                <div key={order._id} className='card mb-3 p-3'>
                    <div className="d-flex justify-content-between align-items-center">
                        <h3>{new Date(order.createdAt).toLocaleDateString()}</h3>
                        {/* Checkbox to mark an order as a favorite */}
                        <Form.Check label="Favorite" checked={order.fav} onChange={(e) => submitHandler(e,order._id)} type="checkbox"/>
                    </div>
                    <p>{order.quantity} Pizza, {order.size} size and {order.crust} crust </p>
                    <p>Toppings: {order.toppings.join(", ")}</p>
                    <p>Price: <span className='fw-bold' style={{color: "#ff5a5e"}}>${parseFloat(
                        (order.totalPrice + order.totalPrice * 0.19).toFixed(2)
                    )}</span></p>
                    {/* Delete icon to remove an order */}
                    <span className='text-end' >
                        <RiDeleteBin5Line style={{cursor: "pointer"}} className='delete-icon' size="30" onClick={(e) => deleteOrder(e,order._id)}/>
                    </span>
                </div>
            ))}
        </div>
    );
}

// Export the LastOrders component as the default export
export default LastOrders;
