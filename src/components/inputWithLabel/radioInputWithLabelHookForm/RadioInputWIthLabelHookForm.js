import React from 'react';
import './radioInputWithLabelHookForm.css'

function RadioInputWIthLabelHookForm({classNameLabel, id, label, type, classNameInput, reactHookForm, checked, value}) {
    return (
        <div className="radioInput flex-row">
            <input
                className={`input-component-radio ${classNameInput}`}
                type={type}
                id={id}
                value={value}
                {...reactHookForm}
                checked={checked}
            />
            <label className={`label-component-radio ${classNameLabel}`} htmlFor={id}>{label}</label>
        </div>
    );
}

export default RadioInputWIthLabelHookForm;