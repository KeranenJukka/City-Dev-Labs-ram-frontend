
import React from 'react';

import { observer } from "mobx-react";

import gsap from 'gsap';

import './movie.css';

const axios = require('axios');



const Movie = observer(

class Movie extends React.Component {


    constructor(props) {
        super();

        this.state = {

            reviews: <div id="reviewsloading">
                        <div id="loader"></div>
                    </div>,

            reviewbox: <p>TÄHÄN REVIEWBOX</p>

        }

        this.username = "";
        this.id = "";
        this.rating = "1";
        this.text = "";

        this.reviewdone = "no";

        }


        setReviewBox = () => {
        
        var reviewBox;

        if (this.username.length === 0) {

            reviewBox = <div id="reviewbox">

            <p>Log in to write a review.</p>

            </div>

            this.setState({
                reviewbox: reviewBox
            })

        }

        else if (this.username.length !== 0 && this.reviewdone === "no") {

            reviewBox = <div id="reviewbox">


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

                this.setState({
                    reviewbox: reviewBox
                })

        }

        else if (this.reviewdone === "yes") {

            reviewBox = <div id="reviewbox">

            <p>Allready reviewed!</p>

            </div>

            this.setState({
                reviewbox: reviewBox
            })


        }

                        }


        sendReview = () => {


            axios.post('/review', {
                params: {
                username: this.props.store.user.username,
                movieid: this.id,
                rating: this.rating,
                text: this.text,
                token: this.props.store.user.token,

                }
            })
            .then((response) => {
            
                if (response.data === "no") {

                    window.alert("Error! Please login again.")

                }

                else if (response.data === "success") {
                    console.log(response.data)
                    this.getMovie();
                    this.setReviewBox();

                }

            })
            .catch(function (error) {
            
            })


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
            .then((response)  => {
            
                if (response.data.length === 0) {
                
                    noReviews();

                }

                else if (response.data.length !== 0) {


                    var reviews = response.data;

                    reviews = reviews.map((x) => {

                        // Check if allready reviewed by user
                        if (x.username === this.username) {this.reviewdone = "yes"}

                        return <div key={x._id} className="moviereview">

                               <p>Username: {x.username}</p>
                               <p>Rating: {x.rating}</p>
                               <p>{x.text}</p>

                               </div>

                            })

                    this.setState({
                        reviews: reviews
                    })


                }

                // set reviewbox          
                this.setReviewBox()

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

this.username = this.props.store.user.username;

// get the movie

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

// movie info

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



return (

    <div id="themoviewrap">

        <div id="themovietable">

        {theMovie}

        <div id="movieline"></div>

        {this.state.reviewbox}

        <div id="reviewsall">

        {this.state.reviews}
        
        </div>

        </div>

        
    </div>

)


}

}

)

export default Movie;