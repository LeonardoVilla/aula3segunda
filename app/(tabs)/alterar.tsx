import { View, Text, StyleSheet } from "react-native";
export default function Alterar(){
    return(
        <View style={styles.container}>
            <Text>Alterar</Text>
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