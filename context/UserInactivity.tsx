import { useRef } from "react";
import { AppState } from "react-native";

export const UserInactivityProvider = ({ children }: any) => {
  // We get the current state of the application
  const appState = useRef(AppState.currentState);
  return children;
}
