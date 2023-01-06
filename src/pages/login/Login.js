import React from 'react';
import './login.css'
import Logo from "../../components/logo/Logo";
import Button from "../../components/button/Button";
import JSConfetti from 'js-confetti'


function Login({setExploding}) {

    const jsConfetti = new JSConfetti()

    function onClickConfetti(){
        jsConfetti.addConfetti({
            emojis: ['🍆','🌽','🧄','🥦','🥔','🥒','🍅'],
            emojiSize: 50,
            confettiNumber: 100,
            confettiRadius: 30,
        });
    }

    return (
        <main className="outerbox login">
            <div className="innerbox login--innerbox flex-collumn">
                <div className="login--contentwrapper flex-collumn">
                    <Logo className="login--logo" size="big">
                        <h1>Wonder Gems</h1>
                    </Logo>
                    <div className="login--formwrapper flex-row">
                        <form className="login--form flex-collumn" onSubmit={(event) => {
                            event.preventDefault();
                            console.log("gebruiker is ingelogd")
                        }}>
                            <label htmlFor="e-mail">E-mail address</label>
                            <input placeholder="best.cook.ever@wondergems.com" type="email" id="e-mail"/>
                            <label htmlFor="password">password</label>
                            <input placeholder="•••••••••••••••" type="Password" id="password" pattern="^(?=.*?[a-z])(?=.*?[A-Z])(?=.*?[0-9])(?=.*?[\!\#\@\$\%\&\/\(\)\=\?\*\-\+\-\_\.\:\;\,\]\[\{\}\^])[A-Za-z0-9!#%]{8,32}" title="password"/>
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