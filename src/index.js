import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import registerServiceWorker from './registerServiceWorker';
import axios from 'axios';

//Ove tri defaults linije su iz lekcije, 'Setting a Default Global Congiguration for Axios'.
//kada napišemo ovo, onda je ovo ubačeno automatski za svaki naš http request
axios.defaults.baseURL='https://jsonplaceholder.typicode.com'
//Ovo je common header, mislim da je izmislio ovu value samo radi primjera i nema nikakve konkretne koristio od ovoga trenutno
axios.defaults.headers.common['Authorization']='AUTH TOKEN'
//Ovo je default, ovo nije bilo potrebno, samo je htio pokaznti ovo, btw. ovo je header kada šaljemo post request
axios.defaults.headers.post['Content-type']='application/json'

//VAŽNO: ne razumin ove inerceptore.
//VAŽNO: cijeli ovaj code je u index.js jer taj file se prvi navodno aktivira
//VAŽNO: vidi i 199 lekciju, tj. samo text file, 'Removing interceptors'.Čemu to služi, kada se korisit ?
//Navodno služe da napravi nešto kada neki http request bude poslan iz bilo koje komponente ili prije nego što odbijemo response u bilo koju komponentu.
//Konkretnije, navodno služi da dodamo zajedničke header(koji niz različith zahtjeva u različitm kompontama zatraže), poput authorization header
//Treba provjeriti jel ovo točno:
//Za svaki request znači kad zatražimo nešto od nekog servera  sa 'DELETE', 'PUT', 'GET' itd. će se ova ova metoda use() i callback fn. izvršit. 
//Ovaj current tj. request parmater callback fn. unutar use()
// će biti tzv. config objekt koji je ubacuje u axios(axios.get(), axios.delete() itd. su samo shorthandi i automatsko ubacivanje toga objekta).
//Kada se izvršava ta callback fn. unutar .use() ? Prije nego sa recimo axios.get() zatražimo nešto ?
//Čemu nam ovo služi?
axios.interceptors.request.use(request=>{
    console.log(request);
    //Edit something then return(moramo returnat ako hoćemo da se .then blockovi izvrše normalno,vidi lekcija 198)
    return request
}, 
(error)=>{
console.log(error);
return Promise.reject(error);
})

//Kao i gori kod requesta mislim da se i ovaj responose izvrši svaki put prije nego što dobijemo response.
//Zašto kreiramo Promise obj. koji ima PromiseStatus rejected doli sa Promise.reject(). Navodno jer bez toga se ne aktivra onaj .catch() i Blog.js u componentDidMount.
//Kako i zašto? ne razumin. 
axios.interceptors.response.use(response=>{
    console.log(response);
    //Edit something then return
    return response
}, 
(error)=>{
console.log(error);
return Promise.reject(error);
});

ReactDOM.render( <App />, document.getElementById( 'root' ) );
registerServiceWorker();
