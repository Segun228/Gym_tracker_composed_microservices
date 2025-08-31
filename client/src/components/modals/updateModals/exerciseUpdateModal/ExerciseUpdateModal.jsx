import React, { useState, useCallback, useEffect } from 'react';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    FormItem,
    Button,
    Spacing,
} from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import SelectList from '../../../atoms/SelectList';
import { useDispatch, useSelector } from 'react-redux';
import handleLog from '../../../../helpers/handleLog';
import Warning from '../../../popouts/warning/Warning';
import { putExercise } from '../../../../api/requests/exercises/exercisesRequests';
import { editExercise } from '../../../../store/redux/mainSlice';

const WorkoutExerciseUpdateModal = ({ id, onUpdateWorkoutExercise }) => {
    const params = useParams();
    
    const [warningActive, setWarningActive] = useState(false)

    const workout_id = params?.workout_id;
    const exercise_id = params?.updating_exercise_id;
    

    const workout = useSelector(state => state?.main?.workouts?.find(workout => workout?.id == workout_id));
    const exercise = workout?.workout_exercises?.find(ex => ex?.id == exercise_id);

    const routerNavigator = useRouteNavigator();

    const closeModal = () => {
        if(workout_id){
            routerNavigator.push(`/workouts/${workout_id}`);
        } else {
            routerNavigator.push(`/workouts`);
        }
    };


    const [template, setTemplate] = useState('');

    useEffect(() => {
        if (exercise) {
            setTemplate(String(exercise?.template?.id || ''));
        }
    }, [exercise]);
    const dispatch = useDispatch()
    const handleSubmit = useCallback(async () => {

        if (!template) {
            console.error('Необходимо выбрать шаблон упражнения');
            return;
        }
        const new_exercise = await putExercise({ template_id:template, workout_id, exercise_id})
        dispatch(editExercise({ workoutId:workout_id, exercise:new_exercise }))
        closeModal();
        window.location.reload()
    }, [template, onUpdateWorkoutExercise, closeModal]);

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
                    Изменение упражнения
                </ModalPageHeader>
            }
        >
            <Group>
                <Spacing size={24} />
                <FormItem top="Шаблон упражнения" >
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
                        disabled={!template}
                    >
                        Изменить упражнение
                    </Button>
                </FormItem>
                <Spacing size={12} />
            </Group>
        <Warning active={warningActive} setActive={setWarningActive} description={'Введите название тренировки'}/>
        </ModalPage>
    );
};

export default WorkoutExerciseUpdateModal;
