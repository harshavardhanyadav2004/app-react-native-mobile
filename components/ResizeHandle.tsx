import React from 'react';
import { View, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
} from 'react-native-reanimated';

interface ResizeHandleProps {
  position: 'topLeft' | 'topRight' | 'bottomLeft' | 'bottomRight';
  onResize: (dx: number, dy: number) => void;
}

export default function ResizeHandle({ position, onResize }: ResizeHandleProps) {
  const translateX = useSharedValue(0);
  const translateY = useSharedValue(0);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: () => {
      translateX.value = 0;
      translateY.value = 0;
    },
    onActive: (event) => {
      translateX.value = event.translationX;
      translateY.value = event.translationY;
      onResize(event.translationX, event.translationY);
    },
    onEnd: () => {
      translateX.value = 0;
      translateY.value = 0;
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: translateX.value },
      { translateY: translateY.value },
    ],
  }));

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.handle,
          styles[position],
          animatedStyle,
        ]}
      >
        <View style={styles.handleInner} />
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  handle: {
    position: 'absolute',
    width: 24,
    height: 24,
    justifyContent: 'center',
    alignItems: 'center',
    zIndex: 100,
  },
  handleInner: {
    width: 12,
    height: 12,
    backgroundColor: '#8b5cf6',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#fff',
  },
  topLeft: {
    top: -12,
    left: -12,
  },
  topRight: {
    top: -12,
    right: -12,
  },
  bottomLeft: {
    bottom: -12,
    left: -12,
  },
  bottomRight: {
    bottom: -12,
    right: -12,
  },
});