import React, { Component } from 'react';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch} from 'react-router-dom';
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
                    
                 {/* VAŽNO: kad je riječ o nested routers, treba pazit jer ako recimo ova komponta Posts nije prikazana jer je path kriv, neće se ni njegov
                child FullPost moći vidjeti    */}
               
               
                 <Switch> 
               <Route path="/new-post" component={NewPost}/>
               <Route path="/posts" component={Posts}/>
                 </Switch>
              
           
             </div>
        );
    }
}

export default Blog;