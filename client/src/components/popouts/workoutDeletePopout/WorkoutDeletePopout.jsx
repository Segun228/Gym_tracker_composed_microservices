import { useState } from 'react';
import { 
    Alert,
    Button
} from '@vkontakte/vkui';
import { usePopout } from '@vkontakte/vk-mini-apps-router';
const WorkoutDeletePopout = ({ workout_id, onDelete, mode }) => {
    const [popout, setPopout] = useState(null)
    const handleDelete = () => {
        setPopout(
            <Alert
            dismissLabel="Отмена"
            onClose={()=>setPopout(null)}
            actions={[
                { title: 'Отмена',
                    autoclose:"true", 
                    mode: 'cancel',  
                },
                {title: 'Удалить', autoclose:"true", mode: 'destructive',
                action: () => {
                    onDelete()
                },}
            ]}
            title="Удаление тренировки"
            description="Вы уверены, что хотите удалить эту тренировку?"
            />
        );
    };

    return (
        <>
        {popout}
        <Button size='l' mode={mode} onClick={()=>{handleDelete()}}>
            Удалить
        </Button>
        </>
    );
};

export default WorkoutDeletePopout