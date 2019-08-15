import React, { Component } from 'react';
import axios from '../../axios';
import './Blog.css';
import Posts from './Posts/Posts';
import {Route, NavLink, Switch} from 'react-router-dom';
import NewPost from './NewPost/NewPost';
import FullPost from './FullPost/FullPost';

class Blog extends Component {

    componentDidUpdate() {
        console.log('Blog.js, componentDidUpdate metoda')
    }

    componentDidMount(){
        console.log('Blog.js, componendDidMount');
    }
   
    render () {
       
     
        return (
            <div className="Blog">
                <header>
                    <nav>
                        <ul>
                           {/* VAŽNO: sada kada smo stavili NavLink automatski dobijemo na ovoj komponet klasu(ne pseudo klasu) imena 'active'.Dobijemo i aria-current
                         atribut. Ukoliko ne želimo korisiti tu klasu active onda možemo korisiti activeClassName prop i staviti ime klase koje mi želimo.On je ovo
                         stavio kao primjer nigdje nije napisao css sa klasom my-active. activeStyle prop je akvivalent postvljanu inline css-a navodno.  */}
                            <li><NavLink 
                               to='/'
                              exact
                              activeClassName='my-active'
                              activeStyle={{
                                 color: '#fa923f',
                                 textDecoration: 'underline' 
                              }}   >Home</NavLink></li>
                            <li><NavLink to={{
                               pathname: '/new-post',
                                hash: '#submit',
                                search: '?quick-submit=true'
                            }}>New Post</NavLink></li>
                        </ul>
                    </nav>
                </header>
                {/* VAŽNO: kad je riječ o linkovima treba razlikovati absolute, root relative i relative path. Ono šta Max tvrdi da su absolute path u lekciji
                aboslute vs realtive je root-relative(vidi yt video,3:40, dcode). Znači kada neki link ima samo '/' kao prvi skozr lijevi element to znači da je
                uvijek linkati na početnu domain i ako ne želimo da uvijek linka to onda mu sa desna strane dodajemo recimo 'new-post'. Znači kada vidimo
                na skorz prvom lijevom mjestu '/' (btw. bez točki ispred, što mijenja skroz značnje) možemo uvijek zamisliti ime neke adresse time http://www.example.com/
                To znači da ako smo recimo na adresi  http://www.example.com/about-us i neki link na toj stranici ima ovu adresu  /images/image-01.jpg  to znači
                da će nas linkati na http://www.example.com/images/image-01.jpg 
                Uglavnom Max-ov video je na to temu bio jako zbunjujući i nepotreban.
                Relative path je kada imamo recimo 'image-01.jpg' ili './image-01.jpg' ili '../image-01.jpg' to relativan u odnosu na current working directory ne
                nije realtivan u odnosu na root. A absolute je kada se napiše i protokool znači htttp i domain i on se treba korisiti za externe resurese.
                VAŽNO: neki izvori, ovaj root relative kojeg sam gori opisao nazivaju, absolute path, short verion  */  }

               
            {/* VAŽNO: Samo se jedna komponeta koja je unutar Switch-a može load-ati odjednom.
              VAŽNO: Ovaj id btw. nije dio url već je će postatiti poperty name na 'params'(ne prop!) objektu koji se se nalazi onom match objektu koji react-router automaski 
                ubaci kao jedan od prop keysa te komponte koja korisit <Route/>. Možemo to nazvati kako hoćemo. Vrijednost toga 'id' će biti bilo koji string koji će
                biti iza "/" na link elementu koji pokrene taj <Route/> koji ima taj dinamični path sa ':'
                VAŽNO: dok ne obavimo omatanje sa switch ili promjenimo adresu pa dodamo /posts/ ispred id svaki put kada kliknemo na new-link zadovljimo
                ovaj uvjet unutar path="/new-post" i onda se prikaže kompnenta NewPost.js. ALI također se zadovovlji path="/:id" jer to znači root element i bilo
                što iza pa nam se prikaže komponeta FullPost koja u sebi ima lifecylce metodu componentDidMount koja zove get axios metodu sa this.props.match.params.id
                a taj id je string koji je iza '/' kada se neki path aktivira jer je ="/:id" zadovoljen, pa zato se zove ta get metoda sa new-post(umjesto onih /1,/2 brojeve) i 
                dobijemo u konzoli error.
                VAŽNO: kad koristimo Switch onda to znači da će se smo jedan od path moći loadati u isto vrijeme, a ako više path-ova zadovoljava uvjet onda će se samo onaj
                path koji je iznda u rasporedu atktivirati tj. load-ati će svoju komponentu. Zato je bilo bitno staviti new-post iznad :id kada koristmo Switch.
                VAŽNO: kada ne koristmo Swtich raspored nema nikakve veze, samo je redoslijed prikazivanja biti drugačiji. Kad kliknmo New Post oba path će zadvoljniti
                uvjete i oba će se lodati i redosliejd jedino utječe na koji je iznda, koji je ispod.
               
                
                {/* <Switch> */}
                <Route path="/" exact component={Posts}/>
                <Route path="/new-post" exact component={NewPost}/>
                <Route path="/:id" exact component={FullPost}/>
               {/* </Switch> */}
               {/* Alternativa switch, rješenju, ali nekad će nam baš trebati Switch */}
               {/* "/posts/:id" */}
             </div>
        );
    }
}

export default Blog;