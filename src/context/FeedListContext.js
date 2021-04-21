import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saved_feed';
//Método da biblioteca AsyncStore. Ela só salva String, portanto para salvar 
//objetos é preciso serializá-los para JSON.
const saveFeeds = async (value) => {
    try {
        const jsonValue = JSON.stringify(value);
        await AsyncStorage.setItem(KEY, jsonValue);
        console.log('Feed salvo!');
    } catch (e) {
        console.log('erro: ' + e);
    }
}

//Limpar os dados armazenados com a função própria clear
const clearStorage = async () => {
    try {
        await AsyncStorage.clear();
        alert('Todos os feeds foram apagados');
    }
    catch (e) {
        console.log(e);
        alert('Algum problema ao limpar armazenamento');
        console.log('erro: ' + e);
    }
}

//Pegar um objeto armazenado
const getMyFeed = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem('@key')
      return jsonValue != null ? JSON.parse(jsonValue) : null
    } catch(e) {
      alert("Algum problema ao buscar um feed");
    }
  
    console.log('Done.')
  
  }

  //Vai buscar todas as chaves armazenadas no AsyncStorage
  const getAllKeys = async () => {
    let keys = []
    try {
      keys = await AsyncStorage.getAllKeys()
    } catch(e) {
      alert('Houve algum erro ao recuperar os feeds');
      console.log('Erro: ' + e);
    }
    console.log(keys)
  }

  const deleteItem = async () => {
    try {
        await AsyncStorage.removeItem('@key')
      } catch(e) {
        alert('Houve algum problema ao apagar o feed');
        console.log('Erro: ' + e);
      }
    
      console.log('Done.')
  }

const feedListReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'add_feed':
            newState = [
                ...state,
                {
                    urlFeed: action.payload.urlFeed,
                    titulo: action.payload.titulo
                }
            ];
            saveFeeds(newState)
            return newState;
        case 'delete_feed':
            newState = state.filter(
                (feed) => feed.urlFeed !== action.payload);
            
            deleteItem(newState);
            return newState;
        case 'restore_state':
            newState = action.payload;
            return newState;
        case 'delete_all':
            clearStorage();
            return [];
        case 'get_feed':
            newState = state.filter(
                (feed) => feed.urlFeed !== action.payload);
            getMyFeed(newState);
            return newState;
        case 'get_all':
            return getAllKeys();
        default:
            return state;
    }
};

const addFeed = dispatch => {
    return (titulo, urlFeed, callback) => {
        dispatch({ type: 'add_feed', payload: { titulo, urlFeed } });
        if (callback) {
            callback();
        }
        console.log('Salvou o feed');
    };
};

const getFeed = dispatch =>{
    return(id, callback) => {
        dispatch({type: 'get_feed', payload: id });
        if(callback){
            callback();
        }
        console.log('Feed i: ' + id);
    }
}

const getAllFeed = dispatch => {
    return () => {
        dispatch({ type: 'get_all' });
    }

}

const deleteFeed = dispatch => {
    return (id) => {
        dispatch({ type: 'delete_feed', payload: id });
        console.log('deletou o feed');
    };
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

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll, getAllFeed, getFeed }
);
