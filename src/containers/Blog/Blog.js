import React, { Component } from 'react';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch,Redirect} from 'react-router-dom';
import NewPost from './NewPost/NewPost';


class Blog extends Component {

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
                    
               
    
               
                 <Switch> 
               <Route path="/new-post" component={NewPost}/>
               <Route path="/posts" component={Posts}/>
               {/* VAŽNO: za razliko od ovoga doli, kada koristmo Redirect onda doista bude re-direct na /posts,dok ovo doli samo load-a isti content na različtoj adresi. */}
               {/* <Redirect from='/' to='/posts' /> */}
              
               {/* VAŽNO: različite Route, tj. sa različitm pathom mogu lodati istu komponentu. Sada kada smo na početnoj localhost:3000 vidimo Posts  */}
               {/* <Route path="/" component={Posts}/> */}
                 </Switch>
               
               {/* VAŽNO: ako se redirect ne korisit unutar Switch, onda se treba ovakav syntax, bez 'from' propa.Zanimljvo mi je da ovo radi po očekivanjima
               tj. kad smo na localhost 3000 rediracta na posts, ali kada kliknemo na ostale linkove sve radi. Nije mi jasno kako ovaj <Redirect/> zna kada će
               redirecta bez 'from' propa.Zato je ovaj njegov parent Blog.js ostane aktivan i kad kliknemo New Post, recimo.Možda je stvar da se ovo aktivira
               samo kad je izvrši creation lifecylce tj. mounting faza ovog elementa. To mi se čini kao najvjerojatnije objašnjenje.  */}
               <Redirect to='/posts' />
           
             </div>
        );
    }
}

export default Blog;