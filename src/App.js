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
  
// VAŽNO: BrowserRotuer se temelj svega i samo one komponte koje su unutar njega mogu korisiti routing sposobnosti. Znači obično se korisit u index.js ili App.js
  render() {
    console.log('App.js, render metoda')
    return (
      //VAŽNO: Browser-router ima prop imena basename. Vidi cijelu lekiciju 244.-'Routing and Server Deployment'
      <BrowserRouter> 
      <div className="App">
        <Blog />
      </div>
      </BrowserRouter>
    );
   }
}

export default App;
