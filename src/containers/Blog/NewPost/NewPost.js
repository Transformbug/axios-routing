import React, { Component } from 'react';
import axios from 'axios';
import './NewPost.css';

class NewPost extends Component {
    state = {
        title: '',
        content: '',
        author: 'Max'
    }

    componentDidMount(){
       // VAŽNO: lekcija 231, parsing query parametars and the Fragemnt. btw. za razliku od toga pisanog primjera, ja koristim NavLink umjesto Link i 
       // query parametars(ono iza ?) nije na 'to' parametrau Link komponete nego je na search propu Navlinka. Očito ove metode rade u oba slučaja.
       //Čak i kad je pathname NavLinka ima te query paramtere izravno ne sebi radi ovo 'pristupanjje' doli, samo tada NewPost se ne load-a ispravno
       // jer pathname nije točan. Ali iz nekog razloga kad refresham na toj stranici se pojavai ovaj NewPost u tom slučaju, ali link ne radi.
        console.log('NewPost.js-this.props.location.search=', this.props.location.search);
        console.log('NewPost.js-this.props.location.hash=', this.props.location.hash);
        
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
     })
    }

    render () {
        return (
            <div className="NewPost">
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