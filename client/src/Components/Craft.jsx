import React, { useState} from "react";
import NavComponent from "../Components/NavComponent";
import { Form, Row, Col, Container, Button } from "react-bootstrap";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Craft = () => {
    const [method, setMethod] = useState("");
    const [size, setSize] = useState("");
    const [crust, setCrust] = useState("");
    const [quantity, setQuantity] = useState(1);
    const [toppings, setToppings] = useState([]);
    const idx = window.localStorage.getItem("userId");
    const { user, setUser } = useContext(UserContext);
    const [error, setError] = useState({});



    const addTopping = (e,topping) => {
        if(e.target.checked){
          // If the checkbox is checked, add the topping to the toppings array
            setToppings([...toppings,topping]);
        }else{
          // If the checkbox is unchecked, remove the topping from the toppings array
            setToppings(toppings.filter(item => item !== topping));
        }
    };
    
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("toppings",toppings);
        console.log("method",method);
        console.log( "size", size);
        console.log("crust", crust);
        console.log( "quantity", quantity);

        axios
         .post("http://localhost:8000/api/createPizza", {
            method: method,
            size: size,
            crust: crust,
            quantity: quantity,
            toppings: toppings,
          }, {
            withCredentials: true,
          })
         .then((res) => {
            console.log(res.data);
            setMethod("");
            setSize("");
            setCrust("");
            setQuantity(0);
            setToppings([]);
            setError({});
            axios
           .patch(`http://localhost:8000/api/updateUser/${idx}`, {orderNum: user.orderNum + 1}, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("user updated", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
          })
         .catch((err) => {
            console.log(err);
            setError(err.response.data.errors);
          });

        

    }

  return (
    <div>
      <NavComponent home={false} />
      <div className="container w-50 mx-auto bg-light rounded p-3">
        <h1 className="text-center">Craft A Pizza</h1>
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
                <Form.Check type="checkbox" label="Pepperoni" 
                checked={toppings.includes("Pepperoni")} 
                onChange={ (e)=> addTopping(e,"Pepperoni") }
                />
              </Col>
              <Col xs={4}>
                <Form.Check type="checkbox" label="Sausage"
                checked={toppings.includes("Sausage")}
                onChange={ (e)=> addTopping(e,"Sausage")}   
                />
              </Col>
              <Col xs={4}>
                <Form.Check type="checkbox" label="Bacon" 
                checked={toppings.includes("Bacon")}
                onChange={ (e)=> addTopping(e,"Bacon")}                
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Form.Check type="checkbox" label="Mushrooms"
                checked={toppings.includes("Mushrooms")}
                onChange={ (e)=> addTopping(e,"Mushrooms")}                
                />
              </Col>
              <Col xs={4}>
                <Form.Check type="checkbox" label="Onions"
                checked={toppings.includes("Onions")}
                onChange={ (e)=> addTopping(e,"Onions")}
                />
              </Col>
              <Col xs={4}>
                <Form.Check type="checkbox" label="Olives" 
                checked={toppings.includes("Olives")}
                onChange={ (e)=> addTopping(e,"Olives")}
                />
              </Col>
            </Row>
            <Row>
              <Col xs={4}>
                <Form.Check type="checkbox" label="Pineapple" 
                checked={toppings.includes("Pineapple")}
                onChange={ (e)=> addTopping(e,"Pineapple")}
                />	
              </Col>
              <Col xs={4}>
                <Form.Check type="checkbox" label="Spinach" 
                checked={toppings.includes("Spinach")}
                onChange={ (e)=> addTopping(e,"Spinach")}
                />
              </Col>
              <Col xs={4}>
                <Form.Check type="checkbox" label="Cheese" 
                checked={toppings.includes("Cheese")}
                onChange={ (e)=> addTopping(e,"Cheese")}
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
          </Row >
        </form>
      </div>
    </div>
  );
};

export default Craft;
