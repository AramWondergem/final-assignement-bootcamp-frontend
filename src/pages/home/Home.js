import React, {useContext} from 'react';
import './home.css'
import{AuthContext} from "../../context/AuthContext";
import Header from "../../components/header/Header";

function Home(props) {
    const {logout, user} = useContext(AuthContext)



    return (
        <>
        <Header/>
        <div>hallo home <button onClick={logout}>log out</button>
        <p>{user && user.email}</p>
        </div>
        </>
    );
}

export default Home;