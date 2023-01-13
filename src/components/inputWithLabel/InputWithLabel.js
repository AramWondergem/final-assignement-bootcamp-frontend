import "./inputWithLabel.css";

import React from 'react';

function InputWithLabel({classNameLabel,id,label,placeholder, type, value, onChange, classNameInput, onKeyDown}) {
    return (
        <>
            <label className={`label-component ${classNameLabel}`} htmlFor={id}>{label}</label>
            <input className={`input-component ${classNameInput}`} placeholder={placeholder} type={type} id={id} title={id}
                   value={value}
                   onChange={onChange}
            onKeyDown={onKeyDown}/>
        </>
    );
}

export default InputWithLabel;