import React, { useContext, useEffect, useState } from "react";
import NavComponent from "../Components/NavComponent";
import { UserContext } from "../Context/UserContext";
import { Form, Button, Col, Row } from "react-bootstrap";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import LastOrders from "../Components/LastOrders";

const Account = () => {
  const { user, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const idx = window.localStorage.getItem("userId");
  const [error, setError] = useState({});
  const tunisianStates = [
    "Tunis", "Ariana", "Ben Arous", "Manouba", "Nabeul", "Zaghouan", "Bizerte",
    "Béja", "Jendouba", "Kef", "Siliana", "Kairouan", "Kasserine", "Sidi Bouzid",
    "Sousse", "Mahdia", "Monastir", "Gabès", "Médenine", "Tataouine", "Gafsa", "Tozeur", "Kebili"
];
  useEffect(() => {
    axios
      .get(`http://localhost:8000/api/loggedInUser/${idx}`, {
        withCredentials: true,
      })
      .then((res) => {
        setUser(res.data);
        console.log("loggedUser:", res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  const handleChange = (e) => {
    setUser({ ...user, [e.target.name]: e.target.value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    axios
      .patch(`http://localhost:8000/api/updateUser/${idx}`, user, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("updated data: ", res.data);
        navigate("/homepage");
        setError({});
      })
      .catch((err) => {
        console.log(err);
        setError(err.response.data.error.errors);
      });
  };
  return (
    <div>
      <NavComponent home={false} />
      <div className="d-flex justify-content-center gap-3 container mx-auto w-auto">
        <div className="container w-50 mx-auto bg-light rounded p-3">
          <h1>Account Infos</h1>
          <form onSubmit={handleSubmit}>
            <Row className="mb-3">
              <Form.Group as={Col}>
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  onChange={handleChange}
                  value={user.firstName}
                />
                {error.firstName && <p className="text-danger">{error.firstName.message}</p>}
              </Form.Group>
              <Form.Group as={Col}>
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  onChange={handleChange}
                  value={user.lastName}
                />
                {error.lastName && <p className="text-danger">{error.lastName.message}</p>}
              </Form.Group>
            </Row>
            <Form.Group className="mb-3">
              <Form.Label className="mb-3">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                onChange={handleChange}
                value={user.email}
              />
              {error.email && <p className="text-danger">{error.email.message}</p>}
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Address:</Form.Label>
              <Form.Control
                type="text"
                name="address"
                onChange={handleChange}
                value={user.address}
              />
              {error.firstName && <p className="text-danger">{error.firstName.message}</p>}
            </Form.Group>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridCity">
                <Form.Label>City</Form.Label>
                <Form.Control
                  type="text"
                  name="city"
                  onChange={handleChange}
                  value={user.city}
                />
              </Form.Group>
              <Form.Group as={Col} controlId="formGridState">
                <Form.Label>State</Form.Label>
                <Form.Select
                  value={user.state}
                  name="state"
                  onChange={handleChange}
                >
                   <option>Choose...</option>
                   
                   {tunisianStates.map((state, index) => (
                       <option key={index} value={state}>{state}</option>
                   ))}
                </Form.Select>
                {error.state && <p className="text-danger">{error.state.message}</p>}
              </Form.Group>
            </Row>
            <Row className="mt-3 mx-auto w-25">
              <Button variant="warning" type="submit" className="mb-3">
                Update
              </Button>
            </Row>
          </form>
        </div>
        <div className="container w-50 mx-auto bg-light rounded p-3">
          <h1>Past Orders</h1>
          <LastOrders />
        </div>
      </div>
    </div>
  );
};

export default Account;
