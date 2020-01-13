
import React from 'react';

import { toJS } from "mobx";

import gsap from 'gsap';

import './movie.css';

const axios = require('axios');


class Movie extends React.Component {


    constructor(props) {
        super();


        }


 get = () => {

    axios.get('/movie')
    .then(function (response) {
      // handle success
      console.log(response);
    })
    .catch(function (error) {
      // handle error
      console.log(error);
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

theMovie = <div id="themovie">

                <img onClick={this.get} src={theMovie.picture}></img>

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

        </div>
    </div>

)


}

}


export default Movie;