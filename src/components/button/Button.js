import React from 'react';
import './button.css'

function Button({type, className, children, onClick}) {
    return (

        <button onClick={onClick} className={`${className} button`} type={type}>{children}</button>

    );
}

export default Button;