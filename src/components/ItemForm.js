import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';

//Componente do formulário que recebe três parâmetros.
//Um deles é o objeto que vai receber dois estados, de título e url
//Na view de adição de feed, esses estados serão despachados para o context
//onde serão persistidos no banco. 

const FeedForm = ({ onSubmit, buttonTitle, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [dataPublicacao, setDataPublicacao] = useState(initialValues.dataPublicacao);
    const [descricao, setDescricao] = useState(initialValues.description);
    const [link, setLink] = useState(initialValues.link);
    const [imagem, setImagem] = useState(initialValues.imagem);
    const [urlFeed, setUrlFeed] = useState(initialValues.imagem);

    return (
        <View>
            <Text style={styles.label}>Título</Text>
            <TextInput style={styles.input} value={title} onChangeText={text => setTitle(text)} />
            <Text style={styles.label}>Data de Publicação</Text>
            <TextInput style={styles.input} value={dataPublicacao} onChangeText={text => setDataPublicacao(text)} />
            <Text style={styles.label}>Descricao</Text>
            <TextInput style={styles.input} value={descricao} onChangeText={text => setDescricao(text)} />
            <Text style={styles.label}>Link</Text>
            <TextInput style={styles.input} value={link} onChangeText={text => setLink(text)} />
            <Text style={styles.label}>Imagem</Text>
            <TextInput style={styles.input} value={imagem} onChangeText={text => setImagem(text)} />
            <Text style={styles.label}>URL do Feed</Text>
            <TextInput style={styles.input} value={urlFeed} onChangeText={text => setUrlFeed(text)} />
            <Button
                title={buttonTitle}
                onPress={() => {
                    onSubmit(title, dataPublicacao, descricao, link, imagem, urlFeed);
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