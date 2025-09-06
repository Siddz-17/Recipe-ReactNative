import { View, Text, Alert, KeyboardAvoidingView } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { authStyles } from "../../assets/styles/auth.styles.js"
const SignInScreen = () => {
    const router = useRouter();
    const { signIn, setActive, isLoaded } = useSignIn();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    
/// 1:49:47 ( 11. Handling Sign In )
    const handleSignIn = async () => {
      if (!email || !password){
        Alert.alert("Error", "Email and password are required");
        return
      }
      if (!isLoaded) return;

      setLoading(true);
      try {
        const signInAttempt =  await signIn.create({
          identifier: email,
          password
        })
        if (signInAttempt.status === "complete"){
          await setActive({ session: signInAttempt.createdSessionId });
        } else {
          Alert.alert("Error", "Sign in failed");
          console.error(JSON.stringify(signInAttempt, null, 2));

        }
      } catch (err) {
        Alert.alert("Error", err.errors?.[0]?.message || "Something went wrong");
        console.error(JSON.stringify(err, null, 2));
    } finally {
      setLoading(false);
    }
  };
    return (
        <View style = {authStyles.container}>
        <KeyboardAvoidingView >
          style = {authStyles.keyboardView}
          behaviour = ""
        </KeyboardAvoidingView>
        </View>
    );
};

export default SignInScreen;
