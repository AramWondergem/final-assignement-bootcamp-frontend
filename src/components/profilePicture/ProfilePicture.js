import React, {useContext} from 'react';
import './profilePicture.css'
import tiger from "../../assets/tijger.jpg";
import tigerlarge from "../../assets/tiger1.jpg"
import {AuthContext} from "../../context/AuthContext";

function ProfilePicture({large, className,src}) {
    const {user} = useContext(AuthContext)
    return (
        <div className={`profile-picture imagewrapper ${className}`}><img className="profile-picture-image" src={src || user.profilePicture || (large && tigerlarge) || tiger } alt="profile picture"/></div>
    );
}

export default ProfilePicture;
