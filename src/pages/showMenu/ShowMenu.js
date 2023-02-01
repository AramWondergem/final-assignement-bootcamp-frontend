import React, {useEffect, useState} from 'react';
import './showMenu.css';
import Modal from "../../components/modal/Modal";
import Tile from "../../components/tile/Tile";
import Header from "../../components/header/Header";
import eggplantDish from "../../assets/eggplant-on-plate.jpg"
import ProfilePicture from "../../components/profilePicture/ProfilePicture";
import MenuRow from "../../components/menuRow/MenuRow";
import Button from "../../components/button/Button";
import smallCat from "../../assets/tijger.jpg"
import {show} from "react-modal/lib/helpers/ariaAppHider";
import InputWithLabelHookForm from "../../components/inputWithLabel/InPutWIthLabelHookForm";
import {useForm} from "react-hook-form";


function ShowMenu(props) {
    const [showOverlay, toggleShowOverlay] = useState(true);
    const {register, handleSubmit, formState: {errors}, watch, setValue, reset} = useForm();
    const [fillInDeliveryWindow, setFillInDeliveryWindow] = useState(false);
    const watchStartDeliveryWindow = watch("startDeliveryWindow");
    const watchEndDeliveryWindow = watch("endDeliveryWindow");
    const [explanationRequired, toggleExplanationRequired] = useState(false);
    const watchAllergies = watch('allergies');

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
                            text="29/12/2021"/>
                        <Button
                            onClick={toggleOverlay}>Order</Button>
                    </Tile>
                    <div className="showMenu--tilewrapper flex-row">
                        <Tile className="showMenu--tile1 flex-collumn">
                            <div className="showMenu--imagewrapper">
                                <img className="showMenu--imageMenu"
                                     src={eggplantDish}
                                     alt="a key element out of the menu"/></div>
                        </Tile>
                        <Tile className="showMenu--tile2 flex-collumn">
                            <h2 className="showMenu--tile2-title">Title menu</h2>
                            <p className="showMenu--tile2-description">This is the tastiest menu ever. The eggplant
                                comes from a guy who grows them in his
                                backyard. He sings an opera every day in the greenhouse so that they grow faster.</p>
                            <div className="showMenu--tile2-menuRowWrapper flex-collumn">
                                <MenuRow
                                    title="Starter:"
                                    text="Whole roasted eggplant"/>
                                <MenuRow
                                    title="Main:"
                                    text="Pasta with roasted eggplant"/>
                                <MenuRow
                                    title="Side:"
                                    text="Salad with roasted eggplant"/>
                                <MenuRow
                                    title="Dessert:"
                                    text="Roasted eggplant ice"/>

                            </div>
                        </Tile>
                        <Tile className="showMenu--tile3 flex-collumn">
                            <div className="showMenu--tile3-cookwrapper flex-collumn">
                                <h3>The beste cook ever</h3>
                                <ProfilePicture/>
                                <p>Tiger de Cat</p>
                            </div>
                            <div className="showMenu--tile3-menuRowWrapper flex-collumn">
                                <MenuRow
                                    title="Price:"
                                    text="12,50 euro per menu"/>
                                <MenuRow
                                    title="Plantbased:"
                                    text="👍"/>
                                <MenuRow
                                    title="Delivery date:"
                                    text="01/01/2022"/>
                                <MenuRow
                                    title="Delivery window:"
                                    text="17:00 - 19:00"/>
                                <MenuRow
                                    title="Disclamer:"
                                    text="The food can contain trace elements of all allergens"/>
                            </div>
                        </Tile>
                    </div>
                </div>
            </main>
        </>
    );
}

export default ShowMenu;