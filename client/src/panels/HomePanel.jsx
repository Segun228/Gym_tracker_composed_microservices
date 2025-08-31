import React, { useEffect } from 'react';
import {
    Panel,
    PanelHeader,
    PanelHeaderButton,
    Title,
    Placeholder,
    Button
} from '@vkontakte/vkui';
import { Icon28AddOutline, Icon24DumbbellsOutline } from '@vkontakte/icons';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import Header from '../components/structure/header/Header';
import { getThunkTemplates } from '../store/redux/thunks/getThunkTemplates';
import { useDispatch } from 'react-redux';
import { getThunkMe } from '../store/redux/thunks/getThunkMe';


const HomePanel = ({ id }) => {
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getThunkMe());
    }, [dispatch]);

    const routerNavigator = useRouteNavigator();

    const handleCreateWorkout = () => {
        routerNavigator.push('/workouts/modal');
    };

    return (
        <Panel id={id}>
            <Header />

            <Placeholder
                icon={<Icon24DumbbellsOutline width={56} height={56} />}
                header="Добро пожаловать в Gym Tracker!"
                action={
                    <Button size="m" onClick={handleCreateWorkout}>
                        Начать тренировку
                    </Button>
                }
            >
                Это ваше приложение для отслеживания тренировок. Здесь вы можете создавать и редактировать шаблоны упражнений, вести дневник тренировок и следить за прогрессом.
            </Placeholder>
        </Panel>
    );
};

export default HomePanel;