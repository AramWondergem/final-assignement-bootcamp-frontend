import React, {useContext} from 'react';
import './header.css'
import Logo from "../logo/Logo";
import {NavLink} from "react-router-dom";
import tiger from '../../assets/tijger.jpg'
import Button from "../button/Button";
import {AuthContext} from "../../context/AuthContext";

function Header(props) {

    const {logout,user} = useContext(AuthContext);

    return (
        <header className="header outerbox">
            <div className="header--innerbox innerbox flex-row">
                <Logo className="header--logo"><h3>Wonder Gems</h3></Logo>
                <div className="header--contentrightwrapper flex-row">
                    <nav className="header--navbar">
                        <ul className="flex-row">
                            <li><NavLink
                                className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                to="/profile">
                                <h3>Profile</h3>
                            </NavLink></li>
                            <li><NavLink
                                className={({isActive}) => isActive ? 'active-menu-link' : 'default-menu-link'}
                                to="/">
                                <h3>Home</h3>
                            </NavLink></li>

                        </ul>
                    </nav>
                    <div className="header--img-and-logout-wrapper flex-row">
                        <div className="header--imagewrapper"><img src={user.profilePicture || tiger} alt="profile picture"/></div>
                        <Button type="button"
                                className="header--button"
                                onClick={logout}
                        color="pink">
                            Log out
                        </Button>
                    </div>
                </div>
            </div>
        </header>
    );
}

export default Header;