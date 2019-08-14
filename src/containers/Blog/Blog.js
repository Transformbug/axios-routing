import React, { Component } from 'react';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route} from 'react-router-dom';
import NewPost from './NewPost/NewPost';

class Blog extends Component {

    componentDidUpdate() {
        console.log('Blog.js, componentDidUpdate metoda')
    }
   
    render () {
       
     
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>New Post</a></li>
                        </ul>
                    </nav>
                </header>
                {/*--------------------------------- Setting up rendering paths lekcija-početak-------------------------------------- */}
                {/* Značenje path atribute tj. propa ovisi o tome jesmo li dodali prop exact(boolean true mu je value)
                Ako nema propa exact onda path znači ukoliko neki path počinje sa onim što je value path neka se izvrši ono što je postavljeno
                na render prop.Kada stavimo exact onda znači neka se izvrši render samo ako je točan cijeli path 
                VAŽNO: možemo primjtit da ovaj prvi home se printa dok smo na localhost 3000. Očito ta adresa nije samo '/'. Gori možemo vidjeti href unutar achora
                koji ima kao value samo "/". Očito se ne računa ništa prije ove zadnje crte http://localhost:3000/ tek je pitanje ima li što izda te crte poput
                 http://localhost:3000/new-post Pošto kada kliknemo na new post se pojavi desno nešto iza te '/' onda to više na zadovljava uvjet ovog prvog
                 patha koji ima exact. 
                 Sa weba: You will see here that we write the relative path by beginning that path with a forward slash (/). 
                 That character tells the browser to go to the root of the current directory.  
                 VAŽNO: znači možemo zaključit da exact ne gleda samo točan absolute path, nego može proći i točan relative path, ali mora biti skorz točan relative p.*/}
                {/* <Route path="/" exact render={()=> <h1>Home</h1>}/>
                <Route path="/" render={()=> <h1>Home 2</h1>}/> */}
                {/*------------------------------ Kraj setting up rendering paths lekcija -------------------------...............*/}

                {/* Kada želimo korisiti komponentu onda treba korisiti ovaj 'component' prop. */}
                <Route path="/" exact component={Posts}/>
                <Route path="/new-post" exact component={NewPost}/>
             </div>
        );
    }
}

export default Blog;