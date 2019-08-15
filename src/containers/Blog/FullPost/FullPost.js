import React, { Component } from 'react';
import axios from 'axios';

import './FullPost.css';

class FullPost extends Component {

    state={
      loadedPost: null  
    }

    componentDidUpdate() {
        console.log('FullPost.js, componentDidUpdate');
    }

    componentWillUnmount() {
        console.log('FullPost.js, componentWillUnmout');
    }

    //VAŽNO: on je ovdje doli stavio ovu metodu componendDidMount, a prije je bilo componendDidUpdated. Kada smo na home stranici onda ova komponented uoće se nije
    //unutar UI niti se rendala i zato kad kliknemo na neki od postova se prvo mora obaviti mouting faza. U ovoj doli componend didMoumunt zovemo setState() koji
    // će dosita uzrokvatti i da se componendDidUpadte akitivra, ali to se ne bi aktivirlao da se prvo ovaj code unutar componentDidMount nije aktvirao.
    //VAŽNO: kad je riječ o routeru i lifecylce metodama, kako znamo jel se neka komponenta u update fazi ili je mouting fazi ili unmouting možemo vidjetit kad odemo
    // u elements dio u chrome dev toolus. Ako se cijeli html neke komponente briše ili dodaje kada kliknemo na neki link onda je riječ o unmouting ili mouting fazi
    //dok ako se dio html neke komponente mijenja onda je riječ o update lifecylce fazi.
    

    componentDidMount() {
        console.log('FullPost.js, componentDidMount metoda');
        console.log('FullPost.js this.props.match,', this.props.match);
        if(!this.state.loadedPost || (this.state.loadedPost && this.state.loadedPost.id !==this.props.id)) {
            if(this.props.match.params.id){
                axios.get('/posts/'+  this.props.match.params.id)
                .then(response=> {
                   this.setState({loadedPost: response.data})
                })
              }
        }
     

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