import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import { Router, Route, Switch, Link } from 'react-router-dom';
import createBrowserHistory from 'history/createBrowserHistory'
import PropTypes from 'prop-types';

import Booklist from './js/Booklist';
import Home from './js/home';
import Purchase from './js/purchase';
import Login from './js/login';
import Profile from './js/profile';
import Signup from './js/signup';
import Cart from './js/cart';
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
        success: function(data){
            if (data.toString()==="Succeed")
            {
                setLogin(true);
            }
        }
    });
    
    return(
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

class Title extends Component{

    static contextTypes = {
        router: PropTypes.object
    };

    jump(){
        let pos = document.getElementById("adminSelector").selectedIndex;
        if (pos === 1)
            this.context.router.history.push("/admin_booklist");
        if (pos === 2)
            this.context.router.history.push("/admin_users");
        if (pos === 3)
            this.context.router.history.push('/admin_indents');
    }

    render(){
        return(
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
                    {/* <div className={"links5"}>
                        <Link className={"linkText"} to={"/indents"}>
                            History
                        </Link>
                    </div> */}
                    {/* <div className={"links6"}>
                        <select onChange={()=>this.jump()} className={"SelectorAdmin"} id={"adminSelector"}>
                            <option>Admin</option>
                            <option>--Book</option>
                            <option>--Users</option>
                            <option>--Stats</option>
                        </select>
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
            </Switch>
            </div>
        </Router>

    ),
    document.getElementById('root')
);

unregister();



export {isLogin, setLogin};