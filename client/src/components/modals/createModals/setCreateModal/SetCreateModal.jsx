import { useState, useCallback } from 'react';
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
import Warning from '../../../popouts/warning/Warning';
import { postSet } from '../../../../api/requests/sets/setsRequests';
import { addSet } from '../../../../store/redux/mainSlice';
import { useDispatch } from 'react-redux';

const SetCreateModal = ({ id, onCreateSet }) => {
    const routerNavigator = useRouteNavigator();
    const [warningActive, setWarningActive] = useState(false)
    const params = useParams()
    const {workout_id, exercise_id} = params
    const closeModal = () => {
        routerNavigator.push(`/workouts/${workout_id}/exercises/${exercise_id}/`)
    };
    
    const [weight, setWeight] = useState(0)
    const [reps, setReps] = useState(0)
    const [duration, setDuration] = useState('00:00:00')
    const dispatch = useDispatch()
    const handleSubmit = useCallback(async () => {
        if (!weight && !reps && !duration) {
        setWarningActive('Заполните необходимые поля')
        return;
        }
        const new_set = await postSet({weight, reps, duration, workout_id, exercise_id})
        dispatch(addSet({ workoutId:workout_id, exerciseId:exercise_id, new_set }))

        closeModal();
        window.location.reload()
    }, [weight, reps, duration, onCreateSet, closeModal]);

    return (
        <ModalPage
        id={id}
        settlingHeight={80}
        dynamicContentHeight
        header={
            <ModalPageHeader
            before={
                <PanelHeaderButton onClick={()=>closeModal()}>
                <Icon24Cancel />
                </PanelHeaderButton>
            }
            >
            Новый подход
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
                />
            </FormItem>
            <Spacing size={20} />
            <FormItem top="Количество повторений">
                <Input
                    value={reps}
                    onChange={(e) => setReps(e.target.value)}
                    placeholder="Сколько раз ты пожал свои 30?"
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
                Добавить подход
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        <Warning active={warningActive} setActive={setWarningActive} description={'Введите название тренировки'}/>
        </ModalPage>
    );
};

export default SetCreateModal;