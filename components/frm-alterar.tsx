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

export default function Alterar() {

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);

    async function consultarAluno(){
        const { data, error } = await supabase
            .from('tb_alunos')
            .select('*')
        
        setNome(data[0].nome);
        setIdade(data[0].idade);
        setEmail(data[0].email);
    }

    async function cadastroAluno() {
        setLoading(true)
        const { data, error } = await supabase
            .from('tb_alunos')
            .insert([
                { nome: nome, idade: idade, email:email },
            ])
            .select()
        if (error) {
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Alteração não realizada' + error.message
            })
            setLoading(false)
        } else {
           Toast.show({
                type: 'success',
                text1: 'Sucesso!',
                text2: 'Alteração Realizada'
            })
        }
    }

    return (
        <View style={styles.container}>
            <Text style={styles.aula}>Alteração de Aluno</Text>
            <TextInput
                style={styles.input}
                value={nome}
                onChangeText={setNome}
            />

            <TextInput
                style={styles.input}
                value={idade}
                onChangeText={setIdade}
            />

            <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={cadastroAluno}>
                <Text style={styles.title}>Alterar</Text>
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