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
import TemplateDeletePopout from '../../popouts/templateDeletePopout/TemplateDeletePopout';
import { deleteWorkoutExercise as asyncDeleteTemplate } from '../../../api/requests/templates/templateRequest';
import { deleteTemplate, deleteWorkout } from '../../../store/redux/mainSlice';
import { useDispatch } from 'react-redux';

const TemplateCard = ({ template, onOpen }) => {
    const dispatch = useDispatch()
    const handleDelete = async () => {
        dispatch(deleteTemplate({templateId: template?.id}))
        await asyncDeleteTemplate({id: template?.id})
    }
    const date = new Date(template?.created_at);
    const formatted = date.toLocaleDateString('ru-RU');
    const routerNavigator = useRouteNavigator()
    return (
        <Card 
            mode="shadow" 
            style={{
                padding: 16,
                width: '100%',
                maxWidth: 280,
                margin: '0 auto',
            }}
        >
        <Group mode="plain" style={{ padding: 0 }}>
            <Title level="3" weight="2" style={{ marginBottom: 8 }}>
            {template?.name || "Упражнение"}
            </Title>

            <Spacing size={12} />
            <Text>Мышечная группа: {template?.muscle_group}</Text>
            <Spacing size={8} />
            <Caption>{"Cоздано "}{formatted || "Недавно"}</Caption>
            <Spacing size={12} />

            <Separator wide="true" />
            <Spacing size={12} />
            <div
                style={{
                    width:"100%",
                    display:"flex",
                    gap:20,
                    flexWrap:"wrap"
                }}
            >
                <Button size='l' onClick={()=>routerNavigator.push(`updateModal/${template?.id}`)}>Изменить</Button>
                <TemplateDeletePopout mode="secondary" template_id={template?.id} onDelete={()=>handleDelete(template?.id)}/>
            </div>
        </Group>
        </Card>
    );
};

export default TemplateCard;