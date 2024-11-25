import Login from "./components/Login";
import Signup from "./components/Signup";
import Notfound from "./components/404";
import { Route,Routes } from "react-router-dom";
import Home from "./components/Home";
function App() {
  return (
    <>
    <Routes>
      
      <Route path="/Login" element={<Login/>}/>
      <Route path="/Signup" element={<Signup/>}/> 
      <Route path="/" element={<Home/>}/> 
      <Route path="/*" element={<Notfound/>}/>


    </Routes>
    </>
  );
}

export default App;
