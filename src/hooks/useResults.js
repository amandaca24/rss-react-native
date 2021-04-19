import { useEffect, useState } from 'react';
import rssfeed from '../api/rssfeed';

export default () => {
    const [resultados, setResultados] = useState([]);
    const [msgErro, setErro] = useState(null);
    
    const searchApi = async () => {
        try {
            const response = await rssfeed.get();
            console.log('terminou busca');
            setResultados(response.data.feeds)
            setErro(null);
        }
        catch (err) { 
            setErro('Houve algum erro')
            console.log(err);
        }
    }
    
    useEffect(() => {
        searchApi('')
    }, []);

    return [searchApi, resultados, msgErro];
}
