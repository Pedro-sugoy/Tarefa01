import axios from "axios";

//Função que será usada pelo Tanstack Query
export const fetchPosts = async () =>{
    const response = await axios.get("https://jsonplaceholder.typicode.com/users");
    return response.data;//Retorna os dados
}