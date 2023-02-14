import React from "react";

function InputWithLabelHookForm({
                                    textarea,
                                    row,
                                    classNameLabel,
                                    id,
                                    label,
                                    type,
                                    classNameInput,
                                    error,
                                    errorMessage,
                                    reactHookForm,
                                    accept,
                                    placeholder,
                                    step
                                }) {
    return (
        <>
            <label className={`label-component ${classNameLabel}`} htmlFor={id}><h3>{label}</h3></label>
            {textarea ?
                <textarea
                    className={`input-component input-component-textarea ${classNameInput} ${error && "error-field"}`}
                    id={id}
                    rows={row}
                    placeholder={placeholder}
                    {...reactHookForm}


                />
                :
                <input
                    className={`input-component ${classNameInput} ${error && "error-field"}`}
                    type={type}
                    id={id}
                    accept={accept}
                    placeholder={placeholder}
                    step={step}
                    {...reactHookForm}


                />}
            {error ? <p className={`input-errormessage-active`}>{errorMessage}</p> :
                <p className="input-errormessage">error message</p>}
        </>
    );
}

export default InputWithLabelHookForm;