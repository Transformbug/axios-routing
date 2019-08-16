import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';
import {Redirect} from 'react-router-dom';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max',
        submitted: false
    }

    componentDidMount(){
     
        console.log('NewPost.js-this.props.location.search=', this.props.location.search);
        console.log('NewPost.js-this.props.location.hash=', this.props.location.hash);
        
    }

    componentDidUpdate(){
        console.log('NewPost.js', 'ComponentDidUpadate metoda');
    }

    postDataHandler=()=>{
     const data={
      title: this.state.title,
      body: this.state.content,
      author: this.state.author 
     }
  
     axios.post('/posts', data)
     .then(response=>{
         console.log(response);
         //Onda je ovdje imao ondaj re-direct(navingating Programatically lekcija,233) sa kojim smo se već ranije susreli sa history.push() i pokazo je ovu metodu replace.
         //VAŽNO: ova replace metoda također nas odvee na ovaj root doamina/posts, ali kad kliknemo na brower botun 'back' uvijek nas ostavi na toj stranici
         //gdje smo re-redirectani dok nas .push vrati na New Post. Nešto  je jako krato govorio o brower stacking webpages i tim botunima 'forward' i 'back' u ranijm lekcijama.
         //Imam bookmark, ali nije bilo previše detaljno.
        //  this.props.history.push('/posts')
        // this.props.history.replace('/posts')
        
        //Prvo je sa ovim doli pokazo primjer conditional re-directa. Znači kad kliknemo na post botun onda će se dogoditi re-direct.
        //  this.setState({submitted: true})
     })
    }

    render () {
        let redirect=null;
        if(this.state.submitted){
          redirect= <Redirect to='/posts'/>
        }
        return (
            <div className="NewPost">
                {redirect}
                <h1>Add a Post</h1>
                <label>Title</label>
                <input type="text" value={this.state.title} onChange={(event) => this.setState({title: event.target.value})} />
                <label>Content</label>
                <textarea rows="4" value={this.state.content} onChange={(event) => this.setState({content: event.target.value})} />
                <label>Author</label>
                <select value={this.state.author} onChange={(event) => this.setState({author: event.target.value})}>
                    <option value="Max">Max</option>
                    <option value="Manu">Manu</option>
                </select>
                <button onClick={this.postDataHandler}>Add Post</button>
            </div>
        );
    }
}

export default NewPost;