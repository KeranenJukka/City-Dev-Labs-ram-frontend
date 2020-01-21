
import {observable} from 'mobx';

import films from '../movies/movies.json';

var movies = films.movies;



class store {

movies = movies;
 
user = observable({
    username: "",
    token: ""
})


}


const Store = new store();

export default Store;


