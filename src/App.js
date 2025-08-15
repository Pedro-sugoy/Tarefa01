import { View, Text, FlatList, StyleSheet, ActivityIndicator } from 'react-native';
import { useQuery } from '@tanstack/react-query';
import { fetchPosts } from './api/Post';

export default function App() {
  const { data, isLoading, isError, error, isFetching, refetch } = useQuery({
    queryKey: ['posts'],
    queryFn: fetchPosts
  });

  if (isLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color="#007AFF" />
        <Text style={styles.loadingText}>Carregando usuários...</Text>
      </View>
    );
  }

  if (isError) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>Erro ao carregar usuários</Text>
        <Text style={styles.errorMessage}>{error.message}</Text>
      </View>
    );
  }

  return (
    <View>
      <Text style={styles.titulo}>Lista de usuários</Text>
      <FlatList
      data={data}
      refreshing={isFetching}
      onRefresh={refetch}
      keyExtractor={(item) => item.id.toString()}
      renderItem={({ item }) => (
        <View style={styles.card}>
          <Text style={styles.name}>{item.name}</Text>
          <Text style={styles.email}>{item.email}</Text>
          <Text style={styles.city}>Cidade: <Text style={styles.cityName}>{item.address.city}</Text></Text>
        </View>
        )}
      />
    </View>
    
  );
}

const styles = StyleSheet.create({
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F9FAFB',
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
    color: '#555',
  },
  errorText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#D32F2F',
    marginBottom: 4,
  },
  errorMessage: {
    fontSize: 14,
    color: '#555',
    textAlign: 'center',
    paddingHorizontal: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    marginHorizontal: 16,
    marginVertical: 8,
    padding: 20,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 1,
    shadowRadius: 10,
    elevation: 5,
    marginBottom: 16,
    borderWidth:1
  },
  name: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1E293B',
    marginBottom: 6,
  },
  email: {
    fontSize: 15,
    color: '#007AFF',
    marginBottom: 6,
  },
  city: {
    fontSize: 16,
    color: '#333',
  },
  cityName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#FF6F61', 
    fontFamily: 'Poppins', 
  },
  titulo: {
  alignSelf: 'center',
  fontSize: 30,
  fontWeight: 'bold', 
  color: '#1E293B',  
  textShadowRadius: 6,
  marginVertical: 20
}

});
