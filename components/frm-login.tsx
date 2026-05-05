import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
} from 'react-native';

import { useState } from "react";

import Toast from 'react-native-toast-message';

import { supabase } from '@/lib/supabase'

// Estamos aqui
import { router } from 'expo-router';
//router.replace('/home');

export default function Login() {

    const [usuario, setUsuario] = useState("");
    const [senha, setSenha] = useState("");
    const [loading, setLoading] = useState(false)

    async function validaLogin() {
        setLoading(true)
        ///////////////////////////////
        const { error } = await supabase.auth.signInWithPassword({
            email: usuario,
            password: senha,
        })
        ///////////////////////////////////
        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Usuário ou senha inválidos'
            })
            setLoading(false)
        } else {

            router.replace('/(tabs)');
        }
    }

    return (
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
    container: {
        flex: 1,
        backgroundColor: 'pink',
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontFamily: 'arial',
        fontSize: 24,
        marginBottom: 20,
        color: '#ffffff'
    },
    aula: {
        fontFamily: 'arial',
        fontSize: 34,
        marginBottom: 20,
        color: '#ffffff',
        fontWeight: 'bold',
    },
    input: {
        width: '90%',
        height: 40,
        backgroundColor: '#ffffff',
        padding: 10,
        marginBottom: 24,
    },
    button: {
        width: '90%',
        height: 40,
        backgroundColor: 'green',
        marginBottom: 24,
        alignItems: 'center',
        justifyContent: 'center',
        paddingTop: 20,

    },
    buttonDisabled: {
        backgroundColor: 'gray',
    }
})  