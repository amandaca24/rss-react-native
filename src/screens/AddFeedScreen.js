import React from 'react';
import { useContext} from 'react';
import { StyleSheet } from 'react-native';
import FeedForm from '../components/FeedForm';
import {Context} from '../context/FeedListContext';

const AddFeedScreen = ({ navigation }) => {
    const { addFeed } = useContext(Context);
    
    return (
        <>
            <FeedForm 
                buttonTitle="Adicionar Feed"
                onSubmit={
                    (title, content) => {
                        addFeed(
                            title,
                            content,
                            () => navigation.navigate('Index'))
                    }
                }/>
        </>
    );
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
    icon: {
        fontSize: 24
    },
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    }
});

AddFeedScreen.defaultProps = {
    initialValues: {
        titulo: "",
        urlFeed: ""
    }
}

export default AddFeedScreen;
