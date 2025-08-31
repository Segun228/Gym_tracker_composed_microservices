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
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import Warning from '../../../popouts/warning/Warning';
import { postWorkoutExercise } from '../../../../api/requests/templates/templateRequest';
import { addTemplate } from '../../../../store/redux/mainSlice';
import { useDispatch } from 'react-redux';

const TemplateCreateModal = ({ id, onCreateWorkout }) => {
    const [warningActive, setWarningActive] = useState(false)
    const routerNavigator = useRouteNavigator();

    const closeModal = () => {
        routerNavigator.push("/exercises")
    };

    const [name, setName] = useState('');
    const [muscle_group, setMuscleGroup] = useState('');
    const dispatch = useDispatch()

    const handleSubmit = useCallback( async() => {
        if (!name.trim()) {
        setWarningActive('Введите название шаблона упражнения')
        return;
        }
        const new_template = await postWorkoutExercise({name, muscle_group})
        dispatch(addTemplate(new_template))
        closeModal();
        window.location.reload()
    }, [name, muscle_group, closeModal]);

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
            Новый шаблон упражнения
            </ModalPageHeader>
        }
        >
        <Group>
            <Spacing size={24} />
            <FormItem top="Название шаблона" bottom="Обязательно">
            <Textarea
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Например жим лежа, или присяд"
            />
            </FormItem>

            <Spacing size={24} />
            <FormItem top="Название мышечной группы" >
            <Textarea
                value={muscle_group}
                onChange={(e) => setMuscleGroup(e.target.value)}
                placeholder="Бипсепс, трипсепс, трицепатопс"
            />
            </FormItem>

            <Spacing size={24} />
            <FormItem>
            <Button size="l" stretched onClick={handleSubmit} appearance="accent">
                Создать шаблон
            </Button>
            </FormItem>
            <Spacing size={12} />
        </Group>
        <Warning active={warningActive} setActive={setWarningActive} description={'Введите название тренировки'}/>
        </ModalPage>
    );
};

export default TemplateCreateModal;
