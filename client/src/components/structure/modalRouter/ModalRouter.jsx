import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';

import ExerciseCreateModal from "../../modals/createModals/templateCreateModal/TemplateCreateModal.jsx"
import ExerciseUpdateModal from '../../modals/updateModals/templateUpdateModal/TemplateUpdateModal.jsx';

import WorkoutCreateModal from '../../modals/createModals/workoutCreateModal/WorkoutCreateModal.jsx';
import WorkoutUpdateModal from '../../modals/updateModals/WorkoutUpdateModal/WorkoutUpdateModal.jsx';

import WorkoutExerciseCreateModal from '../../modals/createModals/workoutExerciseCreateModal/ExerciseCreateModal.jsx';
import WorkoutExerciseUpdateModal from '../../modals/updateModals/exerciseUpdateModal/ExerciseUpdateModal.jsx';

import SetCreateModal from '../../modals/createModals/setCreateModal/SetCreateModal.jsx';
import SetUpdateModal from '../../modals/updateModals/setUpdateModal/SetUpdateModal.jsx';
import { ModalRoot } from '@vkontakte/vkui';
import {DEFAULT_MODALS} from "../../../routes.js"

export const ModalRouter = () => {
    const {modal: activeModal} = useActiveVkuiLocation()
    return (
        <ModalRoot activeModal={activeModal}>
            <ExerciseCreateModal id={DEFAULT_MODALS.EXERCISE_CREATE}/>
            <ExerciseUpdateModal id={DEFAULT_MODALS.EXERCISE_UPDATE}/>

            <WorkoutCreateModal id={DEFAULT_MODALS.WORKOUT_CREATE}/>
            <WorkoutUpdateModal id={DEFAULT_MODALS.WORKOUT_UPDATE}/>

            <WorkoutExerciseCreateModal id={DEFAULT_MODALS.WORKOUT_EXERCISE_CREATE}/>
            <WorkoutExerciseUpdateModal id={DEFAULT_MODALS.WORKOUT_EXERCISE_UPDATE}/>

            <SetCreateModal id={DEFAULT_MODALS.SET_CREATE}/>
            <SetUpdateModal id={DEFAULT_MODALS.SET_UPDATE}/>
        </ModalRoot>
    );
};