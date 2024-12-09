import Login from "./components/Login";
import Signup from "./components/Signup";
import Notfound from "./components/404";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";
import Cart from "./components/Cart";
import Dashboard from "./components/Seller/index";
import Addproduct from "./components/Seller/Addproduct";
import { AuthProvider } from "./components/contex/authocontex"; 
import Createcategory from "./components/Seller/Createcategory";
import ProductDetails from "./components/ProductDetails";
function App() {
  return (
    <>
    <AuthProvider>
    <Routes>      
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/> 
      <Route path="/" element={<Home/>}/> 
      <Route path="/Cart" element={<Cart/>}/> 
      <Route path="/Dashboard" element={<Dashboard/>}/>
      <Route path="/Addproduct" element={<Addproduct/>}/>
      <Route path="/Createcategory" element={<Createcategory/>}/>
      <Route path="/Product/:id" element={<ProductDetails/>}/>

      <Route path="/*" element={<Notfound/>}/>
    </Routes>
    </AuthProvider>
    </> 
  );
}

export default App;
