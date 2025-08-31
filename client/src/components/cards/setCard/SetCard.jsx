import { useParams, useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
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
import { deleteSet as asyncDeleteSet } from '../../../api/requests/sets/setsRequests';
import { deleteSet } from '../../../store/redux/mainSlice';
import SetDeletePopout from '../../popouts/setDeletePopout/setDeletePopout';
import { useDispatch } from 'react-redux';
import handleLog from '../../../helpers/handleLog';

const SetCard = ({ set, onOpen }) => {
    const dispatch = useDispatch()
    const params = useParams()
    const routerNavigator = useRouteNavigator()
    const handleDelete = async () => {
        dispatch(deleteSet({
            workoutId: params?.workout_id,
            exerciseId: params?.exercise_id,
            setId: set?.id
        }))
        handleLog({
            workout_id: params?.workout_id,
            exercise_id: params?.exercise_id,
            set_id: set?.id
        })
        await asyncDeleteSet({
            workout_id: params?.workout_id,
            exercise_id: params?.exercise_id,
            set_id: set?.id
        })
    }
    return(
        <Card 
            mode="shadow" 
            style={{
                padding: 16,
                width: '80%',
                margin: '0 auto',
            }}
        >
        <Group mode="plain" style={{ padding: 0 }}>
            <Title level="3" weight="2" style={{ marginBottom: 8 }}>
            {"Подход " + (set?.order || "")}
            </Title>
            <Spacing size={12} />
            <Text>Рабочий вес: {set?.weight}</Text>
            <Spacing size={12} />
            <Text>Количество повторений: {set?.reps}</Text>
            {set?.time && <>
                <Spacing size={12} />
                <Text>Время выполнения: {set?.time}</Text>
            </>}
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
            >
                <Button mode="primary" onClick={()=>routerNavigator.push(`updateModal/${set?.id}`)}>Изменить</Button>
                <SetDeletePopout onDelete={handleDelete} mode="secondary"/>
            </div>
        </Group>
        </Card>
    );
};

export default SetCard;