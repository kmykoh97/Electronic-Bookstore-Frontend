import React, { Component } from 'react';
import {withRouter} from "react-router";
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap';

import { setLogin } from "../index";
import $ from 'jquery';

import "../css/signup.css";



class Signup extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    signUp(){
        let valid = true;
        let username = document.getElementById("username").value;
        let password = document.getElementById("password").value;
        let address = document.getElementById("address").value;
        let phone = document.getElementById("phone").value;
        let email = document.getElementById("email").value;
        let realname = document.getElementById("realname").value;

        // check whether everything is valid.
        if (password.length < 5) {
            alert("Password should be at least 5 digits");
            valid = false;
        }
        if (email.search('@')===-1) {
            alert("Invalid email address");
            valid = false;
        }
        if (!valid) {
            return false;
        }

        $.ajax({ url: "/signup/process",
            data:
                {
                    username:username,
                    password:password,
                    email:email,
                    phone:phone,
                    address:address,
                    realname:realname
                },
            context: document.body,
            async: false,
            type: "post",
            success: function(data) {
                if (data.toString() === "Succeed")
                {
                    valid = true;
                    setLogin(true);
                }
                else if (data.toString() === "Username used"){
                    valid = false;
                    alert("Username unavailable. Please choose a new username");
                }
            }});
        if (valid)
        {
            this.context.router.history.push('/profile');
        }
    }

    render(){
        return (
            <div className={"back"}>
                <div className={"form"}>
                    <br/><div className="property">Username
                    <input type={"text"} name={"Username"} id={"username"}/></div>
                    <br/><div className="property">Password
                    <input type={"password"} name={"Password"} id={"password"}/></div>
                    <br/><div className="property">Address
                    <input type={"text"} name={"Address"} id={"address"}/></div>
                    <br/><div className="property">Phone
                    <input type={"number"} name={"Phone"} id={"phone"}/></div>
                    <br/><div className="property">Email
                    <input type={"text"} name={"Email"} id={"email"}/></div>
                    <br/><div className="property">Real Name
                    <input type={"text"} name={"RealName"} id={"realname"}/></div>
                    <Button bsSize={"large"} bsStyle={"info"} onClick={()=>this.signUp()} className={"signupbut"} name={"Sign up now"}>Sign up</Button>
                </div>
            </div>
        )
    }
}



export default withRouter(Signup);