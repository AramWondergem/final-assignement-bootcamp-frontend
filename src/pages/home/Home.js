import React, {useContext, useEffect, useState} from 'react';
import './home.css'
import Header from "../../components/header/Header";
import LargeMenuButton from "../../components/menuButton/largeMenuButtonCustomer/LargeMenuButton";
import useFetch from "../../customHooks/useFetch";
import {AuthContext} from "../../context/AuthContext";


function Home(props) {
    const {user} = useContext(AuthContext);
    const [customerData, setCustomerData] = useState(null);
    const [isLoadingCustomerData, setIsLoadingCustomerData] = useState(false);
    const [errorCustomerData, setErrorCustomerData] = useState(null);

    // fetch data customer
    useFetch(`/users`,setCustomerData,setErrorCustomerData,setIsLoadingCustomerData,[]);

    //function to show the menus
    function showMenus(menuArray,cookOrCustomer) {

        menuArray.sort((a,b) => sortingOnDate(a.startDeliveryWindow,b.startDeliveryWindow));

        return menuArray.map((menu)=> {
            return <LargeMenuButton
                key={`${cookOrCustomer + menu.id}`}
                menuData={menu}
                url={`/menu/${menu.id}`}/>
        })
    }

    useEffect(()=> console.log(customerData),[customerData]);

    // sorting function
    function sortingOnDate(a,b) {
        const dateA = Date(a);
        const dateB = Date(b);
        return dateA > dateB
    }

    return (
        <>
            <Header/>
            <main className="home outerbox">
                <div className="home--innerbox innerbox flex-wrap-row">
                    {(customerData && customerData.menusAsCustomers.length>0)?
                        <div className="home--contentwrapper flex-collumn">
                            <h2>Menus as customer</h2>
                            <div className="home--menubuttonwrapper flex-wrap-row">
                                {!isLoadingCustomerData && customerData ?
                                    showMenus(customerData.menusAsCustomers, 'customer') :
                                    <h2>loading</h2>}
                            </div>
                        </div>
                        :
                        <>{!user.roles.includes("COOK")&& <h1>Poor you, you have to look for a cook who wants to be friends. Good luck with that!</h1>}</>

                    }
                    {user.roles.includes("COOK") &&
                        <div className="home--contentwrapper flex-collumn">
                            <h2>Menu's as cook</h2>
                            <div className="home--menubuttonwrapper flex-wrap-row">
                                {!isLoadingCustomerData && customerData
                                    ?
                                    <>
                                        {customerData.menusAsCook.length > 0
                                            ?
                                            showMenus(customerData.menusAsCook, 'cook')
                                            :
                                            <LargeMenuButton
                                                url='/create/new'>
                                                <h1>Create your first menu</h1>
                                            </LargeMenuButton>
                                        }</>
                                :
                                    <h2>loading</h2>}
                            </div>
                        </div>
                        }
                </div>

            </main>

        </>
    );
}

export default Home;