import {Redirect, Stack} from 'expo-router'
import {UseAuth} from "@clerk/clerk-expo"
const TabsLayout = () => {
  const { isSignedIn } = UseAuth();

  if (!isSignedIn) return <Redirect href="/(auth)/sign-in" />;
  return <Stack />;
};

export default TabsLayout