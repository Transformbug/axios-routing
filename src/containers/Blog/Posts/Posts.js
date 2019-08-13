import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';

class Posts extends Component {
    
    state={
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidMount() {
        console.log('Posts.js, componentDidMount metoda')
      
        axios.get('/posts')
       .then(response=> {
        const posts=response.data.slice(0,4)
        const updatedPosts=posts.map(post=>{
        //VAŽNO: ovo je onaj slučaj kada ne treba staviti key i value unutar objekta jer su istoga imena.    
            return {
                ...post,
                author: 'Max'
            }
        })   
        this.setState({posts: updatedPosts}); 
        console.log(response)
        //Pažnja: pristupili smo gori propertyu 'data' koji je jedan od proprties unutar toga response objekta
        console.log(posts)
        //Znači  razlika između posts i updatePosts je ovaj author : 'Max'
       
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
        console.log('Blog.js, render metoda')
      posts= this.state.posts.map(post=>{
          
         return <Post 
         key={post.id} 
         title= {post.title} 
         author={post.author}
         clicked={()=>this.postSelectedHandler(post.id)}
          />
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