import React from "react";

function InputWithLabelHookForm({textarea,row, classNameLabel,id,label,type, classNameInput, error, errorMessage, reactHookForm, accept, placeholder}) {
    return (
        <>
            <label className={`label-component ${classNameLabel}`} htmlFor={id}><h3>{label}</h3></label>
            {textarea ?
                <textarea
                    className={`input-component input-component-textarea ${classNameInput} ${error && "error-field"}`}
                    id={id}
                    rows={row}
                    placeholder={placeholder}
                    {...reactHookForm }


                />
                :
                <input
                    className={`input-component ${classNameInput} ${error && "error-field"}`}
                    type={type}
                    id={id}
                    accept={accept}
                    placeholder={placeholder}
                   {...reactHookForm}


                   />}
            {error ? <p className={`input-errormessage-active`}>{errorMessage}</p> : <p className="input-errormessage">Hier staat een error message</p>}
        </>
    );
}

export default InputWithLabelHookForm;