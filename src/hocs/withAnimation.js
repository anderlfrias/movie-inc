import React, { useEffect, useRef } from "react";
import { Animated } from "react-native";

const withAnimation = (WrappedComponent) => {
  return function WithAnimationComponent({ index, ...props }) {
    const opacity = useRef(new Animated.Value(0)).current;

    useEffect(() => {
      Animated.timing(opacity, {
        toValue: 1,
        duration: 500,
        delay: index * 250,
        useNativeDriver: true,
      }).start();
    }, [opacity, index]);

    return (
      <Animated.View style={{ opacity }}>
        <WrappedComponent {...props} />
      </Animated.View>
    );
  };
};

export default withAnimation;
