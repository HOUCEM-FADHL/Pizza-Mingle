// Importing necessary React components, styles, and dependencies
import React, { useState, useEffect } from "react";
import NavComponent from "../Components/NavComponent";
import axios from "axios";
import { Button, Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

// Order component to manage and display user orders
const Order = () => {
  // State to manage user orders, user details, and notification display
  const [orders, setOrders] = useState([]);
  const idx = window.localStorage.getItem("userId");
  const { user, setUser } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);

  // Effect to fetch user orders on component mount
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pizzas/${idx}`, {
        withCredentials: true,
      })
      .then((res) => {
        // Sorting and filtering user orders
        const filterOrders = res.data;
        const sortedOrders = filterOrders.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
        setOrders(sortedOrders.filter((order) => order.pur === false));
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to cancel an order and update user details
  const startOver = (e, orderId) => {
    e.preventDefault();
    // Confirming order cancellation
    const confirmDelete = window.confirm(
      "Are you sure you want to cancel this Order?"
    );

    if (confirmDelete) {
      // Deleting the order
      axios
        .delete(`http://localhost:8000/api/deletePizza/${orderId}`, {
          withCredentials: true,
        })
        .then((res) => {
          // Updating the state to remove the canceled order
          setOrders(orders.filter((order) => order._id !== orderId));
        })
        .catch((err) => console.log(err));

      // Updating user orderNum
      axios
        .patch(
          `http://localhost:8000/api/updateUser/${idx}`,
          { orderNum: user.orderNum - 1 },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("user updated", res.data);
          setUser(res.data);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  // Function to mark an order as purchased and update user details
  const purchase = (e, orderId) => {
    e.preventDefault();

    // Marking the order as purchased
    axios.patch(
      `http://localhost:8000/api/updatePizza/${orderId}`,
      { pur: true },
      { withCredentials: true }
    )
    .then((res) => {
      // Updating the state to remove the purchased order
      setOrders(orders.filter((order) => order._id !== orderId));

      // Updating user orderNum
      axios
        .patch(
          `http://localhost:8000/api/updateUser/${idx}`,
          { orderNum: user.orderNum - 1 },
          {
            withCredentials: true,
          }
        )
        .then((res) => {
          console.log("user updated", res.data);
          setUser(res.data);

          // Displaying a success notification
          setShowNotification(true);
          setTimeout(() => {
            setShowNotification(false);
          }, 3000);
        })
        .catch((err) => {
          console.log(err);
        });
    })
    .catch((err) => console.log(err));
  };

  // Rendering the Order component
  return (
    <div>
      {/* Navigation component for header */}
      <NavComponent home={false} />
      {/* Container to display user orders */}
      <div className="container w-50 mx-auto">
        <h1 className="text-center">Your Order</h1>
        {/* Display the notification box only when showNotification is true */}
        {showNotification && (
          <div
            style={{
              position: "fixed",
              bottom: "20px",
              right: "20px",
              zIndex: "9999",
            }}
          >
            <Alert
              variant="success"
              onClose={() => setShowNotification(false)}
              dismissible
            >
              Purchase submitted successfully!
            </Alert>
             
          </div>
        )}
        {/* Mapping and displaying user orders */}
        {orders.map((order) => (
          <div key={order._id} className="card mb-3 p-3">
            <p>Method: {order.method}</p>
            <p>Size: {order.size}</p>
            <p>Crust: {order.crust} Crust</p>
            <p>Toppings: {order.toppings.join(", ")}</p>
            {/* Displaying price, quantity, total price, and tax information */}
            <div className="d-flex justify-content-between">
              <p>
                Price:{" "}
                <span className="fw-bold" style={{ color: "#ff5a5e" }}>
                  ${order.totalPrice / order.quantity}
                </span>
              </p>
              <p className="text-end">
                Quantity: <span className="fw-bold">{order.quantity}</span>
              </p>
            </div>
            <p className="text-end">
              Total Price:{" "}
              <span className="fw-bold" style={{ color: "#ff5a5e" }}>
                ${order.totalPrice}
              </span>
            </p>
            <p className="text-end">Tax: 19%</p>
            <p className="text-end">
              Total Price after Tax:{" "}
              <span className="fw-bold" style={{ color: "#ff5a5e" }}>
                $
                {parseFloat(
                  (order.totalPrice + order.totalPrice * 0.19).toFixed(2)
                )}
              </span>
            </p>
            {/* Buttons to start over or purchase the order */}
            <div className="d-flex mt-3 mx-auto gap-2">
              <Button variant="danger" onClick={(e) => startOver(e, order._id)}>
                START OVER
              </Button>
              <Button variant="success" onClick={(e) => purchase(e, order._id)}>
                Purchase
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

// Export the Order component as the default export
export default Order;
