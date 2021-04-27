import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

//Componente do formulário que recebe três parâmetros.
//Um deles é o objeto que vai receber dois estados, de título e url
//Na view de adição de feed, esses estados serão despachados para o context
//onde serão persistidos no banco. 

const FeedForm = ({ onSubmit, buttonTitle, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [content, setContent] = useState(initialValues.content);

    return (
        <View>
            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
            <Text style={styles.label}>URL do Feed</Text>
            <TextInput style={styles.input} value={content} onChangeText={text => setContent(text)} />
            <Button
                title={buttonTitle}
                onPress={() => {
                    onSubmit(title, content);
                }}
            />
        </View>
    );
};

FeedForm.defaultProps = {
    initialValues: {
        title: '',
        content: ''
    }
}

const styles = StyleSheet.create({
    input: {
        fontSize: 18,
        borderWidth: 1,
        borderColor: 'black',
        marginBottom: 15,
        padding: 5,
        margin: 5
    },
    label: {
        fontSize: 20,
        marginBottom: 5,
        marginLeft: 5
    }
});

export default FeedForm;