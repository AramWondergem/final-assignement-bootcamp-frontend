import React, {useContext} from 'react';
import './home.css'
import{AuthContext} from "../../context/AuthContext";

function Home(props) {
    const {logout} = useContext(AuthContext)
    return (
        <div>hallo home <button onClick={logout}>log out</button></div>
    );
}

export default Home;