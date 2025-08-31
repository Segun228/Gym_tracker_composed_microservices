import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import {
    Card,
    Group,
    Title,
    Text,
    Button,
    Spacing,
    Separator,
    Caption
} from '@vkontakte/vkui';
import { useDispatch } from 'react-redux';
import { deleteExercise } from '../../../store/redux/mainSlice';
import { deleteExercise as asyncDeleteExercise } from '../../../api/requests/exercises/exercisesRequests';
import WorkoutDeletePopout from '../../popouts/workoutDeletePopout/WorkoutDeletePopout';
import ExerciseDeletePopout from '../../popouts/exerciseDeletePopout/ExerciseDeletePopout';
const ExerciseCard = ({ workout_id, exercise, onOpen }) => {
    const dispatch = useDispatch()
    const routerNavigator = useRouteNavigator()
    const handleDelete = async () => {
        dispatch(deleteExercise({workoutId : workout_id, exerciseId : exercise?.id}))
        await asyncDeleteExercise({workout_id, exercise_id : exercise?.id})
    }
    return (
        <Card 
            mode="shadow" 
            style={{
                padding: 16,
                width: '100%',
                maxWidth: 280,
                margin: '0 auto',
                cursor: "pointer"
            }}
            onClick={()=>{routerNavigator.push(`/workouts/${workout_id}/exercises/${exercise?.id}`)}}
        >
        <Group mode="plain" style={{ padding: 0 }}>
            <Title level="3" weight="2" style={{ marginBottom: 8 }}>
            {exercise?.template?.name || "Упражнение"}
            </Title>

            <Spacing size={12} />
            <Text>Мышечная группа: {exercise?.template?.muscle_group}</Text>
            <Spacing size={8} />
            <Caption>{"Сделано подходов "}{exercise?.sets?.length || 0}</Caption>
            <Spacing size={12} />

            <Separator wide />
            <Spacing size={12} />
            <div
                style={{
                    width:"100%",
                    display:"flex",
                    gap:20,
                    flexWrap:"wrap"
                }}
                onClick = {
                    (e)=>{
                        e.stopPropagation()
                    }
                }
            >
                <Button mode="primary" onClick={()=>routerNavigator.push(`updateModal/${exercise?.id}`)}>Изменить</Button>
                <ExerciseDeletePopout mode="secondary" workout_id={workout_id} exercise_id={exercise?.id} onDelete={handleDelete}/>
            </div>
        </Group>
        </Card>
    );
};

export default ExerciseCard;