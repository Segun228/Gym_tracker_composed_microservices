import axios from "axios";
import { USER_URL, API_URL } from "./../../../../config"
import api from "./../../api"
import handleLog from "../../../helpers/handleLog";


const BASE_URL = API_URL + "workouts/"


export const getWorkouts = async () => {
    try{
        const response = await api.get(BASE_URL)
        if(!response){
            throw new Error("Error while getting workouts")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const getWorkout = async (id) => {
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

export const putWorkout = async ({date, note, duration, id}) =>  {
    try{
        if(!note || !id){
            throw new Error("Error handling empty fields")
        }
        const data = {
            date: date ? date : null, 
            note, 
            duration: duration ? duration : null,
        }
        handleLog("sending shit", data)
        const response = await api.put(BASE_URL + `${id}/`, data)
        if(!response){
            throw new Error("Error while editing workout")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const postWorkout = async ({date, note, duration}) =>  {
    try{
        if(!note){
            throw new Error("Error handling empty fields")
        }
        const data = {
            date: date ? date : null, 
            note, 
            duration: duration ? duration : null,
        }
        const response = await api.post(API_URL + "workouts/", data)
        if(!response){
            throw new Error("Error while creating workout")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}


export const deleteWorkout = async (id) => {
    try{
        if(!id){
            throw new Error("Error handling empty fields")
        }
        const response = await api.delete(BASE_URL + `${id}/`)
        if(!response){
            throw new Error("Error while deleting workout")
        }
        handleLog(response)
        return response
    }
    catch(error){
        console.error(error)
        return null
    }
}
