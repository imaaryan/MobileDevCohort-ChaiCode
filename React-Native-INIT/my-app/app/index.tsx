import React, { useState } from "react";
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  ScrollView,
  SafeAreaView,
  Platform,
  KeyboardAvoidingView,
  Image,
} from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";

const HomeScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        style={{ flex: 1 }}
      >
        <ScrollView contentContainerStyle={styles.scrollContainer}>
          <Image
            source={require("../assets/images/green.png")}
            style={styles.logoImage}
          />

          <Text style={styles.mainTitle}>Sign In</Text>
          <Text style={styles.subTitle}>
            Let's experience the joy of telecare AI.
          </Text>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Email Address</Text>
            <View
              style={[
                styles.inputContainer,
                { borderColor: "#8CC63F", borderWidth: 2 },
              ]}
            >
              <MaterialCommunityIcons
                name="email-outline"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.textInput}
                value={email}
                onChangeText={(text) => setEmail(text)}
                placeholder="Email"
              />
            </View>
          </View>

          <View style={styles.inputSection}>
            <Text style={styles.inputLabel}>Password</Text>
            <View style={styles.inputContainer}>
              <MaterialCommunityIcons
                name="lock-outline"
                size={20}
                color="#000"
              />
              <TextInput
                style={styles.textInput}
                value={password}
                onChangeText={(val) => setPassword(val)}
                placeholder="Enter your password..."
                secureTextEntry={!isPasswordVisible}
              />
              <TouchableOpacity
                onPress={() => setIsPasswordVisible(!isPasswordVisible)}
              >
                <MaterialCommunityIcons
                  name={isPasswordVisible ? "eye-outline" : "eye-off-outline"}
                  size={20}
                  color="#ccc"
                />
              </TouchableOpacity>
            </View>
          </View>

          <TouchableOpacity style={styles.loginBtn}>
            <Text style={styles.loginBtnText}>Sign In</Text>
            <MaterialCommunityIcons
              name="arrow-right"
              size={20}
              color="#fff"
              style={{ marginLeft: 5 }}
            />
          </TouchableOpacity>

          <View style={styles.socialRow}>
            <TouchableOpacity style={styles.iconCircle}>
              <MaterialCommunityIcons name="facebook" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <MaterialCommunityIcons name="google" size={24} color="#000" />
            </TouchableOpacity>
            <TouchableOpacity style={styles.iconCircle}>
              <MaterialCommunityIcons name="instagram" size={24} color="#000" />
            </TouchableOpacity>
          </View>

          <Text style={styles.bottomText}>
            Don't have an account?{" "}
            <Text style={{ color: "#8CC63F", fontWeight: "bold" }}>
              Sign Up.
            </Text>
          </Text>
          <TouchableOpacity style={{ marginTop: 15 }}>
            <Text style={{ color: "#8CC63F", fontWeight: "bold" }}>
              Forgot your password?
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
  scrollContainer: {
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 30,
  },
  logoImage: {
    width: 80,
    height: 80,
    marginBottom: 20,
    resizeMode: "contain",
  },
  mainTitle: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#000",
    marginBottom: 10,
  },
  subTitle: {
    fontSize: 14,
    color: "#666",
    marginBottom: 40,
  },
  inputSection: {
    width: "100%",
    marginBottom: 20,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "bold",
    marginBottom: 8,
  },
  inputContainer: {
    flexDirection: "row",
    alignItems: "center",
    borderWidth: 1,
    borderColor: "#eee",
    borderRadius: 20,
    paddingHorizontal: 15,
    height: 55,
    backgroundColor: "#fff",
  },
  textInput: {
    flex: 1,
    marginLeft: 10,
    fontSize: 16,
  },
  loginBtn: {
    backgroundColor: "#8CC63F",
    width: "100%",
    height: 55,
    borderRadius: 25,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    marginTop: 10,
    marginBottom: 30,
  },
  loginBtnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
  socialRow: {
    flexDirection: "row",
    marginBottom: 30,
  },
  iconCircle: {
    width: 50,
    height: 50,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#eee",
    alignItems: "center",
    justifyContent: "center",
    marginHorizontal: 10,
  },
  bottomText: {
    fontSize: 14,
    color: "#000",
  },
});

export default HomeScreen;
