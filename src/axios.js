import axios from 'axios';

const instance=axios.create({
    baseURL:'https://jsonplaceholder.typicode.com' 
});

// Znači axious.create() omogućava kreiranje intance axious objekta i onda će u onom filovima koji importaju tu instancu sve što napisšemo ovdje će overwritati ono
// što je postvljeno za globalni axious obj. Ako ne overwritamo globalne postavke onda će to vrijedniti i za instance axious objekta.

instance.defaults.headers.common['Authorization']='AUTH TOKEN FROM INSTANCE';

//Ovo uvozimo unutar Blog.js
export default instance;