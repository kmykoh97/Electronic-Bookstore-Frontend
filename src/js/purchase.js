import React, { Component } from 'react';
import {withRouter} from 'react-router'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import {Button} from 'react-bootstrap';

import { isLogin } from '../index';
import '../css/purchase.css';
import $ from "jquery";



let data;

function Confirm(props) {

    let Book = {
        ID: props.ID,
        Name:"",
        Author: "",
        Language: "",
        Price: 0,
        Summary:""
    };

    for (let i = 0; i < data.length; i++) {
        if (Number(data[i].ID) === Number(Book.ID)) {
            Book.Name = data[i].Name;
            Book.isbn = data[i].isbn;
            Book.Author= data[i].Author;
            Book.Language= data[i].Language;
            Book.Price = data[i].Price;
            Book.Summary = data[i].Summary;
        }
    }

    let purchase = function (id) {
        $.ajax({ url: "purchase/add_to_cart",
            data: {book_id:id},
            context: document.body,
            async: true,
            type: "post",
            success: function(data){
                if (data === "Succeed") { }
                else if (data === "Not logged in")
                    alert("Please log in. Redirecting...");
                else
                    alert("Error")
            }
        });
        
        this.context.router.history.push("/cart");
    };

    let comment = function (bookID) {
        let ret = prompt("Your review for this book: ");
        if (ret !== null) {
            $.ajax({ url: "purchase/add_comment",
                data: {bookID:bookID, comment:ret},
                context: document.body,
                async: true,
                type: "post",
                success: function(data) {
                    if (data === "Success") {
                        // do something if success
                    } else {
                        // do something if fail
                    }
                }});
        }

        window.location.reload();
    };

    return (
        <div>
            <div className={"confirm"}>Information</div>
            <div className={"BookInfo"}>
                <h2>Book info:</h2>
                Name: {Book.Name}<br />
                ISBN: {Book.isbn}<br />
                Author: {Book.Author}<br/>
                Language: {Book.Language}<br/>
                Price: {(Number(Book.Price))}<br/>
                Description: {Book.Summary}<br/>
            </div>
            <div className={"cancel"}>
                <Link className={"linkText"} to={"/booklist"}>
                    <Button bsSize={"large"}>
                    Back
                    </Button>
                </Link>
            </div>
            <Button bsStyle={"primary"} bySize={"large"}
                className={"submit"}
                onClick={()=>purchase(Book.ID)}>
                Get This!
            </Button>
            <Button bsStyle={"info"} bySize={"large"}
                className={"comment"}
                onClick={()=>comment(Book.ID)}>
                Comment
            </Button>
        </div>
    );
}

class Comments extends Component{
    constructor(props) {
        super(props);
        let data = [];
        $.ajax({ url: "purchase/get_comment",
            data: {bookID: this.props.ID},
            context: document.body,
            async: false,
            type: "post",
            success: function(value) {
                if (value === "none") {
                    // data = ["no comment added yet!"];
                } else {
                    data = $.parseJSON(value);
                    data = data["comment"];
                }
            }});

        let buf = [];
        for (let i = 0; i < data.length; i++) {
            buf.push(<div>Comment {i+1}: {data[i]}</div>);
        }

        if (data === undefined || data.length == 0) {
            // array empty or does not exist
            buf = [];
            buf.push(<div>No available comment!</div>);
        }

        this.state = {
            comments: data,
            show: buf
        };
    }

    render() {
        return (
            <div className="Comments">
                <h2>Comments:</h2>
                {this.state.show}
            </div>
        );
    }
}

class Purchase extends Component {
    static contextTypes = {
        router: PropTypes.object
    };

    render() {
        if (!isLogin) {
            alert("Please login first");
            this.context.router.history.push('/login');
        }
        $.ajax({ url: "/getBook",
            context: document.body,
            async: false,
            type: "post",
            success: function(value){
                data = $.parseJSON(value);
            }
        });
        
        return (
            <div className="back">
                <Confirm ID={this.props.location.state.id}/>
                <Comments ID={this.props.location.state.id}/>
            </div>
        )
    }
}



export default withRouter(Purchase);