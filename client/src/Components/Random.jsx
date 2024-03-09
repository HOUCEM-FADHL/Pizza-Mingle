// Importing necessary React components, styles, and dependencies
import React, { useState } from "react";
import NavComponent from "../Components/NavComponent";
import { Form, Row, Col, Container, Button, Alert } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

// Random component for generating a random pizza order
const Random = () => {
  // State variables to store form data, errors, and user context
  const [method, setMethod] = useState("");
  const [size, setSize] = useState("");
  const [crust, setCrust] = useState("");
  const [quantity, setQuantity] = useState(1);
  const [toppings, setToppings] = useState([]);
  const [error, setError] = useState({});
  const idx = window.localStorage.getItem("userId");
  const { user, setUser } = useContext(UserContext);
  const [showNotification, setShowNotification] = useState(false);

  // Function to get a random element from an array
  const getRandomItem = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length);
    return array[randomIndex];
  };

  // Function to generate random values for size, crust, and toppings
  const generateRandomValues = () => {
    const sizes = ["Small", "Medium", "Large"];
    const crusts = ["Thin", "Regular", "Thick"];
    const allToppings = [
      "Pepperoni",
      "Sausage",
      "Bacon",
      "Mushrooms",
      "Onions",
      "Olives",
      "Pineapple",
      "Spinach",
      "Cheese",
    ];

    setSize(getRandomItem(sizes));
    setCrust(getRandomItem(crusts));

    // Generate a random number of toppings (1 to 3 toppings)
    const randomNumberOfToppings = Math.floor(Math.random() * 4) + 1;
    const randomToppings = [];

    for (let i = 0; i < randomNumberOfToppings; i++) {
      const randomTopping = getRandomItem(allToppings);
      randomToppings.push(randomTopping);
    }

    setToppings(randomToppings);
  };

  // Function to handle adding/removing toppings
  const addTopping = (e, topping) => {
    if (e.target.checked) {
      setToppings([...toppings, topping]);
    } else {
      setToppings(toppings.filter((item) => item !== topping));
    }
  };

  // Function to handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("toppings", toppings);
    console.log("method", method);
    console.log("size", size);
    console.log("crust", crust);
    console.log("quantity", quantity);

    axios
      .post(
        "http://localhost:8000/api/createPizza",
        {
          method: method,
          size: size,
          crust: crust,
          quantity: quantity,
          toppings: toppings,
        },
        {
          withCredentials: true,
        }
      )
      .then((res) => {
        console.log(res.data);
        // Reset form values
        setMethod("");
        setSize("");
        setCrust("");
        setQuantity(0);
        setToppings([]);
        setError({});

        // Update user's order count
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
        setError(err.response.data.errors);
      });
  };

  // Rendering the Random component
  return (
    <div>
      <NavComponent home={false} />
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
            Order added successfully!
          </Alert>
           
        </div>
      )}
      <div className="container w-50 mx-auto bg-light rounded p-3">
        <h1 className="text-center">Craft A Pizza</h1>
        <form onSubmit={handleSubmit}>
          {/* Method selection */}
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
          {/* Size, Crust, and Quantity selection */}
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
          {/* Toppings selection */}
          <label>Toppings</label>
          <Container className="p-3 mb-3">
            <Row>
              {/* Individual topping checkboxes */}
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
          {/* Buttons for random selection and form submission */}
          <div className="d-flex mt-3 mx-auto gap-2 justify-content-center">
            <Button
              className="mb-3 fw-bold text-light"
              variant="warning"
              type="button"
              onClick={generateRandomValues}
              style={{
                background: "linear-gradient(to bottom, #ff5a5e, #FFCA2C)",
              }}
            >
              SURPRISE
            </Button>
            <Button className="mb-3" variant="warning" type="submit">
              Add To Order
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

// Export the Random component as the default export
export default Random;
