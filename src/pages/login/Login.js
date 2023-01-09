import React, {useContext, useState} from 'react';
import './login.css'
import Logo from "../../components/logo/Logo";
import Button from "../../components/button/Button";
import JSConfetti from 'js-confetti'
import {AuthContext} from "../../context/AuthContext";


function Login({setExploding}) {
    const {login, catchError, isLoading} = useContext(AuthContext);
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');

    const jsConfetti = new JSConfetti()

    function onClickConfetti(){
        jsConfetti.addConfetti({
            emojis: ['🍆','🌽','🧄','🥦','🥔','🥒','🍅'],
            emojiSize: 50,
            confettiNumber: 100,
            confettiRadius: 30,
        });
    }

    function onSubmit(event) {
            event.preventDefault();
            console.log(event)
        login({username, password})
            console.log("gebruiker is ingelogd")
    }

    return (
        <main className="outerbox login">
            <div className="innerbox login--innerbox flex-collumn">
                <div className="login--contentwrapper flex-collumn">
                    <Logo className="login--logo" size="big">
                        <h1>Wonder Gems</h1>
                    </Logo>
                    {catchError !== null && catchError.response.status === 401 && <p>401 error</p>}
                    {catchError !== null && catchError.response.status === 500 && <p>500 error</p>}
                    <div className="login--formwrapper flex-row">
                        <form className="login--form flex-collumn" onSubmit={onSubmit}>
                            <label htmlFor="email">E-mail address</label>
                            <input placeholder="best.cook.ever@wondergems.com" type="email" id="email" value={username} onChange={(event) => setUsername(event.target.value)}/>
                            <label htmlFor="password">password</label>
                            <input placeholder="•••••••••••••••" type="password" id="password" title="password" value={password}
                                   onChange={(event) => setPassword(event.target.value)}/>
                            <Button type="submit">Sign in</Button>
                        </form>
                    </div>
                    <Button onClick={onClickConfetti} className="confetti-button">Do not click here</Button>

                </div>
            </div>
        </main>
    );
}

export default Login;