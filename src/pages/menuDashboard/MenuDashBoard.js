import React from 'react';
import './menuDashboard.css';
import Header from "../../components/header/Header";
import Tile from "../../components/tile/Tile";
import EmptyInputField from "../../components/inputWithLabel/emptyInputField/EmptyInputField";
import Button from "../../components/button/Button";
import InputCustomerDashboard from "../../components/inputWithLabel/inputCustomer/InputCustomerDashboard";
import ProfilePicture from "../../components/profilePicture/ProfilePicture";

function MenuDashBoard(props) {
    return (
        <>
            <Header/>
            <main className="menuDashboard outerbox">
                <form onSubmit={() => console.log("dit ga ik nog maken")}
                      className="menuDashboard--innerbox innerbox flex-collumn">
                    <Tile
                        className="menuDashboard--orderstile flex-row"
                        type="text">
                        <div className="menuDashboard--waitinglist menuDashboard--orderstile-component">
                            <h2>Waitinglist:</h2>
                            <EmptyInputField>
                                <InputCustomerDashboard/>
                                <InputCustomerDashboard/>
                                <InputCustomerDashboard/>
                                <InputCustomerDashboard/>
                            </EmptyInputField>
                            <div className="menuDashboard--orderstile-buttonwrapper">
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
                            <div className="menuDashboard--orderstile-buttonwrapper">

                                <Button
                                    type="submit">
                                    Accept
                                </Button>
                            </div>

                        </div>
                    </Tile>
                    <div className="menuDashboard--rightcontent">
                        <Tile type="text" className="menuDashboard--righttile">
                            <EmptyInputField>
                            <table className="menuDashboard--table">
                                <colgroup>
                                    <col className="name"/>
                                    <col className="numberOfMenus"/>
                                    <col className="allergies"/>
                                    <col className="explanationAllergies"/>
                                    <col className="deliveryWindow"/>
                                    <col className="address"/>
                                    <col className="comments"/>
                                    <col className="eta"/>
                                    <col className="paid"/>

                                </colgroup>
                                <thead>

                                <tr className="trheader">
                                    <th scope="col"></th>
                                    <th scope="col"></th>
                                    <th scope="col"><h3>Allergies</h3></th>
                                    <th scope="col"><h3>Explanation</h3></th>
                                    <th scope="col"><h3>Window</h3></th>
                                    <th scope="col"><h3>Address</h3></th>
                                    <th scope="col"><h3>Comments</h3></th>
                                    <th scope="col"><h3>ETA</h3></th>
                                    <th scope="col"><h3>Paid</h3></th>
                                </tr>
                                </thead>
                                <tbody>
                                <tr>
                                    <th scope="tablerow"><div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p></div></th>
                                    <td><p className="numberOfMenuText">3x</p></td>
                                    <td><p>pinda</p></td>
                                    <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                        ballon.
                                    </p></td>
                                    <td><p>17:00 - 18:00</p></td>
                                    <td><p>Drossaard 17</p></td>
                                    <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij de
                                        buren
                                    </p></td>
                                    <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                    <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                </tr>
                                <tr>
                                    <td></td>

                                </tr>
                                <tr>
                                    <th scope="tablerow"><div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p></div></th>
                                    <td><p className="numberOfMenuText">3x</p></td>
                                    <td><p>pinda</p></td>
                                    <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                        ballon.
                                    </p></td>
                                    <td><p>17:00 - 18:00</p></td>
                                    <td><p>Drossaard 17</p></td>
                                    <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij de
                                        buren
                                    </p></td>
                                    <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                    <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                </tr>
                                <tr>
                                    <td></td>

                                </tr>
                                <tr>
                                    <th scope="tablerow"><div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p></div></th>
                                    <td><p className="numberOfMenuText">3x</p></td>
                                    <td><p>pinda</p></td>
                                    <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                        ballon.
                                    </p></td>
                                    <td><p>17:00 - 18:00</p></td>
                                    <td><p>Drossaard 17</p></td>
                                    <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij de
                                        buren
                                    </p></td>
                                    <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                    <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                </tr>
                                <tr>
                                    <td></td>

                                </tr>
                                <tr>
                                    <th scope="tablerow"><div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p></div></th>
                                    <td><p className="numberOfMenuText">3x</p></td>
                                    <td><p>pinda</p></td>
                                    <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                        ballon.
                                    </p></td>
                                    <td><p>17:00 - 18:00</p></td>
                                    <td><p>Drossaard 17</p></td>
                                    <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij de
                                        buren
                                    </p></td>
                                    <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                    <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                </tr>
                                <tr>
                                    <td></td>

                                </tr>
                                <tr>
                                    <th scope="tablerow"><div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p></div></th>
                                    <td><p className="numberOfMenuText">3x</p></td>
                                    <td><p>pinda</p></td>
                                    <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                        ballon.
                                    </p></td>
                                    <td><p>17:00 - 18:00</p></td>
                                    <td><p>Drossaard 17</p></td>
                                    <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij de
                                        buren
                                    </p></td>
                                    <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                    <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                </tr>
                                <tr>
                                    <td></td>

                                </tr>


                                </tbody>
                            </table>
                            </EmptyInputField>


                            <div className="menuDashboard--righttile-buttonwrapper">
                                <Button
                                    type="submit">
                                    Send ETA
                                </Button>
                                <Button
                                    type="submit">
                                    Save
                                </Button>
                                <Button
                                    type="submit">
                                    Send Tikkielink
                                </Button>
                                <Button
                                    type="submit">
                                    Adjust menu
                                </Button>

                            </div>

                        </Tile>

                    </div>

                </form>
            </main>
        </>
    );
}

export default MenuDashBoard;