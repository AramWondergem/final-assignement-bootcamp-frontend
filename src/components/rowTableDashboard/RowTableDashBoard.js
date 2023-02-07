import React from 'react';
import ProfilePicture from "../profilePicture/ProfilePicture";
import showDeliveryWindowBasedOnTime from "../../helpers/showDeliveryWindowBasedOnTime";

function RowTableDashBoard({order, reactHookFormTime, reactHookFormPaid, checked, value}) {


    return (
        <>
            <tr key={`rowWithInformation${order.id}`}>
                <th scope="tablerow">
                    <div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture
                        className="menuDashboard--table-profilePicture"
                        src={order.customer.profilePicture}/> <p>{order.customer.username}</p>
                    </div>
                </th>
                <td><p className="numberOfMenuText">{`${order.numberOfMenus}x`}</p></td>
                <td><p>{order.allergies}</p></td>
                <td><p>{order.allergiesExplanation}
                </p></td>
                <td><p className="menuDashboard--table--timewindow">{showDeliveryWindowBasedOnTime(order.startDeliveryWindow,order.endDeliveryWindow)}</p></td>
                <td><p>{order.streetAndNumber}</p></td>
                <td><p>{order.comments}
                </p></td>
                <td className="etaInputTD">
                    <input className="input-component"
                           type="time"
                        {...reactHookFormTime}
                    /></td>
                <td className="paidInputTD">
                    <input className="checkbox"
                           type="checkbox"
                           defaultChecked={checked}
                        {...reactHookFormPaid}/></td>
            </tr>
            <tr key={`rowWithoutInformation${order.id}`}>
                <td></td>

            </tr>
        </>
    );
}

export default RowTableDashBoard;