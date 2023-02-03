import React from 'react';
import './inputCustomer.css'
import ProfilePicture from "../../profilePicture/ProfilePicture";
import tiger from "../../../assets/tijger.jpg";

function InputCustomer({reactHookForm, customerId,scrProfilePicture,name,email, className,checked}) {

    return (
        <label className={`inputCustomer flex-row ${className}`} htmlFor={customerId + "id"}>
            <input className="checkbox"
                {...reactHookForm}
                type="checkbox"
                value={customerId}
                defaultChecked={checked}
                id={customerId + "id"}/>
            <ProfilePicture className="inputCustomerPicture" src={scrProfilePicture || tiger }/>
                <p className="inputCustomer--labeltext">{(name || email) || "Tiger de cat"}</p>

        </label>
    );
}

export default InputCustomer;