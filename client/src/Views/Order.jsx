import React,{useState, useEffect} from 'react'
import NavComponent from '../Components/NavComponent'
import axios from 'axios'
import { Button, Row } from 'react-bootstrap'
import { useContext } from "react";
import { UserContext } from "../Context/UserContext";

const Order = () => {
  const [orders, setOrders] = useState([])
  const idx = window.localStorage.getItem('userId');
  const { user, setUser } = useContext(UserContext);

    useEffect(() => {
        axios.get(`http://localhost:8000/api/pizzas/${idx}`, {
            withCredentials: true,
          })
            .then(res => {
              const filOrders = res.data;
                setOrders(filOrders.filter(order => order.pur === false));
            })
            .catch(err => console.log(err))
    }, []);
    //----------------------------------------------------------
    const startOver = (e,orderId) => {
      e.preventDefault();
        axios.delete(`http://localhost:8000/api/deletePizza/${orderId}`, {
            withCredentials: true
          })
          .then(res => {
            setOrders(orders.filter(order => order._id !== orderId ));
          })
          .catch(err => console.log(err))
          axios
           .patch(`http://localhost:8000/api/updateUser/${idx}`, {orderNum: user.orderNum - 1}, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("user updated", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
    //----------------------------------------------------------
    const purshase = (e,orderId) => {
      e.preventDefault();
      axios
      .patch(`http://localhost:8000/api/updatePizza/${orderId}`, {pur: true }, {withCredentials: true})
            setOrders(orders.filter(order => order._id !== orderId))
          axios
           .patch(`http://localhost:8000/api/updateUser/${idx}`, {orderNum: user.orderNum - 1}, {
        withCredentials: true,
      })
      .then((res) => {
        console.log("user updated", res.data);
        setUser(res.data);
      })
      .catch((err) => {
        console.log(err);
      })
    }
  return (
    <div>
        <NavComponent home={false} />
    <div className="container w-50 mx-auto">
        <h1 className='text-center'>Your Order</h1>
        {orders.map(order => (
            <div key={order._id} className='card mb-3 p-3'>
                <p>Method: {order.method}</p>
                <p>Size: {order.size}</p>
                <p>Crust: {order.crust} Crust</p>
                <p>Toppings: {order.toppings.join(", ")}</p>
                <div className='d-flex justify-content-between'>
                <p>Price: <span className='fw-bold' style={{color: "#ff5a5e"}}>${order.totalPrice/order.quantity}</span></p>
                <p className='text-end'>Quantity: <span className='fw-bold'>{order.quantity}</span></p>
                </div>
                <p className='text-end'>Total Price: <span className='fw-bold' style={{color: "#ff5a5e"}}>${order.totalPrice}</span></p>
                <div className="d-flex mt-3 mx-auto gap-2">
                <Button variant="danger" onClick={(e)=> startOver(e,order._id)}>START OVER</Button>
                <Button variant="success" onClick={(e)=> purshase(e,order._id)}>Purshase</Button>
                </div>
            </div>
        ))}
    </div>
    </div>
  )
}

export default Order