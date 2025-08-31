import axios from "axios";
import { USER_URL, API_URL } from "../../../../config"
import api from "../../api"
import handleLog from "../../../helpers/handleLog";


const BASE_URL = API_URL + "templates/"


export const getWorkoutExercises = async () => {
    try{
        const response = await api.get(BASE_URL)
        if(!response){
            throw new Error("Error while getting user exercise")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const getWorkoutExercise = async (id) => {
    try{
        if(!id){
            throw new Error("Empty fields given")
        }
        const response = await api.get(BASE_URL + `${id}/`)
        if(!response){
            throw new Error("Error while getting user exercise")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}

export const putWorkoutExercise = async ({name, muscle_group, id}) =>  {
    try{
        if(!name || !muscle_group || !id){
            throw new Error("Error handling empty fields")
        }
        const data = {
            name, 
            muscle_group, 
        }
        const response = await api.put(BASE_URL + `${id}/`, data)
        if(!response){
            throw new Error("Error while editing workout exercise")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const postWorkoutExercise = async ({name, muscle_group}) =>  {
    try{
        if(!name || !muscle_group){
            throw new Error("Error handling empty fields")
        }
        const data = {
            name, 
            muscle_group, 
        }
        const response = await api.post(BASE_URL, data)
        if(!response){
            throw new Error("Error while creating workout exercise")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const deleteWorkoutExercise = async ({id}) => {
    try{
        if(!id){
            throw new Error("Error handling empty fields")
        }
        const response = await api.delete(BASE_URL + `${id}/`)
        if(!response){
            throw new Error("Error while deleting workout exercise")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}
