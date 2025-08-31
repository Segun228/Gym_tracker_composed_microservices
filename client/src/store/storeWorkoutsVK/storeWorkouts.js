import bridge from '@vkontakte/vk-bridge';
import {SILENT_MODE} from "../../../config.js"
import handleLog from '../../helpers/handleLog.js';


export const getStoreWorkouts = async () => {
    try {
        const res = await bridge.send('VKWebAppStorageGet', {
        key: 'workouts',
        });

        if (!res || typeof res.value !== 'string') {
        throw new Error("Invalid VK Storage response");
        }

        const workouts = JSON.parse(res.value || '[]');
        if (!Array.isArray(workouts)) {
        throw new Error("Workouts must be an array");
        }

        return workouts;
    } catch (error) {
        console.error(error);
        return [];
    }
};


export const getStoreWorkout = async (id) => {
    try {
        if (!id) throw new Error("Invalid id given");

        const workouts = await getStoreWorkouts();
        return workouts.find((w) => w?.id == id) || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const postStoreWorkout = async (newWorkout) => {
    try {
        if (!newWorkout?.id) throw new Error("Invalid workout");

        const workouts = await getStoreWorkouts();
        workouts.push(newWorkout);

        await bridge.send('VKWebAppStorageSet', {
        key: 'workouts',
        value: JSON.stringify(workouts),
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


export const putStoreWorkout = async (updatedWorkout) => {
    try {
        if (!updatedWorkout?.id) throw new Error("Invalid workout");

        const workouts = await getStoreWorkouts();
        const newWorkouts = workouts.map((w) =>
        w.id == updatedWorkout.id ? updatedWorkout : w
        );

        await bridge.send('VKWebAppStorageSet', {
        key: 'workouts',
        value: JSON.stringify(newWorkouts),
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


export const deleteStoreWorkout = async (id) => {
    try {
        const workouts = await getStoreWorkouts();
        const newWorkouts = workouts.filter((w) => w.id != id);

        await bridge.send('VKWebAppStorageSet', {
        key: 'workouts',
        value: JSON.stringify(newWorkouts),
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};