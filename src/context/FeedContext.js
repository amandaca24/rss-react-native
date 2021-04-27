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
            newState = [
                ...state,
                {
                    titulo: action.payload.channel.title,
                    dataPublicacao: action.payload.channel.pubDate,
                    link: action.payload.channel.link,
                    descricao: action.payload.channel.description,
                    imagem: action.payload.channel.image, 
                }
            ];
            saveItems(newState);
            return newState;
        case 'get_item':
            newState = state.filter(
                (feed) => feed.urlFeed === action.payload);
                getItem(newState);
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
    return () => {
        dispatch({type: 'fetch_items', payload: feedItems});
    }
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

const rssItems = [
    {
        titulo: 'Congresso e Planalto não chegam a acordo durante reunião para discutir Orçamento de 2021',
        link: 'https://g1.globo.com/politica/blog/valdo-cruz/post/2021/04/07/congresso-e-planalto-nao-chegam-a-acordo-durante-reuniao-para-discutir-orcamento-de-2021.ghtml',
        descricao: 'Depois de uma reunião da cúpula do Congresso com o Palácio do Planalto na noite desta terça-feira (6), o impasse sobre a sanção do Orçamento de 2021 foi mantido e os dois lados não chegaram a um acordo sobre vetos às emendas parlamentares de responsabilidade do relator da proposta. Em jantar na residência oficial do presidente do Senado, Rodrigo Pacheco, com o presidente da Câmara dos Deputados, Arthur Lira, e o ministro da Casa Civil, Luiz Eduardo Ramos, a cúpula do Legislativo deixou claro que não aceita o rompimento do acordo feito com o governo para incluir no Orçamento de 2021 um valor extra de emendas parlamentares de R$ 16,5 bilhões e quer a sanção deste trecho da proposta aprovada no mês passado. Presidente da Câmara, Arthur Lira disse que a posição do Legislativo é que o governo sancione integralmente o chamado RP9, que inclui as emendas negociadas pelo relator do Orçamento, senador Márcio Bittar, que totalizam cerca de R$ 26 bilhões. Depois, o Palácio do Planalto enviaria um projeto de lei do Congresso Nacional (PLN) para recompor despesas obrigatórias do Orçamento no valor de R$ 20 bilhões. O presidente Jair Bolsonaro quer o inverso. Vetar integralmente as emendas de relator, diante da avaliação de que elas foram apresentadas com base em corte de despesas obrigatórias, para evitar o risco de um crime de responsabilidade fiscal que abriria brecha para um pedido de impeachment. Depois do veto, o governo enviaria um PLN para recompor as despesas do orçamento e verbas de emendas parlamentares. Em tom de brincadeira, mas que foi visto com um recado, Arthur Lira disse durante o jantar que, se o governo romper o acordo feito com o Congresso durante a votação da PEC Emergencial, o Palácio do Planalto não vai conseguir aprovar no Legislativo nem um pedido para festa junina. Rodrigo Pacheco fez questão de repetir o que já vem dizendo, que o governo agora não pode jogar a responsabilidade pelas mudanças no Orçamento nas costas do Congresso, porque acompanhou todas as negociações e deu aval para elas, inclusive o corte em despesas obrigatórias e na inclusão de emendas extras para os parlamentares. Pacheco disse que o relator Márcio Bittar está sendo tratado como um inimigo e ele elaborou seu relatório em negociações com a equipe econômica. Bittar fez o corte em despesas obrigatórias do Orçamento depois de receber o sinal verde da equipe de Paulo Guedes. Admite apenas que, durante a votação, o valor das emendas extras ficou R$ 10 bilhões acima do acordado e já sinalizou que pode cortar esse montante assim que o Orçamento for sancionado. Antes de viajar para o Sul, o presidente Jair Bolsonaro foi avisado da manutenção do impasse. A equipe presidencial aguarda seu retorno a Brasília para tomar uma decisão final sobre o Orçamento da União. O governo tem até o dia 22 de abril para sancionar a proposta, com ou sem vetos.',
        imagem: '',
        dataPublicacao: 'Wed, 07 Apr 2021 12:20:19 -0000',
    },
];

export const { Context, Provider } = createDataContext(
    feedReducer,
    { deleteItem, fetchItems, restoreState, deleteAll, getFeedItem },
    rssItems
);
