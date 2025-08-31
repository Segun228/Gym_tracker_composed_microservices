import { createSlice } from "@reduxjs/toolkit";
import { getThunkWorkouts } from "./thunks/getThunkWorkouts";
import { getThunkTemplates } from "./thunks/getThunkTemplates";
import { getThunkMe } from "./thunks/getThunkMe";
import { workouts } from "./dummy/workouts";
import { templates } from "./dummy/templates";
import handleLog from "../../helpers/handleLog";

const mainSlice = createSlice({
    name: 'main',
    initialState: {
        username: null,
        status: "idle",
        error: null,
        vk_user_id: null,
        height: 170,
        weight: 70,
        workouts: [],
        templates: []
    },
    reducers: {
        setUser(state, action) {
            state.username = action.payload?.username || state.username;
            state.vk_user_id = action.payload?.vk_user_id || state.vk_user_id;
            state.height = action.payload?.height || state.height;
            state.weight = action.payload?.weight || state.weight;
            handleLog("User set to redux successfully");
        },

        deleteUser(state) {
            state.username = "";
            state.vk_user_id = "";
            state.height = 170;
            state.weight = 70;
            handleLog("User deleted from redux successfully");
        },

        clearStorage(state) {
            state.username = "";
            state.vk_user_id = "";
            state.height = 170;
            state.weight = 70;
            state.workouts = [];
            state.templates = [];
            handleLog("Redux storage cleared successfully");
        },

        setWorkouts(state, action) {
            state.workouts = action.payload.workouts;
            handleLog("Workouts set to Redux storage successfully");
        },

        addWorkout(state, action) {
            state.workouts = [...state.workouts, action.payload.workout]
            handleLog("Workout added to storage successfully");
        },

        editWorkout(state, action) {
            const updatedWorkout = action.payload.workout;
            const index = state.workouts.findIndex(w => w.id == updatedWorkout.id);
            if (index != -1) {
                state.workouts[index] = updatedWorkout;
            }
            handleLog("Workout edited in storage successfully");
        },

        deleteWorkout(state, action) {
            state.workouts = state.workouts.filter(workout => workout?.id != action.payload.id);
            handleLog("Workout deleted in storage successfully");
        },

        setTemplates(state, action) {
            state.templates = action.payload.templates;
            handleLog("Templates set to Redux storage successfully");
        },

        addTemplate(state, action) {
            state.templates.push(action.payload.template);
            handleLog("Template added to Redux storage successfully");
        },

        editTemplate(state, action) {
            const updatedTemplate = action.payload.template;
            const index = state.templates.findIndex(t => t.id == updatedTemplate.id);
            if (index != -1) {
                state.templates[index] = updatedTemplate;
            }
            handleLog("Template edited in Redux storage successfully");
        },

        deleteTemplate(state, action) {
            const templateId = action.payload.templateId;
            state.templates = state.templates.filter(t => t.id != templateId);
            handleLog("Template deleted from Redux storage successfully");
        },

        setExercises(state, action) {
            const { workoutId, exercises } = action.payload;
            const workout = state.workouts.find(w => w.id == workoutId);
            if (workout) {
                workout.workout_exercises = exercises;
            }
            handleLog(`Exercises set for workout ${workoutId}`);
        },

        addExercise(state, action) {
            const { workoutId, exercise } = action.payload;
            const workout = state.workouts.find(w => w.id == workoutId);
            if (workout) {
                workout.workout_exercises.push(exercise);
            }
            handleLog(`Exercise added to workout ${workoutId}`);
        },

        editExercise(state, action) {
            const { workoutId, exercise } = action.payload;
            const workout = state.workouts.find(w => w.id == workoutId);
            if (workout) {
                const index = workout.workout_exercises.findIndex(e => e.id == exercise.id);
                if (index != -1) {
                    workout.workout_exercises[index] = exercise;
                }
            }
            handleLog(`Exercise edited in workout ${workoutId}`);
        },

        deleteExercise(state, action) {
            const { workoutId, exerciseId } = action.payload;
            const workout = state.workouts.find(w => w.id == workoutId);
            if (workout) {
                workout.workout_exercises = workout.workout_exercises.filter(e => e.id != exerciseId);
            }
            handleLog(`Exercise ${exerciseId} deleted from workout ${workoutId}`);
        },

        setSet(state, action) {
            const { workoutId, exerciseId, sets } = action.payload;
            const workout = state.workouts.find(w => w.id == workoutId);
            if (workout) {
                const exercise = workout.workout_exercises.find(e => e.id == exerciseId);
                if (exercise) {
                    exercise.sets = sets;
                }
            }
            handleLog(`Sets set for exercise ${exerciseId} in workout ${workoutId}`);
        },

        addSet(state, action) {
            const { workoutId, exerciseId, set } = action.payload;
            const workout = state.workouts.find(w => w.id == workoutId);
            if (workout) {
                const exercise = workout.workout_exercises.find(e => e.id == exerciseId);
                if (exercise) {
                    exercise.sets.push(set);
                }
            }
            handleLog(`Set added to exercise ${exerciseId} in workout ${workoutId}`);
        },

        editSet(state, action) {
            const { workoutId, exerciseId, set_id, set } = action.payload;
            const workout = state.workouts.find(w => w.id == workoutId);
            if (workout) {
                const exercise = workout.workout_exercises.find(e => e.id == exerciseId);
                if (exercise) {
                    const index = exercise.sets?.findIndex(s => s.id == set_id);
                    if (index != -1) {
                        exercise.sets[index] = set;
                    }
                }
            }
            handleLog(`Set edited in exercise ${exerciseId} of workout ${workoutId}`);
        },

        deleteSet(state, action) {
            const { workoutId, exerciseId, setId } = action.payload;
            const workout = state.workouts.find(w => w.id == workoutId);
            if (workout) {
                const exercise = workout.workout_exercises.find(e => e.id == exerciseId);
                if (exercise) {
                    exercise.sets = exercise.sets.filter(s => s.id != setId);
                }
            }
            handleLog(`Set ${setId} deleted from exercise ${exerciseId} in workout ${workoutId}`);
        }
    },
    extraReducers: (builder) => {
        builder
            .addCase(getThunkWorkouts.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getThunkWorkouts.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.workouts = action.payload.data;
            })
            .addCase(getThunkWorkouts.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });

        builder
            .addCase(getThunkTemplates.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getThunkTemplates.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.templates = action.payload?.data;
            })
            .addCase(getThunkTemplates.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });

        builder
            .addCase(getThunkMe.pending, (state) => {
                state.status = 'loading';
                state.error = null;
            })
            .addCase(getThunkMe.fulfilled, (state, action) => {
                state.status = 'succeeded';
                state.username = action.payload?.username;
                state.vk_user_id = action.payload?.vk_user_id;
                state.height = action.payload?.height || state.height;
                state.weight = action.payload?.weight || state.weight;
            })
            .addCase(getThunkMe.rejected, (state, action) => {
                state.status = 'failed';
                state.error = action.payload || action.error.message;
            });
    }
});

export const {
    setUser,
    deleteUser,
    clearStorage,
    setWorkouts,
    addWorkout,
    editWorkout,
    deleteWorkout,
    setTemplates,
    addTemplate,
    editTemplate,
    deleteTemplate,
    setExercises,
    addExercise,
    editExercise,
    deleteExercise,
    setSet,
    addSet,
    editSet,
    deleteSet
} = mainSlice.actions;

export const mainReducer = mainSlice.reducer;