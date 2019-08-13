import React, { Component } from 'react';
// import axios from 'axios';
//VAŽNO: sada ovdje uvozimo instancu axios objekta.Mogli smo je nazvati drugačije, ali nije htio mijnaje code doli, pa je ostavio axios.
//Efekti se ovoga vide tako da se više interceptor ne pojavljuju kada se pošalju http request ovdje jer oni vrijedi za obični globalni axios objekt, ne našu instancu.
//VAŽNO: on je odkomentirao onaj defaults.baseURL unutar index.js radi drugih filova koji to koriste, nije radilo bez toga tamo. Ovdje se ne korisiti default globalni
//axios obj. i sve što je tamo napisano je irelevetno za ovaj file jer smo ovdje uvezli smo našu instancu axios objekta.
//Ako hoćemo možemo postaviti i interceptorse na našu instancu u axios.js file sa instance.interceptors... 
import axios from '../../axios';
import Post from '../../components/Post/Post';
import FullPost from '../../components/FullPost/FullPost';
import NewPost from '../../components/NewPost/NewPost';
import './Blog.css';

class Blog extends Component {

    state={
        posts: [],
        selectedPostId: null,
        error: false
    }

    componentDidUpdate() {
        console.log('Blog.js, componentDidUpdate metoda')
    }
   
    componentDidMount() {
        console.log('Blog.js, componentDidMount metoda')
      
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
        //  console.log(error)
         this.setState({error: true })
     })
    }

    postSelectedHandler=(id)=>{
     this.setState({selectedPostId: id})
    }
   
    render () {
       
      let posts=<p style={{textAlign: 'center'}}>Something went wrong!</p>
      
        if(!this.state.error) { 
        // VAŽNO: ova post varijaba u prvom creating lifecylce fazi doista bude prazni array i kada se dogodi re-render radi promjene state onda postane array of jsx
        // to se sve tako brzo izvrši da se i ne primjeti i odmah na ekranu budu ti elementi.Također nakon što je pozovat setState na async način ovdje normalno
        // je nastavljen redoslijed mounting faze i App.js koji je parent ove komponete je imao izvršen svoj componeteDidMount prije nego se ovdje pokrenula update
        // lifecyle faza tj. ovaj render se ponovno aktivirao.
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
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                            <li><a href='/'>Home</a></li>
                            <li><a href='/new-post'>New Post</a></li>
                        </ul>
                    </nav>
                </header>
                <section className="Posts">
                  {posts}
                </section>
                 


                {/* <section>
                    <FullPost id={this.state.selectedPostId} />
                </section>
                <section>
                    <NewPost />
                </section> */}
            </div>
        );
    }
}

export default Blog;