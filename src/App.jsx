import Login from "./components/Login";
import Signup from "./components/Signup";
import Notfound from "./components/404";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Dashboard from "./components/Seller/Dashboard";
import Addproduct from "./components/Seller/AddProduct";
function App() {
  return (
    <>
    <Routes>      
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/> 
      <Route path="/" element={<Home/>}/> 
      <Route path="/Cart" element={<Cart/>}/> 
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Addproduct" element={<Addproduct/>}/>

      <Route path="/*" element={<Notfound/>}/>
    </Routes>
    </> 
  );
}

export default App;
