import React, { useState, useCallback, useEffect } from 'react';
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
import { useDispatch, useSelector } from 'react-redux';
import Warning from '../../../popouts/warning/Warning';
import { putWorkout } from '../../../../api/requests/workouts/workoutsRequest';
import { editWorkout } from '../../../../store/redux/mainSlice';

const WorkoutUpdateModal = ({ id, onCreateWorkout }) => {
    const dispatch = useDispatch()
    const routerNavigator = useRouteNavigator();
    const params = useParams()
    const workout_id = params?.updating_workout_id
    const workout = useSelector(state => state?.main?.workouts?.find(workout => workout?.id == workout_id))
    const closeModal = () => {
        routerNavigator.push("/workouts")
    };

    const [note, setNote] = useState(workout?.note || "");
    const [date, setDate] = useState(workout?.date||'')
    const [duration, setDuration] = useState(workout?.duration||"")
    const [warningActive, setWarningActive] = useState(false)

    const handleSubmit = useCallback( async () => {
        if (!note.trim()) {
        setWarningActive(true)
        return;
        }
        const edited = await putWorkout({date, note, duration, id:workout_id})
        dispatch(editWorkout({workout:edited}))
        closeModal();
        window.location.reload()
    }, [note, onCreateWorkout, closeModal]);

    useEffect(() => {
        if (workout_id) {
            setNote(String(workout?.note || ''));
        }
    }, [workout_id]);

    return (
        <>
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
            Изменение тренировки
            </ModalPageHeader>
        }
        >
        <Group>
            <Spacing size={24} />
            <FormItem top="Название тренировки" bottom="Обязательно">
            <Textarea
                value={note}
                onChange={(e) => setNote(e.target.value)}
                placeholder="Например спина, кардио, или не дай бог день ног"
            />
            </FormItem>

            <Spacing size={10} />
            <FormItem
            top="Дата тренировки"
            >
                <Input
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    placeholder="Дата тренировки"
                    type='date'
                />
            </FormItem>
            <Spacing size={10} />
            <FormItem
            top="Продолжительность тренировки"
            >
                <Input
                    value={duration}
                    onChange={(e) => setDuration(e.target.value)}
                    placeholder="Продолжительность тренировки"
                    type='time'
                />
            <FormItem/>
            <Button size="l" stretched onClick={handleSubmit} appearance="accent">
                Изменить тренировку
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        </ModalPage>
        <Warning active={warningActive} setActive={setWarningActive} description={'Введите название тренировки'}/>
        </>
    );
};

export default WorkoutUpdateModal;