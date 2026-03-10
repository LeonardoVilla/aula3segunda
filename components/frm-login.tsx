import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

export default function Login(){
    return(
        <View style={styles.container}>
            <Text style={styles.title}>Área Restrita</Text>
            <TextInput style={styles.input}/>
            <TextInput style={styles.input} />
            <TouchableOpacity style={styles.button}>
                <Text style={styles.title}>Login</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title:{
        fontFamily:'arial',
        fontSize: 24,
        marginBottom: 20,
        color:'#ffffff'
    },
    input:{
        width: '90%',
        height: 40,
        backgroundColor: '#ffffff',
        padding:10,
        marginBottom:24,
    },
    button:{
        width: '90%',
        height: 40,
        backgroundColor: 'green',
        marginBottom:24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,
    
    }
})

