import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import React from "react";
import Home from "./pages/home/Home";


function App() {
  return (
    <>
        <Routes>
            <Route exact path='/login' element={<Login/>}/>
            <Route exact path='/' element={<Home/>}/>
        </Routes>
    </>
  );
}

export default App;
