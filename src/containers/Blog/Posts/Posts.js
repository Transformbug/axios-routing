import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Link} from 'react-router-dom';

class Posts extends Component {
    
    state={
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        console.log('Posts.js, componentDidMount metoda')

        console.log('Posts.js- this.props',this.props);
      
        axios.get('/posts')
       .then(response=> {
        const posts=response.data.slice(0,4)
        const updatedPosts=posts.map(post=>{
    
            return {
                ...post,
                author: 'Max'
            }
        })   
        this.setState({posts: updatedPosts}); 
        console.log(response)
 
        console.log(posts)
      
       
       } 
     )
     .catch(error=>{
         console.log(error)
        })
    }

    postSelectedHandler=(id)=>{
        this.setState({selectedPostId: id})
       }


    render() {
        let posts=<p style={{textAlign: 'center'}}>Something went wrong!</p>
      
        if(!this.state.error) { 
        console.log('Posts.js, render metoda')
      posts= this.state.posts.map(post=>{
        /* Alternativa switch rješenju, ali nekad će nam baš trebati Switch */
        // '/posts/'+ post.id
         return (
         <Link to={'/'+ post.id} key={post.id}> <Post 
        
         title= {post.title} 
         author={post.author}
     
         clicked={()=>this.postSelectedHandler(post.id)}
          />
          </Link>
          )
     })
    }


        return (
            <section className="Posts">
            {posts}
          </section>
        );
    }
}

export default Posts;