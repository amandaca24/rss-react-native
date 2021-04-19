import createDataContext from './createDataContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const KEY = 'saved_feeds';

const saveFeeds = async (value) => {
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
            
            saveFeeds(newState);
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

const addFeed = dispatch => {
    return (titulo, urlFeed, callback) => {
        dispatch({ type: 'add_feed', payload: { titulo, urlFeed } });
        if (callback) {
            callback();
        }
        console.log('Salvou o feed');
    };
};

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

const rssFeeds = [
    {
        titulo: 'G1 - Todas as notícias',
        urlFeed: 'http://g1.globo.com/dynamo/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'G1 - Brasil',
        urlFeed: 'http://g1.globo.com/dynamo/brasil/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'G1 - Tecnologia e Games',
        urlFeed: 'http://g1.globo.com/dynamo/tecnologia/rss2.xml',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    },
    {
        titulo: 'Jovem Nerd - Site Completo',
        urlFeed: 'http://jovemnerd.com.br/rss',
        descricao: '',
        urlSite: '',
        urlImagem: ''
    }
    
];

export const { Context, Provider } = createDataContext(
    feedListReducer,
    { addFeed, deleteFeed, restoreState, deleteAll },
    rssFeeds
);
