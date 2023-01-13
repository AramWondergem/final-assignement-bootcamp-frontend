import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import validateTokenDate from "../helpers/validateTokenDate";


export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({
        user: null,
        status: 'pending',
        isAuth: false,
    });
    const dataUrlGet = '/users'

    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('token') && validateTokenDate(localStorage.getItem('token'))) {
            console.log("there is a valid token in local storage")
            // I could not make use of useFetch inside a callback function, so that is why I do not call useFetch

            // Fetch data function declaration
            const fetchData = async (url) => {
                try {
                    // Fetch the response
                    const response = await axios.get(url) //global axios defaults are in index.js

                    setAuthState({
                        user: {
                            email: response.data.email,
                            username: response.data.username,
                            roles: response.data.roles
                        },
                        status: 'done',
                        isAuth: true
                    });


                } catch (error) {
                    // Catch the error
                    console.log(error);
                    console.log("Something went wrong at the backend when fetching userdata. This can be due to a invalid token. Login again. There is not more information shared due to security reasons")
                    setAuthState({ // if error occurs it wil go back to inlog screen
                        user: null,
                        status: 'done',
                        isAuth: false
                    });
                    navigate('/login')
                    localStorage.clear();

                }
            }
            // Call the Fetch Data function
            fetchData(dataUrlGet)


        } else {
            setAuthState({
                user: null,
                status: 'done',
                isAuth: false
            });

            localStorage.clear();
        }

    }, [])


    function login(token, email, username, roles) {

        localStorage.setItem('token', token);

        setAuthState({
            user: {
                username: username,
                email: email,
                roles: roles
            },
            status: 'done',
            isAuth: true
        });
        console.log(authState)
        navigate('/')
        console.log(authState)

    }

    function logout() {
        setAuthState({
            user: null,
            status: 'done',
            isAuth: false
        });

        localStorage.clear();
        navigate('/login')


    }

    const data = {isAuth: authState.isAuth, user: authState.user, login, logout};


    return (
        <AuthContext.Provider value={data}>
            {authState.status === 'pending'
                ? <p>Loading...</p>
                : children
            }
        </AuthContext.Provider>
    )
}

export default AuthContextProvider;