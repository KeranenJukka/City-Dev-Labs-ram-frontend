
import React from 'react';

import {Link} from 'react-router-dom';

import { observer } from "mobx-react";

import { toJS } from "mobx";

import gsap from 'gsap';

import "./header.css";





const Header = observer(

class Header extends React.Component {


    constructor(props) {
        super();


        }



        setLoadingScreen = () => {
            
            var loadingScreen = document.getElementById("loadingscreen");
            gsap.to(loadingScreen, 0.9, {right: "0%"});

        }



    logOut = () => {

        this.props.store.user.username = "";
        this.props.store.user.token = ""; 


        var frontLink = document.getElementById("navfront");
        frontLink.click();


    }


    changePage = (x) => {

        var location = window.location.pathname;
        location = location.toLowerCase();
        location = location.split("");
        location.shift();
        location = location.join("");

        if (location === x) {

            
            return null;

        }

        else if (window.location.pathname === "/" && x === "frontpage") {

            
            return null;

        }


        switch(x) {

            case "login":
            
            this.setLoadingScreen();
            setTimeout(() => {
                document.getElementById("navlogin").click(); 
            }, 1000);
            
            break;

            case "createaccount":

            this.setLoadingScreen();
            setTimeout(() => {
            document.getElementById("navcreate").click();
            }, 1000);
            
            break;

            case "myreviews":

            this.setLoadingScreen();
            setTimeout(() => {
                document.getElementById("navreview").click();
            }, 1000);
            
            break;

            case "frontpage":
           
            this.setLoadingScreen();
            setTimeout(() => {
                document.getElementById("navfront").click();
            }, 1000);
            
            
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
                    <p onClick={() => this.changePage('createaccount')}>Create Account</p>
                    <Link id="navlogin" className="navlink" to="/login"></Link>
                    <Link id="navcreate" className="navlink" to="/createaccount"></Link>
                </div>

    }


else {

        nav = <div id="loginnav2">
                 <p onClick={() => this.changePage('myreviews')}>My Reviews</p>
                 <p onClick={this.logOut}>Log out</p>
                 <Link id="navreview" className="navlink" to="/myreviews"></Link>
            </div>
   

}



return (

    <div id="headerwrap">
        
        <div id="headercont">

        <div id="rateamovielogo">
        <p onClick={() => this.changePage('frontpage')}>Rate a Movie</p>
        <Link id="navfront" className="navlink" to="/"></Link>
        </div>

        {nav}

        <p id="forrender">{this.props.store.user.username}</p>

        </div>

    </div>

)


}

}

)

export default Header;