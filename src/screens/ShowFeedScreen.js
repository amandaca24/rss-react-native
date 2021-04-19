import React from 'react';
import { View, Text, StyleSheet, Button, Image, Linking } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Context as FeedListContext } from '../context/FeedListContext'
import { Context as FeedContext } from '../context/FeedContext'
import { useContext } from 'react';
import rssfeed from '../api/rssfeed';


const ShowFeedScreen = ({ navigation }) => {
    const feedListContext = useContext(FeedListContext);
    const feedID = navigation.getParam('id');
    const feed = feedListContext.state.find((feed) => feed.urlFeed === feedID);
    const fetch = rssfeed(feed.urlFeed);
    const { state, fetchItems } = useContext(FeedContext);
    fetchItems(fetch);

    const abrirLink = (link) => {
        Linking.openURL(link).catch((err) => console.error('An error occurred', err));
    }

    return (
        <>
            <FlatList
                data={state}
                keyExtractor={(item) => item.link}
                renderItem={({ item }) => {
                    //atualmente só exibe o título, faça com que apareça data de publicação, 
                    //descrição (pode cortar em 100 ou 200 caracteres para não ficar muito grande), e imagem (caso tenha)
                    //ao clicar em uma notícia, devemos chamar a função abrirLink que direciona o usuário para o link da notícia
                    return (
                        <>
                            <View style={styles.row}>
                                <Image style={styles.image}>{item.image}</Image>
                                <Text style={styles.titulo}>{item.titulo}</Text>
                                <Text style={styles.dataPublicacao}>{item.dataPublicacao}</Text>
                            </View>
                            <View>
                                <Text style={styles.descricao} numberOfLines={2} ellipsizeMode='tail' 
                                    onPress={() => abrirLink(item.link)}>
                                        {item.descricao}
                                </Text>

                            </View>
                        </>
                    );
                }}
            />
        </>
    );
};

//altere os estilos como desejar para melhorar o layout
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    titulo: {
        fontSize: 14,
        fontWeight: 'bold'
    },
    image: {
        //pode alterar largura e altura como desejar
        width: 100,
        height: 100,
        borderRadius: 4,
        margin: 5
    },
    descricao: {
        fontSize: 8, 
        flex: 1
    },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic'
    },
    icon: {
        fontSize: 24
    }
});

export default ShowFeedScreen;