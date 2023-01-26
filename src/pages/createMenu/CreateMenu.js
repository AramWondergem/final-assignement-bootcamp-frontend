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


function CreateMenu(props) {


    const {register, handleSubmit, formState: {errors}, watch, setValue, reset} = useForm();
    const [showOverlay, toggleShowOverlay] = useState(false);

    // useEffect(() => {
    //     const modal = document.getElementById('modal');
    // },[] )
    //
    //
    // }
    //
    //


    function onClickAddCustomers(event) {
        event.preventDefault()
        toggleShowOverlay(true);

    }

    function onClose(event) {
        event.preventDefault();
        toggleShowOverlay(false);
    }


    function onSave(data) {
        console.log(data);
    }

    return (
        <>
            <form className="createMenu--form" onSubmit={handleSubmit(onSave)}>
                <Modal classNameModal="createMenu--modal"
                       classNameContent="createMenu--modal-content"
                       showModal={showOverlay}>
                    <EmptyInputField classname="createMenu--modal-emptyinput flex-wrap-row" paddingBox={true}>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>
                        <InputCustomer className="createMenu--modal-inputcustomer"/>

                    </EmptyInputField>
                    <div className="createMenu--modal-buttonwrapper">
                        <div className="createMenu--modal-input-buttonwrapper flex-row">
                            <div className="createMenu--modal-inputwrapper flex-collumn">
                                <InputWithLabelHookForm classNameInput="createMenu--modal-addcustomerinput"
                                    id="email"
                                    label="Add customer:"
                                    type="email"
                                    placeholder="tigerthecat@thejungle.com"
                                    error={errors.email}
                                    errorMessage={errors.email ? errors.email.message : ''}
                                    reactHookForm={register("email")}/>
                            </div>
                            <Button  type="submit">Add</Button>
                        </div>
                        <div className="createMenu--modal-rightbuttonwrapper flex-row">
                            <Button
                                type="button"
                                // onClick={onClose}
                            >Cancel</Button>
                            <Button
                                type="button"
                                // onClick={onClose}
                            >Deselect</Button>
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
                                    reactHookForm={register("menuTitle")}/>
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
                                        value="meat"
                                        reactHookForm={register("animalProductsInMenu")}/>

                                    <RadioInputWIthLabelHookForm
                                        id="vega"
                                        label="vega, still animals are raped and killed for this menu"
                                        type="radio"
                                        value="vega"
                                        reactHookForm={register("animalProductsInMenu")}/>

                                    <RadioInputWIthLabelHookForm
                                        id="vegan"
                                        label="Without animal products"
                                        type="radio"
                                        value="vegan"
                                        reactHookForm={register("animalProductsInMenu")}/>

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
                                    reactHookForm={register("warmUpInstructions")}/>

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
                                    reactHookForm={register("deliveryDate")}/>

                                <div className="createMenu--deliverywindowwrapper flex-row">
                                    <div className="createMenu--timeinputwrapper flex-collumn">
                                        <InputWithLabelHookForm
                                            id="startWindow"
                                            label="From:"
                                            type="time"
                                            placeholder=""
                                            step="900"
                                            reactHookForm={register("startDeliveryWindow")}/>
                                    </div>
                                    <div className="createMenu--timeinputwrapper flex-collumn">
                                        <InputWithLabelHookForm
                                            id="endWindow"
                                            label="Until:"
                                            type="time"
                                            step="900"
                                            placeholder=""
                                            reactHookForm={register("endDeliveryWindow")}/>
                                    </div>
                                </div>
                                <InputWithLabelHookForm
                                    id="orderAmount"
                                    label="Number of menu's"
                                    type="number"
                                    placeholder=""
                                    reactHookForm={register("maxOrders")}/>
                                <InputWithLabelHookForm
                                    id="pricePerMenu"
                                    label="Price per menu:"
                                    type="number"
                                    step="0.01"
                                    placeholder=""
                                    reactHookForm={register("pricePerMenu")}/>
                                <InputWithLabelHookForm
                                    id="tikkieLink"
                                    label="Tikkie link:"
                                    type="url"
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
                            >
                                Send
                            </Button>
                            <Button
                                className="createMenu--preview"
                                // onClick={}
                            >
                                Preview
                            </Button>
                            <Button
                                className="createMenu--cancel"
                                // onClick={}
                            >
                                Cancel
                            </Button>
                            <Button
                                className="createMenu--save"
                                // onClick={}
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