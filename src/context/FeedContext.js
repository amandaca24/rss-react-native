import createDataContext from './createDataContext';
import { parse } from 'fast-xml-parser';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'items';

const saveItems = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(KEY, jsonValue);
        console.log('funcionou');
    } catch (e) {
        console.log('erro: ' + e);
    }
}

const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        alert('Funcionou!');
    }
    catch (e) {
        console.log(e);
        alert('Algum problema ao limpar armazenamento');
    }
}

const getItem = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(KEY).then(console.log);
      console.log('ITEMS = ' + jsonValue)
      return jsonValue != null ? JSON.parse(jsonValue) : null
      
    } catch(e) {
      alert("Algum problema ao buscar um feed");
    }
  
    console.log('Done.')
  
  }

  const deleteItemStorage = async () => {
    try {
        await AsyncStorage.removeItem('@key')
      } catch(e) {
        alert('Houve algum problema ao apagar o item');
        console.log('Erro: ' + e);
      }
    
      console.log('Done.')
  }

//Os dados do conteúdo do feed são recuperados pela biblioteca de leitura de XML, o fast-xml-parser.
//O estado é espalhado e cada atributo recebe o seu valor, sendo salvo sob a chave 'items'.  
const feedReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'fetch_items':
            action.payload.feedItems.rss.channel.item.forEach(element => {
                item = {
                    titulo: element.title,
                    link: element.link,
                    descricao: element.description,
                    imagem: element.image,
                    dataPublicacao: element.pubDate
                }
                newState.push(item);
                rssItems.push(item);
                
            });
            saveItems(newState);
            console.log("NOVO ESTADO = " + newState);
            return newState;
        case 'get_item':
            newState = state.filter(
                (feed) => feed.urlFeed === action.payload);
                getItem(newState);
            return newState;
        case 'add_item':
            newState = [
                ...state,
                {
                    titulo: action.payload.titulo,
                    dataPublicacao: action.payload.dataPublicacao,
                    link: action.payload.link,
                    descricao: action.payload.descricao,
                    imagem: action.payload.imagem,
                    urlFeed: action.payload.urlFeed
                }
            ];
            saveItems(newState);
            return newState;
        case 'delete_item':
            newState = state.filter(
                (item) => item.link !== action.payload);
            
            deleteItemStorage(newState);
            return newState;
        case 'restore_state':
            newState = action.payload;
            return newState;
        case 'delete_all':
            clearStorage();
            return [];
        default:
            return state;
    } 
};

const addItem = dispatch => {
    return (titulo, dataPublicacao, link, descricao, imagem, callback) => {
        dispatch({ type: 'add_item', payload: { titulo, dataPublicacao, link, descricao, imagem } });
        if (callback) {
            callback();
        }
    };
};

const getFeedItem = dispatch =>{
    return(id, callback) => {
        dispatch({type: 'get_item', payload: id });
        if(callback){
            callback();
        }
        console.log('Feed i: ' + id);
    }
}

const deleteItem = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_feed', payload: id });
        console.log('deletou o item');
    };
};

const fetchItems = dispatch => async (fetch) => {
    const response = await fetch.get();
    const feedItems = parse(response.data);
    
    dispatch({type: 'fetch_items', payload: {feedItems}});
    
};

const restoreState = dispatch => async () => {
    try {
        const savedState = await AsyncStorage.getItem(KEY);
        if (!savedState) {
            console.log('não tem nada salvo');
        }
        else {
            //console.log(savedState);
            dispatch({ type: 'restore_state', payload: JSON.parse(savedState) })
        }
    } catch (e) {
        console.log('erro: ' + e);
    }
}

const deleteAll = dispatch => {
    return () => {
        dispatch({ type: 'delete_all' })
        console.log('Apagou tudo!');
    }
}

const rssItems = [];


export const { Context, Provider } = createDataContext(
    feedReducer,
    { deleteItem, fetchItems, restoreState, deleteAll, getFeedItem, addItem },
    rssItems
);
