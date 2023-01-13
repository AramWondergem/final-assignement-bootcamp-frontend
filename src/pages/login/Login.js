import React, {useContext, useState} from 'react';
import './login.css'
import Logo from "../../components/logo/Logo";
import Button from "../../components/button/Button";
import JSConfetti from 'js-confetti'
import {AuthContext} from "../../context/AuthContext";
import axios from "axios";
import {useNavigate} from "react-router-dom";
import InputWithLabel from "../../components/inputWithLabel/InputWithLabel";


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
                email: email,
                password: password
            });
console.log(response);
            const {username, email : mail, roles} = response.data;

            const token = response.headers.get('Authorization');
            login(token, mail, username, roles)

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
                            <InputWithLabel
                                classNameLabel={`${isLoading && "animate"}`}
                                id="email"
                                label="E-mail address"
                                placeholder="best.cook.ever@wondergems.com"
                                type="email"
                                value={email}
                                onChange={(event) => setEmail(event.target.value)}/>
                            <InputWithLabel
                                classNameLabel={`${isLoading && "animate"}`}
                                id="password"
                                label="Password"
                                placeholder="•••••••••••••••"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}/>

                            <div className="login--buttonwrapper flex-collumn">
                                <Button disabled={isLoading} type="submit">{isLoading ? "Loading" : "Log in"}</Button>
                                <Button type="button" onClick={() => navigate('/signup')}>Create account</Button>
                            </div>
                        </form>
                    </div>
                    <Button onClick={onClickConfetti} className="confetti-button">Do not click here</Button>

                </div>
            </div>
        </main>
    );
}

export default Login;