import axios from 'axios';

export default (urlFeed) => {
    //TODO check if we need headers later
    const api = axios.create({
        baseURL: urlFeed,
        headers: {
            'Access-Control-Allow-Methods':'GET,PUT,POST,DELETE,PATCH,OPTIONS', 
            'Access-Control-Allow-Headers': 'Origin, Content-Type, X-Auth-Token',
            'Content-Type': 'application/json', 
            'Access-Control-Allow-Origin' : '*',  
        }
    });

    return api;
};