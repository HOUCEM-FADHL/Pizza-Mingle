import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import Register from "./Views/Register";
import Login from './Views/Login';
import Homepage from './Views/Homepage';

function App() {
  return (
    <div className=" min-vh-100 pb-5" style={{ backgroundColor: "#FFC371" }}>
      <Routes>
        <Route path="/register" element={<Register />} />
        <Route path='/' element={<Login />}/>
        <Route path='/homepage' element={<Homepage/>} />
      </Routes>
    </div>
  );
}

export default App;
