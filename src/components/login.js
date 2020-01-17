
import React from 'react';



import { observer } from "mobx-react";


import gsap from 'gsap';

import "./login.css";

const axios = require('axios');;





const Login = observer(

    class Login extends React.Component {
    
    
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

                    message: <p>Type your username and your password!</p>

                })

            }

            else {

                var username = this.username;
                var password = this.password;
                
                axios.post('/login', {
                    params: {
                      username: username,
                      password: password
                    }
                  })
                  .then( (response) => {
                    
                    if (response.data === "no") {

                        this.setState({
                            message: <p>Wrong username or password!</p>
                        })

                    }

                    else if (response.data.type === "success") {

                        this.props.store.user.username = username;
                        this.props.store.user.token = response.data.token;

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


                        <h1>Login</h1>

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


export default Login;