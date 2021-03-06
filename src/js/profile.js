import React, { Component } from 'react';
import { withRouter } from "react-router";
import {Button, FormControl} from 'react-bootstrap';
import PropTypes from 'prop-types'

import {setLogin, isLogin} from "../index";
import "../css/profile.css";
import $ from "jquery";



class Profile extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    constructor() {
        super();
        let message="";
        $.ajax({ url: "/profile/getinfo",
            context: document.body,
            async: false,
            type: "post",
            success: function(data){
                message = data;
            }
        });
        
        if (message === "No info received"){
            alert("Network connection error.");
            return;
        }

        if (message === "Not logged in"){
            alert("Unauthorized access. Please log in");
            this.context.router.history.push('/login');
            return;
        }

        let profile = $.parseJSON(message);

        this.state = {
            name: profile['name'],
            phone: profile['phone'],
            email: profile['email'],
            address: profile['address']
        }
    }
    logout() {
        if (!window.confirm("Sure to log out?")){
            return;
        }
        setLogin(false);

        $.ajax({ url: "login/logout", context: document.body, async:false,
            success: function(data){
                // alert("Log out success.");
            }
        });
        
        this.context.router.history.push('/');
    }
    submitChange(){
        $.ajax({ url: "profile/update",
            data: {
                name:this.state.name,
                email:this.state.email,
                phone:this.state.phone,
                address:this.state.address
            },
            context: document.body,
            async: true,
            type: "get",
            success: function(data) {
                if (data.toString()!=="Succeed") {
                    alert("Update profile error.");
                }
                else {
                    alert("Profile updated!");
                }
            }});
    }
    changeProfile(id) {
        let obj = document.getElementById(id);
        let new_val = obj.value;

        if (id==="name")
            this.setState({name :new_val});
        else if (id==="phone")
            this.setState({phone :new_val});
        else if (id==="address")
            this.setState({address :new_val});
        else if (id==="email")
            this.setState({email :new_val});
    }
    render() {
        if (!isLogin) {
            alert("Please login first");
            this.context.router.history.push('/login');
        }

        return (
            <div className={"back"}>
                <div className={"Info"}>
                    <h2>Your info:</h2>
                    <div className="index">Real Name:</div> <FormControl className={"inputInfo"} value={this.state.name} id={"name"} onChange={()=>this.changeProfile("name")}/>
                    <div className="index">Mailing Address:</div> <FormControl className={"inputInfo"} value={this.state.address} id={"address"} onChange={()=>this.changeProfile("address")}/>
                    <div className="index">E-mail:</div> <FormControl className={"inputInfo"} value={this.state.email} id={"email"} onChange={()=>this.changeProfile("email")}/>
                    <div className="index">Phone Number:</div> <FormControl className={"inputInfo"} value={this.state.phone} id={"phone"} onChange={()=>this.changeProfile("phone")}/>
                </div>
                <div>
                    <Button bsStyle={"success"} className={"changeBut"} onClick={()=>this.submitChange()}>Update Profile</Button>
                    <Button className={"changeBut"} onClick={()=>this.logout()}>Log out</Button>
                </div>
            </div>
        )
    }
}



export default withRouter(Profile);