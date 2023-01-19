import './profile.css'

import React from 'react';
import Header from "../../components/header/Header";
import Tile from "../../components/tile/Tile";
import Button from "../../components/button/Button";

import tiger1 from "../../assets/tiger1.jpg"
import eggplant from "../../assets/eggplant.jpg"
import celeric from "../../assets/celeric.jpg"

function Profile(props) {
    return (
        <>
            <Header/>
            <main className="profile outerbox">
                <div className="profile--innerbox innerbox flex-collumn">
                    <div className="profile--tilewrapper flex-wrap-row">

                        <Tile type="picture">
                            <div className="profile--imagewrapper imagewrapper imagewrapper-profilepicture"><img className="profile--profilepicture" src={tiger1} alt="profile picture"/></div>

                        </Tile>
                        <Tile type="text">
                            <h3>Street and Number:</h3>
                            <p>Uppercatclass 56</p>
                            <h3>Zipcode:</h3>
                            <p>1234 ZL</p>
                            <h3>City:</h3>
                            <p>Tigertown</p>

                        </Tile>
                        <Tile type="picture">
                            <div className="profile--imagewrapper imagewrapper"><img className="profile--vegetablepicture" src={celeric} alt="picture of celeric"/></div>
                        </Tile>
                        <Tile type="text">
                            <h3>The Fabulous:</h3>
                            <p>Tiger the cat</p>
                            <h3>E-mail address:</h3>
                            <p>tigerthecat@thejungle.com</p>
                            <h3>Favorite colour:</h3>
                            <p>Yellow and Pink</p>

                        </Tile>
                        <Tile type="picture">
                            <div className="profile--imagewrapper imagewrapper"><img className="profile--vegetablepicture" src={eggplant} alt="picture of eggplant"/></div>
                        </Tile>
                        <Tile type="text">
                            <h3>Allergies</h3>
                            <p>Crumpy humans</p>
                            <h3>E-mail address:</h3>
                            <p>When I see a crumpy human it tickles my brain.  One crumpy human a day is not life threathing, but that is my limit</p>
                        </Tile>
                    </div>
                    <Button className="profile--button">
                        Update
                    </Button>
                </div>
            </main>
        </>
    );
}

export default Profile;