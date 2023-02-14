import './profile.css'

import React, {useContext, useEffect, useState} from 'react';
import Header from "../../components/header/Header";
import Tile from "../../components/tile/Tile";
import Button from "../../components/button/Button";
import {useForm} from 'react-hook-form';
import eggplant from "../../assets/eggplant.jpg"
import celeriac from "../../assets/celeric.jpg"
import InputWithLabelHookForm from "../../components/inputWithLabel/InPutWIthLabelHookForm";
import fetchData from "../../customHooks/useFetch";
import axios from "axios";
import {AuthContext} from "../../context/AuthContext";
import ProfilePicture from "../../components/profilePicture/ProfilePicture";

function Profile(props) {

    const {user, logout} = useContext(AuthContext);

    const {register, handleSubmit, formState: {errors}, watch, setValue, reset} = useForm();

    const [fillInForm, toggleFillInForm] = useState(false);

    const [explanationRequired, toggleExplanationRequired] = useState(false);
    const watchAllergies = watch('allergies');
    const watchEmail = watch('email');

    const [userData, setUserData] = useState({
        streetAndNumber: null,
        zipcode: null,
        city: null,
        username: null,
        email: null,
        favoriteColour: null,
        allergies: null,
        allergiesExplanation: null,
        profilePicture: null
    });

    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState({});

    // fetch data on mounting
    fetchData("/users", setUserData, setIsLoading, setError, []);

    // function to set the default value of the fields. With the the react hook form defaultvalues function, you can only set them ones and I want to update them based on the userData
    function setDefaultValues() {

        Object.keys(userData).map((key) => {
            if (userData[key] && key !== 'profilePicture') {
                setValue(key, userData[key])
            }
        })
    }

    // the defaultvalues are updated when userdata is updated
    useEffect(() => {

        setDefaultValues()

    }, [userData]);

    // function to switch between form and displaying just the values
    function onClickButtonChangeForm(event) {
        event.preventDefault()

        if (fillInForm) {
            reset();
            setDefaultValues() // The default values have to be set again, because the reset() function clears all the fields
        }

        toggleFillInForm(!fillInForm);
    }

    // When the save button is clicked, firstly it will send a post request when the profile picture is updated. Secondly, it will send a put request to update the user info.
    async function onSave(data) {
        setIsLoading(true);
        try {
            if (data.profilePicture.length > 0) {
                const formData = new FormData();
                formData.append("file", data.profilePicture[0])

                const responsePicture = await axios.post("/files", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                        Authorization: `${localStorage.getItem('token')}`
                    }
                })
                    .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));

                console.log(responsePicture);

                data.profilePicture = responsePicture.headers.get('Location');

                user.profilePicture = data.profilePicture; // to update the profile picture in header
            } else {
                data.profilePicture = userData.profilePicture;
            }

            const response = await axios.put("/users", data, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
                .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));

            console.log(response);

            // When the email address is updated, the token is not valid anymore. That is why you are forced to login again.
            if (response.data.email !== userData.email) {
                logout()
            } else {
                setUserData(response.data);
                setError(null);
            }


        } catch (err) {
            setError(err.message);

        } finally {
            setIsLoading(false);
        }
        toggleFillInForm(!fillInForm);
    }

    // this useEffect updates the toggle that is linked to explanation field for the allergies. When a user fills in that they is allergic, they has to explain the severity
    useEffect(() => {

        if (!watchAllergies) {
            toggleExplanationRequired(false);
        } else {
            toggleExplanationRequired(true);
        }
    }, [watchAllergies]);

    async function onClickBecomeACook(event) {
        event.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.put("/users/cook", {}, {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${localStorage.getItem('token')}`
                }
            })
                .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));

            console.log(response.data);

            user.roles.push('COOK');
        } catch (err) {
            setError(err.message);

        } finally {
            setIsLoading(false);
        }

    }


    return (
        <>
            <Header/>
            <main className="profile outerbox">
                <form onSubmit={handleSubmit(onSave)} className="profile--innerbox innerbox flex-collumn">
                    <div className="profile--tilewrapper flex-wrap-row">

                        <Tile type={fillInForm ? "text" : "picture"}>
                            {fillInForm ?
                                <>
                                    <InputWithLabelHookForm
                                        id="profilePicture"
                                        label="Profile picture:"
                                        type="file"
                                        accept="image/*"
                                        reactHookForm={register("profilePicture")}/>

                                </>
                                :
                                <>
                                    <ProfilePicture
                                        className="imagewrapper-profilepicture"
                                        src={userData.profilePicture}
                                        large={true}/>
                                </>
                            }
                        </Tile>
                        <Tile type="text">
                            {fillInForm ?
                                <>
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
                        {!fillInForm && <Tile type="picture">
                            <div className="profile--imagewrapper imagewrapper"><img
                                className="profile--vegetablepicture" src={celeriac} alt="picture of celeric"/></div>
                        </Tile>}
                        <Tile type="text">
                            {fillInForm ?
                                <>
                                    <InputWithLabelHookForm
                                        id="name"
                                        label="The Fabulous:"
                                        type="text"
                                        placeholder="Tiger the cat"
                                        error={errors.username}
                                        errorMessage={errors.username ? errors.username.message : ''}
                                        reactHookForm={register("username", {
                                            required: {
                                                value: true,
                                                message: 'The elves want to keep it personal, so fill in your name'
                                            }
                                        })}/>
                                    <InputWithLabelHookForm
                                        id="email"
                                        label="E-mail address:"
                                        type="email"
                                        placeholder="tigerthecat@thejungle.com"
                                        error={errors.email}
                                        errorMessage={errors.email ? errors.email.message : ''}
                                        reactHookForm={register("email", {
                                            required: {
                                                value: true,
                                                message: 'Fill in a valid e-mail address'
                                            }
                                        })}/>
                                    <InputWithLabelHookForm
                                        id="favorite-colour"
                                        label="Favorite colour:"
                                        type="text"
                                        placeholder="Yellow and Pink"
                                        error={errors.favoriteColour}
                                        errorMessage={errors.favoriteColour ? errors.favoriteColour.message : ''}
                                        reactHookForm={register("favoriteColour", {
                                            required: {
                                                value: true,
                                                message: 'The elves want to know your favorite colour'
                                            }
                                        })}/>
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
                        {!fillInForm && <Tile type="picture">
                            <div className="profile--imagewrapper imagewrapper"><img
                                className="profile--vegetablepicture" src={eggplant} alt="picture of eggplant"/></div>
                        </Tile>}
                        <Tile type="text">
                            {fillInForm ?
                                <>
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
                    <div className="profile--button-errormessage-wrapper flex-collumn">
                        {watchEmail && watchEmail !== userData.email ?
                            <p className={`input-errormessage-active`}>You have to log in again for safety reasons,
                                because you want to update your e-mail address</p> :
                            <p className="input-errormessage">Hier staat een error message</p>}
                        {/*the styling is in the inputWithLabel.css*/}
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
                                    onClick={onClickBecomeACook}
                                    className="profile--cookbutton">
                                    Become a cook
                                </Button>}
                        </div>
                    </div>
                </form>
            </main>

        </>
    );
}

export default Profile;