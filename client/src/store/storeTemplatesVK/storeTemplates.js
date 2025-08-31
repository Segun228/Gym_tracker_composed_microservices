import bridge from '@vkontakte/vk-bridge';
import handleLog from '../../helpers/handleLog.js';


export const getStoreTemplates = async () => {
    try {
        const res = await bridge.send('VKWebAppStorageGet', {
        keys: ['templates'],
        });

        if (!res || res.keys.length < 1 || !res.keys[0].value) {
        throw new Error('Error getting templates from storage');
        }

        return JSON.parse(res.keys[0].value);
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const getStoreTemplate = async (id) => {
    try {
        if (!id) {
        throw new Error('Invalid id given');
        }

        const templates = await getStoreTemplates();
        return templates?.find((template) => template?.id === id) || null;
    } catch (error) {
        console.error(error);
        return null;
    }
};


export const postStoreTemplate = async (newTemplate) => {
    try {
        const templates = (await getStoreTemplates()) || [];
        templates.push(newTemplate);

        await bridge.send('VKWebAppStorageSet', {
        key: 'templates',
        value: JSON.stringify(templates),
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


export const putStoreTemplate = async (updatedTemplate) => {
    try {
        if (!updatedTemplate?.id) {
        throw new Error('Invalid template id');
        }

        const templates = (await getStoreTemplates()) || [];

        const newTemplates = templates.map((template) =>
        template.id === updatedTemplate.id ? updatedTemplate : template
        );

        await bridge.send('VKWebAppStorageSet', {
        key: 'templates',
        value: JSON.stringify(newTemplates),
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};


export const deleteStoreTemplate = async (id) => {
    try {
        if (!id) {
        throw new Error('Invalid template id');
        }

        const templates = (await getStoreTemplates()) || [];
        const filteredTemplates = templates.filter((t) => t.id !== id);

        await bridge.send('VKWebAppStorageSet', {
        key: 'templates',
        value: JSON.stringify(filteredTemplates),
        });

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};