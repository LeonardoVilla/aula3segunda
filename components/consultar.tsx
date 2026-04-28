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
}

