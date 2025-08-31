import { Navigate } from "react-router-dom";
import { useState } from "react";
import {getMe} from "./../api/requests/user/userRequests"
import { useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
const RequireAdmin = async ({children}) => {
    const [isAdmin, setIsAdmin] = useState(null)
    const routerNavigator = useRouteNavigator()
    try{
        const user = await getMe()
        if(user?.isAdmin){
            setIsAdmin(true)
        }
        else{
            setIsAdmin(false)
        }
    }catch(error){
        console.error(error)
    }

    useEffect(() => {
        if (!isAdmin) {
            routerNavigator.push('/auth')
        }
    }, [isAdmin])


    if (!isAdmin){
        return null
    };

    return children
}

export default RequireAdmin