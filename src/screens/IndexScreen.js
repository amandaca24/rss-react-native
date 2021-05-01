import React from 'react';
import { View, Text } from 'react-native';
import { Card, Button, FAB } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useContext, useEffect } from 'react';
import { Context } from '../context/FeedListContext';
import { FontAwesome } from '@expo/vector-icons';
import Styles from '../styles/Styles';

const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, restoreState, deleteAll } = useContext(Context);

    //Limpa os dados do estado assim que a aplicação é iniciada 
    useEffect(() => {
        restoreState();
    }, []);

    
    return (
        <View style={Styles.view}>
            <Card>
                <Card.Title> <FontAwesome name="rss" style={Styles.icons} color='black' size={24} />
                    RSS Feed React</Card.Title>
                <Card.FeaturedSubtitle>Todos os seus feeds em um só lugar</Card.FeaturedSubtitle>
                <Card.Divider/>
                <FlatList
                    data={state}
                    keyExtractor={(feed) => feed.urlFeed}
                    renderItem={({ item }) => {
                        return (
                            <Card>
                                <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.urlFeed })}>
                                    <View style={Styles.row}>
                                        <Card.Title style={Styles.title}>{item.titulo}</Card.Title>
                                        <Card.Divider/>
                                        <View style={Styles.row}>
                                            <FontAwesome style={Styles.icons} name='pencil' size={24} color='black' 
                                                onPress={() => navigation.navigate('Show', { id: item.urlFeed })} />
                                            <FontAwesome style={Styles.icons} name='trash-o' size={24} color='black' 
                                                onPress={() => deleteFeed(item.urlFeed) } />
                                        </View>
                                    </View>
                                </TouchableOpacity>
                            </Card>
                        ); 
                    }}
                />
            </Card>
            <FAB icon={<FontAwesome name="trash-o" style={Styles.icons} size={24}/>} 
                placement='right' color='#d32f2f' size='small' onPress={deleteAll}/>
    </View>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <FontAwesome style={Styles.icons} name='plus-circle' color='black' size={30} 
                onPress={() => navigation.navigate('Add')} />

        )
    };
};


export default IndexScreen;
