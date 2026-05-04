import { supabase } from "@/lib/supabase";
import { useEffect, useState } from "react";
import { useIsFocused } from "@react-navigation/native";

import { FlatList, StyleSheet, Text, View } from "react-native";

import Toast from "react-native-toast-message";

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
        let { data, error } = await supabase
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
            setAlunos(data as Aluno[]);
        }
    }

    return(
        <View>
            <FlatList
                data={alunos}
                keyExtractor={(item: Aluno) => item.id.toString()}
            />
        </View>
    )



}

