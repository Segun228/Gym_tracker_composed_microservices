import React, { useState, useCallback } from 'react';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    FormItem,
    Input,
    Textarea,
    Button,
    Spacing,
} from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import SelectList from '../../../atoms/SelectList';
import Warning from '../../../popouts/warning/Warning';
import { postExercise } from '../../../../api/requests/exercises/exercisesRequests';
import { useDispatch } from 'react-redux';
import { addExercise } from '../../../../store/redux/mainSlice';

const WorkoutExerciseCreateModal = ({ id, onCreateWorkoutExercise }) => {
    const params = useParams()
    const workout_id = params?.workout_id
    const routerNavigator = useRouteNavigator();
    const closeModal = () => {
        if(workout_id){
            routerNavigator.push(`/workouts/${workout_id}`);
        }
        else{
            routerNavigator.push(`/workouts`);
        }
    };
    const [warningActive, setWarningActive] = useState(false)

    const [template, setTemplate] = useState("");
    const dispatch = useDispatch()
    const handleSubmit = useCallback(async () => {
        if (!template?.trim()) {
            setWarningActive('Необходимо выбрать шаблон упражнения')
            return;
        }
        const new_exercise = await postExercise({template_id:template, workout_id})
        dispatch(addExercise({workoutId:workout_id, exercise:new_exercise}))
        closeModal();
        window.location.reload()
    }, [template, onCreateWorkoutExercise, closeModal]);

    return (
        <ModalPage
            id={id}
            settlingHeight={80}
            dynamicContentHeight
            header={
                <ModalPageHeader
                    before={
                        <PanelHeaderButton onClick={closeModal}>
                            <Icon24Cancel />
                        </PanelHeaderButton>
                    }
                >
                    Новое упражнение
                </ModalPageHeader>
            }
        >
            <Group>
                <Spacing size={24} />
                <FormItem top="Сделанное упражнение" >
                    <SelectList setTemplate={setTemplate} template={template}/>
                </FormItem>
                <Spacing size={20} />
                
                <FormItem>
                    <Button 
                        size="l" 
                        stretched 
                        onClick={() => routerNavigator.push("/exercises/modal")} 
                        appearance="accent"
                        mode='secondary'
                    >
                        Новый шаблон упражнения
                    </Button>
                </FormItem>
                <Spacing size={10} />
                
                <FormItem>
                    <Button 
                        size="l" 
                        stretched 
                        onClick={handleSubmit} 
                        appearance="accent"
                        disabled={!template.trim()} 
                    >
                        Добавить упражнение
                    </Button>
                </FormItem>
                <Spacing size={12} />
            </Group>
        <Warning active={warningActive} setActive={setWarningActive} description={'Введите название тренировки'}/>
        </ModalPage>
    );
};

export default WorkoutExerciseCreateModal;