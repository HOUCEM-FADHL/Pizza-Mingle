import React,{useState, useEffect} from 'react'
import axios from 'axios';
import { Form } from 'react-bootstrap';

const LastOrders = () => {
    const [orders, setOrders] = useState([]);
    const idx = window.localStorage.getItem('userId');
    useEffect(() => {
        axios.get(`http://localhost:8000/api/pizzas/${idx}`, {
            withCredentials: true,
          })
            .then(res => {
                const filtOrders = res.data ;
                setOrders(filtOrders.filter(order => order.pur === true));
            })
            .catch(err => console.log(err))
    }, []);
    const submitHandler = (e, orderId) => {
        e.preventDefault();
      axios
        .patch(`http://localhost:8000/api/updatePizza/${orderId}`, { fav: e.target.checked }, {
            withCredentials: true,
          })
        .then((res) => {
          console.log(res);
          setOrders(orders.map(order => ( order._id === res.data._id ? res.data : order)))
          })
        
        .catch((err) => console.log(err));
    };
  return (
    <div>
        {orders.map(order => (
            <div key={order._id} className='card mb-3 p-3'>
                <div className="d-flex justify-content-between align-items-center">
                <h3>{new Date(order.createdAt).toLocaleDateString()}</h3>
                <Form.Check label="Favorite" checked={order.fav} onChange={(e) => submitHandler(e,order._id)} type="checkbox"/>
                </div>
                <p>{order.quantity} Pizza, {order.size} size and {order.crust} crust </p>
                <p>Toppings: {order.toppings.join(", ")}</p>
                <p>Price: <span className='fw-bold' style={{color: "#ff5a5e"}}>${order.totalPrice}</span></p>
            </div>
        ))}
    </div>
  )
}

export default LastOrders