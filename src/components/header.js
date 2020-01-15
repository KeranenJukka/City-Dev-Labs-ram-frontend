
import React from 'react';

import {Link} from 'react-router-dom';

import { observer } from "mobx-react";

import { toJS } from "mobx";

import "./header.css";





const Header = observer(

class Header extends React.Component {


    constructor(props) {
        super();


        }




    logOut = () => {

        this.props.store.user.username = "";
        this.props.store.user.token = ""; 

    }


    changePage = (x) => {

        switch(x) {

            case "login":
            document.getElementById("navlogin").click();
            break;

            case "create":
            document.getElementById("navcreate").click();
            break;

            case "reviews":
            document.getElementById("navreview").click();
            break;

            case "frontpage":
            document.getElementById("navfront").click();
            break;

            default:
             
          }


    }



render () {

    

    var user = toJS(this.props.store.user);

    var nav;

    if (user.username.length === 0) {

    nav =       <div id="loginnav">
                    <p onClick={() => this.changePage('login')}>Login</p>
                    <p onClick={() => this.changePage('create')}>Create Account</p>
                    <Link id="navlogin" className="navlink" to="/login"></Link>
                    <Link id="navcreate" className="navlink" to="/createaccount"></Link>
                </div>

    }


else {

        nav = <div id="loginnav2">
                 <p onClick={() => this.changePage('reviews')}>My Reviews</p>
                 <p onClick={this.logOut}>Log out</p>
                 <Link id="navreview" className="navlink" to="/myreviews"></Link>
            </div>
   

}



return (

    <div id="headerwrap">
        
        <div id="rateamovielogo">
        <p onClick={() => this.changePage('frontpage')}>Rate a Movie</p>
        <Link id="navfront" className="navlink" to="/"></Link>
        </div>

        {nav}

        <p id="forrender">{this.props.store.user.username}</p>


    </div>

)


}

}

)

export default Header;