import React, {createContext, useEffect, useState} from "react";
import axios from "axios";
import {useNavigate} from "react-router-dom";

export const AuthContext = createContext(null);

function AuthContextProvider({children}) {
    const [authState, setAuthState] = useState({user: null, status: 'pending', isAuth: false},);
    const [dataUser, setDataUser] = useState(undefined);
    const [catchError, setCatchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dataUrlGet = '/users'
    const dataUrlPost = '/auth'
    const navigate = useNavigate();


    useEffect(() => {

        if (localStorage.getItem('token') !== null && localStorage.getItem('token') !== undefined) {
            // I could not make use of useFetch inside a callback function, so that is why I do not call useFetch

            // Fetch data function declaration
            const fetchData = async (url) => {
                setIsLoading(true);
                try {
                    // Fetch the response
                    const response = await axios.get(url)
                        // Catch cancellation error (couldn't be fetched in the catch block)
                        .catch(e => e.code === "ERR_CANCELED" && console.log("Fetch Request Cancelled"));
                    setDataUser(response.data);
                    setCatchError(null);


                } catch (error) {
                    // Catch the error
                    setCatchError(error);

                } finally {
                    // Set loading to initial state
                    setIsLoading(false);
                }
            }
            // Call the Fetch Data function
            fetchData(dataUrlGet)

            setAuthState({
                user: {
                    username: dataUser.username,
                    name: dataUser.name
                },
                status: 'done',
                isAuth: true
            });

        } else {
            setAuthState({
                user: null,
                status: 'done',
                isAuth: false
            });
        }

    }, [])


    function login(credentials) {

        async function postCredentials(credentials) {

            setIsLoading(true)

            try {
                const response = await axios.post(dataUrlPost, {
                    username: credentials.username,
                    password: credentials.password
                });

                const {username, name} = response.data;

                // localStorage.setItem('token', response.headers.get('Authorization'));
                console.log(response.headers.has('Authorization'))
                console.log(response)

                setAuthState({
                    user: {
                        username: username,
                        name: name
                    },
                    status: 'done',
                    isAuth: true
                });
                setCatchError(null);
                navigate('/')
                console.log("user logged in")

            } catch (error) {
                setCatchError(error);
                console.log(error)
            } finally {
                setIsLoading(false)
            }


        }


        postCredentials(credentials);
    }

    function logout() {
        setAuthState({
            user: null,
            status: 'done',
            isAuth: false
        });

        localStorage.clear();


    }

    const data = {...authState, login, logout, catchError, isLoading};


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