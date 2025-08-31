import React, { useState, useCallback, useEffect } from 'react';
import {
    ModalPage,
    ModalPageHeader,
    PanelHeaderButton,
    Group,
    FormItem,
    Input,
    Button,
    Spacing,
} from '@vkontakte/vkui';
import { Icon24Cancel } from '@vkontakte/icons';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useDispatch, useSelector } from 'react-redux';
import Warning from '../../../popouts/warning/Warning';
import { postSet, putSet } from '../../../../api/requests/sets/setsRequests';
import { addSet, editSet } from '../../../../store/redux/mainSlice';

const SetUpdateModal = ({ id, onUpdateSet }) => {
    const routerNavigator = useRouteNavigator();
    const params = useParams();
    const { workout_id, exercise_id, updating_set_id } = params;
    const workout = useSelector(state => state.main?.workouts?.find(workout => workout?.id == workout_id));
    const exercise = workout?.workout_exercises?.find(exercise => exercise?.id == exercise_id);
    const set = exercise?.sets?.find(set => set?.id == updating_set_id);
    const set_id = set?.id
    const [warningActive, setWarningActive] = useState(false)

    const [weight, setWeight] = useState(0);
    const [reps, setReps] = useState(0);
    const [duration, setDuration] = useState('00:00:00');


    useEffect(() => {
        if (set) {
            setWeight(set.weight || 0);
            setReps(set.reps || 0);
            setDuration(set.duration || '00:00:00');
        }
    }, [set])


    const closeModal = () => {
        if (workout_id && exercise_id) {
            routerNavigator.push(`/workouts/${workout_id}/exercises/${exercise_id}`);
        } else {
            routerNavigator.push("/workouts");
        }
    };
    const dispatch = useDispatch()
    const handleSubmit = useCallback(async () => {
        if (!weight && !reps && !duration) {
        setWarningActive('Заполните необходимые поля')
        return;
        }
        const new_set = await putSet({weight, reps, duration, workout_id, exercise_id, set_id})
        dispatch(editSet({ workoutId:workout_id, exerciseId:exercise_id, new_set, set_id }))

        closeModal();
        window.location.reload()
    }, [weight, reps, duration, onUpdateSet, closeModal]);

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
                    Изменить подход
                </ModalPageHeader>
            }
        >
            <Group>
                <Spacing size={24} />
                <FormItem top="Рабочий вес" >
                    <Input
                        value={weight}
                        onChange={(e) => setWeight(e.target.value)}
                        placeholder="С каким весом делал?"
                        type='number'
                    />
                </FormItem>
                <Spacing size={20} />
                <FormItem top="Количество повторений">
                    <Input
                        value={reps}
                        onChange={(e) => setReps(e.target.value)}
                        placeholder="Сколько раз ты пожал свои 30?"
                        type='number'
                    />
                </FormItem>
                <Spacing size={20} />
                <FormItem top="Время выполнения" >
                    <Input
                        value={duration}
                        onChange={(e) => setDuration(e.target.value)}
                        type='time'
                    />
                </FormItem>
                <Spacing size={20} />
                <FormItem>
                    <Button size="l" stretched onClick={handleSubmit} appearance="accent">
                        Изменить подход
                    </Button>
                </FormItem>
                <Spacing size={12} />
            </Group>
        <Warning active={warningActive} setActive={setWarningActive} description={'Введите название тренировки'}/>
        </ModalPage>
    );
};

export default SetUpdateModal;