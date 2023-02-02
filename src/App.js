import './App.css';
import {Navigate, Route, Routes} from "react-router-dom";
import Login from "./pages/login/Login";
import React, {useContext} from "react";
import Home from "./pages/home/Home";
import {AuthContext} from "./context/AuthContext";
import SignUp from "./pages/signUp/SignUp";
import Profile from "./pages/profile/Profile";
import CreateMenu from "./pages/createMenu/CreateMenu";
import ShowMenu from "./pages/showMenu/ShowMenu";
import OverViewCustomer from "./pages/overViewCustomer/OverViewCustomer";
import OverViewCook from "./pages/overViewCook/OverViewCook";




function App() {
    const { isAuth } = useContext(AuthContext);
  return (
    <>
        <Routes>
            <Route exact path='/' element={ isAuth ? <Home/> : <Navigate to="/login"/>}/>
            <Route exact path='/login' element={!isAuth ? <Login/> : <Navigate to="/"/>}/>
            <Route exact path='/signup' element={<SignUp/>}/>
            <Route exact path='/profile' element={isAuth ?<Profile/> : <Navigate to="/login"/> }/>
            <Route exact path='/create/:id' element={ isAuth ? <CreateMenu/>: <Navigate to="/login"/> }/>
            <Route exact path='/menu/:id' element={ isAuth ? <ShowMenu/>: <Navigate to="/login"/> }/>
            <Route exact path='/overview/customer' element={ isAuth ? <OverViewCustomer/>: <Navigate to="/login"/> }/>
            <Route exact path='/overview/cook' element={ isAuth ? <OverViewCook/>: <Navigate to="/login"/> }/>

        </Routes>
    </>
  );
}

export default App;
