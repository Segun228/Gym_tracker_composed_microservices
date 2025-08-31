import axios from "axios";
import {MAIN_URL, USER_URL} from "./../../../../config"
import api from "./../../api"
import handleLog from "../../../helpers/handleLog";

export const getMe = async () => {
    try{
        const response = await api.get(USER_URL + "me/")
        if(!response){
            throw new Error("Error while getting user")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const putUser = async ({user_vk_id, height, weight}, id) =>  {
    try{
        if(!user_vk_id || !height || !weight || !id){
            throw new Error("Error handling empty fields")
        }
        const data = {
            user_vk_id, 
            height, 
            weight
        }
        const response = await api.put(USER_URL + `me/${id}/`, data)
        if(!response){
            throw new Error("Error while editing user")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const registerUser = async ({user_vk_id, height, weight, username}) =>  {
    try{
        if(!user_vk_id || !height || !weight || !username){
            throw new Error("Error handling empty fields")
        }
        const data = {
            user_vk_id, 
            height, 
            weight,
            username
        }
        const response = await api.post(USER_URL + `register/`, data)
        if(!response){
            throw new Error("Error while editing user")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


const loginUser = async ({user_vk_id}) =>  {
    try{

    }
    catch(error){
        console.error(error)
        return null
    }
}