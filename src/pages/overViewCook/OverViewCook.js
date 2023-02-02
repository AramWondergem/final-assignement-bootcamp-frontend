import React from 'react';
import './overViewCook.css'
import Header from "../../components/header/Header";

function OverViewCook(props) {
    return (
        <>
            <Header/>
            <main className="overViewCook outerbox">
                <div className="overViewCook--innerbox innerbox flex-wrap-row">
                    <div className="overViewCook--current flex-row">

                    </div>
                    <div className="overViewCook--rightcontentwrapper flex-collumn">
                        <div className="overViewCook--upcomingMenu flex-row">

                        </div>
                        <div className="overViewCook--oldMenu flex-row">

                        </div>

                    </div>
                </div>
            </main>

        </>
    );
}

export default OverViewCook;