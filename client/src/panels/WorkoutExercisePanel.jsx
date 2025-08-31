import {
    Panel,
    Header,
    PanelHeaderBack,
    FixedLayout,
    Div,
    Button,
    Flex,
    ButtonGroup,
    PanelHeader,
    Spinner
} from '@vkontakte/vkui';
import SetCard from '../components/cards/setCard/SetCard';
import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useDispatch, useSelector } from 'react-redux';
import WorkoutDeletePopout from '../components/popouts/workoutDeletePopout/WorkoutDeletePopout';
import { deleteExercise as asyncDeleteExercise } from '../api/requests/exercises/exercisesRequests';
import { deleteExercise, deleteWorkout } from '../store/redux/mainSlice';
import ExerciseDeletePopout from '../components/popouts/exerciseDeletePopout/ExerciseDeletePopout';
const WorkoutExercisePanel = ({id}) => {
    const routerNavigator = useRouteNavigator()
    const dispatch = useDispatch()
    const params = useParams()
    const {workout_id, exercise_id} = params
    const workout = useSelector(state => state.main?.workouts.find(workout => workout?.id == workout_id))
    const exercise = workout?.workout_exercises.find(exercise => exercise?.id == exercise_id)
    const sets = exercise?.sets
    const handleDelete = async () => {
        dispatch(deleteExercise({workoutId:workout_id, exerciseId: exercise?.id}))
        routerNavigator.push(`/workouts/${workout_id}/`)
        await asyncDeleteExercise({workout_id, exercise_id})
    }
    return ( 
        <Panel id={id} style={{paddingBottom:80}}>
            <PanelHeader before={<PanelHeaderBack onClick={() => routerNavigator.push(`/workouts/${workout_id}`)} style={{cursor:"pointer"}}/>}>
                {exercise?.template?.name}
            </PanelHeader>
            <Flex
                direction='column'
                align='center'
                style={{
                    gap: '20px',
                    padding: '20px',
                    paddingInline: 30,
                    paddingRight: 30,
                    marginTop: 50,
                }}
            >
                {sets && sets.length > 0 ? (
                sets.map(set => (
                    <SetCard key={workout.id} set={set}/>
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
                        <div>У вас пока нет ни одного подхода(</div>
                        <Spinner size='l' />
                    </Div>
                )}
            </Flex>
            <FixedLayout filled vertical="bottom" >
                <ButtonGroup stretched={true}>
                    <Button onClick={()=>routerNavigator.push("modal")} stretched size='l'>Добавить выполненный подход</Button>
                    <ExerciseDeletePopout workout_id={workout_id} exercise_id={exercise?.id} onDelete={handleDelete} mode="outline"/>
                </ButtonGroup>
            </FixedLayout>
        </Panel>
    );
}

export default WorkoutExercisePanel;