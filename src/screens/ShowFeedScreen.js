import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Context as FeedContext } from '../context/FeedContext';
import { Context as FeedListContext } from '../context/FeedListContext';
import { useContext, useEffect } from 'react';
import rssfeed from '../api/rssfeed';
import { FontAwesome } from '@expo/vector-icons';
import useResults from '../hooks/useResults';

const ShowFeedScreen = ({ navigation }) => {
    const feedListContext = useContext(FeedListContext); //comunicação entre a classe de contexto com a view para uso do estado e métodos
    const feedID = navigation.getParam('id'); //id passado da view anterior
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID); //vai buscar no contexto o feed com id passado como parâmetro
    const fetch = rssfeed(feed.urlFeed); //vai criar uma instância de requisão http via axios
    const { state, fetchItems, deleteItem, restoreState } = useContext(FeedContext); //comunicação com o contexto dos itens
    fetchItems(fetch); //método que faz análise do xml via fast-xml-parser e salva os atributos localmente
    
    //useResults();

    //Só é chamado após a renderização do DOM.
    //useEffect(() => {
    //    restoreState();
    //}, []);
   
    //Abre o link no navegador 
    const abrirLink = (link) => {
        Linking.openURL(link).catch((err) => console.error('Ocorreu um erro: ', err));
    }

    //Usa o estado vindo do FeedContext após o fetch no link do feed
    //para preencher a lista
    return (
        <>
           <FlatList
                data={state}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => {
                    
                    return (
                        <>
                            <View style={styles.row}>
                                <Text style={styles.dataPublicacao}>{item.dataPublicacao}</Text>
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.titulo}>{item.titulo}</Text>
                                
                            </View>
                            <View style={styles.row}>
                                <Text style={styles.descricao} numberOfLines={2} ellipsizeMode='tail' 
                                    onPress={() => abrirLink(item.link)}>
                                        {item.descricao}
                                </Text>
                                <View style={styles.row}>
                                    <FontAwesome style={styles.icon} name='trash-o' color='black' onPress={() => deleteItem(item.link)} />
                                </View>
                            </View>
                        </>
                    );
                }}
            />
        </>
    );
};

ShowFeedScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <FontAwesome style={styles.icon} name='plus-circle' color='black' 
                onPress={() => navigation.navigate('Add', {item: 'true'})} />

        )
    };
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        padding: 2,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    titulo: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 50,
        height: 50,
        borderRadius: 4,
        margin: 5
    },
    descricao: {
        fontSize: 12, 
        flex: 1,
        textAlign: 'justify',
        textAlignVertical: 'center'
    },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 24,
        padding: 5,
    }
});

export default ShowFeedScreen;
