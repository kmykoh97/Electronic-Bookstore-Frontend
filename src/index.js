import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import PropTypes from 'prop-types';
// import { Dropdown, DropdownButton } from 'react-bootstrap'

import Booklist from './js/Booklist';
import Home from './js/home';
import Purchase from './js/purchase';
import Login from './js/login';
import Profile from './js/profile';
import Signup from './js/signup';
import Cart from './js/cart';
import Indents from './js/indents';
import BooklistAdmin from "./js/adminBook";
import UserAdmin from "./js/adminUsers";
import IndentsAdmin from "./js/adminIndents";
import { unregister } from './js/registerServiceWorker';

import $ from "jquery";
import 'jquery';
import './css/index.css';



let history = createBrowserHistory();
let isLogin=false;

let setLogin = function (value) {
    isLogin = value;
};

function LoginButton(props) {

    $.ajax({ url: "login/check_session", context: document.body, async:false,
        success: function(data) {
            if (data.toString()==="Succeed")
            {
                setLogin(true);
            }
        }
    });
    
    return (
        isLogin?
            <div className={"loginBut"}>
            <Link  className={"linkText"} to={{
                pathname: "/profile",
            }}>
                Profile
            </Link>
            </div>
            :
            <div className={"loginBut"}>
            <Link  className={"linkText"} to={{
                pathname: "/login",
            }}>
                Login
            </Link>
            </div>
    )
}

class Title extends Component {

    static contextTypes = {
        router: PropTypes.object
    };

    jump() {
        let pos = document.getElementById("adminSelector").selectedIndex;
        if (pos === 1)
            this.context.router.history.push("/admin_booklist");
        if (pos === 2)
            this.context.router.history.push("/admin_users");
        if (pos === 3)
            this.context.router.history.push('/admin_indents');
    }

    render() {
        return (
                <div>
                    <div className={"links1"}>
                        <Link className={"linkText"} to={"/cart"}>
                            Cart
                        </Link>
                    </div>
                    <div className={"links2"}>
                        <Link className={"linkText"} to={"/booklist"}>
                            Library
                        </Link>
                    </div>
                    <LoginButton className={"loginBut"}/>
                    <div className={"links5"}>
                        <Link className={"linkText"} to={"/indents"}>
                            History
                        </Link>
                    </div>
                    <div className={"links6"}>
                        <select onChange={()=>this.jump()} className={"SelectorAdmin"} id={"adminSelector"}>
                            <option>Stats</option>
                            <option>-Sold</option>
                            <option>-Users</option>
                            <option>-Earning</option>
                        </select>
                    </div>
                    {/* <div>
                    <DropdownButton id="dropdown-basic-button" title="Dropdown button">
                        <Dropdown.Item href="#/admin_booklist">Book</Dropdown.Item>
                        <Dropdown.Item href="#/admin_booklist">Users</Dropdown.Item>
                        <Dropdown.Item href="#/admin_booklist">Stats</Dropdown.Item>
                    </DropdownButton>
                    </div> */}
                    <div className="title"><Link to={"/"}>
                            E-BOOK
                        </Link></div>
                    </div>
        )
    }
}

ReactDOM.render((
        <Router history={history}>
            <div>
            <Title history={history}/>
            <Switch>
                <Route exact path={"/"} component={Home}/>
                <Route exact path={"/booklist"} component={Booklist}/>
                <Route exact path={"/purchase"} component={Purchase}/>
                <Route exact path={"/login"} component={Login}/>
                <Route exact path={"/profile"} component={Profile}/>
                <Route exact path={"/signup"} component={Signup}/>
                <Route exact path={"/cart"} component={Cart}/>
                <Route exact path={"/indents"} component={Indents}/>
                <Route exact path={"/admin_booklist"} component={BooklistAdmin}/>
                <Route exact path={"/admin_users"} component={UserAdmin}/>
                <Route exact path={"/admin_indents"} component={IndentsAdmin}/>
            </Switch>
            </div>
        </Router>

    ),
    document.getElementById('root')
);

unregister();



export {isLogin, setLogin};