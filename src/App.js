import { View, Text, FlatList, StyleSheet, Image,ActivityIndicator, Button } from 'react-native';
import { useQuery } from '@tanstack/react-query';//Hook para fazer queries
import { fetchPosts} from './api/posts'
 
 
export default function App() {
 
    const { data, isLoading, isError,error,isFetching,refetch } = useQuery({
        queryKey: ['posts'], //Chave da query
        queryFn: fetchPosts //Função que busca os dados
    });

    //Exibe um carregando enquanto os dados não chegam
    if (isLoading) {
        return <ActivityIndicator size="large" style={styles.center} />
    }
 
    //Exibe um erro caso ocorra
    if (isError) {
        return (
            <View>
                <Text style={styles.center}>Erro ao carregar os dados</Text>
                <Text style={styles.center}>{error.message}</Text>
            </View>
        )
    }
 
    return (
        <>
         
        <FlatList
            data={data}
            refreshing={isFetching}//Mostra o spinner durante o refetch
            onRefresh={refetch}//Chamada automática do refetch ao puxar
            renderItem={({item})=>(
                <View style={styles.item}>
                    <Text style={styles.title}>{item.email}</Text>
                    <Text style={styles.title}>{item.name}</Text>
                    <Text style={styles.title}>{item.address.city}</Text>
                </View>
            )}
        />
     </>  
    )
}
 
const styles = StyleSheet.create({
    center:{
        flex:1,
        justifyContent:'center',
        alignItems:'center'
    },
    item:{
        padding:16,
        borderBottomWidth:1,
        borderBottomColor:'#ccc'
    },
    title:{
        fontWeight:'bold',
        marginBottom:4
    }
})