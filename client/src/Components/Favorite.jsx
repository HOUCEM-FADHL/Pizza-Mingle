import React, { useState, useEffect } from "react";
import NavComponent from "./NavComponent";
import axios from "axios";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Favorite = () => {
  const [orders, setOrders] = useState([]);
  const idx = window.localStorage.getItem("userId");
  const [method, setMethod] = useState("");
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState([]);
  const { user, setUser } = useContext(UserContext);
  const [orderId, setOrderId] = useState("");
  const [error, setError] = useState({});

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
  const addTopping = (e, topping) => {
    if (e.target.checked) {
      setToppings([...toppings, topping]);
    } else {
      setToppings(toppings.filter((item) => item !== topping));
    }
  };
  const submitHandler = (e, orderId) => {
    e.preventDefault();
    setOrderId(orderId);
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
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("toppings", toppings);
    console.log("method", method);
    console.log("size", size);
    console.log("crust", crust);
    console.log("quantity", quantity);

    axios
      .patch(
        `http://localhost:8000/api/updatePizza/${orderId}`,
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
        setMethod("");
        setSize("");
        setCrust("");
        setQuantity(0);
        setToppings([]);
        setError({});
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
            setUser(res.data);
          })
          .catch((err) => {
            console.log(err);
          });
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.errors);
      });
  };

  return (
    <div>
      <NavComponent home={false} />
      <div className="d-flex justify-content-center gap-3 container mx-auto w-auto">
        <div className="container w-50 mx-auto bg-light rounded p-3">
          <h1 className="text-center">Craft Your Favorite</h1>
          <form onSubmit={handleSubmit}>
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
              {error.toppings ? (
              <p className="text-danger">{error.toppings.message}</p>
              ) : null}
            </Container>
            <Row className="mx-auto w-25">
              <Button className="mb-3" variant="warning" type="submit">
                Add To Order
              </Button>
            </Row>
          </form>
        </div>
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
                  ${order.totalPrice}
                </span>
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Favorite;
