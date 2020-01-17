
import React from 'react';

import {Link} from 'react-router-dom';

import { observer } from "mobx-react";

import { toJS } from "mobx";

import gsap from 'gsap';

import "./createaccount.css";

const axios = require('axios');;

var bcrypt = require('bcryptjs');




const CreateAccount = observer(

    class CreateAccount extends React.Component {
    
    
        constructor(props) {
            super();
    
            this.state = {

                message: <p>&nbsp;</p>

            }


            this.username = "";
            this.password = "";
    
    
            }



        send = () => {


            if (this.username.length === 0 || this.password.length === 0) {

                this.setState({

                    message: <p>Pick a username and a password!</p>

                })

            }

            else {

                var password = this.password;
                var username = this.username;

                bcrypt.genSalt(10, (err, salt) => {
                    bcrypt.hash(password, salt, (err, hash) => {
                        
                        
                        axios.post('/create', {
                            params: {
                              username: username,
                              password: hash
                            }
                          })
                          .then( (response) => {
                            
                            if (response.data === "found") {
                                
                                this.setState({
                                    message: <p>Username reserved!</p>
                                })

                            }

                            else if (response.data.type === "success")  {

                                var username = response.data.username;
                                var token = response.data.token;

                                this.props.store.user.username = username;
                                this.props.store.user.token = token;

                                var loadingScreen = document.getElementById("loadingscreen")
                                gsap.to(loadingScreen, 1, {right: "0%"})
        
                                setTimeout(() => {
                                    var frontLink = document.getElementById("navfront");
                                    frontLink.click();
                                }, 1000);

                            }

                          })
                          .catch(function (error) {
                            
                          })

    
                    });
                });


 

            }



        }    



        change = (e) => {


            if (e.target.id === "username") {

                this.username = e.target.value;

            }

           else if (e.target.id === "password") {

                this.password = e.target.value;

            }


        }


       componentDidMount () {

                var loadingScreen = document.getElementById("loadingscreen");
            
                gsap.to(loadingScreen, 1, {right: "-101%"})
            
       }



        render () {

            return (


                <div id="createwrap">

                    <div id="createcont">


                        <h1>Create Account</h1>

                        <input id="username" onChange={this.change} type="text"></input>
                        <p>Username</p>

                        <input id="password" onChange={this.change} type="text"></input>
                        <p>Password</p>

                        <div onClick={this.send} className="thebutton2">
                        <p>Send</p>
                        </div>

                        {this.state.message}


                    </div>


                </div>

            )


        }



        }

)


export default CreateAccount;