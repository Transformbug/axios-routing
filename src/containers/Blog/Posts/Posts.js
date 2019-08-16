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

     //EKSTREMNO VAŽNO: jedina način uz aktivaciju setState-za re-render neka komponte je promjena statusa path propa unutar <Route/> komponente.
     // Kada neki path postane prvi put aktivan, pokrenuti će se componet lifecyle cretion faza tj. mounting faza te komponete koja je na propu component unutar <Route/>.
     //Također je bitno spomenuti da će se pokrenuti i lifecylce update faza njegove parent komponente(ovo prije naravno). To je u suprotnosi sa normalnim re-renerom sa setState
     //gdje promjne state objekta unutar child komponente neće izazvati re-render parent komponente.
     // Ukoliko imamo situacija sa nested routes tj. ako parent toga <Route path> koji je postao aktivan također unutar <Route path/> u file-u gdje je importan, tada će
     // se dogoditi da će se i taj nazovima ga grandfather aktivirati, tj. aktivirati će se njegova update lifecyle faza prije svega. Drugi ancesori koji ne returnaju u jsx
     // niti jedan <Route/> neće se aktivirati kad se dogodit da lifecyle hooks aktivacija radi promjene path prop value na Route.
     //Ako idući klik tj. event uzrokuje da taj path koji je postao aktivan više više ne bude aktivan jer path nije točan, onda će se dogoditi lifecyle un-mounting faza te
     // komponte, dok će parent, granfather itd. opet imati lifecyle update fazu.
     //VAŽNO: može se dogoditi da taj aktivan <Route path> čija je componenta mount-ana promjeni vrijednost path, ali da taj path bude još uvijek točan, pa se dogoditi
     //upadate lifecyle faza te komponte, dok će parent, grandfater opet imati standardu update lifecylce fazu.
     //VAŽNO: Sve što smo naučili o obično lifecycle updatu vrijedi, vrijedi također i za ove elemente koje imaju Route u sebi ili o <Route/> ovisi hoće li biti prikazani.
     // Konkretno to znači, da ukoliko sa setState promjenimo state nekog child-a neće se uopće aktivirati parent. Samo sada znamo da i nešto drugo osim setState može 
     //aktivrati re-render i da su pravila malo drugačija za taj drugi način.   
     
     //UPDATE: Često će se događati da će  promjena vrijednosti path propa na Route uzorkovati taj. lifecyle hooks aktivaciju i onda te lifecyle metode imaju u sebi
     //setState fn.call-ove i onda kada se završe taj proces koji je pokrenut sa <Rotue path=drugačiji> će se normalno dogoditi lifecycle faza koju uzroku setState
     // i odvijati će se po normalnim pravilima. 

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