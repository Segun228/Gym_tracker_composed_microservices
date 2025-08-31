import { useState, useCallback, useEffect } from 'react';
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
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import Warning from '../../../popouts/warning/Warning';
import { postWorkout } from '../../../../api/requests/workouts/workoutsRequest';
import { useDispatch } from 'react-redux';
import { addWorkout } from '../../../../store/redux/mainSlice';
import handleLog from '../../../../helpers/handleLog';
const WorkoutCreateModal = ({ id }) => {
    const routerNavigator = useRouteNavigator();
    const closeModal = () => {
        routerNavigator.push("/workouts")
    };

    const [note, setNote] = useState('');
    const [date, setDate] = useState('')
    const [duration, setDuration] = useState("")
    const [warningActive, setWarningActive] = useState(false)
    const dispatch = useDispatch()
    const handleSubmit = useCallback(async () => {
        if (!note.trim()) {
        setWarningActive(true)
        return;
        }
        const new_workout = await postWorkout({date, note, duration})
        dispatch(addWorkout({workout:new_workout}))
        closeModal();
        window.location.reload()
    }, [note, closeModal]);

    useEffect(()=>{
        setNote("")
        setDate("")
        setDuration("")
    }, [])
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
            Новая тренировка
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
                Создать тренировку
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        <Warning active={warningActive} setActive={setWarningActive} description={'Введите название тренировки'}/>
        </ModalPage>
    );
};

export default WorkoutCreateModal;