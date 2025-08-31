import {
    Icon28HomeOutline,
    Icon28CalendarAddOutline,
    Icon28UserCircleOutline,
    Icon24DumbbellsOutline
} from '@vkontakte/icons';
import {
    Tabbar,
    TabbarItem,
} from "@vkontakte/vkui";
import { useRouteNavigator } from '@vkontakte/vk-mini-apps-router';
import { useActiveVkuiLocation } from '@vkontakte/vk-mini-apps-router';
import React, { useEffect, useState } from 'react';

export const BottomNav = () => {
    const routeNavigator = useRouteNavigator();
    const { view, panel } = useActiveVkuiLocation();

    return (
        <Tabbar>
            <TabbarItem
                onClick={() => routeNavigator.replace('/')}
                selected={view === 'home_view'}
                text="Главная"
                aria-label="Главная"
            >
                <Icon28HomeOutline />
            </TabbarItem>

            <TabbarItem
                onClick={() => routeNavigator.replace('/workouts')}
                selected={view === 'workouts_view'}
                text="Тренировки"
                aria-label="Тренировки"
            >
                <Icon28CalendarAddOutline />
            </TabbarItem>

            <TabbarItem
                onClick={() => routeNavigator.replace('/exercises')}
                selected={view === 'exercises_view'}
                text="Упражнения"
                aria-label="Упражнения"
            >
                <Icon24DumbbellsOutline style={{width: 28, height: 28}}/>
            </TabbarItem>
        </Tabbar>
    );
};