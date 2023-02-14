import React from 'react';
import './largeMenuButton.css'
import '../menuButton.css'
import '../../tile/tile.css'
import {useNavigate} from "react-router-dom";
import MenuRow from "../../menuRow/MenuRow";
import ProfilePicture from "../../profilePicture/ProfilePicture";

function LargeMenuButton({url, menuData, children, pictureCook}) {
    const navigate = useNavigate();
    return (
        <button
            className="largeMenuButtonCustomer menuButton tile"
            type="button"
            onClick={() => navigate(url)}>

            {children ? children : <>
                <div className="largeMenuButtonCustomer-titleDateWrapper">
                    <h2 className="largeMenuButtonCustomer-title">{menuData && menuData.title ? menuData.title : "Ceci n'est pas un titre"}</h2>
                    <MenuRow
                        title="Delivery date:"
                        text={menuData && menuData.startDeliveryWindow ? new Intl.DateTimeFormat("nl", {
                            dateStyle: "medium"
                        }).format(new Date(menuData.startDeliveryWindow)) : "Call the cook and ask for a delivery date!"}/>
                </div>
                <div className="largeMenuButtonCustomer-cookwrapper flex-collumn">
                    <h3>The beste cook ever</h3>
                    <ProfilePicture className="largeMenuButtonCustomer-profilePicture" src={pictureCook}/>
                    <p>{menuData && menuData.cook.username ? menuData.cook.username : "mystery cook"}</p>
                </div>

                <div className="largeMenuButtonCustomer-menuRowWrapper flex-collumn">

                    {menuData && (menuData.starter || menuData.main || menuData.side || menuData.dessert)
                        ?
                        <>
                            {menuData && menuData.starter && <MenuRow
                                title="Starter:"
                                text={menuData.starter}/>}
                            {menuData && menuData.main && <MenuRow
                                title="Main:"
                                text={menuData.main}/>}
                            {menuData && menuData.side && <MenuRow
                                title="Side:"
                                text={menuData.side}/>}
                            {menuData && menuData.dessert && <MenuRow
                                title="Dessert:"
                                text={menuData.dessert}/>}
                        </>
                        :
                        <>
                            <MenuRow
                                title="Starter:"
                                text="trio of fried air"/>
                            <MenuRow
                                title="Main:"
                                text="Deep fried air"/>
                            <MenuRow
                                title="Side:"
                                text="Salad with slowly fried air"/>
                            <MenuRow
                                title="Dessert:"
                                text="fried air crème brûlée"/>
                        </>}

                </div>


                <MenuRow
                    title="Order deadline:"
                    text={menuData ? (menuData.orderDeadline ? new Intl.DateTimeFormat("nl", {
                        timeStyle: "short",
                        dateStyle: "long"
                    }).format(new Date(menuData.orderDeadline)) : "no deadline yet!") : "no deadline yet!"}/>


            </>}


        </button>
    );
}

export default LargeMenuButton;