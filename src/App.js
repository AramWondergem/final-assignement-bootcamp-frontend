import './App.css';
import {Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import React from "react";


function App() {
  return (
    <>
        <Routes>
            <Route exact path='/login' element={<Login/>}/>
        </Routes>
    </>
  );
}

export default App;
