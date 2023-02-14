import "./inputWithLabel.css";

import React from 'react';

function InputWithLabel({
                            classNameLabel,
                            id,
                            label,
                            placeholder,
                            type,
                            value,
                            onChange,
                            classNameInput,
                            onKeyDown,
                            error,
                            errorMessage
                        }) {
    return (
        <>
            <label className={`label-component ${classNameLabel}`} htmlFor={id}><h3>{label}</h3></label>
            <input className={`input-component ${classNameInput} ${error && "error-field"}`} placeholder={placeholder}
                   type={type} id={id} title={id}
                   value={value}
                   onChange={onChange}
                   onKeyDown={onKeyDown}/>
            {error ? <p className={`input-errormessage-active`}>{errorMessage}</p> :
                <p className="input-errormessage">Hier staat een error message</p>}
        </>
    );
}

export default InputWithLabel;