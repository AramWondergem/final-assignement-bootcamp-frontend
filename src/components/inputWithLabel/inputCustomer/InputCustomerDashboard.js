import React from 'react';
import './inputCustomer.css'
import ProfilePicture from "../../profilePicture/ProfilePicture";
import tiger from "../../../assets/tijger.jpg";

function InputCustomerDashboard({reactHookForm, customerId,scrProfilePicture,name,email, className,checked,order}) {

    return (
        <label className={`inputCustomer flex-row ${className}`} htmlFor={customerId + "id"}>
            <input className="checkbox"
                {...reactHookForm}
                type="checkbox"
                value={customerId}
                defaultChecked={checked}
                id={customerId + "id"}/>
            <ProfilePicture className="inputCustomerPicture" src={scrProfilePicture || tiger }/>
            <div className="inputCustomer--textwrapper flex-row">
            <p className="inputCustomer--labeltext">{(name || email) || "Tiger de cat"}</p>
            <p>{`${"3"}X`}</p>
            <p>🚨</p>
            </div>
        </label>
    );
}

export default InputCustomerDashboard;