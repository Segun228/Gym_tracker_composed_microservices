import { useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import { router, useRouteNavigator } from "@vkontakte/vk-mini-apps-router";
import api from "./../api/api.js";
import { PanelSpinner } from "@vkontakte/vkui";
import { REFRESH_TOKEN, ACCESS_TOKEN } from "./../../config.js";


const RequireAuth = ({ children }) => {
    const [isAuthorized, setIsAuthorized] = useState(null);
    const routerNavigator = useRouteNavigator()
    useEffect(() => {
        const checkAuth = async () => {
        const accessToken = localStorage.getItem(ACCESS_TOKEN);
        if (!accessToken) {
            setIsAuthorized(false);
            return;
        }

        try {
            const decoded = jwtDecode(accessToken);
            const now = Date.now() / 1000;

            if (decoded.exp < now) {
            const refreshSuccess = await handleRefreshToken();
            if (!refreshSuccess) {
                setIsAuthorized(false);
                return;
            }
            } else {
            setIsAuthorized(true);
            }
        } catch (error) {
            console.error("Error decoding access token", error);
            setIsAuthorized(false);
        }
        };

        checkAuth();
    }, []);

    useEffect(() => {
        if (isAuthorized === false) {
        router.set("/auth");
        }
    }, [isAuthorized]);

    const handleRefreshToken = async () => {
        const refreshToken = localStorage.getItem(REFRESH_TOKEN);
        if (!refreshToken) return false;

        try {
        const response = await api.post("/api/token/refresh/", {
            refresh: refreshToken,
        });

        if (response.status === 200 && response.data?.access) {
            localStorage.setItem(ACCESS_TOKEN, response.data.access);
            setIsAuthorized(true);
            return true;
        } else {
            return false;
        }
        } catch (error) {
        console.error("Refresh token failed", error);
        return false;
        }
    };

    if (isAuthorized === null) {
        return <PanelSpinner/>
    }

    return children;
};

export default RequireAuth;