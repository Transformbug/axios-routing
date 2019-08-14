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
        console.log('Blog.js, render metoda')
      posts= this.state.posts.map(post=>{
          
         return <Post 
         key={post.id} 
         title= {post.title} 
         author={post.author}
         //VAŽNO: sa ovim prebacujemo one prop-ove koje React-router ubacimo automatski ovaj child komponenti Post.To je jedan od načina.
         //Mogli smo birat, naravno, koje ćemo prop-ove prebaciti koje React-router automstki ubacuje, recimo, this.props.match ili this.props.location
        //  {...this.props}
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