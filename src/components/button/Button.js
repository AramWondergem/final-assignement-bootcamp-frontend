import React from 'react';
import './button.css'

function Button({type, className, children, onClick, disabled, color}) {
    return (

        <button disabled={disabled} onClick={onClick} className={`${className} button ${color}`} type={type}>{children}</button>

    );
}

export default Button;