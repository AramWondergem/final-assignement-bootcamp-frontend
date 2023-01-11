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
    const [catchError, setCatchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dataUrlGet = '/users'

    const navigate = useNavigate();




    useEffect(() => {
        if (localStorage.getItem('token') && validateTokenDate(localStorage.getItem('token'))) {
            // I could not make use of useFetch inside a callback function, so that is why I do not call useFetch

            // Fetch data function declaration
            const fetchData = async (url) => {
                setIsLoading(true);
                setCatchError(null);
                try {
                    // Fetch the response
                    const response = await axios.get(url)
                        // Catch cancellation error (couldn't be fetched in the catch block)
                        .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));


                    setAuthState({
                        user: {
                            username: response.data.username,
                            name: response.data.name
                        },
                        status: 'done',
                        isAuth: true
                    });
                    navigate('/')


                } catch (error) {
                    // Catch the error
                    setCatchError(error);
                    console.log(error);
                    console.log("Something went wrong at the backend. This can be due to incorrect password. Login again. There is not more information shared due to security reasons")
                    setAuthState({ // if error occurs it wil go back to inlog screen
                        user: null,
                        status: 'done',
                        isAuth: false
                    });
                    navigate('/login')
                    localStorage.clear();


                } finally {
                    // Set loading to initial state
                    setIsLoading(false);

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
            navigate('/login')
            localStorage.clear();
        }

    }, [])





    function login(token, username, name) {

        localStorage.setItem('token', token);

        setAuthState({
            user: {
                username: username,
                name: name
            },
            status: 'done',
            isAuth: true
        });
        navigate('/')

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

    const data = {...authState, login, logout};


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