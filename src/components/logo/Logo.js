import React from 'react';
import './logo.css';
import cookwoman from "../../assets/cookwoman.png";
import cookmen from "../../assets/cookmen.png";

function Logo({className, children, size}) {
    return (


        <div className={`${className} flex-row logo-${size} logo`}>
            <div className="logo-imagewrapper">
                <img src={cookwoman} alt="emoticon of a female cook"/>
            </div>
            {children}
            <div className="logo-imagewrapper">
                <img src={cookmen} alt="emoticon of a male cook"/>
            </div>

        </div>
    );
}

export default Logo;