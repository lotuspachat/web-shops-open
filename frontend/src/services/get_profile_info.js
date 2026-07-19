import api from "./api.js";

export async function get_info_of_progile() {
    const response = await api.get('http://localhost:3000/api/auth/get'); 
    return response.data;
    
}