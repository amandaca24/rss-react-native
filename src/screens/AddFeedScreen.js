import React from 'react';
import { useContext} from 'react';
import { StyleSheet } from 'react-native';
import FeedForm from '../components/FeedForm';
import {Context as FeedListContext} from '../context/FeedListContext';
import ItemForm from '../components/ItemForm';
import { Context as FeedContext} from '../context/FeedContext';
import Styles from '../styles/Styles';

//Esta view traz o componente de formulário em que é passado o título e url do feed
//Aqui passa as props indicadas no formulário (o título do botão e a ação de submit)
//Após clicar no botão, será redirecionado para o Index

const AddFeedScreen = ({ navigation }) => {
    const { addFeed } = useContext(FeedListContext);
    const { addItem } = useContext(FeedContext);
    const isItem = navigation.getParam('item');
    
    //Vai carregar caso a origem tenha sido para adicionar uma notícia
    if(isItem === 'true'){
        return(
            <>
            <ItemForm 
                buttonTitle="Adicionar Feed"
                onSubmit={
                    (title, dataPublicacao, descricao, link, imagem) => {
                        addItem(
                            title, dataPublicacao, descricao, link, imagem,
                            () => navigation.navigate('Show'))
                    }
                }/>
            </>
        )
    }
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


AddFeedScreen.defaultProps = {
    initialValues: {
        titulo: "",
        urlFeed: ""
    }
}

export default AddFeedScreen;
