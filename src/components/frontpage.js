
import React from 'react';

import {Link} from 'react-router-dom';

import './frontpage.css';

import gsap from 'gsap';

import { observer } from "mobx-react";
import { toJS } from "mobx";




const Frontpage = observer(

class Frontpage extends React.Component {

    
    constructor(props) {
        super();

        this.state = {

            target: ''

        }

        this.calc = 0;
        


        }


    loadingScreen = () => {

        this.calc = this.calc + 1;

        if (this.calc === this.props.store.movies.length) {

            var loadingScreen = document.getElementById("loadingscreen");

            gsap.to(loadingScreen, 1, {right: "-101%"})

        }

    }


    changePage = (x) => {
     
        var loadingScreen = document.getElementById("loadingscreen");
        
        gsap.to(loadingScreen, 1, {right: "0%"})

        var l = 'link-' + x.target.id

        var link = document.getElementById(l);

                
        setTimeout(() => {
               
         link.click();

        }, 1000);
   

    }


    componentDidMount () {

        window.scrollTo(0,0);

    }


render () {

console.log(toJS(this.props.store.user))

var movies = this.props.store.movies;


var thumbNails = movies.map((x) => {

    return <div key={x.id} className="frontmovie">
            <img alt={x.name} id={x.id} onClick={this.changePage} onLoad={this.loadingScreen} src={x.picture}></img>
            <p>{x.name}</p>
            <Link id={'link-'+ x.id} to={'/movie?'+ x.id} className="movielink"></Link>
           </div>

})

return (

    <div id="frontwrapper">

    

        <div id="fronttable">

            <div id="frontmovieswrap">

            {thumbNails}

            </div>

        </div>

    
    </div>

)


}

}

);

export default Frontpage;