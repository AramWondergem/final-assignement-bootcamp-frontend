import React from 'react';
import './inputCustomer.css'
import ProfilePicture from "../../profilePicture/ProfilePicture";
import tiger from "../../../assets/tijger.jpg";

function InputCustomerDashboard({reactHookForm, className, order}) {

    return order && <label className={`inputCustomer flex-row ${className}`} htmlFor={order.customer.id + "id"}>
        <input className="checkbox"
               {...reactHookForm}
               type="checkbox"
               value={order.id}
               id={order.customer.id + "id"}/>
        <ProfilePicture className="inputCustomerPicture" src={order.customer.profilePicture || tiger}/>
        <div className="inputCustomer--textwrapper flex-row">
            <p className="inputCustomer--labeltext">{(order.customer.username || order.customer.email) || "Tiger de cat"}</p>
            <p>{`${order.numberOfMenus}X`}</p>
            {order.allergies && <p>🚨</p>}
        </div>
    </label>
        ;
}

export default InputCustomerDashboard;