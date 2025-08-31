import { AppRoot, PanelSpinner } from "@vkontakte/vkui";
import React, { useEffect, useState } from 'react';
import {
  useActiveVkuiLocation,
  RouterProvider,
  
} from '@vkontakte/vk-mini-apps-router';
import {
  Root,
  View,
  SplitLayout,
  SplitCol, 
  Epic,
} from '@vkontakte/vkui';
import { router } from './routes';
import HomePanel from './panels/HomePanel';
import RegistrationPanel from './panels/RegistrationPanel';
import LoginPanel from './panels/LoginPanel';
import ExercisesPanel from './panels/ExercisesPanel';
import WorkoutsPanel from './panels/WorkoutsPanel';
import ExactWorkoutPanel from './panels/ExactWorkoutPanel';
import WorkoutExercisePanel from './panels/WorkoutExercisePanel';
import { authorize } from "./api/auth/authorize";
import bridge from '@vkontakte/vk-bridge';
import handleLog from "./helpers/handleLog";
import { useDispatch } from "react-redux";
import { getThunkMe } from "./store/redux/thunks/getThunkMe";
import { getThunkWorkouts } from "./store/redux/thunks/getThunkWorkouts";
import { getThunkTemplates } from "./store/redux/thunks/getThunkTemplates";
import {BottomNav} from "./components/structure/bottomNav/BottomNav"
import Header from "./components/structure/header/Header";
import { ModalRouter } from "./components/structure/modalRouter/ModalRouter";

const AppContent = () => {
  const dispatch = useDispatch();
  const { view, panel } = useActiveVkuiLocation();
  useEffect(() => {
    handleLog("Trying to initialize bridge connection...");
    bridge.send('VKWebAppInit')
      .then(() => console.log('VK Bridge initialized'))
      .catch((err) => console.error('VK Bridge init error:', err));
  }, []);

  useEffect(() => {
    handleLog("Sending auth request to the server...");
    authorize().then(() => {
      dispatch(getThunkMe());
      dispatch(getThunkWorkouts());
      dispatch(getThunkTemplates());
    });
  }, []);


  return (
    <>
      <SplitLayout>
        <SplitCol>
          <ModalRouter />
          <div style={{paddingTop:0}}>
            <Epic tabbar={<BottomNav/>} activeStory={view}>
              <View id="home_view" activePanel={panel || 'home_panel'}>
                <HomePanel id="home_panel" />
              </View>

              <View id="registration_view" activePanel={panel || "registration_panel"}>
                <RegistrationPanel id="registration_panel" />
              </View>

              <View id="login_view" activePanel={panel || "login_panel"}>
                <LoginPanel id="login_panel" />
              </View>

              <View id="exercises_view" activePanel={panel || "exercises_panel"}>
                <ExercisesPanel id="exercises_panel" />
              </View>

              <View id="workouts_view" activePanel={panel || "workouts_panel"}>
                <WorkoutsPanel id="workouts_panel" />
              </View>

              <View id="exact_workout_view" activePanel={panel || "exact_workout_panel"}>
                <ExactWorkoutPanel id="exact_workout_panel" />
              </View>

              <View id="exact_exercise_view" activePanel={panel || "exact_exercise_panel"}>
                <WorkoutExercisePanel id="exact_exercise_panel" />
              </View>
            </Epic>
          </div>
        </SplitCol>
      </SplitLayout>
    </>
  );
};

export const App = () => {
  const [popout, setPopout] = useState(null)
  return(
  <RouterProvider popout={popout} router={router}>
    <AppContent />
  </RouterProvider>
  )
}

export default App;
