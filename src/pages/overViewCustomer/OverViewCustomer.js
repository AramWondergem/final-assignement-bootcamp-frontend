import React, {useState} from 'react';
import './overViewCustomer.css'
import Header from "../../components/header/Header";
import LargeMenuButtonCustomer from "../../components/menuButton/largeMenuButtonCustomer/LargeMenuButtonCustomer";
import useFetch from "../../customHooks/useFetch";

function OverViewCustomer(props) {
    const [customerData, setCustomerData] = useState(null);
    const [isLoadingCustomerData, setIsLoadingCustomerData] = useState(false);
    const [errorCustomerData, setErrorCustomerData] = useState(null);

    // fetch data customer
    useFetch(`/users`,setCustomerData,setErrorCustomerData,setIsLoadingCustomerData,[]);

    return (
        <>
            <Header/>
            <main className="overViewCustomer outerbox">
                <div className="overViewCustomer--innerbox innerbox flex-wrap-row">
                    <div className="overViewCustomer--ordered flex-row">
                        <LargeMenuButtonCustomer
                        menuData={customerData && customerData.menusAsCustomers[0]}
                        url={customerData && customerData.menusAsCustomers[0] && `/menu/${customerData.menusAsCustomers[0].id}`}/>

                    </div>
                    <div className="overViewCustomer--newMenu flex-wrap-row">

                    </div>
                </div>
            </main>

        </>
    );
}

export default OverViewCustomer;