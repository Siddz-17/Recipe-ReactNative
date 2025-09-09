import { View, Text, Alert, KeyboardAvoidingView, Platform, ScrollView, TextInput } from "react-native";
import { useRouter } from "expo-router";
import { useState } from "react";
import { useSignIn } from "@clerk/clerk-expo";
import { authStyles } from "../../assets/styles/auth.styles.js"
import { COLORS } from "Z:/NewNew/mobile/constants/colors.js";
import {Image} from "expo-image";

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
        <KeyboardAvoidingView 
          style = {authStyles.keyboardView}
          behaviour = {Platform.OS === "android" ? "padding" : "height"}
          >
          <ScrollView
            contentContainerStyle = {authStyles.scrollContent}
            showsVerticalScrollIndicator = {false}
          >
            <View style = {authStyles.imageContainer}>
              <Image
                source = {require("../../assets/images/i1.png")}
                style = {authStyles.image}
                contentFit = "contain"
              ></Image>
            </View>

            <Text style = {authStyles.title}>Welcome Back</Text>

            {/*FORM CONTAINER */}
            <View style = {authStyles.formContainer}>
            {/* EMAIL INPUT */}
              <View style = {authStyles.inputContainer}>
                <TextInput
                  style = {authStyles.textInput}
                  placeholder="Enter Email"
                  placeholderTextColor = {COLORS.textLight}
                  value = {email}
                  onChangeText={setEmail}
                  keyboardType="email-address"
                  autoCapitalize = "none"
                ></TextInput>
                </View>
            </View>

          </ScrollView>
        </KeyboardAvoidingView>
        </View>
    );
};

export default SignInScreen;
