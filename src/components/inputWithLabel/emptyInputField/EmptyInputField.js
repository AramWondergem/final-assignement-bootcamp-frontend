import React from 'react';
import './emptyInputField.css'

function EmptyInputField({children, classname, paddingBox}) {
    return (

        <div className={`emptyInputField-scrollbarhider`}>
            <div className={`emptyInputField-${paddingBox ? "box" : "classic"} ${classname} emptyInputField`}>
                {children}
            </div>
        </div>
    );
}

export default EmptyInputField;