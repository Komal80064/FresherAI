import api from "../utils/axios.js"

export const getCurrentUser = async() =>{
    try {
        const response = await api.get("/api/me")
        return response.data
    // eslint-disable-next-line no-unused-vars
    } catch (error) {
        return null
    }
}

export const useCoins = async(data)=>{
    try {
        const response = await api.post("api/auth/use-coins", data);
        return response.data;
    } catch (error) {
        console.log(error)
        throw error
    }
}