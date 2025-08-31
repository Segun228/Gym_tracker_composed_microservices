import { uid } from 'uid';
import {
    Panel,
    CardGrid,
    PanelHeader,
    PanelHeaderBack,
    Header,
    Button,
    Div,
    FixedLayout,
    Flex,
    ButtonGroup,
    Spinner,
} from '@vkontakte/vkui';
import WorkoutCard from '../components/cards/workoutCard/WorkoutCard';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getThunkWorkouts } from '../store/redux/thunks/getThunkWorkouts';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import TemplateCard from '../components/cards/templateCard/TemplateCard';
import { getThunkTemplates } from '../store/redux/thunks/getThunkTemplates';

const ExercisesPanel = ({ id }) => {
    const dispatch = useDispatch();
    const routeNavigator = useRouteNavigator();

    useEffect(() => {
        dispatch(getThunkTemplates());
    }, [dispatch]);

    const templates = useSelector(state => state.main?.templates);

    return (
        <Panel id={id} style={{paddingBottom:80}}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.push("/")} style={{cursor:"pointer"}}/>}>
                    Мои упражнения
            </PanelHeader>
            <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))',
                gap: '16px',
                padding: '16px',
                paddingInline: 30,
                marginTop:50

            }}
            >
                {templates && templates.length > 0 ? (
                templates.map(template => (
                    <TemplateCard key={template?.id} template={template} />
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
                        <div>У вас пока нет ни одного упражнения(</div>
                        <Spinner size='l' />
                    </Div>
                )}
            </div>
            <FixedLayout filled vertical="bottom" >
                <Div stretched={true} >
                    <Button onClick={()=>{routeNavigator.push("modal")}} stretched size='l'>Добавить упражнение</Button>
                </Div>
            </FixedLayout>
        </Panel>
    );
};

export default ExercisesPanel;
