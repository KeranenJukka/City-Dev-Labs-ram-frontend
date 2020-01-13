
import {observable, toJS} from 'mobx';

import films from '../movies/movies.json';

var movies = films.movies;



class store {

 movies = movies;
 

report () {
  console.log(this.movies)
}


}


const Store = new store();

export default Store;


