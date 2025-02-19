import React, { useEffect, useRef, useState } from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from "react-native";
import Svg, { Circle } from "react-native-svg";

const AnimatedCircle = Animated.createAnimatedComponent(Circle);

const GeneratePlanScreen = ({ navigation }) => {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const [progress, setProgress] = useState(0); // State to store percentage

  useEffect(() => {
    const animation = Animated.timing(animatedValue, {
      toValue: 1, // Progress from 0 to 100%
      duration: 5000, // Animation duration (5 seconds)
      useNativeDriver: false,
    });

    animation.start();

    // Listener to update percentage
    const listener = animatedValue.addListener((v) => {
      setProgress(Math.floor(v.value * 100)); // Convert animated value to percentage
    });

    return () => {
      animatedValue.removeListener(listener);
    };
  }, []);

  // Interpolate strokeDashoffset to animate the circle
  const strokeDashoffset = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [502.4, 0], // Adjusted for larger circle
  });

  const handleNext = () => {
      navigation.navigate('HomeTab');
    };

  return (
    <View style={styles.container}>
      <View style={styles.topContainer}>
        <Image source={require("../../assets/avatar.jpg")} style={styles.profileImage} />
        <Text style={styles.title}>GENERATING THE PLAN FOR YOU...</Text>
      </View>

      {/* Animated Progress Circle */}
      <View style={styles.progressContainer}>
        <Svg height="250" width="250" viewBox="0 0 100 100">
          {/* Background Circle */}
          <Circle cx="50" cy="50" r="45" stroke="gray" strokeWidth="10" fill="none" />

          {/* Animated Progress Circle */}
          <AnimatedCircle
            cx="50"
            cy="50"
            r="45"
            stroke="#E53935"
            strokeWidth="10"
            fill="none"
            strokeDasharray="502.4"
            strokeDashoffset={strokeDashoffset} // Animate this value
            strokeLinecap="round"
          />
        </Svg>

        {/* Centered Progress Text */}
        <Text style={styles.progressText}>{progress}%</Text>
      </View>

      {/* Subtitle (visible after progress reaches 100%) */}
      {progress === 100 && <Text style={styles.subtitle}>Your personal plan is prepared!</Text>}

      <View style={styles.bottomContainer}>
        <TouchableOpacity style={[styles.button, { backgroundColor: "#E53935" }]} onPress={handleNext}>
          <Text style={styles.buttonText}>GET MY PLAN</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

// Styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#121212",
    paddingHorizontal: 20,
    justifyContent: "space-between",
  },
  topContainer: {
    alignItems: "center",
    marginTop: 50,
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginBottom: 20,
  },
  title: {
    color: "white",
    fontSize: 27,
    fontWeight: "800",
    textTransform: "uppercase",
    letterSpacing: 1,
    textAlign: "center",
  },
  progressContainer: {
    justifyContent: "center",
    alignItems: "center",
    position: "relative",
  },
  progressText: {
    position: "absolute",
    color: "#fff",
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
  },
  subtitle: {
    color: "#bbb",
    fontSize: 16,
    textAlign: "center",
    marginBottom: 20,
    marginTop: 10, // Added margin to separate from progress bar
  },
  bottomContainer: {
    paddingBottom: 30,
    alignItems: "center",
    alignSelf: "stretch",
  },
  button: {
    width: "100%",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "white",
    fontSize: 18,
    fontWeight: "bold",
    textTransform: "uppercase",
  },
});

export default GeneratePlanScreen;
