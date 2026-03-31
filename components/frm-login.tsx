import { 
    View, 
    Text, 
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { useState }  from "react"; 

import Toast from 'react-native-toast-message';

import { Alert } from 'react-native'
import { supabase } from '@/lib/supabase'

export default function Login(){

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false)

    // const validaLogin = () =>{
    //   if(usuario == "admin" && senha == "admin"){
    //     alert("Login efetuado com sucesso")
    //     Toast.show({
    //         type: 'success',
    //         text1: 'Sucesso!',
    //         text2: 'Login efetuado com sucesso!'
    //     })
    //   }else{
    //     alert("Usuáro ou senha inválidos")
    //     Toast.show({
    //         type: 'error',
    //         text1: 'Erro!',
    //         text2: 'Usuário ou senha inválidos'
    //     })
    //     //npm install react-native-toast-messsage
    //   } 
    // }

    async function validaLogin() {
    setLoading(true)
    const { error } = await supabase.auth.signInWithPassword({
      email: usuario,
      password: senha,
    })
    if (error){
        Toast.show({
            type: 'error',
            text1: 'Erro!',
            text2: 'Usuário ou senha inválidos'
        })
        setLoading(false)
    }else{
        Toast.show({
            type: 'success',
            text1: 'Sucesso!',
            text2: 'Login efetuado com sucesso!'
        })
    }
    async function signUpWithEmail() {
        setLoading(true)
        const {
        data: { session },
        error,
        } = await supabase.auth.signUp({
        email: usuario,
        password: senha,
        })
        if (error) Alert.alert(error.message)
        if (!session) Alert.alert('Please check your inbox for email verification!')
        setLoading(false)
    }

    return(
        <View style={styles.container}>
            <Text style={styles.aula}>Aula Segunda</Text>
            <Text style={styles.aula}>Temos que Finalizar</Text>
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
            <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={validaLogin}>
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
    aula:{
        fontFamily:'arial',
        fontSize: 34,
        marginBottom: 20,
        color:'#ffffff',
        fontWeight: 'bold',
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
    
    },
    buttonDisabled:{
        backgroundColor: 'gray',
    }
})

