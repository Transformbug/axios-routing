import React, { Component } from 'react';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch} from 'react-router-dom';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {

    componentDidUpdate() {
        console.log('Blog.js, componentDidUpdate metoda')
    }

    componentDidMount(){
        console.log('Blog.js, componendDidMount');
    }
   
    render () {
       
     
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                          <li><NavLink 
                               to='/'
                              exact
                              activeClassName='my-active'
                              activeStyle={{
                                 color: '#fa923f',
                                 textDecoration: 'underline' 
                                 //OVDJE JE STAVIO POSTS TEXT ZA OVAJ LINK, PRIJE JE BILO HOME,LEKCIJA 234.
                              }}   >Posts</NavLink></li>
                            <li><NavLink to={{
                               pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
    

               <Route path="/" exact component={Posts}/>
                 <Switch> 
                <Route path="/new-post" exact component={NewPost}/>
                <Route path="/:id" exact component={FullPost}/>
               </Switch>
              
           
             </div>
        );
    }
}

export default Blog;