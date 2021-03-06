import React, { Component } from 'react';
import {Button, Modal} from 'react-bootstrap';
import PropTypes from "prop-types";

import $ from "jquery";
import '../css/list.css';



const customStyles = {
    content : {
        top                   : '50%',
        left                  : '50%',
        right                 : 'auto',
        bottom                : 'auto',
        marginRight           : '-50%',
        transform             : 'translate(-50%, -50%)'
    }
};

let data = [];

function Msg (props) {
    let style = {
        "width": "25vmin",
        "border": "yellow",
        "color": "black ",
        "padding": "1vmin 2vmin",
        "align": "center",
        "display": "inline-block",
        "font-size": "3vmin",
    };
    return (
        <table>
            <th><Button style={style} onClick={props.UsernameClick}>Username</Button></th>
            <th><Button style={style} onClick={props.NameClick}>Real name</Button></th>
            <th><Button style={style} onClick={props.PhoneClick}>Phone</Button></th>
            <th><Button style={style} onClick={props.EmailClick}>Email</Button></th>
            <th><Button style={style} onClick={props.AddressClick}>Address</Button></th>
            <th><Button style={style} onClick={props.ValidClick}>Validity</Button></th>
            <tbody>
            {props.value}
            </tbody>
        </table>
    );
}

function Selection(props) {
    return (
        <select onChange={props.onChange} className={"Selector"} id={"selector"}>
            <option>Username</option>
            <option>Real Name</option>
            <option>Phone</option>
            <option>Email</option>
            <option>Address</option>
        </select>
    )
}

class Tbl extends Component {

    openModal() {
        this.setState({showModal: true});
    }

    afterOpenModal() {
        // references are now sync'd and can be accessed.
        this.subtitle.style.color = '#f00';
    }

    closeModal() {
        this.setState({showModal: false});
    }

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this);
        this.afterOpenModal = this.afterOpenModal.bind(this);
        this.closeModal = this.closeModal.bind(this);
        this.state = {
            a : 1,
            tableArray : [],
            showModal:false,
            inp: ''
        };
        this.Filter = this.Filter.bind(this);
        let len = props.values.length;
        for (let i=0; i<len; i++) {
            let temp = props.values[i];
            let tbls = this.state.tableArray;
            tbls.push(<tr>
                <td>{temp['Username']}</td>
                <td>{temp['Name']}</td>
                <td>{temp['Phone']}</td>
                <td>{temp['Email']}</td>
                <td>{temp['Address']}</td>
                <td>{temp['isValid']}</td>
            </tr>);
            this.setState({tableArray:tbls});
        }
    }

    sort_string(index) {
        let len = data.length;
        let arr = data;
        if (arr[0][index] > arr[len-1][index]) {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) > (arr[j + 1][index]) ) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        else{
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) < (arr[j + 1][index])) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        data = arr;
        this.render();
    }
    sort_num(index) {
        let len = data.length;
        let arr = data;
        for (let i=0; i<len; i++) {
            arr[i][index] = Number(arr[i][index]);
        }
        if (arr[0][index] > arr[len-1][index]) {
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) > (arr[j + 1][index]) ) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        else{
            for (let i = 0; i < len - 1; i++) {
                for (let j = 0; j < len - 1 - i; j++) {
                    if ((arr[j][index]) < (arr[j + 1][index])) {
                        let temp = arr[j];
                        arr[j] = arr[j + 1];
                        arr[j + 1] = temp;
                    }
                }
            }
        }
        for (let i=0; i<len; i++) {
            arr[i][index] = String(arr[i][index]);
        }
        data = arr;
        this.render();
    }
    Usernameclick () {
        this.sort_string("Username");
        this.Filter();
    }
    Nameclick () {
        this.sort_string("Name");
        this.Filter();
    }
    Emailclick () {
        this.sort_string("Email");
        this.Filter();
    }
    Phoneclick() {
        this.sort_num("Phone");
        this.Filter();
    }
    Addressclick() {
        this.sort_string("Address");
        this.Filter();
    }
    Filter() {
        let selectorFields = ['Username', 'Name', 'Phone', 'Email', 'Address', 'isValid'];
        let id = document.getElementById("selector").selectedIndex;
        let index = selectorFields[id];
        let s = document.getElementById("inpt").value;
        let len = data.length;
        let arr = data;
        let tbls = [];
        for (let i=0; i<len; i++) {
            let temp = arr[i];
            let name = temp[index].toLowerCase();
            if (name.search(s.toLowerCase()) !== -1) {
                tbls.push(<tr>
                    <td>{temp['Username']}</td>
                    <td>{temp['Name']}</td>
                    <td>{temp['Phone']}</td>
                    <td>{temp['Email']}</td>
                    <td>{temp['Address']}</td>
                    <td>{temp['isValid']}</td>
                </tr>);
                this.setState({tableArray: tbls});
            }
        }
        this.render()
    }

    fetchState() {
        let username = document.getElementById("inputUsername").value;
        for (let i=0; i<data.length; i++) {
            if (data[i]["Username"] === username){
                let theUser = data[i];
                document.getElementById("inputIsValid").value = theUser["isValid"];
            }
        }
    }

    modifyUser() {
        let username = document.getElementById("inputUsername").value;
        let isValid = document.getElementById("inputIsValid").value;

        let ret;
        $.ajax({ url: "admin/modify_user",
            data: {
                username: username,
                isValid: isValid
            },
            context: document.body,
            async: false,
            type: "post",
            success: function(data) {
                ret = data;
            },
            error: function () {
                alert("Error");
            }

        });
        if (ret==="Success") {
            window.location.reload();
        }
    }

    render() {
        return (
            <div className={"back"}>
                <div className="nameFilter"><Selection onChange={()=>this.Filter()}/></div>
                <input className="inputFilter" id={"inpt"}
                       onChange={()=>this.Filter()}/>
                <Msg value={this.state.tableArray} UsernameClick={()=>this.Usernameclick()}
                     AddressClick={()=>this.Addressclick()} PhoneClick={()=>this.Phoneclick()}
                     EmailClick={()=>this.Emailclick()} NameClick={()=>this.Nameclick()}
                />
                <Button bsStyle="success" className={"manageBut"} onClick={this.openModal}>Manage</Button>
                <Modal
                    show={this.state.showModal}
                    onHide={this.closeModal}
                >
                    <Modal.Header closeButton>
                        <Modal.Title>
                        User Management
                        </Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <h4>Admin can update user information here</h4>
                        <form>
                            <br/>Username<br/><input id={"inputUsername"} onChange={()=>this.fetchState()}/>
                            <br/>isValid<br/> <input id={"inputIsValid"}/>
                        </form>
                    </Modal.Body>
                        <Modal.Footer>
                        <Button onClick={()=>this.modifyUser()}>Submit</Button>
                        <Button onClick={this.closeModal}>Close</Button>
                        </Modal.Footer>
                </Modal>
            </div>
        );
    }
}

class UserAdmin extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        $.ajax({ url: "admin/get_user",
            context: document.body,
            async: false,
            type: "post",
            success: function(value) {
                if (value !== "Not admin")
                    data = $.parseJSON(value);
                else
                    data = value;
            }});
        if (data === "Not admin") {
            alert("Only admins are able to perform this action");
            this.context.router.history.goBack();
        }
        return (
            <div>
                <Tbl values={data}/>
            </div>
        )
    }
}



export default UserAdmin;