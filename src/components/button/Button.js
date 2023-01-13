import React from 'react';
import './button.css'

function Button({type, className, children, onClick, disabled}) {
    return (

        <button disabled={disabled} onClick={onClick} className={`${className} button`} type={type}>{children}</button>

    );
}

export default Button;