import React, {useEffect, useState} from 'react';
import './showMenu.css';
import Modal from "../../components/modal/Modal";
import Tile from "../../components/tile/Tile";
import Header from "../../components/header/Header";
import ProfilePicture from "../../components/profilePicture/ProfilePicture";
import MenuRow from "../../components/menuRow/MenuRow";
import Button from "../../components/button/Button";
import tiger1 from "../../assets/tiger1.jpg"
import InputWithLabelHookForm from "../../components/inputWithLabel/InPutWIthLabelHookForm";
import {useForm} from "react-hook-form";
import useFetch from "../../customHooks/useFetch";
import {useParams} from "react-router-dom";
import axios from "axios";
import showDeliveryWindow from "../../helpers/showDeliveryWindow";


function ShowMenu(props) {
    const {id} = useParams();
    const [showOverlay, toggleShowOverlay] = useState(false);
    const {register, handleSubmit, formState: {errors}, watch, setValue, reset} = useForm();
    const [fillInDeliveryWindow, setFillInDeliveryWindow] = useState(false);
    const watchStartDeliveryWindow = watch("startDeliveryWindow");
    const watchEndDeliveryWindow = watch("endDeliveryWindow");
    const [explanationRequired, toggleExplanationRequired] = useState(false);
    const watchAllergies = watch('allergies');
    const [menuData, setMenuData] = useState(null);
    const [isLoadingMenuData, setIsLoadingMenuData] = useState(false);
    const [errorMenuData, setErrorMenuData] = useState(null);
    const [customerData, setCustomerData] = useState(null);
    const [isLoadingCustomerData, setIsLoadingCustomerData] = useState(false);
    const [errorCustomerData, setErrorCustomerData] = useState(null);
    const [menuIsOrdered, setMenuIsOrdered] = useState(false);
    const [orderData, setOrderData] = useState(null);
    const watchNumberOfMenus = watch('numberOfMenus');
    const [totalPrice, setTotalPrice] = useState("€ 0,00");
    const [inProcessToOrder, setInProcessToOrder] = useState(null);
    const [orderDeadlinePassed, setOrderDeadlinePassed] = useState(null);
    const [isLoadingPostOrder, setIsLoadingPostOrder] = useState(false);
    const [errorPostOrder, setErrorPostOrder] = useState(null);
    const [imageData, setImageData] = useState(null);
    const [isloadingImageData, setIsLoadingImageData] = useState(null);
    const [catchErrorImageData, setCatchErrorImageData] = useState(null);

    useEffect(() => console.log(orderData), [orderData]);

    //function to show or close overlay
    function toggleOverlay(event) {
        event.preventDefault();
        toggleShowOverlay(!showOverlay);
    }

    //useEffect to check if one of the two inputs for the delivery window is filled in. If so, the other becomes required.
    useEffect(() => {

        if (watchStartDeliveryWindow || watchEndDeliveryWindow) {
            setFillInDeliveryWindow(true);
        } else {
            setFillInDeliveryWindow(false);
        }
    }, [watchStartDeliveryWindow, watchEndDeliveryWindow]);

    // this useEffect updates the toggle that is linked to explanation field for the allergies. When a user fills in that they is allergic, they has to explain the severity
    useEffect(() => {

        if (!watchAllergies) {
            toggleExplanationRequired(false);
        } else {
            toggleExplanationRequired(true);
        }
    }, [watchAllergies]);

    // fetch data customer
    useFetch(`/users`, setCustomerData, setErrorCustomerData, setIsLoadingCustomerData, []);

    // fetch menu data
    useFetch(`/menus/${id}`, setMenuData, setErrorMenuData, setIsLoadingMenuData, []);


    //useEffect to check if menu is ordered by the user everytime the customer data is updated
    useEffect(() => {

        if (menuData && customerData) {

            console.log(menuData);
            console.log(customerData);

            let order = menuData.orders.find((order) => order.customer.id === customerData.id);
            console.log(order);

            if (order) {
                console.log("ordered")
                setMenuIsOrdered(true);
                setOrderData(order)
            } else {
                setMenuIsOrdered(false);
            }
            order = null

        }

    }, [menuData, customerData])

    useEffect(() => {

        if (customerData && menuData && watchNumberOfMenus) {
            const total = menuData.priceMenu * watchNumberOfMenus
            setTotalPrice(total.toLocaleString('nl', {style: 'currency', currency: 'EUR'}))
        }

    }, [customerData, watchNumberOfMenus, menuData, showOverlay])

    // function that loads the user data in the input fields or data of the order
    function setDefaultValues() {

        if (menuIsOrdered) {
            Object.keys(orderData).map((key) => {
                setValue(key, orderData[key])
            })

        } else {

            Object.keys(customerData).map((key) => {
                setValue(key, customerData[key])
            });
        }

    }

    useEffect(() => {

        if (customerData) {
            setDefaultValues()
        }

    }, [menuIsOrdered]);


    // function to show the text for the header plantbased
    function showPlantBased(menuType) {
        switch (menuType) {
            case 'MEAT':
                return "no, with death animal"
            case 'VEGA':
                return "🥚vega🧀"
            case 'VEGAN':
                return "❤👍❤";
        }
    }

    //useEffect to check if orderdeadline is passed
    useEffect(() => {

        if (menuData && menuData.orderDeadline != null) {
            setOrderDeadlinePassed(new Date(menuData.orderDeadline) < new Date());
        } else if (menuData) {
            setOrderDeadlinePassed("forgotten");
        }
    }, [menuData])

    //function to show the text on the order button depended on the orderdeadline and if ordered or not
    function showOrderButton(orderText) {

        if (!menuIsOrdered && !orderDeadlinePassed) {
            return orderText
        } else if (menuIsOrdered && !orderData.declined) {
            return "Adjust order"
        }


    }

    //function to show to text in the header


    function showHeaderText() {

        if (orderDeadlinePassed === 'forgotten') {
            return <MenuRow
                title="Order deadline:"
                text="Call the cook and ask for a deadline!"/>
        } else {
            if (!menuIsOrdered && !orderDeadlinePassed) {
                return <MenuRow
                    title="Order deadline:"
                    text={menuData ? new Intl.DateTimeFormat("nl", {
                        timeStyle: "short",
                        dateStyle: "long"
                    }).format(new Date(menuData.orderDeadline)) : "loading"}/>
            } else if (!menuIsOrdered && orderDeadlinePassed) {
                return <MenuRow
                    title="Your are to late to order:"
                    text="Maybe you can bribe the cook"/>
            } else if (menuIsOrdered && !orderDeadlinePassed) {
                return <MenuRow
                    title="Order deadline:"
                    text={menuData ? new Intl.DateTimeFormat("nl", {
                        timeStyle: "short",
                        dateStyle: "long"
                    }).format(new Date(menuData.orderDeadline)) : "loading"}/>

            } else if (menuIsOrdered && orderDeadlinePassed) {
                if (orderData.delivery === null && orderData.declined === false) {
                    return <MenuRow
                        title="Order status:"
                        text="pending"/>
                } else if (orderData.declined) {
                    return <MenuRow
                        title="Order status:"
                        text="declined"/>

                } else {
                    if (new Date() > new Date(menuData.endDeliveryWindow)) {

                        const totalPrice = menuData.priceMenu * orderData.numberOfMenus;
                        return <>
                            <MenuRow
                                title="Tikkie:"
                                text={<a href={menuData.tikkieLink}>{menuData.tikkieLink}</a>}/>
                            <MenuRow
                                title="Total:"
                                text={totalPrice.toLocaleString('nl', {style: 'currency', currency: 'EUR'})}/>
                        </>
                    } else if (orderData.delivery.eta !== null) {
                        return <MenuRow
                            title="Estimated time of arrival of your menu:"
                            text={new Intl.DateTimeFormat("nl", {
                                timeStyle: 'short'
                            }).format(new Date(orderData.delivery.eta))}/>

                    } else {
                        return <MenuRow
                            title="Order status:"
                            text="accepted"/>
                    }
                }
            }
        }
    }

    // function on submit
    async function onSubmit(data) {


        console.log(data);
        setErrorPostOrder(null);
        setIsLoadingPostOrder(true);
        if (!orderData) {

            const orderDateAndTime = new Date();

            const dataForJSONFile = {
                menuId: menuData.id,
                orderCustomerId: customerData.id,
                numberOfMenus: data.numberOfMenus,
                allergies: data.allergies,
                allergiesExplanation: data.allergiesExplanation,
                startDeliveryWindow: data.startDeliveryWindow ? data.startDeliveryWindow : null,
                endDeliveryWindow: data.endDeliveryWindow ? data.endDeliveryWindow : null,
                streetAndNumber: data.streetAndNumber,
                zipcode: data.zipcode,
                city: data.city,
                comments: data.comments,
                orderDateAndTime: orderDateAndTime

            }

            try {
                const responsePostOrder = await axios.post("/orders", dataForJSONFile, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`
                    }
                });

                console.log(responsePostOrder);
                console.log("order created");
                window.location.reload()

            } catch (error) {
                console.log(error)
                setErrorPostOrder(error)
            }
            setIsLoadingPostOrder(false);


        } else {


            const dataForJSONFile = {
                menuId: menuData.id,
                orderCustomerId: customerData.id,
                numberOfMenus: data.numberOfMenus,
                allergies: data.allergies,
                allergiesExplanation: data.allergiesExplanation,
                startDeliveryWindow: data.startDeliveryWindow ? data.startDeliveryWindow : null,
                endDeliveryWindow: data.endDeliveryWindow ? data.endDeliveryWindow : null,
                streetAndNumber: data.streetAndNumber,
                zipcode: data.zipcode,
                city: data.city,
                comments: data.comments,
                orderDateAndTime: orderData.orderDateAndTime
            }

            try {
                const responsePostOrder = await axios.put(`/orders/${orderData.id}`, dataForJSONFile, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`
                    }
                });

                console.log(responsePostOrder);
                console.log("order updateď");
                window.location.reload();

            } catch (error) {
                console.log(error)
                setErrorPostOrder(error)
            }
            setIsLoadingPostOrder(false);

        }

    }

    //function to delete order
    async function deleteOrder() {
        setErrorPostOrder(null);
        setIsLoadingPostOrder(true);
        try {
            const responsePostOrder = await axios.delete(`/orders/${orderData.id}`, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`
                }
            });

            console.log(responsePostOrder);
            console.log("order deleted");
            window.location.reload();

        } catch (error) {
            console.log(error)
            setErrorPostOrder(error)
        }
        setIsLoadingPostOrder(false);

    }

    //fucntion to fetch the menu picture
    useEffect(() => {

        // Fetch data function declaration
        async function fetchData(urlWeb) {
            setIsLoadingImageData(true);
            try {
                console.log(urlWeb)
                // Fetch the response
                const response = await axios.get(urlWeb, {
                    headers: {
                        baseURL: "",
                        "Content-Type": "application/json",
                        Authorization: `${localStorage.getItem('token')}`

                    },
                    responseType: 'blob'
                })


                setCatchErrorImageData(null);


                // console.log(btoa(response.data));

                setImageData(URL.createObjectURL(response.data));


            } catch (err) {
                // Catch the error
                setCatchErrorImageData(err.message);

            } finally {
                // Set loading to initial state
                setIsLoadingImageData(false);
            }
        }

        // Call the Fetch Data function

        if (menuData) {
            fetchData(menuData.menuPictureURL)
        }


    }, [menuData]);


    return (
        <>
            <Modal classNameModal="showMenu--modal"
                   showModal={showOverlay}>
                <form className="showMenu--modal-form flex-collumn" onSubmit={handleSubmit(onSubmit)}>
                    <div className="showMenu--modal-inputwrapper flex-row">
                        <div className="showMenu--modal-inputwrappercollumn flex-collumn">
                            <InputWithLabelHookForm
                                id="orderAmount"
                                label="Number of menu's"
                                type="number"
                                placeholder=""
                                reactHookForm={register("numberOfMenus")}/>
                            <InputWithLabelHookForm
                                id="allergies"
                                label="Allergies:"
                                type="text"
                                placeholder="Grumpy humans"
                                reactHookForm={register("allergies")}/>
                            <InputWithLabelHookForm
                                textarea={true}
                                row={4}
                                id="allergies-explanation"
                                label="Explanation:"
                                placeholder="When I see a grumpy human it tickles my brain. One grumpy human a day is not life threathing, but that is my limit"
                                error={errors.allergiesExplanation}
                                errorMessage={errors.allergiesExplanation ? errors.allergiesExplanation.message : ''}
                                reactHookForm={register("allergiesExplanation", {
                                    required: {
                                        value: explanationRequired,
                                        message: 'The elves want to know more about your allergy. Can you describe the severity of your allergy?'
                                    }
                                })}/>
                            <div className="showMenu--modal-deliverywindowtitlewrapper flex-collumn">
                                <h3 className="showMenu--modal-deliverywindowtitle">When are you home?</h3>
                                <div className="showMenu--modal-deliverywindowwrapper flex-row">
                                    <div className="showMenu--modal-timeinputwrapper flex-collumn">
                                        <InputWithLabelHookForm
                                            id="startWindow"
                                            label="From:"
                                            type="time"
                                            placeholder=""
                                            error={errors.startDeliveryWindow}
                                            errorMessage={errors.startDeliveryWindow ? errors.startDeliveryWindow.message : ''}
                                            reactHookForm={register("startDeliveryWindow", {
                                                required: {
                                                    value: fillInDeliveryWindow && !showOverlay,
                                                    message: 'If you fill in this field, then also fill in delivery date and/or the delivery window completely?'
                                                }
                                            })}/>
                                    </div>
                                    <div className="showMenu--modal-timeinputwrapper flex-collumn">
                                        <InputWithLabelHookForm
                                            id="endWindow"
                                            label="Until:"
                                            type="time"
                                            placeholder=""
                                            error={errors.endDeliveryWindow}
                                            errorMessage={errors.endDeliveryWindow ? errors.endDeliveryWindow.message : ''}
                                            reactHookForm={register("endDeliveryWindow", {
                                                required: {
                                                    value: fillInDeliveryWindow && !showOverlay,
                                                    message: 'If you fill in this field, then also fill in delivery date and/or the delivery window completely?'
                                                }
                                            })}/>
                                    </div>
                                </div>
                            </div>

                        </div>
                        <div className="showMenu--modal-inputwrappercollumn flex-collumn">
                            <InputWithLabelHookForm
                                id="street-and-number"
                                label="Street and Number:"
                                type="text"
                                placeholder='Uppercatclass 56'
                                reactHookForm={register("streetAndNumber")}/>
                            <InputWithLabelHookForm
                                id="zipcode"
                                label="Zipcode:"
                                type="text"
                                placeholder="1234 ZL"
                                reactHookForm={register("zipcode")}/>
                            <InputWithLabelHookForm
                                id="city"
                                label="City:"
                                type="text"
                                placeholder="Tigertown"
                                reactHookForm={register("city")}/>
                            <InputWithLabelHookForm
                                textarea={true}
                                row={5}
                                id="comments"
                                label="Comments:"
                                placeholder=""
                                reactHookForm={register("comments")}/>
                        </div>
                    </div>
                    {errorPostOrder && <MenuRow title="Error"
                                                text={errorPostOrder.response.data.message}/>}
                    <div className="showMenu--modal-buttonwrapper flex-row">
                        <MenuRow className="showMenu--modal-totalprice"
                                 title="Total:"
                                 text={totalPrice}/>
                        <Button onClick={toggleOverlay}>Cancel</Button>
                        {menuIsOrdered ?
                            <>
                                <Button type="submit">Update
                                    order</Button>
                                <Button type="button" onClick={deleteOrder}>Delete
                                    order</Button>
                            </>
                            :
                            <Button type="submit">Confirm</Button>
                        }
                    </div>
                </form>
            </Modal>
            <Header/>
            <main className="showMenu outerbox">
                <div className="showMenu--innerbox innerbox flex-collumn">
                    <Tile className="showMenu--information-tile" type="yellow" flexCollumn={true}>
                        {isLoadingCustomerData ? "loading..." : showHeaderText()}
                        {!isLoadingMenuData && !isLoadingCustomerData && <>{!menuIsOrdered && orderDeadlinePassed && orderData && !orderData.declined ? <></> :
                            <Button
                                onClick={toggleOverlay}>{showOrderButton("Order")} </Button>}</>}

                    </Tile>
                    <div className="showMenu--tilewrapper flex-wrap-row">
                        <Tile className="showMenu--tile1 flex-collumn">
                            <div className="showMenu--imagewrapper">
                                <img className="showMenu--imageMenu"
                                     src={imageData ? imageData : tiger1}
                                     alt="a key element out of the menu"/></div>

                        </Tile>
                        <Tile className="showMenu--tile2 flex-collumn">
                            <h2 className="showMenu--tile2-title">{menuData && menuData.title ? menuData.title : "Ceci n'est pas un titre"}</h2>
                            <p className="showMenu--tile2-description">{menuData && menuData.menuDescription ? menuData.menuDescription : "Call the cook for an explanation of the menu"}</p>
                            <div className="showMenu--tile2-menuRowWrapper flex-collumn">

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
                            {orderData && orderData.delivery && <MenuRow
                                title="Warm-up instructions: "
                                text={menuData && menuData.dessert && menuData.warmUpInstruction}/>}
                        </Tile>
                        <Tile className="showMenu--tile3 flex-collumn">
                            <div className="showMenu--tile3-cookwrapper flex-collumn">
                                <h3>The beste cook ever</h3>
                                <ProfilePicture src={menuData && menuData.cook.profilePicture}/>
                                <p>{menuData && menuData.cook.username ? menuData.cook.username : "mystery cook"}</p>
                            </div>
                            <div className="showMenu--tile3-menuRowWrapper flex-collumn">
                                <MenuRow
                                    title="Price:"
                                    // text="12,50 euro per menu"
                                    text={menuData && menuData.priceMenu ? `${new Intl.NumberFormat('nl', {
                                        style: 'currency',
                                        currency: 'EUR'
                                    }).format(menuData.priceMenu)} per menu` : "Ask the cook"}
                                />
                                <MenuRow
                                    title="Plantbased:"
                                    text={menuData && menuData.menuType ? showPlantBased(menuData.menuType) : "Ask the cook"}/>
                                <MenuRow
                                    title="Delivery date:"
                                    text={menuData && menuData.startDeliveryWindow ? new Intl.DateTimeFormat("nl", {
                                        dateStyle: "medium"
                                    }).format(new Date(menuData.startDeliveryWindow)) : "Call the cook and ask for a delivery date!"}/>
                                <MenuRow
                                    title="Delivery window:"
                                    text={menuData && menuData.startDeliveryWindow && menuData.endDeliveryWindow ? showDeliveryWindow(menuData.startDeliveryWindow, menuData.endDeliveryWindow) : "ask the cook, they forgot the fill it in"}/>
                                <MenuRow
                                    title="Disclamer:"
                                    text="The food can contain trace elements of all allergens"/>
                            </div>
                        </Tile>
                    </div>

                    {!isLoadingMenuData && !isLoadingCustomerData && <>{!menuIsOrdered && orderDeadlinePassed && orderData && !orderData.declined ? <></> :
                        <Button className="showMenu--wiljeme-nuButton" type="button"
                                onClick={toggleOverlay}>{showOrderButton("Wil je me-nu")}</Button>}</>}


                </div>
            </main>
        </>
    );
}

export default ShowMenu;