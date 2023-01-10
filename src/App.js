import './App.css';
import { Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import React, {useState} from "react";
import Home from "./pages/home/Home";
import {AuthContext} from "./context/AuthContext";




function App() {
    const{isAuth} = useState(AuthContext);
    console.log(isAuth);
  return (
    <>
        <Routes>
            <Route exact path='/' element={ <Home/>}/>
            <Route exact path='/login' element={<Login/>}/>
        </Routes>
    </>
  );
}

export default App;
