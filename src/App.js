import React, { Component } from 'react';
import {BrowserRouter} from 'react-router-dom';
import Blog from './containers/Blog/Blog';


class App extends Component {

  componentDidUpdate() {
    console.log('App.js, componentDidUpdate metoda');
  }
  
  componentDidMount() {
   console.log('App.js, componentDidMount metoda');
  }
  

  render() {
    console.log('App.js, render metoda')
    return (
      <BrowserRouter> 
      <div className="App">
        <Blog />
      </div>
      </BrowserRouter>
    );
   }
}

export default App;
