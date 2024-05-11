import { useAuth } from "@clerk/clerk-expo";
import { useRouter } from "expo-router";
import { useEffect, useRef } from "react";
import { AppState, AppStateStatus } from "react-native";

// Storage with MMKV
import { MMKV } from 'react-native-mmkv';
const storage = new MMKV({
  id: 'inactivity-storage'
});


export const UserInactivityProvider = ({ children }: any) => {
  // We get the current state of the application
  const appState = useRef(AppState.currentState);

  // instance of router to redirect when the state change
  const router = useRouter();

  // check if is Signed
  const { isSignedIn } = useAuth();


  // handle App State Changes
  const handleAppStateChanges = async (nextAppState: AppStateStatus) => {
    console.log(">>>>>>>>>>>>>>", nextAppState);
    if (nextAppState === 'background') {
      console.log("------------ going to background, recording time");
      recordStartTime();
    } else if (nextAppState === 'active' && appState.current.match(/background/)) {
      console.log('Recovering from background')
      const elapsedTime = Date.now() - (storage.getNumber('startTime') || 0);
      console.log(" Elapsed time => ", elapsedTime)
      if (elapsedTime > (3 * 1000) && isSignedIn) {
        storage.delete('startTime');
        appState.current = nextAppState;
        router.replace('/(protected)/(modals)/lock');
      }
    }
    appState.current = nextAppState;
  }

  useEffect(() => {
    const subscription = AppState.addEventListener("change", handleAppStateChanges);

    // cleaning
    return () => {
      subscription.remove();
    }
  }, [])

  // record start time 
  const recordStartTime = () => {
    // const now = new Date();
    // storage.set('startTime', now.toISOString());
    storage.set('startTime', Date.now());
  }


  return children;
}
