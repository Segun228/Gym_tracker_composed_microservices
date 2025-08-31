import { useEffect, useState } from 'react';
import { 
    Alert,
    Button
} from '@vkontakte/vkui';
const Warning = ({ title, description, active, setActive }) => {
    return (
        <>
            {active && <Alert
            dismissLabel="Предупреждение"
            onClose={()=>setActive(false)}
            actions={[
                {title: 'Ясно', autoclose:"true", mode: 'destructive',
                action: ()=>setActive(false)}
            ]}
            title= {title || "Предупреждение"}
            description={description || "Что-то пошло не так..."}
            />}
        </>
    );
};

export default Warning