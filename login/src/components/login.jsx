import React from "react";
import "./login.css"

import { ReactReduxContext } from 'react-redux';
import { useContext } from "react";


export default function LoginPage(props) {
  const { store } = useContext(ReactReduxContext)

    return (
        <div className="container">
            <h1>Welcome to the Login Page!</h1>
        <form onSubmit={e => { e.preventDefault();  store.dispatch({type: "DO_LOGIN",userName: e.target[0].value, password: e.target[1].value}); }}>
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
        </div>
    );
}