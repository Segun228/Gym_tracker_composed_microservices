import api from "../../api"
import { API_URL } from "../../../../config"
import handleLog from "../../../helpers/handleLog"

const validateFields = (...fields) => {
    handleLog("Validating:", fields)
    if (fields.some(f => f === undefined || f === null || (typeof f === "string" && !f.trim()))) {
        throw new Error("Missing or invalid fields")
    }
}

export const getSets = async (workout_id, exercise_id) => {
    try {
        validateFields(workout_id, exercise_id)
        const response = await api.get(`${API_URL}workouts/${workout_id}/exercises/${exercise_id}/sets/`)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}

export const getSet = async (workout_id, exercise_id, set_id) => {
    try {
        validateFields(workout_id, exercise_id, set_id)
        const response = await api.get(`${API_URL}workouts/${workout_id}/exercises/${exercise_id}/sets/${set_id}/`)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}

export const postSet = async ({ weight, reps, duration, order, workout_id, exercise_id }) => {
    try {
        validateFields(workout_id, exercise_id)
        const data = { weight, reps, duration, order }
        const response = await api.post(`${API_URL}workouts/${workout_id}/exercises/${exercise_id}/sets/`, data)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}

export const putSet = async ({ weight, reps, duration, order, workout_id, exercise_id, set_id }) => {
    try {
        validateFields(workout_id, exercise_id, set_id)
        const data = { weight, reps, duration, order }
        const response = await api.put(`${API_URL}workouts/${workout_id}/exercises/${exercise_id}/sets/${set_id}/`, data)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}

export const deleteSet = async ({workout_id, exercise_id, set_id}) => {
    try {
        validateFields(workout_id, exercise_id, set_id)
        const response = await api.delete(`${API_URL}workouts/${workout_id}/exercises/${exercise_id}/sets/${set_id}/`)
        handleLog(response)
        return response
    } catch (error) {
        console.error(error)
        handleLog(error.response?.data || error.message)
        return null
    }
}