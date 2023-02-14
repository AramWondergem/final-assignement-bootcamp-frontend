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


    const navigate = useNavigate();


    useEffect(() => {
        if (localStorage.getItem('token') && validateTokenDate(localStorage.getItem('token'))) {

            console.log("there is a valid token in local storage")
            void fetchUserData(localStorage.getItem('token'));

        } else {
            setAuthState({
                user: null,
                status: 'done',
                isAuth: false
            });

            console.log("There is no token or it is not valid anymore")
        }

    }, [])


    function login(token) {

        localStorage.setItem('token', token);

        fetchUserData(token, "/") // redirected to home
    }


    async function fetchUserData(token, redirect) {
        try {
            // Fetch the response
            const response = await axios.get('/users', {
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `${token}`,
                }
            })

            console.log(response)

            setAuthState({
                user: {
                    email: response.data.email,
                    username: response.data.username,
                    roles: response.data.roles,
                    id: response.data.id,
                    profilePicture: response.data.profilePicture
                },
                status: 'done',
                isAuth: true
            });

            if (redirect) {
                navigate(redirect);
            }

        } catch (error) {
            // Catch the error
            console.log(error);
            console.log("Something went wrong at the backend when fetching userdata. This can be due to a invalid token. Login again. There is not more information shared due to security reasons")
            logout();

        }
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