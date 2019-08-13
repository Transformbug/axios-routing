import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state={
      loadedPost: null  
    }

    componentDidUpdate() {
        console.log('FullPost.js, componentDidUpdate metoda');
        if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !==this.props.id)) {
            if(this.props.id){
                axios.get('/posts/'+  this.props.id)
                .then(response=> {
                   this.setState({loadedPost: response.data})
                })
              }
        }
     

       }
      
      componentDidMount() {
       console.log('FullPost.js, componentDidMount metoda');
      }

      deletePostHandler=()=>{
       axios.delete('/posts/'+  this.props.id)
       .then(response=>{
           console.log(response);
       })
      }

    render () {
        
        console.log('FullPost.js, render metoda')
        let post = <p style={{textAlign: 'center'}}>Please select a Post!</p>;
        if(this.props.id) {post = <p style={{textAlign: 'center'}}>Loading...</p>; }
        if(this.state.loadedPost) {

            post = (
                <div className="FullPost">
                    <h1>{this.state.loadedPost.title}</h1>
                    <p>{this.state.loadedPost.body}</p>
                    <div className="Edit">
                        <button onClick={this.deletePostHandler} className="Delete">Delete</button>
                    </div>
                </div>
    
            );

        }
     
        return post;
    }
}

export default FullPost;