import {
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from 'react-native';

import { supabase } from '@/lib/supabase';
import { useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from "react";
import Toast from 'react-native-toast-message';
import { useIsFocused } from "@react-navigation/native";

// Estamos aqui
//router.replace('/home');

export default function Alterar() {

    const [nome, setNome] = useState("");
    const [idade, setIdade] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    
    const {id} = useLocalSearchParams();

    const isFocused = useIsFocused();
    
    useEffect(() =>{
        if(isFocused){
            consultarAluno();
        }
    },[isFocused]);

    async function consultarAluno(){
        const { data, error } = await supabase
            .from('tb_alunos')
            .select('*').eq('id', id).single();
        
        if(error){
            Toast.show({
                type: 'error',
                text1: 'Erro!',
                text2: 'Não foi possível consultar o aluno'
            })
        }

        setNome(data.nome ? data.nome : "");
        setIdade(data.idade ?? "");
        setEmail(data.email ?? "");
    }

    async function alterarAluno() {
        setLoading(true)
        const { data, error } = await supabase
            .from('tb_alunos')
            .update([
                { nome: nome, idade: idade, email:email },
            ])
            .eq('id', id)
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
                text2: 'Alteração Realizada com Sucesso'
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
            <TouchableOpacity style={[styles.button, loading && styles.buttonDisabled]} onPress={alterarAluno}>
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