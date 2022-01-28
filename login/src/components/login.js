import React, { useState } from "react";
import "./login.css"

import { ReactReduxContext } from 'react-redux';
import { useContext } from "react";
import { useNavigate } from "react-router-dom";


export default function LoginPage(props) {
    const { store } = useContext(ReactReduxContext);

    const [loginErrorMessage, setloginErrorMessage] = useState("");

    const navigate = useNavigate();

    return (
        <div className="container">
            <h1>Welcome to the Login Page!</h1>
        <form onSubmit={e => doLogin(e)}>
            <div className="formElem"> 
                <label htmlFor="userName">Username: </label>
                <input type="text" id="userName" name="userName" />
            </div>
            <br/>
            <div className="formElem">
                <label htmlFor="password">Password: </label>
                <input type="password" name="password"/>
            </div>
            <br/>
                <input className="button" type="submit"  value="Login"/>
        </form>
                    <h1>{loginErrorMessage}</h1>
        </div>
    );

    async function doLogin(event) {
        event.preventDefault();
        store.dispatch({ type: "DO_LOGIN", userName: event.target[0].value, password: event.target[1].value });
    
    
        const userName = store.getState().userName;
        const password = store.getState().password;
    
        if (userName === "user" && password === "admin") {
            setloginErrorMessage("");
           const response = await fetch("google.com");
    
           const code = response.status;
    
           if(code != 200) {
               setloginErrorMessage("Databse is not accessiable at this time");
           } else {
    
                navigate('/data');
           }
           
        } else {
            setloginErrorMessage("Invalid username or password");
        }
    }
}


