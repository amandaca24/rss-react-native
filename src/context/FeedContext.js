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

const feedReducer = (state, action) => {
    let newState = [];
    switch (action.type) {
        case 'fetch_items':
            newState = [
                ...state,
                {
                    fetchItems: action.payload.feedItems
                }
            ];
            saveItems(newState)
            console.log('implementar');
            return newState;
        case 'add_item':
            newState = [
                ...state,
                {
                    urlFeed: action.payload.urlFeed,
                    titulo: action.payload.titulo
                }
            ];
            saveItems(newState)
            console.log('implementar');
            return newState;
        case 'delete_item':
            newState = state.filter(
                (item) => item.urlFeed !== action.payload);
            
            saveItems(newState);
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
    return (titulo, urlFeed, callback) => {
        dispatch({ type: 'add_item', payload: { titulo, urlFeed } });
        if (callback) {
            callback();
        }
        console.log('Salvou o item');
    };
};

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
        dataPublicacao: 'Wed, 07 Apr 2021 12:20:19 -0000'
    },
    {
        titulo: 'Ocupação de UTIs para adultos com Covid-19 em hospitais públicos de Fortaleza é a maior desde o início da pandemia',
        link: 'https://g1.globo.com/ce/ceara/noticia/2021/04/07/ocupacao-de-utis-para-adultos-com-covid-19-em-hospitais-publicos-de-fortaleza-e-a-maior-desde-o-inicio-da-pandemia.ghtml',
        descricao: 'Dados desta quarta-feira (7) apontam que lotação chegou a 98%; UTIs infantis também estão próximas do colapso. O Hospital Leonardo da Vinci, referência no tratamento da doença, só tem três leitos disponíveis nesta manhã. João Dijorge/PhotoPress/Estadão Conteúdo A ocupação de leitos de Unidades de Terapia Intensiva (UTI) em hospitais públicos de Fortaleza, os quais são voltados exclusivamente para adultos com quadros clínicos graves da Covid-19, alcançou o seu maior índice desde o início da pandemia, na manhã desta quarta-feira (7). De acordo com dados da plataforma IntegraSUS, gerenciada pela Secretaria da Saúde do Ceará (Sesa-CE), 98% dessas unidades estão ocupadas. Os números altos de ocupação do serviço público de saúde da capital ocorrem em um contexto de finalização do período de isolamento social rígido, iniciado em Fortaleza há um mês. O fim do isolamento rígido, segundo o governador Camilo Santana (PT), deve ocorrer em quatro dias. Ele afirmou, no último domingo (4), que a flexibilização das atividades econômicas e reabertura gradual deve ocorrer a partir do próximo dia 12. Ceará registra mais 142 mortes por Covid; 26 só nas últimas 24 horas Semana de isolamento deve estabilizar pandemia para permitir retomada econômica, diz secretário Fortaleza só havia registrado índice de ocupação tão alto em 4 de maio de 2020, no auge da primeira onda, quando os números chegaram a 99%. Contudo, naquele período, a capital dispunha de 323 leitos para tratar pacientes mais graves com a doença; hoje, são 579. Ou seja, há mais pacientes internados em decorrência da infecção viral atualmente, do que no pico da primeira onda; e esta quarta-feira foi o maior número desde então. O Hospital Estadual Leonardo da Vinci, por exemplo, unidade referência no tratamento contra a Covid-19 em todo o Ceará, e o que tem em sua estrutura a maior quantidade de leitos para atendimento de pacientes com quadros clínicos mais graves, amanheceu esta quarta com apenas três leitos disponíveis para esse público. A ocupação no hospital é de 98%, o maior índice da pandemia. Além dele, o Hospital Geral de Fortaleza (HGF), maior unidade pública do estado, e o Hospital de Messejana Dr. Carlos Alberto Studart Gomes estão colapsados. Não há vagas disponíveis para pacientes que necessitem de UTIs ou de enfermarias. Quando consideradas as UTIs infantis em hospitais públicos da cidade, 94% delas estão com seus leitos ocupados, um dos maiores índices desde março de 2020. Crianças com Covid-19 são atendidas especialmente no Hospital Infantil Albert Sabin (Hias), que só tem duas vagas disponíveis na UTI. Seis hospitais com UTIs colapsadas Das 12 unidades públicas disponíveis para atendimento mais grave de pacientes com Covid-19 em Fortaleza, seis delas estão colapsadas, enquanto outras três estão com ocupação acima de 80%. Ao todo, Fortaleza está com 94% dos leitos de UTI ocupados, e 90% das vagas em enfermarias específicas. Esses números são de unidades abertas pela administração pública. Veja os números: Leitos de UTI Leitos de enfermaria Se considerados os hospitais particulares e as entidades sem fins lucrativos, Fortaleza tem ocupação de 92% nos leitos de UTI e de 89% nos de enfermaria. O número de hospitais sem vagas para pacientes com quadros mais graves está em, pelo menos, 10 unidades de saúde.',
        imagem: 'https://s2.glbimg.com/EpWPtt_HC_n9YkyaSSRckR7SFKI=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/0/D/fZhc3UTdu4gHsXv9SC5A/pho20200524032.jpg',
        dataPublicacao: 'Wed, 07 Apr 2021 12:19:41 -0000'
    },
    {
        titulo: 'Maranhão flexibiliza horário de funcionamento de bancos, lotéricas e supermercados',
        link: 'https://g1.globo.com/ma/maranhao/noticia/2021/04/07/maranhao-flexibiliza-horario-de-funcionamento-de-bancos-lotericas-e-supermercados.ghtml',
        descricao: 'Com a nova regra, o horário de atendimento das agências se inicia às 8h, em todo o Maranhão; e os supermercados podem funcionar das 6h até a 0h na Grande São Luís. Maranhão flexibiliza horário de funcionamento de bancos, lotéricas e supermercados. Rafaelle Fróes/G1 MA. O Maranhão flexibilizou o horário de funcionamento de agências da Caixa Econômica, casas lotéricas e supermercados no estado. Segundo a Secretaria de Estado de Indústria, Comércio e Energia (Seinc), a medida, que entrou em vigor nessa terça-feira (6), foi tomada devido ao pagamento do auxílio emergencial do governo federal. Com a nova regra, o horário de atendimento das agências inicia às 8h, em todo o Maranhão, para que haja diminuição do fluxo de pessoas nas agências e loterias. A flexibilização do horário de funcionamento foi solicitada por causa do Auxílio Emergencial 2021, cujo pagamento da 1ª parcela começou nesta terça e, também, das folhas de pagamentos municipais e estaduais e o pagamento do 13º salário. “Com esta medida, visamos minimizar a concentração de pessoas, assim como contribuir com as medidas sanitárias de enfrentamento ao coronavírus”, afirmou o secretário da Seinc, Simplício Araújo. Nova Portaria A Portaria nº 63/2021, publicada na última segunda-feira (5) pela Seinc, alterou, também, o horário de funcionamento de supermercados, mercados, quitandas e congêneres na Grande São Luís, até o dia 11 de abril. Segundo o último decreto do governo do estado, o comércio na Grande Ilha deveria funcionar das 9h às 21h, regra que valeria até o domingo, 11 de abril. Porém, a nova portaria da Seinc, altera essa parte do decreto. De acordo com a portaria, o novo horário de funcionamento permitido será das 6h (abertura) até às 0h (fechamento), desde que respeitadas as normas sanitárias em vigor. Segundo o secretário da Seinc, Simplício Araújo, a determinação ocorreu após diálogo do Governo do Maranhão com o setor, levando em consideração o aumento do fluxo nestes estabelecimentos. “Nós fizemos esta alteração com o intuito de dar maior flexibilidade aos estabelecimentos e mais horários à população para que não haja aglomeração nem tumultos. É desta forma, dialogando com a classe empresarial e o povo, que nós continuaremos dando resposta à sociedade maranhense”, acrescentou o secretário. Coronavírus no Maranhão Pela quinta vez consecutiva, o Maranhão superou a marca de 40 mortes diárias pela Covid-19. Nesta terça-feira (6) foram 43 óbitos registrados e 770 novos casos, segundo a Secretaria de Estado da Saúde. Ao todo, o Maranhão tem agora 6321 óbitos e 245.765 casos de Covid-19. Dos novos casos registrados nesta terça (6), 152 foram na Grande Ilha (São Luís, São José de Ribamar, Paço do Lumiar e Raposa), 54 em Imperatriz e 564 nos demais municípios do estado. Os casos ativos, ou seja, pessoas que estão atualmente em tratamento contra a Covid-19, chegaram a 16.276. Desses, 14.702 foram orientados a estar em isolamento domiciliar, 951 estão internados em enfermarias e 623 em leitos de Unidade de Terapia Intensiva (UTI).',
        imagem: 'https://s2.glbimg.com/0u-TY-p-Lvm55AZP-P-crSupQ9s=/i.s3.glbimg.com/v1/AUTH_59edd422c0c84a879bd37670ae4f538a/internal_photos/bs/2020/0/2/e8ZA0rTSONOUsJXU4DYw/caixa.jpeg',
        dataPublicacao: 'Wed, 07 Apr 2021 12:10:55 -0000'
    }
];

export const { Context, Provider } = createDataContext(
    feedReducer,
    { addItem, deleteItem, fetchItems, restoreState, deleteAll },
    rssItems
);
