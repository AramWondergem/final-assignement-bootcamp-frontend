import React, {useContext, useState} from 'react';
import './login.css'
import Logo from "../../components/logo/Logo";
import Button from "../../components/button/Button";
import JSConfetti from 'js-confetti'
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";


function Login() {
    const {login} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [catchError, setCatchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const dataUrlPost = '/auth'
    const navigate = useNavigate();

    const jsConfetti = new JSConfetti()

    function onClickConfetti() {
        jsConfetti.addConfetti({
            emojis: ['🍆', '🌽', '🧄', '🥦', '🥔', '🥒', '🍅'],
            emojiSize: 50,
            confettiNumber: 100,
            confettiRadius: 30,
        });
    }

    async function onSubmitToLogin(event) {
        event.preventDefault();
        setIsLoading(true);
        setCatchError(null);

        try {
            const response = await axios.post(dataUrlPost, {
                username: email,
                password: password
            });

            const {username, name} = response.data;

            const token = response.headers.get('Authorization');
            login(token, username, name)

            console.log("user logged in")
        } catch (error) {
            setCatchError(error);
            console.log(error)

        } finally {
            setIsLoading(false)

        }
    }


    function printMessage() {
        if (catchError.hasOwnProperty("response")) {
            switch (catchError.response.status) {
                case 401:
                    return "Oeps the elves at the backend do not recognize the username and/or password"
                case 500:
                    return "Oeps something is wrong with the server, contact the elves to signal the problem"
                default:
                    return "Oeps somehting is wrong. This happens for the first time. Contact the elves."
            }

        } else {
            return "Oeps something went wrong. Contact the elves and aks for help"
        }
    }

    return (
        <main className="outerbox login">
            <div className="innerbox login--innerbox flex-collumn">
                <div className="login--contentwrapper flex-collumn">
                    <div className="login--logowrapper">
                        <div className={`bubble${catchError !== null ? "-active" : ""}`}> {
                            catchError !== null && printMessage()
                        }

                        </div>

                        <Logo className="login--logo" size="big">
                            <h1>Wonder Gems</h1>
                        </Logo>
                    </div>
                    {}
                    <div className="login--formwrapper flex-row">
                        <form className="login--form flex-collumn" onSubmit={onSubmitToLogin}>
                            <label className={`${isLoading && "animate"}`} htmlFor="email">E-mail address</label>
                            <input placeholder="best.cook.ever@wondergems.com" type="email" id="email" value={email}
                                   onChange={(event) => setEmail(event.target.value)}/>
                            <label className={`${isLoading && "animate"}`} htmlFor="password">password</label>
                            <input placeholder="•••••••••••••••" type="password" id="password" title="password"
                                   value={password}
                                   onChange={(event) => setPassword(event.target.value)}/>
                            <Button disabled={isLoading} type="submit" >{isLoading ? "Loading" : "Sign in"}</Button>
                        </form>
                    </div>
                    <Button  onClick={onClickConfetti} className="confetti-button">Do not click here</Button>

                </div>
            </div>
        </main>
    );
}

export default Login;