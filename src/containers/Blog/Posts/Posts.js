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
        //VAŽNO:
        //Ova push metoda na history prop imenu koju react router ubaci nam omgućuje da odemo na neku url adresu bez da se klikne na neki link.
        //Doli smo u render metodi makli <Link> koji je omota cijeli post i sa ovim smo omoguči da sve radi i bez toga Link elementa. 
       this.props.history.push({pathname: '/'+ id})
       console.log(this.props.history);
       //Alternativa: ne moramo ubacit objekt.
    //    this.props.history.push('/'+ id)
       }


    render() {
        let posts=<p style={{textAlign: 'center'}}>Something went wrong!</p>
      
        if(!this.state.error) { 
        console.log('Posts.js, render metoda')
      posts= this.state.posts.map(post=>{
     
         return (
           <Post 
        
         title= {post.title} 
         author={post.author}
         key={post.id}
         clicked={()=>this.postSelectedHandler(post.id)}
          />
       
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