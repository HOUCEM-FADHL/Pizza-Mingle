import 'bootstrap/dist/css/bootstrap.min.css';
import {Routes, Route} from "react-router-dom";
import Register from "./Components/Register";
import Login from './Components/Login';
import Homepage from './Components/Homepage';

function App() {
  return (
    <div>
      {/* <h1 className='text-center mb-3'>Login and Register</h1> */}
      <Routes>
        <Route path="/" element={<Register />} />
        <Route path='/login' element={<Login />}/>
        <Route path='/homepage' element={<Homepage/>} />
      </Routes>
    </div>
  );
}

export default App;
