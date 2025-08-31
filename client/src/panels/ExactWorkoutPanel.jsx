import {
    ButtonGroup,
    Panel,
    PanelHeader,
    Spinner,
} from '@vkontakte/vkui';
import { useParams } from '@vkontakte/vk-mini-apps-router';
import { uid } from 'uid';
import {
    PanelHeaderBack,
    Header,
    FixedLayout,
    Div,
    Button,
} from '@vkontakte/vkui';
import WorkoutCard from '../components/cards/workoutCard/WorkoutCard';
import { useSelector, useDispatch } from 'react-redux';
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import ExerciseCard from '../components/cards/exerciseCard/ExerciseCard';
import WorkoutDeletePopout from '../components/popouts/workoutDeletePopout/WorkoutDeletePopout';
import { deleteWorkout as asyncDeleteWorkout } from '../api/requests/workouts/workoutsRequest';
import { deleteWorkout } from '../store/redux/mainSlice';
import handleLog from '../helpers/handleLog';
const ExactWorkoutPanel = ({ id }) => {
    const params = useParams()
    const workout_id = params?.workout_id
    const workout = useSelector(state => state.main?.workouts.find(workout => workout?.id == workout_id))
    const dispatch = useDispatch();
    const routeNavigator = useRouteNavigator();
    const exercises = workout?.workout_exercises
    const handleDelete = async () => {
        handleLog("Deleting workout in component", workout_id)
        dispatch(deleteWorkout({id:workout_id}))
        routeNavigator.push("/workouts")
        await asyncDeleteWorkout(workout_id)
    }
    return (
        <Panel id={id} style={{paddingBottom:80}}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routeNavigator.push("/workouts")} style={{cursor:"pointer"}}/>}>
                {workout?.note || "Тренировка"}
            </PanelHeader>
            <Div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
                gap: '16px',
                padding: '16px',
                paddingInline: 30,

            }}
            >
                {exercises && exercises.length > 0 ? (
                exercises.map(exercise => (
                    <ExerciseCard key={workout.id} exercise={exercise} workout_id={workout.id}/>
                ))
                ) : (
                <>
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
                </>
                )}
            </Div>
            <FixedLayout filled vertical="bottom" >
                <ButtonGroup stretched={true}>
                    <Button onClick={()=>{routeNavigator.push("modal")}} stretched size='l'>Добавить выполненное упражнение</Button>
                    <WorkoutDeletePopout mode="outline" workout_id={workout_id} onDelete={()=>{handleDelete()}}/>
                </ButtonGroup>
            </FixedLayout>
        </Panel>
    );
}

export default ExactWorkoutPanel;