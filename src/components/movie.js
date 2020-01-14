
import React from 'react';

import { toJS } from "mobx";

import gsap from 'gsap';

import './movie.css';

const axios = require('axios');


class Movie extends React.Component {


    constructor(props) {
        super();

        this.state = {

            reviews: <div id="reviewsloading">
                        <div id="loader"></div>
                    </div>

        }


        this.id = "";
        this.rating = "1";
        this.text = "";


        }


        sendReview = () => {

            console.log(this.rating)
            console.log(this.text)

        }

        changeRating = (e) => {

            this.rating = e.target.value; 

        }


        changeText = (e) => {

            this.text = e.target.value; 

        }



        getMovie = () => {


        var noReviews = () => {
                
                this.setState({
                    reviews: <div id="noreviews">
                                <p>No reviews yet!</p>
                            </div>
                })

            }


            axios.get('/movie', {
                params: {
                id: this.id
                }
            })
            .then(function (response) {
            
                if (response.data.length === 0) {
                
                    noReviews();


                }

            })
            .catch(function (error) {
            
            })

        }
        



componentDidMount () {

    var loadingScreen = document.getElementById("loadingscreen");

    gsap.to(loadingScreen, 1, {right: "-101%"})

    this.getMovie();

}


render () {


var movie = window.location.search.split("");
movie.shift();
movie =  movie.join('');

var movies = this.props.store.movies;

var theMovie;

for (var k = 0; k < movies.length; k++) {

    if (movies[k].id === movie) {
        theMovie = movies[k]
    }

}

this.id = theMovie.id;



theMovie = <div id="themovie">

                <img src={theMovie.picture}></img>

                <div id="themovieinfo">
                    <div id="movieinfotext">
                    <p>{theMovie.name}</p>
                    <p>{theMovie.year}</p>
                    <p>Director: {theMovie.director}</p>
                    <p>{theMovie.text}</p>
                    </div>

                </div>

           </div>


var reviewBox;

if (this.props.store.user.username.length === 0) {

    reviewBox = <div id="reviewbox">

                <p>Log in to write a review.</p>

                </div>

}

else if (this.props.store.user.username.length !== 0) {

    reviewBox = <div id="reviewbox2">


                <p>Username: {this.props.store.user.username}</p>

                <div id="ratingbox">
                <p>Rating:</p>
                <select onChange={this.changeRating}>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                    <option value="5">5</option>
                    <option value="6">6</option>
                    <option value="7">7</option>
                    <option value="8">8</option>
                    <option value="9">9</option>
                    <option value="10">10</option>
                </select>
                </div>

                <textarea onChange={this.changeText} id="reviewtext"></textarea>

                <div onClick={this.sendReview} id="sendreviewbutton">
                    <p>Send</p>
                </div>


                </div>

}


return (

    <div id="themoviewrap">

        <div id="themovietable">

        {theMovie}

        <div id="movieline"></div>

        {reviewBox}

        {this.state.reviews}
        <p>{this.props.store.user.username}</p>

        </div>

        
    </div>

)


}

}


export default Movie;