import './profile.css'

import React, {useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import Tile from "../../components/tile/Tile";
import Button from "../../components/button/Button";
import {useForm} from 'react-hook-form';

import tiger1 from "../../assets/tiger1.jpg"
import eggplant from "../../assets/eggplant.jpg"
import celeriac from "../../assets/celeric.jpg"
import InputWithLabelHookForm from "../../components/inputWithLabel/InPutWIthLabelHookForm";

function Profile(props) {

    const [fillInForm, toggleFillInForm] = useState(false)
    const {register} = useForm();

    function onClickButtonChangeForm(event) {
        event.preventDefault()

        toggleFillInForm(!fillInForm);
    }

// useEffect(() => {
//     console.log("fill")
//
// }, [fillInForm]);


    return (
        <>
            <Header/>
            <main className="profile outerbox">
                <form className="profile--innerbox innerbox flex-collumn">
                    <div className="profile--tilewrapper flex-wrap-row">

                        <Tile type="picture">
                            <div className="profile--imagewrapper imagewrapper imagewrapper-profilepicture"><img
                                className="profile--profilepicture" src={tiger1} alt="profile picture"/></div>

                        </Tile>
                        <Tile type="text">
                            {fillInForm ?
                                <>
                                    <InputWithLabelHookForm
                                        id="street-and-number"
                                        label="Street and Number:"
                                        type="text"
                                        reactHookForm={register("street-and-number")}/>
                                    <InputWithLabelHookForm
                                        id="zipcode"
                                        label="Zipcode:"
                                        type="text"
                                        reactHookForm={register("zipcode")}/>
                                    <InputWithLabelHookForm
                                        id="city"
                                        label="City:"
                                        type="text"
                                        reactHookForm={register("city")}/>
                                </>

                                :
                                <>
                                    <h3>Street and Number:</h3>
                                    <p>Uppercatclass 56</p>
                                    <h3>Zipcode:</h3>
                                    <p>1234 ZL</p>
                                    <h3>City:</h3>
                                    <p>Tigertown</p>
                                </>
                            }
                        </Tile>
                        <Tile type="picture">
                            <div className="profile--imagewrapper imagewrapper"><img
                                className="profile--vegetablepicture" src={celeriac} alt="picture of celeric"/></div>
                        </Tile>
                        <Tile type="text">
                            {fillInForm ?
                                <>
                                    <InputWithLabelHookForm
                                        id="name"
                                        label="The Fabulous:"
                                        type="text"
                                        reactHookForm={register("name")}/>
                                    <InputWithLabelHookForm
                                        id="email"
                                        label="E-mail address:"
                                        type="email"
                                        reactHookForm={register("email")}/>
                                    <InputWithLabelHookForm
                                        id="favorite-colour"
                                        label="Favorite colour:"
                                        type="text"
                                        reactHookForm={register("favorite-colour")}/>
                                </>

                                :
                                <>
                            <h3>The Fabulous:</h3>
                            <p>Tiger the cat</p>
                            <h3>E-mail address:</h3>
                            <p>tigerthecat@thejungle.com</p>
                            <h3>Favorite colour:</h3>
                            <p>Yellow and Pink</p>
                                </>}
                        </Tile>
                        <Tile type="picture">
                            <div className="profile--imagewrapper imagewrapper"><img
                                className="profile--vegetablepicture" src={eggplant} alt="picture of eggplant"/></div>
                        </Tile>
                        <Tile type="text">
                            {fillInForm ?
                                <>
                                    <InputWithLabelHookForm
                                        id="allergies"
                                        label="Allergies:"
                                        type="text"
                                        reactHookForm={register("name")}/>
                                    <InputWithLabelHookForm
                                        textarea={true}
                                        row={4}
                                        id="allergies-explanation"
                                        label="Explanation:"
                                        reactHookForm={register("allergies-explanation")}/>

                                </>

                                :
                                <>
                                    <h3>Allergies</h3>
                                    <p>Grumpy humans</p>
                                    <h3>Explanation:</h3>
                                    <p>When I see a grumpy human it tickles my brain. One grumpy human a day is not life
                                        threathing, but that is my limit</p>
                                </>
                            }
                        </Tile>
                    </div>
                    <div className="profile--buttonwrapper">
                        <Button
                            className="profile--updatebutton"
                            onClick={onClickButtonChangeForm}>
                            {fillInForm ? "Cancel" : "Update"}
                        </Button>
                        {fillInForm
                            ?
                            <Button className="profile--savebutton">
                                Save
                            </Button>
                            :
                            <Button className="profile--cookbutton">
                                Become a cook
                            </Button>}
                    </div>
                </form>
            </main>

        </>
    );
}

export default Profile;