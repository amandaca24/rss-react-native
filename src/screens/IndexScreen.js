import React from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';
import { Feather } from '@expo/vector-icons';
import { useContext, useEffect } from 'react';
import { Context } from '../context/FeedListContext'

const IndexScreen = ({ navigation }) => {
    const { state, deleteFeed, restoreState, deleteAll, getAllFeed } = useContext(Context);

    useEffect(() => {
        restoreState();
    }, []);

    return (
        <>
            <Button color="red" title="Apagar tudo" onPress={deleteAll}/>
            <FlatList
                data={state}
                keyExtractor={(key) => key.urlFeed}
                renderItem={({ item }) => {
                    return (
                        <TouchableOpacity onPress={() => navigation.navigate('Show', { id: item.urlFeed })}>
                            <View style={styles.row}>
                                <Text style={styles.title}>{item.titulo}</Text>
                                <TouchableOpacity onPress={() => deleteFeed(item.urlFeed) }>
                                    <Feather style={styles.icon} name="trash" />
                                </TouchableOpacity>
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
            <Button onPress={() => navigation.navigate('Add')}>
                <Feather name="plus" size={30} />
            </Button>
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
        fontSize: 18
    },
    icon: {
        fontSize: 24
    },
    button: {
        color: "red",
    }
});

export default IndexScreen;
