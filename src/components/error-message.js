// ErrorMessage.js
import React, { useEffect, useState, useRef } from "react";
import { Animated, StyleSheet, Text } from "react-native";
import withAnimation from "../hocs/withAnimation";
import { ErrorIcon } from "./icons";

const ErrorMessage = ({ message, duration = 3000, style }) => {
  const [visible, setVisible] = useState(true);
  const fadeOutAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    setVisible(true);
    fadeOutAnim.setValue(1);
  }, [message, fadeOutAnim]);

  useEffect(() => {
    const timer = setTimeout(() => {
      Animated.timing(fadeOutAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: true,
      }).start(() => setVisible(false));
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, fadeOutAnim]);

  if (!visible) return null;

  return (
    <Animated.View style={[styles.container, { opacity: fadeOutAnim }, style]}>
      <ErrorIcon size={20} color="#ff5c5c" />
      <Text style={styles.text}>{message}</Text>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#2c2c2c",
    padding: 12,
    marginVertical: 10,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.5,
    shadowRadius: 3,
    elevation: 4,
  },
  text: {
    color: "#ff5c5c",
    fontWeight: "600",
    marginLeft: 8,
  },
});

export default withAnimation(ErrorMessage);
