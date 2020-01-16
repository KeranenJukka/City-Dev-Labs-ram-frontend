import './App.css';

import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';


import Header from './components/header';
import FrontPage from './components/frontpage';
import Movie from './components/movie';
import MyReviews from './components/myreviews';
import CreateAccount from './components/createaccount';
import Login from './components/login';


import Store from './mobx/mobx.js';



function App() {

  

  return (
    <BrowserRouter>

    <div id="App" className="App">

    <div id="loadingscreen"></div>

    <div id="background">
    <h1>RATE A MOVIE</h1>
    <h2>RATE A MOVIE</h2>
    </div>

      <Header store={Store} />

      <div id="emptyspace"></div>

      <Route exact path='/' component={() => <FrontPage store={Store} />}/>
      <Route path='/movie' component={() => <Movie store={Store} />}/>
      <Route path='/myreviews' component={() => <MyReviews store={Store} />}/>
      <Route path='/createaccount' component={() => <CreateAccount store={Store} />}/>
      <Route path='/login' component={() => <Login store={Store} />}/>

    </div>
    </BrowserRouter>
  );
}

export default App;
