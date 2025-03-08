import React, { useEffect } from 'react';
import { View, StyleSheet, Animated, Easing } from 'react-native';

interface LoadingIndicatorProps {
  size?: number;
  color?: string;
}

export default function LoadingIndicator({ 
  size = 40, 
  color = '#8b5cf6' 
}: LoadingIndicatorProps) {
  const spinValue = new Animated.Value(0);

  useEffect(() => {
    const spinAnimation = Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 1500,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    );
    
    spinAnimation.start();

    return () => {
      spinAnimation.stop();
    };
  }, [spinValue]);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  return (
    <View style={styles.container}>
      <Animated.View 
        style={[
          styles.spinner, 
          { 
            width: size, 
            height: size, 
            borderColor: color,
            transform: [{ rotate: spin }],
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  spinner: {
    borderWidth: 3,
    borderRadius: 50,
    borderTopColor: 'transparent',
  },
});