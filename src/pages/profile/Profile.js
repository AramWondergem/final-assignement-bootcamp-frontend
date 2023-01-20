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
import useFetch from "../../customHooks/useFetch";
import useMyUpdate from "../../customHooks/useMyUpdate";
import axios from "axios";

function Profile(props) {

    const [fillInForm, toggleFillInForm] = useState(false)
    const [explanationRequired, toggleExplanationRequired] = useState(false);
    const [userData, setUserData] = useState({
        streetAndNumber: null,
        zipcode:null,
        city:null,
        username:null,
        email:null ,
        favoriteColour:null,
        allergies:null,
        allergiesExplanation: null
    });
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});
    const url = '/users'
    const {register, handleSubmit, formState: {errors, defaultValues}, watch, reset} = useForm({
        defaultValues: {
            'streetAndNumber' : `${userData.streetAndNumber || 'Uppercatclass 56'}`,
            'zipcode' :`${userData.zipcode || '1234 ZL'}`,
            'city': `${userData.city || 'Tigertown'}`,
            'username':`${userData.username || 'Tiger the cat'}` ,
            'email':`${userData.email || 'tigerthecat@thejungle.com'}` ,
            'favoriteColour':`${userData.favoriteColour || 'Yellow and Pink'}` ,
            'allergies':`${userData.allergies || 'Grumpy humans'}` ,
            'allergiesExplanation':`${userData.allergiesExplanation || ''}`
        }
    });
    const watchAllergies = watch('allergies');

    useFetch(url,setUserData ,setIsLoading, setError );





    function onClickButtonChangeForm(event) {
        event.preventDefault()

        if(fillInForm) {
            reset(defaultValues)
        }

        toggleFillInForm(!fillInForm);
    }

    async function onSave(data) {
        console.log(data)

        setIsLoading( true );
        try {
            // Fetch the response
            const response = await axios.put( url, data,{ headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`
                }})
                // Catch cancellation error (couldn't be fetched in the catch block)
                .catch( e => e.code === "ERR_CANCELED" && console.log( "Fetch Request Cancelled" ) );
            // Set the data

            console.log(response);

            setUserData( response.data );
            setError( null );


        } catch ( err ) {
            // Catch the error
            setError( err.message );

        } finally {
            // Set loading to initial state
            setIsLoading( false );
        }
        toggleFillInForm(!fillInForm);
    }

    useEffect(() => {

        if(watchAllergies === "Grumpy humans") {
            toggleExplanationRequired(false)
        } else if(watchAllergies === '') {
            toggleExplanationRequired(false);

        } else {
            toggleExplanationRequired(true);

        }

    }, [watchAllergies])





    return (
        <>
            <Header/>
            <main className="profile outerbox">
                <form onSubmit={handleSubmit(onSave)} className="profile--innerbox innerbox flex-collumn">
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
                                        reactHookForm={register("streetAndNumber")}/>
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
                                    <p>{userData.streetAndNumber || 'Uppercatclass 56'}</p>
                                    <h3>Zipcode:</h3>
                                    <p>{userData.zipcode || '1234 ZL'}</p>
                                    <h3>City:</h3>
                                    <p>{userData.city || 'Tigertown'}</p>
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
                                        error={errors.username}
                                        errorMessage={errors.username? errors.username.message : ''}
                                        reactHookForm={register("username", {
                                            required:{
                                                value: true,
                                                message: 'The elves want to keep it personal, so fill in your name'
                                            }
                                        })}/>
                                    <InputWithLabelHookForm
                                        id="email"
                                        label="E-mail address:"
                                        type="email"
                                        error={errors.email}
                                        errorMessage={errors.email? errors.email.message : ''}
                                        reactHookForm={register("email", {
                                            required:{
                                                value: true,
                                                message: 'Fill in a valid e-mail address'
                                            }
                                        })}/>
                                    <InputWithLabelHookForm
                                        id="favorite-colour"
                                        label="Favorite colour:"
                                        type="text"
                                        error={errors.favoriteColour}
                                        errorMessage={errors.favoriteColour ? errors.favoriteColour.message : ''}
                                        reactHookForm={register("favoriteColour",{
                                            required: {
                                            value: true,
                                            message: 'The elves want to know your favorite colour'
                                        }})}/>
                                </>

                                :
                                <>
                            <h3>The Fabulous:</h3>
                            <p>{userData.username || 'Tiger the cat'}</p>
                            <h3>E-mail address:</h3>
                            <p>{userData.email || 'tigerthecat@thejungle.com'}</p>
                            <h3>Favorite colour:</h3>
                            <p>{userData.favoriteColour || 'Yellow and Pink'}</p>
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
                                        reactHookForm={register("allergies")}/>
                                    <InputWithLabelHookForm
                                        textarea={true}
                                        row={4}
                                        id="allergies-explanation"
                                        label="Explanation:"
                                        error={errors.allergiesExplanation}
                                        errorMessage={errors.allergiesExplanation ? errors.allergiesExplanation.message : ''}
                                        reactHookForm={register("allergiesExplanation",{
                                            required:{
                                                value: explanationRequired,
                                                message: 'The elves want to know more about your allergy. Can you describe the severity of your allergy?'
                                            }})}/>

                                </>

                                :
                                <>
                                    <h3>Allergies</h3>
                                    <p>{userData.allergies || 'Grumpy humans'}</p>
                                    <h3>Explanation:</h3>
                                    <p>{userData.allergiesExplanation || 'When I see a grumpy human it tickles my brain. One grumpy human a day is not life threathing, but that is my limit'}</p>
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
                            <Button className="profile--savebutton"
                            type="submit">
                                Save
                            </Button>
                            :
                            <Button
                            type="button"
                                className="profile--cookbutton">
                                Become a cook
                            </Button>}
                    </div>
                </form>
            </main>

        </>
    );
}

export default Profile;