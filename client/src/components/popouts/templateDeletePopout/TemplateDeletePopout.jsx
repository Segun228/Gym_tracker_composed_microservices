import { useState } from 'react';
import { 
    Alert,
    Button
} from '@vkontakte/vkui';
import { usePopout } from '@vkontakte/vk-mini-apps-router';
const TemplateDeletePopout = ({ template_id, onDelete, mode }) => {
    const [popout, setPopout] = useState(null)
    const handleDelete = () => {
        setPopout(
            <Alert
            onClose={()=>setPopout(null)}
            dismissLabel="Отмена"
            actions={[
                { title: 'Отмена',autoclose: "true", mode: 'cancel',  },
                {title: 'Удалить', autoclose: "true", mode: 'destructive',
                action: () => {
                    onDelete()
                },}
            ]}
            title="Удаление упражнения"
            description="Вы уверены, что хотите удалить это упражнение?"
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

export default TemplateDeletePopout