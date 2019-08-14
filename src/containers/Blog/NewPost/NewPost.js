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
        //VAŽNO: ovaj this. props predstvlja normalno props objekt, ali react router ubaci porp-ove imena: history,location,match,staticContex automatski.
        //VAŽNO: to se ne naslijeđuje i samo ona komponeta koju ubaicmo unutar <Route/> tj. postavimo je na prop componente unutar toga Route će imati pristup
        // tim podacima
        //Treba otkriti jel moguće postaviti svoje custom, tj. normalne prop-ove za tu komponetu koja je unutar <Route/> 
        console.log('NewPost.js-this.props', this.props);
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