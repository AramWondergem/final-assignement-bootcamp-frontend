import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import axios from "axios";
import {BrowserRouter as Router} from "react-router-dom";
import AuthContextProvider from "./context/AuthContext";

//axios config defaults

axios.defaults.baseURL = 'http://localhost:8080/v1';


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <React.StrictMode>
        <Router>
            <AuthContextProvider>
                <App/>
            </AuthContextProvider>
        </Router>
    </React.StrictMode>
);
