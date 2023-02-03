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
    useFetch(`/users`,setCustomerData,setErrorCustomerData,setIsLoadingCustomerData,[]);

    // fetch menu data
    useFetch(`/menus/${id}`,setMenuData,setErrorMenuData,setIsLoadingMenuData,[]);

    useEffect(()=> console.log(menuData),[menuData]);
    useEffect(()=> console.log(customerData),[customerData]);

    // function that loads the user data in the input fields
    function setDefaultValues() {

        Object.keys(customerData).map((key) => {
            setValue(key, customerData[key])
        });


    }

    useEffect(() => {

        if (customerData) {
            setDefaultValues()
        }

    }, [customerData]);

    // function to show the delivery window in a nice format

    function showDeliveryWindow(startDeliveryWindow,endDeliveryWindow) {

        const startDate = new Date(startDeliveryWindow);
        const endDate = new Date(endDeliveryWindow);

        const startTime = new Intl.DateTimeFormat("nl",{
            timeStyle: 'short'
        }).format(startDate);

        const endTime = new Intl.DateTimeFormat("nl",{
            timeStyle: 'short'
        }).format(endDate);

        return startTime + " - " + endTime;

    }

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



    return (
        <>
            <Modal classNameModal="showMenu--modal"
                   showModal={showOverlay}>
                <form className="showMenu--modal-form flex-collumn" action="">
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
                                reactHookForm={register("orderComments")}/>
                        </div>
                    </div>
                    <div className="showMenu--modal-buttonwrapper flex-row">
                        <MenuRow className="showMenu--modal-totalprice"
                            title="Total:"
                            text="37,50 euro"/>
                        <Button onClick={toggleOverlay}>Cancel</Button>
                        <Button onClick={toggleOverlay}>Confirm</Button>
                    </div>
                </form>
            </Modal>
            <Header/>
            <main className="showMenu outerbox">
                <div className="showMenu--innerbox innerbox flex-collumn">
                    <Tile className="showMenu--information-tile" type="yellow" flexCollumn={true}>
                        <MenuRow
                            title="Order deadline:"
                            text={menuData ? (menuData.orderDeadline ? new Intl.DateTimeFormat("nl", {
                                timeStyle: "short",
                                dateStyle: "long"
                            }).format(new Date(menuData.orderDeadline)) : "Call the cook and ask for a deadline!") : "Call the cook and ask for a deadline!"}/>
                        <Button
                            onClick={toggleOverlay}>Order</Button>
                    </Tile>
                    <div className="showMenu--tilewrapper flex-wrap-row">
                        <Tile className="showMenu--tile1 flex-collumn">
                            <div className="showMenu--imagewrapper">
                                <img className="showMenu--imageMenu"
                                     src={menuData && menuData.menuPictureURL ? menuData.menuPictureURL : tiger1}
                                     alt="a key element out of the menu"/></div>
                        </Tile>
                        <Tile className="showMenu--tile2 flex-collumn">
                            <h2 className="showMenu--tile2-title">{menuData && menuData.title ? menuData.title: "Ceci n'est pas un titre"}</h2>
                            <p className="showMenu--tile2-description">{menuData && menuData.menuDescription ? menuData.menuDescription: "Call the cook for an explanation of the menu"}</p>
                            <div className="showMenu--tile2-menuRowWrapper flex-collumn">

                                {menuData && (menuData.starter || menuData.main || menuData.side || menuData.dessert)
                                    ?
                                    <>
                                    {menuData && menuData.starter && <MenuRow
                                    title="Starter:"
                                    text={menuData.starter}/> }
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
                        </Tile>
                        <Tile className="showMenu--tile3 flex-collumn">
                            <div className="showMenu--tile3-cookwrapper flex-collumn">
                                <h3>The beste cook ever</h3>
                                <ProfilePicture/>
                                <p>{menuData && menuData.cook.username ? menuData.cook.username: "mystery cook"}</p>
                            </div>
                            <div className="showMenu--tile3-menuRowWrapper flex-collumn">
                                <MenuRow
                                    title="Price:"
                                    // text="12,50 euro per menu"
                                    text={menuData && menuData.priceMenu ? `${new Intl.NumberFormat('nl', { style: 'currency', currency: 'EUR'}).format(menuData.priceMenu)} per menu`: "Ask the cook"}
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
                                    text={menuData && menuData.startDeliveryWindow && menuData.endDeliveryWindow ? showDeliveryWindow(menuData.startDeliveryWindow, menuData.endDeliveryWindow ) : "ask the cook, they forgot the fill it in"}/>
                                <MenuRow
                                    title="Disclamer:"
                                    text="The food can contain trace elements of all allergens"/>
                            </div>
                        </Tile>
                    </div>
                    <Button className="showMenu--wiljeme-nuButton" type="button" onClick={toggleOverlay}>Wil je me-nu</Button>
                </div>
            </main>
        </>
    );
}

export default ShowMenu;