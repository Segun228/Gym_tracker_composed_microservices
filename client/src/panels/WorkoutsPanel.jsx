import { uid } from 'uid';
import {
    Panel,
    CardGrid,
    PanelHeader,
    PanelHeaderBack,
    Header,
    FixedLayout,
    Div,
    Button,
    Spinner,
} from '@vkontakte/vkui';
import WorkoutCard from '../components/cards/workoutCard/WorkoutCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getThunkWorkouts } from '../store/redux/thunks/getThunkWorkouts';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';

const WorkoutsPanel = ({ id }) => {
    const dispatch = useDispatch();
    const routeNavigator = useRouteNavigator();

    useEffect(() => {
        dispatch(getThunkWorkouts());
    }, [dispatch]);


    const workouts = useSelector(state => state.main?.workouts);

    return (
        <Panel id={id} style={{paddingBottom:80}}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.push("/")} style={{cursor:"pointer"}}/>}>
                Тренировки
            </PanelHeader>
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '16px',
                padding: '16px',
                paddingInline: 30,
                marginTop: 50
            }}
            >
                {workouts && workouts.length > 0 ? (
                workouts.map(workout => (
                    <WorkoutCard key={workout?.id} workout={workout} />
                ))
                ) : (
                    <Div style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "40px",
                    width: "90vw"
                    }}>
                        <div>У вас пока нет ни одной тренировки(</div>
                        <Spinner size='l' />
                    </Div>
                )}
            </div>
            <FixedLayout filled vertical="bottom">
                <Div>
                    <Button onClick={()=>{routeNavigator.push("modal")}} size="l" stretched>Добавить тренировку</Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};

export default WorkoutsPanel;