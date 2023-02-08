import React, {useContext, useEffect, useState} from 'react';
import './profilePicture.css'
import tiger from "../../assets/tijger.jpg";
import tigerlarge from "../../assets/tiger1.jpg"
import {AuthContext} from "../../context/AuthContext";
import useFetch from "../../customHooks/useFetch";
import axios from "axios";

function ProfilePicture({large, className, src, dependency}) {
    const [imageData, setImageData] = useState(null);
    const [isloading, setIsLoading] = useState(null);
    const [catchError, setCatchError] = useState(null);
    const {user} = useContext(AuthContext)



    useEffect(() => {

        // Fetch data function declaration
        async function fetchData(urlWeb) {
            setIsLoading(true);
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





                setCatchError(null);



                // console.log(btoa(response.data));

                setImageData(URL.createObjectURL(response.data));





            } catch (err) {
                // Catch the error
                setCatchError(err.message);

            } finally {
                // Set loading to initial state
                setIsLoading(false);
            }
        }
        // Call the Fetch Data function


            fetchData(src)





    }, [src]);


    return (
        <div className={`profile-picture imagewrapper ${className}`}><img className="profile-picture-image"
                                                                          src={imageData || (large && tigerlarge) || tiger}
                                                                          alt="profile picture"/></div>
    );
}

export default ProfilePicture;
