import { useEffect } from 'react';
import { router } from '@vkontakte/vk-mini-apps-router';

const BlockRoute = () => {
    useEffect(() => {
        router.push('/');
    }, []);

    return null;
};

export default BlockRoute;