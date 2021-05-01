import {StyleSheet} from 'react-native';


const Styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        paddingVertical: 10,
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
    },
    
    titulo: {
        fontSize: 14,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    image: {   
        width: 50,
        height: 50,
        borderRadius: 4,
        margin: 5
    },
    descricao: {
        fontSize: 12, 
        flex: 1,
        justifyContent: 'space-between',
        textAlign: 'justify',
        
        },
    dataPublicacao: {
        fontSize: 10,
        fontStyle: 'italic'
        },
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
        },
    view: {
        backgroundColor: '#cfd8dc',
    }
});

export default Styles;