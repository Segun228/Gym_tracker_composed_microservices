import {
  createHashRouter,
  createPanel,
  createRoot,
  createView,
  RoutesConfig,
  createModal
} from '@vkontakte/vk-mini-apps-router';

/*
import ExerciseCreateModal from './components/modals/createModals/exerciseCreateModal/ExerciseCreateModal.jsx';
import ExerciseUpdateModal from './components/modals/updateModals/exerciseUpdateModal/ExerciseUpdateModal.jsx';

import WorkoutCreateModal from './components/modals/createModals/workoutCreateModal/WorkoutCreateModal.jsx';
import WorkoutUpdateModal from './components/modals/updateModals/WorkoutUpdateModal/WorkoutUpdateModal.jsx';

import WorkoutExerciseCreateModal from "./components/modals/createModals/exerciseCreateModal/ExerciseCreateModal.jsx"
import WorkoutExerciseUpdateModal from "./components/modals/updateModals/exerciseUpdateModal/ExerciseUpdateModal.jsx"

import SetCreateModal from './components/modals/createModals/setCreateModal/SetCreateModal.jsx';
import SetUpdateModal from './components/modals/updateModals/setUpdateModal/SetUpdateModal.jsx';
*/

export const DEFAULT_ROOT = 'default_root';

export const DEFAULT_VIEW = {
  HOME: 'home_view',
  REGISTRATION: 'registration_view',
  LOGIN: 'login_view',
  EXERCISES: 'exercises_view',
  WORKOUTS: 'workouts_view',
  EXACT_WORKOUT: 'exact_workout_view',
  WORKOUT_EXERCISE: 'exact_exercise_view',
};

export const DEFAULT_VIEW_PANELS = {
  HOME: 'home_panel',
  REGISTRATION: 'registration_panel',
  LOGIN: 'login_panel',
  EXERCISES: 'exercises_panel',
  WORKOUTS: 'workouts_panel',
  EXACT_WORKOUT: 'exact_workout_panel',
  WORKOUT_EXERCISE: 'exact_exercise_panel',
};

export const DEFAULT_MODALS = {
  EXERCISE_CREATE: 'exercise_create_modal',
  EXERCISE_UPDATE: 'exercise_update_modal',
  WORKOUT_CREATE: 'workout_create_modal',
  WORKOUT_UPDATE: 'workout_update_modal',
  SET_CREATE: 'set_create_modal',
  SET_UPDATE: 'set_update_modal',
  WORKOUT_EXERCISE_CREATE: 'workout_exercise_create_modal',
  WORKOUT_EXERCISE_UPDATE: 'workout_exercise_update_modal',
};


export const exerciseCreateModalRoute = createModal(DEFAULT_MODALS.EXERCISE_CREATE, '/exercises/modal');
export const exerciseUpdateModalRoute = createModal(DEFAULT_MODALS.EXERCISE_UPDATE, '/exercises/updateModal/:updating_template_id', ['updating_template_id']);

export const workoutCreateModalRoute = createModal(DEFAULT_MODALS.WORKOUT_CREATE, '/workouts/modal');
export const workoutUpdateModalRoute = createModal(DEFAULT_MODALS.WORKOUT_UPDATE, '/workouts/updateModal/:updating_workout_id', ['updating_workout_id']);

export const workoutExerciseCreateModalRoute = createModal(DEFAULT_MODALS.WORKOUT_EXERCISE_CREATE, '/workouts/:workout_id/modal', ['workout_id']);
export const workoutExerciseUpdateModalRoute = createModal(DEFAULT_MODALS.WORKOUT_EXERCISE_UPDATE, '/workouts/:workout_id/updateModal/:updating_exercise_id', ['workout_id', 'updating_exercise_id']);

export const setCreateModalRoute = createModal(DEFAULT_MODALS.SET_CREATE, '/workouts/:workout_id/exercises/:exercise_id/modal', ['workout_id', 'exercise_id']);
export const setUpdateModalRoute = createModal(DEFAULT_MODALS.SET_UPDATE, '/workouts/:workout_id/exercises/:exercise_id/updateModal/:updating_set_id', ['workout_id', 'exercise_id', 'updating_set_id']);


export const routes = RoutesConfig.create([
  createRoot(DEFAULT_ROOT, [
    createView(DEFAULT_VIEW.HOME, [
      createPanel(DEFAULT_VIEW_PANELS.HOME, '/'),
    ]),
    createView(DEFAULT_VIEW.REGISTRATION, [
      createPanel(DEFAULT_VIEW_PANELS.REGISTRATION, '/registration'),
    ]),
    createView(DEFAULT_VIEW.LOGIN, [
      createPanel(DEFAULT_VIEW_PANELS.LOGIN, '/login'),
    ]),
    createView(DEFAULT_VIEW.EXERCISES, [
      createPanel(
        DEFAULT_VIEW_PANELS.EXERCISES,
        '/exercises',
        [
          exerciseCreateModalRoute,
          exerciseUpdateModalRoute,
        ]
      ),
    ]),
    createView(DEFAULT_VIEW.WORKOUTS, [
      createPanel(
        DEFAULT_VIEW_PANELS.WORKOUTS,
        '/workouts',
        [
          workoutCreateModalRoute,
          workoutUpdateModalRoute,
        ]
      ),
    ]),
    createView(DEFAULT_VIEW.EXACT_WORKOUT, [
      createPanel(
        DEFAULT_VIEW_PANELS.EXACT_WORKOUT,
        '/workouts/:workout_id',
        [
          workoutExerciseCreateModalRoute,
          workoutExerciseUpdateModalRoute,
        ]
      ),
    ]),
    createView(DEFAULT_VIEW.WORKOUT_EXERCISE, [
      createPanel(
        DEFAULT_VIEW_PANELS.WORKOUT_EXERCISE,
        '/workouts/:workout_id/exercises/:exercise_id',
        [
          setCreateModalRoute,
          setUpdateModalRoute,
        ]
      ),
    ]),
  ]),
]);


export const router = createHashRouter(routes.getRoutes());
