import { useState } from 'react';
import { 
    Alert,
    Button
} from '@vkontakte/vkui';
import { usePopout } from '@vkontakte/vk-mini-apps-router';
const SetDeletePopout = ({ onDelete, mode }) => {
    const [popout, setPopout] = useState(null)
    const handleDelete = () => {
        setPopout(
            <Alert
            onClose={()=>setPopout(null)}
            dismissLabel="Отмена"
            actions={[
                { title: 'Отмена',autoclose: true, mode: 'cancel',  },
                {title: 'Удалить', autoclose: true, mode: 'destructive',
                action: () => {
                    onDelete()
                },}
            ]}
            title="Удаление подхода"
            description="Вы уверены, что хотите удалить этот подход?"
            />
        );
    };

    return (
        <>
        {popout}
        <Button mode={mode} size='l' onClick={()=>{handleDelete()}}>
            Удалить
        </Button>
        </>
    );
};

export default SetDeletePopout