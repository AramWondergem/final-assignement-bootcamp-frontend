import React from 'react';
import './menuDashboard.css';
import Header from "../../components/header/Header";
import Tile from "../../components/tile/Tile";
import EmptyInputField from "../../components/inputWithLabel/emptyInputField/EmptyInputField";
import Button from "../../components/button/Button";
import InputCustomerDashboard from "../../components/inputWithLabel/inputCustomer/InputCustomerDashboard";

function MenuDashBoard(props) {
    return (
        <>
            <Header/>
            <main className="menuDashboard outerbox">
                <form onSubmit={() => console.log("dit ga ik nog maken")}
                    className="menuDashboard--innerbox innerbox flex-row">
                    <Tile
                        className="menuDashboard--orderstile"
                    type="text">
                        <div className="menuDashboard--waitinglist menuDashboard--orderstile-component">
                            <h2>Waitinglist:</h2>
                            <EmptyInputField>
                                <InputCustomerDashboard/>
                                <InputCustomerDashboard/>
                                <InputCustomerDashboard/>
                                <InputCustomerDashboard/>
                            </EmptyInputField>
                            <div>
                                <Button
                                    type="submit">
                                    Decline
                                </Button>
                                <Button
                                    type="submit">
                                    Accept
                                </Button>
                            </div>
                        </div>
                        <div className="menuDashboard--declinedOrders menuDashboard--orderstile-component">
                            <h2>Declined orders:</h2>
                            <EmptyInputField>
                                <InputCustomerDashboard/>
                                <InputCustomerDashboard/>
                            </EmptyInputField>
                            <div>

                                <Button
                                    type="submit">
                                    Accept
                                </Button>
                            </div>

                        </div>
                    </Tile>

                </form>
            </main>
        </>
    );
}

export default MenuDashBoard;