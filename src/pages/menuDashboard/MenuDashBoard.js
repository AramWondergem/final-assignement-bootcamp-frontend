import React, {useEffect, useState} from 'react';
import './menuDashboard.css';
import Header from "../../components/header/Header";
import Tile from "../../components/tile/Tile";
import EmptyInputField from "../../components/inputWithLabel/emptyInputField/EmptyInputField";
import Button from "../../components/button/Button";
import InputCustomerDashboard from "../../components/inputWithLabel/inputCustomer/InputCustomerDashboard";
import ProfilePicture from "../../components/profilePicture/ProfilePicture";
import {useParams} from "react-router-dom";
import {useForm} from "react-hook-form";
import useFetch from "../../customHooks/useFetch";
import InputCustomer from "../../components/inputWithLabel/inputCustomer/InputCustomer";
import axios from "axios";

function MenuDashBoard(props) {
    const {id} = useParams();
    const {register, handleSubmit, formState: {errors}, watch, setValue, reset} = useForm();
    const [menuData, setMenuData] = useState(null);
    const [isLoadingMenuData, setIsLoadingMenuData] = useState(false);
    const [errorMenuData, setErrorMenuData] = useState(null);
    const [waitingList, setWaitingList] = useState([]);
    const [acceptedList, setAcceptedList] = useState([]);
    const [declinedList, setDeclinedList] = useState([]);
    const [typeOfSubmit, setTypeOfSubmit] = useState(null);
    const [isLoadingSaveAndSend, setIsLoadingSaveAndSend] = useState(false);
    const [errorSaveAndSend, setErrorSaveAndSend] = useState(null);
    const [acceptedCounter, setAcceptedCounter] = useState(0)

    // fetch menu data
    useFetch(`/menus/${id}`, setMenuData, setErrorMenuData, setIsLoadingMenuData, []);

    useEffect(() => {
        console.log(menuData)

        if (menuData) {
            const {orders} = menuData

            setWaitingList(orders.filter(order => (order.declined === false && order.delivery == null)));

            setAcceptedList(orders.filter(order => order.declined === false && order.delivery !== null));

            setDeclinedList(orders.filter(order => order.declined === true));

        }

    }, [menuData]);


    //function to return the inputfields for the first Tile
    function createListOfInputs(type, list) {
        let counter = 0;

        return list.map(order => {
            counter++;
            return <InputCustomerDashboard
                key={`customer${id}${type}${counter}`}
                reactHookForm={register(`order${type}`)}
                className="menuDashboard--Order"
                order={order}
            />

        })

    }

    async function onSubmit(data) {
        console.log(data);

        switch (typeOfSubmit) {

            case "declineW" :
                if (data.orderwaitingList) {
                    if (waitingList.length > 1) {
                        data.orderwaitingList.map(orderId => {

                            const selectedOrder = waitingList.find((order) => order.id == orderId);
                            const list = declinedList;
                            list.push(selectedOrder);
                            setDeclinedList(list);

                            const array = waitingList;
                            const index = array.indexOf(selectedOrder);
                            if (index > -1) {
                                array.splice(index, 1);
                            }
                            console.log(array);
                            setWaitingList(array);

                        })
                    } else {
                        const list = declinedList;
                        list.push(waitingList.at(0));
                        setDeclinedList(list);
                        setWaitingList([]);
                    }
                }
                break;
            case "acceptW":
                if (data.orderwaitingList) {
                    if (waitingList.length > 1) {
                        data.orderwaitingList.map(orderId => {

                            const selectedOrder = waitingList.find((order) => order.id == orderId);
                            const list = acceptedList;
                            list.push(selectedOrder);
                            setAcceptedList(list);

                            const array = waitingList;
                            const index = array.indexOf(selectedOrder);
                            if (index > -1) {
                                array.splice(index, 1);
                            }
                            console.log(array);
                            setWaitingList(array);

                        })
                    } else {
                        const list = acceptedList;
                        list.push(waitingList.at(0));
                        setAcceptedList(list);
                        setWaitingList([]);
                    }
                }
                break;

            case
            "declineA"
            :
                if (data.orderacceptedList) {
                    if (acceptedList.length > 1) {
                        data.orderacceptedList.map(orderId => {

                            const selectedOrder = acceptedList.find((order) => order.id == orderId);
                            const list = declinedList;
                            list.push(selectedOrder);
                            setDeclinedList(list);

                            const array = acceptedList;
                            const index = array.indexOf(selectedOrder);
                            if (index > -1) {
                                array.splice(index, 1);
                            }
                            console.log(array);
                            setAcceptedList(array);

                        })
                    } else {
                        const list = declinedList;
                        list.push(acceptedList.at(0));
                        setDeclinedList(list);
                        setAcceptedList([]);
                    }
                }
                break;
            case
            "acceptD"
            :
                if (data.orderdeclinedList) {
                    if (declinedList.length > 1) {
                        data.orderdeclinedList.map(orderId => {

                            const selectedOrder = declinedList.find((order) => order.id == orderId);
                            const list = acceptedList;
                            list.push(selectedOrder);
                            setAcceptedList(list);

                            const array = declinedList;
                            const index = array.indexOf(selectedOrder);
                            if (index > -1) {
                                array.splice(index, 1);
                            }
                            console.log(array);
                            setDeclinedList(array);

                        })
                    } else {
                        const list = acceptedList;
                        list.push(declinedList.at(0));
                        setAcceptedList(list);
                        setDeclinedList([]);
                    }
                }
                break;

        }
        if(menuData){
            let acceptedMenus = 0;

            if(acceptedList){
                acceptedList.map(order => acceptedMenus+=order.numberOfMenus)
            }
            setAcceptedCounter(acceptedMenus + "/" + menuData.numberOfMenus);

        }


        if (typeOfSubmit === "saveSelection" || typeOfSubmit === "sendSelection") {

            setIsLoadingSaveAndSend(true);
            setErrorSaveAndSend(null);


            acceptedList.map(async (order) => {
                try {
                    const responsePostOrder = await axios.put(`/orders/accept/${order.id}`, null, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${localStorage.getItem('token')}`
                        }
                    });

                    console.log(responsePostOrder);
                    console.log("order accepted with order id: " + order.id);

                } catch (error) {
                    console.log(error)
                    setErrorSaveAndSend(error);
                }

            })

            declinedList.map(async (order) => {
                try {
                    const responsePostOrder = await axios.put(`/orders/decline/${order.id}`, null, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${localStorage.getItem('token')}`
                        }
                    });

                    console.log(responsePostOrder);
                    console.log("order declined with order id: " + order.id);

                } catch (error) {
                    console.log(error)
                    setErrorSaveAndSend(error);
                }

            })
            if (typeOfSubmit === "sendSelection") {
                try {
                    const responsePostOrder = await axios.put(`/menus/send/declined/${menuData.id}`, null, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${localStorage.getItem('token')}`
                        }
                    });

                    console.log(responsePostOrder);
                    console.log("decline mails send");

                } catch (error) {
                    console.log(error)
                    setErrorSaveAndSend(error);
                }

                try {
                    const responsePostOrder = await axios.put(`/menus/send/accepted/${menuData.id}`, null, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${localStorage.getItem('token')}`
                        }
                    });

                    console.log(responsePostOrder);
                    console.log("accepted mails send");

                } catch (error) {
                    console.log(error)
                    setErrorSaveAndSend(error);
                }


            }
            // window.location.reload();
        }

        reset();

    }

    // function to show the number of accepted menu's
    useEffect(()=>{
        if(menuData){
            let acceptedMenus = 0;

            if(acceptedList){
                acceptedList.map(order => acceptedMenus+=order.numberOfMenus)
            }
            setAcceptedCounter(acceptedMenus + "/" + menuData.numberOfMenus);

        }



    },[menuData,typeOfSubmit,acceptedList])

    useEffect(() => console.log(waitingList), [waitingList])

    return (
        <>
            <Header/>
            <main className="menuDashboard outerbox">
                <form onSubmit={handleSubmit(onSubmit)}
                      className="menuDashboard--innerbox innerbox flex-collumn">
                    <Tile type="yellow" className="menuDashboard--titleTile flex-row">
                        <h2>Menu: <span
                            className="menuDashboard--title-span">{menuData ? menuData.title : "loading"}</span>
                        </h2>


                    </Tile>
                    <Tile
                        className="menuDashboard--orderstile "
                        type="text">
                        <div className="menuDashboard--orderfieldswrapper flex-row">
                            <div className="menuDashboard--waitinglist menuDashboard--orderstile-component">
                                <h2>Waitinglist:</h2>
                                <EmptyInputField>
                                    {menuData && createListOfInputs("waitingList", waitingList)}
                                </EmptyInputField>

                                <div className="menuDashboard--orderstile-buttonwrapper">
                                    <Button
                                        type="submit" onClick={() => setTypeOfSubmit("declineW")}>
                                        Decline
                                    </Button>
                                    <Button
                                        type="submit"
                                        onClick={() => setTypeOfSubmit("acceptW")}>
                                        Accept
                                    </Button>
                                </div>
                            </div>
                            <div className="menuDashboard--declinedOrders menuDashboard--orderstile-component">
                                <h2 className="menuDashboard--acceptedcounter">Accepted: <span
                                    className="menuDashboard--acceptedcounter-span">{acceptedCounter}</span></h2>
                                <EmptyInputField>
                                    {menuData && createListOfInputs("acceptedList", acceptedList)}
                                </EmptyInputField>
                                <div className="menuDashboard--orderstile-buttonwrapper">

                                    <Button
                                        type="submit"
                                        onClick={() => setTypeOfSubmit("declineA")}
                                    >
                                        Decline
                                    </Button>
                                </div>

                            </div>
                            <div className="menuDashboard--declinedOrders menuDashboard--orderstile-component">
                                <h2>Declined orders:</h2>
                                <EmptyInputField>
                                    {menuData && createListOfInputs("declinedList", declinedList)}
                                </EmptyInputField>
                                <div className="menuDashboard--orderstile-buttonwrapper">

                                    <Button
                                        type="submit"
                                        onClick={() => setTypeOfSubmit("acceptD")}>
                                        Accept
                                    </Button>
                                </div>

                            </div>

                        </div>
                        <div className="menuDashboard--saveOrders">
                            <Button type="submit" color="pink"  onClick={() => setTypeOfSubmit("saveSelection")}>Save</Button>
                            <Button type="submit" color="pink" onClick={() => setTypeOfSubmit("sendSelection")}>Send to customers</Button>

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
                                        <th scope="tablerow">
                                            <div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture
                                                className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p>
                                            </div>
                                        </th>
                                        <td><p className="numberOfMenuText">3x</p></td>
                                        <td><p>pinda</p></td>
                                        <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                            ballon.
                                        </p></td>
                                        <td><p>17:00 - 18:00</p></td>
                                        <td><p>Drossaard 17</p></td>
                                        <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij
                                            de
                                            buren
                                        </p></td>
                                        <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                        <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                    </tr>
                                    <tr>
                                        <td></td>

                                    </tr>
                                    <tr>
                                        <th scope="tablerow">
                                            <div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture
                                                className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p>
                                            </div>
                                        </th>
                                        <td><p className="numberOfMenuText">3x</p></td>
                                        <td><p>pinda</p></td>
                                        <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                            ballon.
                                        </p></td>
                                        <td><p>17:00 - 18:00</p></td>
                                        <td><p>Drossaard 17</p></td>
                                        <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij
                                            de
                                            buren
                                        </p></td>
                                        <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                        <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                    </tr>
                                    <tr>
                                        <td></td>

                                    </tr>
                                    <tr>
                                        <th scope="tablerow">
                                            <div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture
                                                className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p>
                                            </div>
                                        </th>
                                        <td><p className="numberOfMenuText">3x</p></td>
                                        <td><p>pinda</p></td>
                                        <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                            ballon.
                                        </p></td>
                                        <td><p>17:00 - 18:00</p></td>
                                        <td><p>Drossaard 17</p></td>
                                        <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij
                                            de
                                            buren
                                        </p></td>
                                        <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                        <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                    </tr>
                                    <tr>
                                        <td></td>

                                    </tr>
                                    <tr>
                                        <th scope="tablerow">
                                            <div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture
                                                className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p>
                                            </div>
                                        </th>
                                        <td><p className="numberOfMenuText">3x</p></td>
                                        <td><p>pinda</p></td>
                                        <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                            ballon.
                                        </p></td>
                                        <td><p>17:00 - 18:00</p></td>
                                        <td><p>Drossaard 17</p></td>
                                        <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij
                                            de
                                            buren
                                        </p></td>
                                        <td className="etaInputTD"><input className="input-component" type="time"/></td>
                                        <td className="paidInputTD"><input className="checkbox" type="checkbox"/></td>


                                    </tr>
                                    <tr>
                                        <td></td>

                                    </tr>
                                    <tr>
                                        <th scope="tablerow">
                                            <div className="nameAndPicture--wrapper flex-collumn"><ProfilePicture
                                                className="menuDashboard--table-profilePicture"/> <p>Tiger the cat</p>
                                            </div>
                                        </th>
                                        <td><p className="numberOfMenuText">3x</p></td>
                                        <td><p>pinda</p></td>
                                        <td><p>Ik ga dood als ik een pinda eet. Na een sporen element zwel ik al tot een
                                            ballon.
                                        </p></td>
                                        <td><p>17:00 - 18:00</p></td>
                                        <td><p>Drossaard 17</p></td>
                                        <td><p>Je kan het bij de deur neerzetten als ik niet thuis ben. Of bel aan bij
                                            de
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