import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";
import { FlatList, StyleSheet, Text, View, TouchableOpacity } from "react-native";
import Toast from "react-native-toast-message";
import { router } from "expo-router";

interface Aluno{
    id: number;
    nome: string;
    idade: number;
    email: string;
}

export default function Consultar(){
    const [alunos, setAlunos] = useState<Aluno[]>([]);
    const isFocused = useIsFocused();

    useEffect(() =>{
        if(isFocused){
            getAlunos();
        }
    },[isFocused]);

    async function getAlunos(){
        let { data: alunos, error } = await supabase
            .from("alunos")
            .select("*")
            .order("nome", { ascending: true });
        
        if(error){
            Toast.show({
                type: "error",
                text1: "Erro",
                text2: "Erro ao consultar dados!"
            })
        }else{
            setAlunos(alunos as Aluno[]);
        }
    }

    return(
        <View style={styles.container}>
            <FlatList
                data={alunos}
                keyExtractor={(item: Aluno) => item.id.toString()}
                renderItem={({ item }) => (
                    <View>
                        <Text>{item.nome}</Text>
                        <Text>{item.idade}</Text>
                        <Text>{item.email}</Text>
                        <TouchableOpacity onPress={() => router.push('/(tabs)/alterar')}>
                            <Text>Alterar</Text>
                        </TouchableOpacity>
                        <Text>Deletar</Text>
                    </View>
                )}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#fff",
        color: "#000",
    }
})
