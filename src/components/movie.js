
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

        }


 getMovie = () => {

 var noReviews = () => {
        
        this.setState({
            reviews: <div id="noreviews">
                        <p>No reviews</p>
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
         
            console.log("moi")
            noReviews();


        }

    })
    .catch(function (error) {
    
    })
  

 }
        


componentDidMount () {

    var loadingScreen = document.getElementById("loadingscreen");

    gsap.to(loadingScreen, 1, {right: "-101%"})

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

console.log(this.id)

theMovie = <div id="themovie">

                <img onClick={this.getMovie} src={theMovie.picture}></img>

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

        {this.state.reviews}

        </div>
    </div>

)


}

}


export default Movie;