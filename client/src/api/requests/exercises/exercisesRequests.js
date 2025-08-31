import api from "../../api"
import { API_URL } from "../../../../config"
import handleLog from "../../../helpers/handleLog"

const validateFields = (...fields) => {
    if (fields.some(f => f === undefined || f === null || (typeof f === "string" && !f.trim()))) {
        console.error("Missing or invalid fields")
        throw new Error("Missing or invalid fields")
    }
}

export const getExercises = async (workout_id) => {
    try {
        validateFields(workout_id)
        const response = await api.get(`${API_URL}workouts/${workout_id}/exercises/`)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}

export const getExercise = async (workout_id, exercise_id) => {
    try {
        validateFields(workout_id, exercise_id)
        const response = await api.get(`${API_URL}workouts/${workout_id}/exercises/${exercise_id}/`)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}

export const postExercise = async ({ template_id, order, workout_id}) => {
    try {
        handleLog("Sending shit damn", { template_id, order, workout_id})
        validateFields(workout_id, template_id)
        const data = { template:template_id, order, workout:workout_id }
        const response = await api.post(`${API_URL}workouts/${workout_id}/exercises/`, data)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}

export const putExercise = async ({ template_id, order, workout_id, exercise_id}) => {
    try {
        validateFields(workout_id, exercise_id, template_id)
        const data = { template:template_id, order }
        const response = await api.put(`${API_URL}workouts/${workout_id}/exercises/${exercise_id}/`, data)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}

export const deleteExercise = async ({workout_id, exercise_id}) => {
    try {
        validateFields(workout_id, exercise_id)
        const response = await api.delete(`${API_URL}workouts/${workout_id}/exercises/${exercise_id}/`)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}