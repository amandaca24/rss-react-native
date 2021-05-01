import React from 'react';
import { View, Text, StyleSheet, Image, Linking } from 'react-native';
import { FlatList } from 'react-native-gesture-handler';
import { Context as FeedContext } from '../context/FeedContext';
import { Context as FeedListContext } from '../context/FeedListContext';
import { useContext, useEffect } from 'react';
import rssfeed from '../api/rssfeed';
import { FontAwesome } from '@expo/vector-icons';
import useResults from '../hooks/useResults';
import { Card } from 'react-native-elements';
import Styles from '../styles/Styles';

const ShowFeedScreen = ({ navigation }) => {
    const feedListContext = useContext(FeedListContext); //comunicação entre a classe de contexto com a view para uso do estado e métodos
    const feedID = navigation.getParam('id'); //id passado da view anterior
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID); //vai buscar no contexto o feed com id passado como parâmetro
    const fetch = rssfeed(feed.urlFeed); //vai criar uma instância de requisão http via axios
    const { state, fetchItems, deleteItem, restoreState } = useContext(FeedContext); //comunicação com o contexto dos itens
    fetchItems(fetch); //método que faz análise do xml via fast-xml-parser e salva os atributos localmente
    
    //useResults();

    //Só é chamado após a renderização do DOM.
    useEffect(() => {
        restoreState();
    }, []);
   
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
                            <Card>
                                <Card.Title>{item.titulo}</Card.Title>
                                <View style={Styles.row}>
                                    <Image style={Styles.image} source={item.imagem ? item.imagem : 'https://cdn.iconscout.com/icon/free/png-512/data-not-found-1965034-1662569.png'} />
                                    <Text style={Styles.dataPublicacao}>{item.dataPublicacao}</Text>
                                    
                                    <FontAwesome style={Styles.icons} name='trash-o' color='black' size={24} 
                                        onPress={() => deleteItem(item.link)} />
                                
                                </View>
                                <View style={Styles.row}>
                                    <Text style={Styles.descricao} numberOfLines={3} ellipsizeMode='tail' 
                                        onPress={() => abrirLink(item.link)}>
                                            {item.descricao}
                                    </Text>
                                    
                                </View>
                            </Card>
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
            <FontAwesome style={Styles.icon} name='plus-circle' color='black' size={30} 
                onPress={() => navigation.navigate('Add', {item: 'true'})} />

        )
    };
};

export default ShowFeedScreen;
