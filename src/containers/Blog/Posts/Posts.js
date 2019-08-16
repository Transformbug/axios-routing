import React, { Component } from 'react';
import axios from '../../../axios';
import Post from '../../../components/Post/Post';
import './Posts.css';
import {Route} from 'react-router-dom';
import FullPost from '../FullPost/FullPost';


class Posts extends Component {
    
    state={
        posts: [],
        selectedPostId: null,
        error: false,
        mojUvjet: false
    }



    componentDidUpdate(){
        console.log('Posts.js,ComponentDidUpadte metoda');
       
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
        console.log('Post.js', 'postSlectedHandler custom metoda koja izazvia promjenu statusa <Route/> koji odlučuje hoće li se lodati FP');
       this.props.history.push({pathname: '/posts/'+ id})
    //    console.log(this.props.history);
  
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
    
    let mojDiv=<div style={{border: 'solid red 1px'}} onClick={()=> this.setState({mojUvjet: true})}>Moje div, koji treba nestati kad klikne na njega</div>;
    if(this.state.mojUvjet){
        console.log('MOJ UVJET JE TRUE');
      mojDiv=null;
    }

        return (
            <div> 
               <section className="Posts">
               {posts}
               {mojDiv}
         
          </section>
          <Route path={this.props.match.url + '/:id'} exact component={FullPost}/>
          </div>
        );
    }
}

export default Posts;