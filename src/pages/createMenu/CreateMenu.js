import React, {useEffect, useState} from 'react';
import './createMenu.css'
import '../../components/button/button.css'
import Header from "../../components/header/Header";
import Tile from "../../components/tile/Tile";
import Button from "../../components/button/Button";
import InputWithLabelHookForm from "../../components/inputWithLabel/InPutWIthLabelHookForm";
import {useForm} from "react-hook-form";
import RadioInputWIthLabelHookForm
    from "../../components/inputWithLabel/radioInputWithLabelHookForm/RadioInputWIthLabelHookForm";
import Modal from "../../components/modal/Modal";
import EmptyInputField from "../../components/inputWithLabel/emptyInputField/EmptyInputField";
import InputCustomer from "../../components/inputWithLabel/inputCustomer/InputCustomer";
import useFetch from "../../customHooks/useFetch";
import axios from "axios";
import {useNavigate, useParams} from "react-router-dom";


function CreateMenu(props) {
    const {id} = useParams();
    const {register, handleSubmit, formState: {errors}, watch, setValue, reset} = useForm();
    const [showOverlay, toggleShowOverlay] = useState(false);
    const [cookData, setCookData] = useState({});
    const [isloadingCookData, setIsloadingCookData] = useState(false);
    const [isloadingAddCustomer, setIsloadingAddCustomer] = useState(false);
    const [error, setError] = useState(null);
    const [addCustomerToList, toggleAddCustomerToList] = useState(false);
    const [customerAdded, setCustomerAdded] = useState(true)
    const [isLoadingMenuData, setIsLoadingMenuData] = useState(false);
    const [errorMenuData, setErrorMenuData] = useState(null);
    const [menuData, setMenuData] = useState(null);
    const watchCustomersId = watch("customersId");
    const [saveMenu, toggleSaveMenu] = useState(false);
    const [menuIsSaved, toggleMenuIsSaved] = useState(false);
    const [isLoadingSaveMenu, setIsLoadingSaveMenu] = useState(false);
    const [errorSaveMenu, setErrorSaveMenu] = useState(null);
    const [errorSavePicture, setErrorSavePicture] = useState(null);
    const navigate = useNavigate();
    const watchDeliveryData = watch("deliveryDate");
    const watchStartDeliveryWindow = watch("startDeliveryWindow");
    const watchEndDeliveryWindow = watch("endDeliveryWindow");
    const [fillInDeliveryDataAndWindow, setFillInDeliveryDataAndWindow ] = useState(false);
    const [sendMenu ,toggleSendMenu] = useState(false)

    useFetch("/users", setCookData, setIsloadingCookData, setError, [customerAdded]);//to fetch the data of the cook


    useEffect(() => {
// Define request cancellation signal
        const controller = new AbortController();
        const {signal} = controller;

        if (id !== 'new') {
            console.log("menu is fetched");
            // Fetch data function declaration
            const fetchData = async (url) => {
                setIsLoadingMenuData(true);
                try {
                    // Fetch the response
                    const response = await axios.get(url, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${localStorage.getItem('token')}`,
                            signal
                        }
                    })
                        // Catch cancellation error (couldn't be fetched in the catch block)
                        .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));
                    // Set the data
                    console.log(response.data);
                    setMenuData(response.data);
                    setErrorMenuData(null);
                    console.log("menu data is loaded");


                } catch (err) {
                    // Catch the error
                    setErrorMenuData(err.message);

                } finally {
                    // Set loading to initial state
                    setIsLoadingMenuData(false);
                }
            }
            // Call the Fetch Data function
            fetchData(`menus/${id}`)
        } else {
            console.log("new menu can be created")
            reset()
        }
        // Cleanup the request on cancellation
        return function cleanUp() {
            console.log('Clean up function');
            controller.abort();
        };

    }, [id, menuIsSaved]);

    function setDefaultValues() {

        Object.keys(menuData).map((key) => {
            switch (key) {
                case 'id':
                case 'menuPictureURL':
                case 'sendToCustomers':
                    break;
                case 'customers':
                    const customersIdsArray = menuData.customers.map((customer) => customer.id);
                    setValue('customersId', customersIdsArray)
                    break;
                case 'startDeliveryWindow':
                    if(menuData.startDeliveryWindow) {
                        const dateAndTimeArrayStart = menuData.startDeliveryWindow.split('T');
                        setValue('deliveryDate', dateAndTimeArrayStart[0]);
                        setValue('startDeliveryWindow', dateAndTimeArrayStart[1]);
                    }
                    break;
                case 'endDeliveryWindow':
                    if(menuData.endDeliveryWindow) {
                    const dateAndTimeArrayEnd = menuData.endDeliveryWindow.split('T');
                    setValue('endDeliveryWindow', dateAndTimeArrayEnd[1]);
                }
                    break;
                default:
                    setValue(key, menuData[key])
            }

        })
    }

    useEffect(() => {

        if (menuData) {

            setDefaultValues()

        }

    }, [menuData]);


    function onClickAddCustomers(event) {
        event.preventDefault()
        toggleShowOverlay(true);

    }

    function onClose(event) {
        event.preventDefault();
        toggleShowOverlay(false);
    }


    async function onSave(data) {

        if (addCustomerToList) {
            setIsloadingAddCustomer(true);
            setError(null);

            const token = localStorage.getItem("token");

            try {
                const response = await axios.post('/cookcustomer/cook', {
                    email: data.email,
                    password: 'Hallo1test!',
                }, {
                    headers: {
                        "Content-Type": "application/json",
                        Authorization: token
                    }
                });

                console.log(response)
                console.log("added a customer at the backend")
                setValue('email', '')
                setCustomerAdded(!customerAdded); // only for signalling that the data has to be fetched again for the whole page.
            } catch (error) {
                setError({type: "email", error});
                console.log(error)

            } finally {
                setIsloadingAddCustomer(false)
            }
            toggleAddCustomerToList(false);
        } else if (saveMenu) {
            setIsLoadingSaveMenu(true);

            if (data.menuPicture.length > 0) {
                try {

                    console.log("saving the picture");
                    const formData = new FormData();
                    formData.append("file", data.menuPicture[0])

                    const responsePicture = await axios.post("/files", formData, {
                        headers: {
                            "Content-Type": "multipart/form-data",
                            Authorization: `${localStorage.getItem('token')}`
                        }
                    })
                        .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));

                    console.log(responsePicture);
                    data.menuPicture = responsePicture.headers.get('Location');

                } catch (error) {
                    console.log(error)
                    setErrorSavePicture(error);

                    if (menuData) {
                        data.menuPicture = menuData.menuPictureURL; // if uploading the picture goes wrong, the picture will stay the same or null
                    } else {
                        data.menuPicture = null;
                    }
                }
            } else {
                if (menuData) {
                    data.menuPicture = menuData.menuPictureURL; // if uploading the picture goes wrong, the picture will stay the same or null
                } else {
                    data.menuPicture = null;
                }
            }


            const dataForJSONFile = {
                cookId: cookData.id,
                customersId: data.customersId,
                title: data.title,
                starter: data.starter,
                main: data.main,
                side: data.side,
                dessert: data.dessert,
                menuDescription: data.menuDescription,
                menuPictureURL: data.menuPicture,
                menuType: data.menuType,
                warmUpInstruction: data.warmUpInstruction,
                orderDeadline: data.orderDeadline,
                startDeliveryWindow: data.deliveryDate ?`${data.deliveryDate}T${data.startDeliveryWindow}` : null,
                endDeliveryWindow: data.deliveryDate ?`${data.deliveryDate}T${data.endDeliveryWindow}`: null,
                numberOfMenus: data.numberOfMenus,
                priceMenu: data.priceMenu,
                tikkieLink: data.tikkieLink,
                sendToCustomers: false
            }
            try {
                let menuIdForNavigation;
                if (id === 'new') {
                        console.log("saving the new menu");

                        const responsePostMenuData = await axios.post("/menus", dataForJSONFile, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `${localStorage.getItem('token')}`
                            }
                        })
                            .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));

                        console.log(responsePostMenuData);

                        toggleMenuIsSaved(!menuIsSaved)

                        menuIdForNavigation = responsePostMenuData.headers.get("Menu-id");


                } else {

                        console.log('updated existing menu')

                        const responsePutMenuData = await axios.put(`/menus/${id}`, dataForJSONFile, {
                            headers: {
                                "Content-Type": "application/json",
                                Authorization: `${localStorage.getItem('token')}`
                            }
                        })
                            .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));

                        console.log(responsePutMenuData);
                        menuIdForNavigation = id;
                        toggleMenuIsSaved(!menuIsSaved)


                }
                toggleSaveMenu(false);

                if(sendMenu) {
                    console.log('sending menu')

                    const responsePutMenuDataSend = await axios.put(`/menus/send/${menuIdForNavigation}`, {}, {
                        headers: {
                            "Content-Type": "application/json",
                            Authorization: `${localStorage.getItem('token')}`
                        }
                    })
                        .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));

                    console.log(responsePutMenuDataSend);

                    toggleSendMenu(false);
                }

                navigate(`/menu/${menuIdForNavigation}`);
            } catch (error){
                console.log(error)
                setErrorSaveMenu(error)
                toggleSendMenu(false);
                toggleSaveMenu(false);
            }
            setIsLoadingSaveMenu(false);
        }


    }

    useEffect(() => {

        if(watchDeliveryData || watchStartDeliveryWindow || watchEndDeliveryWindow) {
            setFillInDeliveryDataAndWindow(true);
        } else {
            setFillInDeliveryDataAndWindow(false);
        }
    }, [watchDeliveryData, watchStartDeliveryWindow, watchEndDeliveryWindow]);


    return (
        <>
            <form className="createMenu--form" onSubmit={handleSubmit(onSave)}>
                <Modal classNameModal="createMenu--modal"
                       classNameContent="createMenu--modal-content"
                       showModal={showOverlay}>
                    <EmptyInputField classname="createMenu--modal-emptyinput flex-wrap-row" paddingBox={true}>
                        {cookData.customers && cookData.customers.map((customer) => {
                            const {id, profilePicture, username, email} = customer;

                            return <InputCustomer
                                key={`customer${id}`}
                                reactHookForm={register(`customersId`)}
                                customerId={id}
                                scrProfilePicture={profilePicture}
                                name={username}
                                email={email}
                                className="createMenu--modal-inputcustomer"
                                checked={watchCustomersId && watchCustomersId.includes(id)}/>
                        })}


                    </EmptyInputField>
                    <div className="createMenu--modal-buttonwrapper">
                        <div className="createMenu--modal-input-buttonwrapper flex-row">
                            <div className="createMenu--modal-inputwrapper flex-collumn">
                                <InputWithLabelHookForm classNameInput="createMenu--modal-addcustomerinput"
                                                        id="email"
                                                        label="Add customer:"
                                                        type="email"
                                                        placeholder="tigerthecat@thejungle.com"
                                                        error={error && error.type === "email"}
                                                        errorMessage={error && error.type === "email" ? error.error.response.data.message : ''}
                                                        reactHookForm={register("email")}/>
                            </div>
                            <Button type="submit"
                                    onClick={() => toggleAddCustomerToList(true)}>Add</Button>
                        </div>
                        <div className="createMenu--modal-rightbuttonwrapper flex-row">
                            <Button
                                type="button"
                                onClick={onClose}
                            >Cancel</Button>
                            <Button
                                type="button"
                                onClick={onClose}
                            >Save</Button>
                        </div>
                    </div>

                </Modal>
                <Header/>
                <div className="createMenu outerbox">
                    <div className="createMenu--innerbox innerbox flex-collumn">
                        <div className="createMenu--tilewrapper flex-wrap-row">
                            <Tile type="text">

                                <InputWithLabelHookForm
                                    id="title"
                                    label="Title:"
                                    type="text"
                                    placeholder="The best menu ever"
                                    reactHookForm={register("title")}/>
                                <InputWithLabelHookForm
                                    textarea={true}
                                    row={9}
                                    id="description"
                                    label="Description:"
                                    placeholder=""
                                    reactHookForm={register("menuDescription")}/>
                                <InputWithLabelHookForm
                                    id="menuPicture"
                                    label="Picture:"
                                    type="file"
                                    accept="image/*"
                                    reactHookForm={register("menuPicture")}/>
                                <div className="createMenu--radiobuttonwrapper flex-collumn">
                                    <RadioInputWIthLabelHookForm
                                        id="meat"
                                        label="Animals have been killed for this menu"
                                        type="radio"
                                        value="MEAT"
                                        reactHookForm={register("menuType")}/>

                                    <RadioInputWIthLabelHookForm
                                        id="vega"
                                        label="vega, still animals are raped and killed for this menu"
                                        type="radio"
                                        value="VEGA"
                                        reactHookForm={register("menuType")}/>

                                    <RadioInputWIthLabelHookForm
                                        id="vegan"
                                        label="Without animal products"
                                        type="radio"
                                        value="VEGAN"
                                        reactHookForm={register("menuType")}/>

                                </div>

                            </Tile>
                            <Tile type="text">
                                <InputWithLabelHookForm
                                    id="starter"
                                    label="Starter:"
                                    type="text"
                                    placeholder=""
                                    reactHookForm={register("starter")}/>
                                <InputWithLabelHookForm
                                    id="main"
                                    label="Main:"
                                    type="text"
                                    placeholder=""
                                    reactHookForm={register("main")}/>
                                <InputWithLabelHookForm
                                    id="side"
                                    label="Side:"
                                    type="text"
                                    placeholder=""
                                    reactHookForm={register("side")}/>
                                <InputWithLabelHookForm
                                    id="dessert"
                                    label="Dessert:"
                                    type="text"
                                    placeholder=""
                                    reactHookForm={register("dessert")}/>
                                <InputWithLabelHookForm
                                    textarea={true}
                                    row={8}
                                    id="warmup-instructions"
                                    label="Warm-up instructions:"
                                    placeholder=""
                                    reactHookForm={register("warmUpInstruction")}/>

                            </Tile>
                            <Tile type="text">
                                <InputWithLabelHookForm
                                    id="orderdeadline"
                                    label="Order deadline:"
                                    type="datetime-local"
                                    placeholder=""
                                    reactHookForm={register("orderDeadline")}/>
                                <InputWithLabelHookForm
                                    id="deliverydate"
                                    label="Delivery date:"
                                    type="date"
                                    placeholder=""
                                    error={errors.deliveryDate}
                                    errorMessage={errors.deliveryDate ? errors.deliveryDate.message : ''}
                                    reactHookForm={register("deliveryDate",{
                                        required:{
                                            value: fillInDeliveryDataAndWindow && !showOverlay,
                                            message: 'If you fill in this field, then also fill in delivery window?'
                                        }})}/>

                                <div className="createMenu--deliverywindowwrapper flex-row">
                                    <div className="createMenu--timeinputwrapper flex-collumn">
                                        <InputWithLabelHookForm
                                            id="startWindow"
                                            label="From:"
                                            type="time"
                                            placeholder=""
                                            error={errors.startDeliveryWindow}
                                            errorMessage={errors.startDeliveryWindow ? errors.startDeliveryWindow.message : ''}
                                            reactHookForm={register("startDeliveryWindow",{
                                                required:{
                                                    value: fillInDeliveryDataAndWindow && !showOverlay,
                                                    message: 'If you fill in this field, then also fill in delivery date and/or the delivery window completely?'
                                                }})}/>
                                    </div>
                                    <div className="createMenu--timeinputwrapper flex-collumn">
                                        <InputWithLabelHookForm
                                            id="endWindow"
                                            label="Until:"
                                            type="time"
                                            placeholder=""
                                            error={errors.endDeliveryWindow}
                                            errorMessage={errors.endDeliveryWindow ? errors.endDeliveryWindow.message : ''}
                                            reactHookForm={register("endDeliveryWindow",{
                                                required:{
                                                    value: fillInDeliveryDataAndWindow && !showOverlay,
                                                    message: 'If you fill in this field, then also fill in delivery date and/or the delivery window completely?'
                                                }})}/>
                                    </div>
                                </div>
                                <InputWithLabelHookForm
                                    id="orderAmount"
                                    label="Number of menu's"
                                    type="number"
                                    placeholder=""
                                    reactHookForm={register("numberOfMenus")}/>
                                <InputWithLabelHookForm
                                    id="pricePerMenu"
                                    label="Price per menu:"
                                    type="number"
                                    step="0.01"
                                    placeholder=""
                                    reactHookForm={register("priceMenu")}/>
                                <InputWithLabelHookForm
                                    id="tikkieLink"
                                    label="Tikkie link:"
                                    type={showOverlay ? "text" : "url"}
                                    placeholder=""
                                    reactHookForm={register("tikkieLink")}/>
                            </Tile>

                        </div>
                        <div className="createMenu--buttonwrapper">
                            <Button
                                className="createMenu--addcustomers"
                                onClick={onClickAddCustomers}
                            >
                                add customers
                            </Button>
                            <Button
                                className="createMenu--send"
                                type="submit"
                                onClick={() => {
                                    toggleSaveMenu(true);
                                    toggleSendMenu(true);
                                }}
                            >
                                Send
                            </Button>
                            <Button
                                className="createMenu--preview"
                                onClick={() => console.log("the preview button does not work yet")}
                            >
                                Preview
                            </Button>
                            <Button
                                className="createMenu--cancel"
                                onClick={() => navigate('/')}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="createMenu--save"
                                onClick={() => toggleSaveMenu(true)}
                                type="submit"
                            >
                                Save
                            </Button>
                        </div>
                    </div>
                </div>
            </form>
        </>
    );
}

export default CreateMenu;