import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, TextInput } from 'react-native';
import Styles from '../styles/Styles';

//Componente do formulário que recebe três parâmetros.
//Um deles é o objeto que vai receber dois estados, de título e url
//Na view de adição de feed, esses estados serão despachados para o context
//onde serão persistidos no banco. 

const ItemFeedForm = ({ onSubmit, buttonTitle, initialValues }) => {
    const [title, setTitle] = useState(initialValues.title);
    const [dataPublicacao, setDataPublicacao] = useState(initialValues.dataPublicacao);
    const [descricao, setDescricao] = useState(initialValues.description);
    const [link, setLink] = useState(initialValues.link);
    const [imagem, setImagem] = useState(initialValues.imagem);

    return (
        <View>
            <Text style={Styles.label}>Título</Text>
            <TextInput style={Styles.input} value={title} onChangeText={text => setTitle(text)} />
            <Text style={Styles.label}>Data de Publicação</Text>
            <TextInput style={Styles.input} value={dataPublicacao} onChangeText={text => setDataPublicacao(text)} />
            <Text style={Styles.label}>Descricao</Text>
            <TextInput style={Styles.input} value={descricao} onChangeText={text => setDescricao(text)} />
            <Text style={Styles.label}>Link</Text>
            <TextInput style={Styles.input} value={link} onChangeText={text => setLink(text)} />
            <Text style={Styles.label}>Imagem</Text>
            <TextInput style={Styles.input} value={imagem} onChangeText={text => setImagem(text)} />
            <Button
                title={buttonTitle}
                onPress={() => {
                    onSubmit(title, dataPublicacao, descricao, link, imagem );
                }}
            />
        </View>
    );
};

ItemFeedForm.defaultProps = {
    initialValues: {
        title: '',
        dataPublicacao: '',
        descricao: '',
        link: '',
        imagem: '',
    }
}

export default ItemFeedForm;