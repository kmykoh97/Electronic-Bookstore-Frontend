import React, { Component } from 'react';
import { withRouter} from 'react-router';
import {Link} from 'react-router-dom';
import { Button } from 'react-bootstrap';

import '../css/home.css';



class Home extends Component {
    render() {
        return (
            <div className={"back"}>
                <img className={"imgIntro"} alt={"Introductory image"} src={require("./static/img/MainPage.jpg")}/>
                <div className={"ads"}>
                    <br/><br/><br/><br/>
                    <div className={"newarr"}>Welcome to e-Book</div>
                    <div className={"off"}>comprehensive index of full-text library</div>
                </div>
                <Link className={"toList"} to={"/booklist"}>
                    <Button bsSize={"large"} bsStyle={"success"}>View Book List</Button>
                </Link>
            </div>
        )
    }
}



export default withRouter(Home);