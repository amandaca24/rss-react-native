import axios from 'axios';

export default (urlFeed) => {
    //Criando a api para as requisições http
    const api = axios.create({
        baseURL: urlFeed, 
        headers: {
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS',
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin' : '*',
            'X-Requested-With': 'XMLHttpRequest'
             
        }
    });

    return api;
};

 