// Importing React, useState, useEffect, and other dependencies
import React, { useState, useEffect } from "react";
import NavComponent from "./NavComponent";
import axios from "axios";
import { Form, Row, Col, Container, Button, Alert } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

// Favorite component for managing favorite pizza orders
const Favorite = () => {
  // State variables to manage favorite pizza orders, form inputs, errors, and notifications
  const [orders, setOrders] = useState([]);
  const idx = window.localStorage.getItem("userId");
  const [method, setMethod] = useState("");
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [error, setError] = useState({});
  const [showNotification, setShowNotification] = useState(false);

  // useEffect to fetch favorite pizza orders when the component mounts
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/pizzas/${idx}`, {
        withCredentials: true,
      })
      .then((res) => {
        const filtOrders = res.data;
        setOrders(filtOrders.filter((order) => order.fav === true));
      })
      .catch((err) => console.log(err));
  }, []);

  // Function to add or remove toppings based on checkbox status
  const addTopping = (e, topping) => {
    if (e.target.checked) {
      setToppings([...toppings, topping]);
    } else {
      setToppings(toppings.filter((item) => item !== topping));
    }
  };

  // Function to fetch details of a selected favorite pizza order
  const submitHandler = (e, orderId) => {
    e.preventDefault();
    axios
      .get(`http://localhost:8000/api/getOnePizza/${orderId}`, {
        withCredentials: true,
      })
      .then((res) => {
        console.log(res);
        setMethod(res.data.method);
        setSize(res.data.size);
        setCrust(res.data.crust);
        setQuantity(res.data.quantity);
        setToppings(res.data.toppings);
      })
      .catch((err) => console.log(err));
  };

  // Function to handle the submission of a new pizza order
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("toppings", toppings);
    console.log("method", method);
    console.log("size", size);
    console.log("crust", crust);
    console.log("quantity", quantity);

    // Make a POST request to create a new pizza order
    axios
      .post(
        `http://localhost:8000/api/createPizza`,
        {
          method: method,
          size: size,
          crust: crust,
          quantity: quantity,
          toppings: toppings,
          pur: false,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);

        // Reset form values and errors
        setMethod("");
        setSize("");
        setCrust("");
        setQuantity(0);
        setToppings([]);
        setError({});

        // Update user order count
        axios
          .patch(
            `http://localhost:8000/api/updateUser/${idx}`,
            { orderNum: user.orderNum + 1 },
            {
              withCredentials: true,
            }
          )
          .then((res) => {
            console.log("user updated", res.data);

            // Update user context
            setUser(res.data);

            // Show success notification for 3 seconds
            setShowNotification(true);
            setTimeout(() => {
              setShowNotification(false);
            }, 3000);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);

        // Handle validation errors and update the state
        setError(err.response.data.errors);
      });
  };

  // Rendering the Favorite component
  return (
    <div>
      {/* Render the navigation component */}
      <NavComponent home={false} />

      {/* Display the notification box only when showNotification is true */}
      {showNotification && (
        <div
          style={{
            position: "fixed",
            bottom: "20px",
            right: "20px",
            zIndex: "9999", // Adjust z-index to ensure it's above other elements
          }}
        >
          <Alert
            variant="success"
            onClose={() => setShowNotification(false)}
            dismissible
          >
            Order added successfully!
          </Alert>
           
        </div>
      )}

      {/* Main content container for the Favorite component */}
      <div className="d-flex justify-content-center gap-3 container mx-auto w-auto">
        {/* Form to create a new pizza order */}
        <div className="container w-50 mx-auto bg-light rounded p-3">
          <h1 className="text-center">Craft Your Favorite</h1>
          <form onSubmit={handleSubmit}>
            {/* Form fields for selecting pizza details */}
            <Form.Group className="mb-3">
              <Form.Label>Method</Form.Label>
              <Form.Select
                value={method}
                onChange={(e) => setMethod(e.target.value)}
              >
                <option>Choose...</option>
                <option value="CarryOut">CarryOut</option>
                <option value="Delivery">Delivery</option>
                <option value="DineIn">DineIn</option>
              </Form.Select>
              {error.method ? (
                <p className="text-danger">{error.method.message}</p>
              ) : null}
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>Size</Form.Label>
                <Form.Select
                  value={size}
                  onChange={(e) => setSize(e.target.value)}
                >
                  <option>Choose...</option>
                  <option value="Small">Small</option>
                  <option value="Medium">Medium</option>
                  <option value="Large">Large</option>
                </Form.Select>
                {error.size ? (
                  <p className="text-danger">{error.size.message}</p>
                ) : null}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Crust</Form.Label>
                <Form.Select
                  value={crust}
                  onChange={(e) => setCrust(e.target.value)}
                >
                  <option>Choose...</option>
                  <option value="Thin">Thin</option>
                  <option value="Regular">Regular</option>
                  <option value="Thick">Thick</option>
                </Form.Select>
                {error.crust ? (
                  <p className="text-danger">{error.crust.message}</p>
                ) : null}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  type="number"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                />
                {error.quantity ? (
                  <p className="text-danger">{error.quantity.message}</p>
                ) : null}
              </Form.Group>
            </Row>

            {/* Checkboxes for selecting pizza toppings */}
            <label>Toppings</label>
            <Container className="p-3 mb-3">
              <Row>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Pepperoni"
                    checked={toppings.includes("Pepperoni")}
                    onChange={(e) => addTopping(e, "Pepperoni")}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Sausage"
                    checked={toppings.includes("Sausage")}
                    onChange={(e) => addTopping(e, "Sausage")}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Bacon"
                    checked={toppings.includes("Bacon")}
                    onChange={(e) => addTopping(e, "Bacon")}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Mushrooms"
                    checked={toppings.includes("Mushrooms")}
                    onChange={(e) => addTopping(e, "Mushrooms")}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Onions"
                    checked={toppings.includes("Onions")}
                    onChange={(e) => addTopping(e, "Onions")}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Olives"
                    checked={toppings.includes("Olives")}
                    onChange={(e) => addTopping(e, "Olives")}
                  />
                </Col>
              </Row>
              <Row>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Pineapple"
                    checked={toppings.includes("Pineapple")}
                    onChange={(e) => addTopping(e, "Pineapple")}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Spinach"
                    checked={toppings.includes("Spinach")}
                    onChange={(e) => addTopping(e, "Spinach")}
                  />
                </Col>
                <Col xs={4}>
                  <Form.Check
                    type="checkbox"
                    label="Cheese"
                    checked={toppings.includes("Cheese")}
                    onChange={(e) => addTopping(e, "Cheese")}
                  />
                </Col>
              </Row>

              {/* Display error message for toppings */}
              {error.toppings ? (
                <p className="text-danger">{error.toppings.message}</p>
              ) : null}
            </Container>

            {/* Button to submit the pizza order */}
            <Row className="mx-auto w-25">
              <Button className="mb-3" variant="warning" type="submit">
                Add To Order
              </Button>
            </Row>
          </form>
        </div>

        {/* Display user's favorite pizza orders */}
        <div className="container w-50 mx-auto bg-light rounded p-3">
          <h1 className="text-center">Your Favorites</h1>
          {orders.map((order) => (
            <div
              key={order._id}
              className="card mb-3 p-3"
              style={{ cursor: "pointer" }}
              onClick={(e) => submitHandler(e, order._id)}
            >
              <div className="d-flex justify-content-between align-items-center">
                <h3>{new Date(order.createdAt).toLocaleDateString()}</h3>
              </div>
              <p>
                {order.quantity} Pizza, {order.size} size and {order.crust}{" "}
                crust{" "}
              </p>
              <p>Toppings: {order.toppings.join(", ")}</p>
              <p>
                Price:{" "}
                <span className="fw-bold" style={{ color: "#ff5a5e" }}>
                  $
                  {parseFloat(
                    (order.totalPrice + order.totalPrice * 0.19).toFixed(2)
                  )}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

// Export the Favorite component as the default export
export default Favorite;
