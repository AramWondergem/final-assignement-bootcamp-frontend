import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import React, {useContext} from "react";
import Home from "./pages/home/Home";
import {AuthContext} from "./context/AuthContext";
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/profile/Profile";




function App() {
    const { isAuth } = useContext(AuthContext);
  return (
    <>
        <Routes>
            <Route exact path='/' element={ isAuth ? <Home/> : <Navigate to="/login"/>}/>
            <Route exact path='/login' element={!isAuth ? <Login/> : <Navigate to="/"/>}/>
            <Route exact path='/signup' element={<SignUp/>}/>
            <Route exact path='/profile' element={<Profile/>}/> //todo beveiliging erop zetten
        </Routes>
    </>
  );
}

export default App;
