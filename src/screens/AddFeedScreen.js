import React from 'react';
import { Text, TextInput, View, StyleSheet } from 'react-native';
import {Button} from '@material-ui/core';
import {Context} from '../context/FeedContext';

const AddFeedScreen = ({ navigation }) => {
    const [addItem] = useState(Context);
    const [titulo, setTitulo] = useState(initialValues.titulo);
    const [urlFeed, setUrlFeed] = useState(initialValues.urlFeed);
    
    return (
        <>
            <View style={styles.row}>
                <TextInput style={styles.input} required id="titulo" label="Digite o Título" 
                    value={titulo} onChangeText={text => setTitulo(text)}/>
                <TextInput style={styles.input} required id="urlFeed" label="Digite a URL do Feed"
                    value={urlFeed} onChangeText={text => setUrlFeed(text)}/>
            </View>
            <View>
                <Button 
                    containedPrimary title="Adicionar Feed" 
                    onSubmit={ (titulo, urlFeed) => 
                        addItem(titulo, urlFeed, () => navigation.navigate('Index'))}/>
            </View>
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
