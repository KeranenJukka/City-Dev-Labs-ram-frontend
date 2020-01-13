import './App.css';

import React from 'react';

import { BrowserRouter, Route } from 'react-router-dom';


import Header from './components/header';
import FrontPage from './components/frontpage';
import Movie from './components/movie';
import MyReviews from './components/myreviews';


import Store from './mobx/mobx.js';



function App() {
  return (
    <BrowserRouter>

    <div id="App" className="App">

    <div id="loadingscreen"></div>

      <Header />
      <Route exact path='/' component={() => <FrontPage store={Store} />}/>
      <Route path='/movie' component={() => <Movie store={Store} />}/>
      <Route path='/myreviews' component={() => <MyReviews store={Store} />}/>

    </div>
    </BrowserRouter>
  );
}

export default App;
