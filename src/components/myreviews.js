
import React from 'react';


import { observer } from "mobx-react";

import gsap from 'gsap';

import './myreviews.css';

const axios = require('axios');





const MyReviews = observer(

class MyReviews extends React.Component {


    constructor(props) {
        super();

        this.state = {

            myreviews: ""

        }


        }



deleteReview = (id) => {

    console.log(id)


    axios.delete('/deletereview', {
        params: {
        id: id,
        token: this.props.store.user.token
        }
    })
    .then(res1 => {

        if (res1.data === "success") {

            this.getReviews();

        }

        else if (res1.data ==="no") {

            window.alert("Error! Please login again!")

        }

    })
    .catch(err => {

        window.alert("Error! Please login again!")

    })


}


getReviews = () => {

    axios.get('/myreviews', {
        params: {
        username: this.props.store.user.username,
        token: this.props.store.user.token
        }
    })
    .then(res1 => {

        if (res1.data ==="no") {

            window.alert("Error! Please login again!")
            return null

        }

        var myReviews = res1.data;
        var movies = this.props.store.movies

        console.log(myReviews)
        console.log(movies)

        var movieName;

        var theReviews = myReviews.map((x) => {

            // unnecessary work :D

            for (var k = 0; k < movies.length; k++) {

                if (movies[k].id === x.movieid) {
                    movieName = movies[k].name;
                }
            }


            return <div key={x._id} className="myreview">
                    <p>Movie: {movieName}</p>
                    <p>rating: {x.rating}</p>
                    <p>{x.text}</p>
                    
                    <div onClick={() => this.deleteReview(x._id)} className="thebutton3">
                    <p>Delete</p>
                    </div>

                    </div>


            })

            this.setState({

                myreviews: theReviews

            })

    })
    .catch(err => {


    })

}


componentDidMount (){

    this.getReviews();

    var loadingScreen = document.getElementById("loadingscreen");
            
    gsap.to(loadingScreen, 0.9, {right: "-101%"})

    window.scrollTo(0,0);

}

render () {

return (

    <div id="myreviewswrap">
        
        <div id="myreviewscont">

            <div id="myreviews">
                <h1>{this.props.store.user.username}</h1>
                {this.state.myreviews}

            </div>

        </div>

    </div>

)

}

}

)

export default MyReviews;