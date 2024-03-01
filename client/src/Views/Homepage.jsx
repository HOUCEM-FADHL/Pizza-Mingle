import React from 'react'
// import { Button } from'react-bootstrap'
// import axios from 'axios'
// import { useNavigate } from 'react-router-dom'
import NavComponent from '../Components/NavComponent'

const Homepage = () => {
  
  return (
    <div>
        <NavComponent home={false} />
    <div className="container w-50 mx-auto text-center">
        <h1>Homepage</h1>
        
    </div>
    </div>
  )
}
export default Homepage