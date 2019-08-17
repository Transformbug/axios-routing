import React, { Component } from 'react';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch,Redirect} from 'react-router-dom';
// import NewPost from './NewPost/NewPost';
import asyncComponent from '../../hoc/asyncComponent';
      {/* VAŽNO: Ova tehnika se zove lazy loading ili code splitting. */}

const AsyncNewPost=asyncComponent(()=>{
    return import('./NewPost/NewPost')
})

console.log(AsyncNewPost);

class Blog extends Component {

    state={
        auth: true
    }

   componentDidUpdate() {
        console.log('Blog.js, componentDidUpdate metoda')
    }

    componentDidMount(){
        console.log('Blog.js, componendDidMount metoda');
   
    }
   
    render () {
       console.log('Blog.js, render metoda');
     
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                          <li><NavLink 
                               to='/posts/'
                              exact
                              activeClassName='my-active'
                              activeStyle={{
                                 color: '#fa923f',
                                 textDecoration: 'underline' 
                                 
                              }}  >Posts</NavLink></li>
                            <li><NavLink to={{
                               pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
          
                    
               {/* //VAŽNO:ovo sam izvukao vanka da potvrdim da ovo radi i izvan Route, Max je u idućoj lekciji je zbunjeno krivo rekao da je prednost React.lazy() što radi i za ostale
               //conditonal rendere, ali jasno je da ovo radi i bez Route i možemo na ovaj način lazy loadat nešto.
                {this.state.auth? <AsyncNewPost/>: null} */}
              
              <Switch>  
               {this.state.auth?<Route path="/new-post" component={AsyncNewPost}/>: null}
               
               {/* VAŽNO: Treba imati na umu da je ovaj Route tj. prop path praktički conditonal render. Tek ako se zadovolji taj path onda će se aktivirati tj. pokazati
               // komponenta na propu component. Pa stoga i kada imao code kao doli, kad pogledamo na network tab vidimo da tek kada odemo na New Post load-a AsyncNewPost
               //  i to na lazy mode način jer se pojavi onaj 'chunk'. Znači tek kada se aktivra componetDidMount komponete Mate će se dogodit update lifecyle čiji će return
               //biti ta 'teška i velika' komponenta  New Post koju smo htjeli lazy loadati tj. load-ti tek kad se koristi. 
               <Route path="/new-post" component={AsyncNewPost}/> */}
              
               <Route path="/posts" component={Posts}/>
                <Route render={()=> <h1>Page not found</h1>}/>
               </Switch>


               
            
           
             </div>
        );
    }
}

export default Blog;