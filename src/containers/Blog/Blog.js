import React, { Component } from 'react';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch,Redirect} from 'react-router-dom';
import NewPost from './NewPost/NewPost';


class Blog extends Component {

    state={
        auth: false
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
                    
               
    
               {/*----------------Početak,Working with Guards, lekcija 240.
                VAŽNO: Ako želimo sprijčiti da netko ode na neku Route jer nema autentifikaciju ispravnu, na ovaj način to radimo u Reactu. Obični conditonal render
               Route componente. Kad kliknemo na New Post, onda se ne load-a ta komponenta nego nas ovaj Rediraect(koji ima samo '/'  što očito znači da je dosta da neki
               path počitnje sa root domain da se to ativira) vrati na /posts.
               Moguće je još re-directati na neki path gdje želimo vratiti korisnika ako nema ispravu auth, na način da nemamo ovdje conditional render nego imamo obični 
               Route element i onda na nekoj od njegove lifecyle metoda sa onim metodama(push,replace) na history propu vratimo korisnika. */}
                 {/* <Switch> 
               {this.state.auth?<Route path="/new-post" component={NewPost}/>: null}
               <Route path="/posts" component={Posts}/>
               <Redirect from='/' to='/posts' />
               </Switch> */}
               {/* Kraj, Working with Guards, lekcija 240 */}
             
               {/* Handling 404 case(unknow routes) */}
               {/* VAŽNO: Mogli smo kreirati komponentu za 404 slučaj i korisiti component porp na Route, ali smo ovako napravili sa render prop-om.
               Znači ovaj Route bez path propa je jedan od načina je da riješimo situacija da se zatraži neki path koji ne zadovoljava niti jedan path prop ostalih Route.
               Drugi način je onaj primjer gori sa re-directom, gdje se također zatraži neki path koji ne zadovoljni niti jedan path, ali onda Redirect obavi svoje.
               VAŽNO: treba paziti da kada unutar Switch imamo neki Redirect koji ima value '/' na from propu, onda će samo taj Redirect raditi ili ovaj Rote bez path-a 
               ovisno o tome tko je prije u rasporedu.*/}
               <Switch>  
               {this.state.auth?<Route path="/new-post" component={NewPost}/>: null}
               <Route path="/posts" component={Posts}/>
                <Route render={()=> <h1>Page not found</h1>}/>
               </Switch>


               
            
           
             </div>
        );
    }
}

export default Blog;