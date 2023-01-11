import './signUp.css'

import React, {useState} from 'react';
import Logo from "../../components/logo/Logo";
import InputWithLabel from "../../components/inputWithLabel/InputWithLabel";
import Button from "../../components/button/Button";
import {useNavigate} from "react-router-dom";
import JSConfetti from "js-confetti";
import axios from "axios";

function SignUp() {
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [catchError, setCatchError] = useState(null);
    const [isLoading, setIsLoading] = useState(false);
    const [errorField, setErrorField] = useState(null)
    const dataUrlPost = '/users'
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
                password: password,
                roles: ['USER']
            });

            console.log(response)


            console.log("user signed up")
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
                case 400:
                    if(catchError.response.data.message.includes("Username already used"
                    )) {

                        setErrorField("email")
                        return "The elves whispered in my ear that this e-mail address is already used"
                    } else if (catchError.response.data.message.includes("password"
                    )) {
                        setErrorField("password")
                        console.log(catchError.response.data.message)
                        return "The elves whispered in my ear that your password is weak. Hover over the \"i\"."
                    }

                case 500:
                    return "Oeps something is wrong with the server, contact the elves to signal the problem"
                default:
                    return "Oeps somehting is wrong. This happens for the first time. Contact the elves."
            }

        } else {
            return "Oeps somehting is wrong. This happens for the first time. Contact the elves."
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
                                onChange={(event) => setEmail(event.target.value)}
                            classNameInput={`${errorField=== "email" && "error-field"}`}/>
                            <InputWithLabel
                                classNameLabel={`${isLoading && "animate"}`}
                                id="password"
                                label="password"
                                placeholder="•••••••••••••••"
                                type="password"
                                value={password}
                                onChange={(event) => setPassword(event.target.value)}
                                classNameInput={`${errorField=== "password" && "error-field"}`}/>

                            <Button disabled={isLoading} type="submit">{isLoading ? "Loading" : "Sign in"}</Button>
                        </form>
                    </div>
                    <Button onClick={onClickConfetti} className="confetti-button">Do not click here</Button>

                </div>
            </div>
        </main>
    );
}

export default SignUp;