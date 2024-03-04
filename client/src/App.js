import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import Register from "./Views/Register";
import Login from './Views/Login';
import Homepage from './Views/Homepage';
import Account from './Views/Account';
import Order from './Views/Order';
import Craft from './Components/Craft';

function App() {
  return (
    <div className=" min-vh-100 pb-5" style={{ backgroundColor: "#FFC371" }}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<Login />}/>
        <Route path='/homepage' element={<Homepage/>} />
        <Route path='/account' element={<Account />} />
        <Route path="/order" element={<Order/>} />
        <Route path="/craft" element={<Craft/>} />
      </Routes>
    </div>
  );
}

export default App;
