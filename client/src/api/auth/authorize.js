import bridge from '@vkontakte/vk-bridge';
import { instance } from './instance';
import handleLog from '../../helpers/handleLog';
import vkBridge from '@vkontakte/vk-bridge';
import { ADMIN_ACCESS_TOKEN, ADMIN_REFRESH_TOKEN, ACCESS_TOKEN, REFRESH_TOKEN, DEBUG } from '../../../config';

const handleAdminLogIn = () => {
    try{
        if(ADMIN_ACCESS_TOKEN && ADMIN_REFRESH_TOKEN && DEBUG){
            localStorage.setItem(ACCESS_TOKEN, ADMIN_ACCESS_TOKEN)
            localStorage.setItem(REFRESH_TOKEN, ADMIN_REFRESH_TOKEN)
            handleLog("admin tokens set successfully")
            return true
        }
        else{
            return false
        }
    }catch(error){  
        console.error(error)
    }
}

export const authorize = async () => {
    try {
        handleLog("Sending auth request started")
        if(handleAdminLogIn()){
            handleLog("Authenticated as admin successfully")
            return
        }
        const launchParams = await vkBridge.send('VKWebAppGetLaunchParams');
        handleLog("Received launch params", launchParams)
        const base64Params = btoa(JSON.stringify(launchParams));

        const response = await instance.post(
            'login/', null,
            {headers: {
                Authorization: `VK ${base64Params}`,
            }}
        );

        const jwt = response;
        handleLog(jwt)
        localStorage.setItem(ACCESS_TOKEN, jwt.access)
        localStorage.setItem(REFRESH_TOKEN, jwt.refresh)
        return jwt;
    } catch (error) {
        console.error("Auth error:", error);
        throw error;
    }
};