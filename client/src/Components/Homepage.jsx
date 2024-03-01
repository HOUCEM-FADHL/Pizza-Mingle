import React from 'react'
import { Button } from'react-bootstrap'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const Homepage = () => {
  const navigate = useNavigate();
  const logoutUser = () => {
    axios.post('http://localhost:8000/api/logoutUser',{}, {withCredentials: true})
    .then((res) => {
      console.log(res);
      window.localStorage.removeItem('userId');
      navigate('/');
     })
     .catch((err) => {
      console.log(err);
     })
  }
  return (
    <div className="container w-50 mx-auto text-center">
        <h1>Homepage</h1>
        <p>You logged In</p>
        <Button onClick={logoutUser} >Logout</Button>
    </div>
  )
}

export default Homepage