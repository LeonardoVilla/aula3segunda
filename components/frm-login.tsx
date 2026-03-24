import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { useState }  from "react"; 

import Toast from 'react-native-toast-message';

export default function Login(){

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");

    const validaLogin = () =>{
      if(usuario == "admin" && senha == "admin"){
        alert("Login efetuado com sucesso")
        Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: 'Login efetuado com sucesso!'
        })
      }else{
        alert("Usuáro ou senha inválidos")
        Toast.show({
            type: 'error',
            text1: 'Erro!',
            text2: 'Usuário ou senha inválidos'
        })
        //npm install react-native-toast-messsage
      } 
    }

    return(
        <View style={styles.container}>
            <Text style={styles.title}>Área Restrita</Text>
            <TextInput 
                style={styles.input}
                value={usuario}
                onChangeText={setUsuario}
            />
            <TextInput 
                style={styles.input} 
                value={senha}
                onChangeText={setSenha}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button} onPress={validaLogin}>
                <Text style={styles.title}>Login</Text>
            </TouchableOpacity>
            <Toast />
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

