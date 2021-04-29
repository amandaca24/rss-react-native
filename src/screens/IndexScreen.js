import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Card, Button, FAB } from 'react-native-elements';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useContext, useEffect } from 'react';
import { Context } from '../context/FeedListContext';
import { FontAwesome } from '@expo/vector-icons';

const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, restoreState, deleteAll } = useContext(Context);

    //Limpa os dados do estado assim que a aplicação é iniciada 
    useEffect(() => {
        restoreState();
    }, []);

    
    return (
        <>
            <Card>
                <Card.Title> <FontAwesome name="rss" style={styles.icons} color='black' size={24} />
                    RSS Feed React</Card.Title>
                <Card.FeaturedSubtitle>Todos os seus feeds em um só lugar</Card.FeaturedSubtitle>
                <Card.Divider/>
                <FlatList
                    data={state}
                    keyExtractor={(feed) => feed.urlFeed}
                    renderItem={({ item }) => {
                        return (
                            <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.urlFeed })}>
                                <View style={styles.row}>
                                    <Text style={styles.title}>{item.titulo}</Text>
                                    <View style={styles.row}>
                                        <FontAwesome style={styles.icons} name='pencil' size={24} color='black' 
                                            onPress={() => navigation.navigate('Show', { id: item.urlFeed })} />
                                        <FontAwesome style={styles.icons} name='trash-o' size={24} color='black' 
                                            onPress={() => deleteFeed(item.urlFeed) } />
                                    </View>
                                </View>
                            </TouchableOpacity>
                        ); 
                    }}
                />
            </Card>
            <FAB icon={<FontAwesome name="trash-o" style={styles.icons} size={24}/>} 
                placement='right' color='#d32f2f' size='small' onPress={deleteAll}/>
    </>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <FontAwesome style={styles.icons} name='plus-circle' color='black' size={30} 
                onPress={() => navigation.navigate('Add')} />

        )
    };
};


const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 20,
        paddingHorizontal: 10,
        borderTopWidth: 1,
        borderColor: 'gray'
    },
    title: {
        fontSize: 18, 
        padding: 5,
    },
    icons: {
        borderRadius: 5,
        padding: 5,
        size: 24,
    },
    button: {
        color: 'red',
        textDecorationColor: 'black'
    }
});

export default IndexScreen;
