import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { useContext, useEffect, useState } from 'react';
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
            <Button color="red" title="Apagar tudo" onPress={deleteAll}/>
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
                                    <FontAwesome style={styles.icons} name='trash-o' size={30} color='black' 
                                        onPress={() => deleteFeed(item.urlFeed) } />
                                </View>
                            </View>
                        </TouchableOpacity>
                    ); 
                }}
            />
        </>
    );
};

IndexScreen.navigationOptions = ({ navigation }) => {
    return {
        headerRight: () => (
            <FontAwesome style={styles.icons} name='plus-circle' size={32} color='black' 
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
    },
});

export default IndexScreen;
