import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { PanGestureHandler } from 'react-native-gesture-handler';
import Animated, {
  useAnimatedGestureHandler,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
  runOnJS,
} from 'react-native-reanimated';
import { Settings, Trash2 } from 'lucide-react-native';
import ResizeHandle from './ResizeHandle';

interface DraggableComponentProps {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  color?: string;
  backgroundColor?: string;
  isSelected: boolean;
  onSelect: (id: string) => void;
  onUpdate: (id: string, updates: any) => void;
  onDelete: (id: string) => void;
  onShowProperties: (id: string) => void;
}

export default function DraggableComponent({
  id,
  type,
  x,
  y,
  width,
  height,
  text,
  color = '#ffffff',
  backgroundColor = '#6d28d9',
  isSelected,
  onSelect,
  onUpdate,
  onDelete,
  onShowProperties,
}: DraggableComponentProps) {
  const translateX = useSharedValue(x);
  const translateY = useSharedValue(y);

  const gestureHandler = useAnimatedGestureHandler({
    onStart: (_, context: any) => {
      context.startX = translateX.value;
      context.startY = translateY.value;
      runOnJS(onSelect)(id);
    },
    onActive: (event, context) => {
      translateX.value = context.startX + event.translationX;
      translateY.value = context.startY + event.translationY;
    },
    onEnd: () => {
      runOnJS(onUpdate)(id, {
        x: translateX.value,
        y: translateY.value,
      });
    },
  });

  const animatedStyle = useAnimatedStyle(() => ({
    transform: [
      { translateX: withSpring(translateX.value) },
      { translateY: withSpring(translateY.value) },
    ],
    width,
    height,
  }));

  const handleResize = (dx: number, dy: number, corner: string) => {
    let newWidth = width;
    let newHeight = height;
    let newX = translateX.value;
    let newY = translateY.value;

    switch (corner) {
      case 'topLeft':
        newWidth = width - dx;
        newHeight = height - dy;
        newX = translateX.value + dx;
        newY = translateY.value + dy;
        break;
      case 'topRight':
        newWidth = width + dx;
        newHeight = height - dy;
        newY = translateY.value + dy;
        break;
      case 'bottomLeft':
        newWidth = width - dx;
        newHeight = height + dy;
        newX = translateX.value + dx;
        break;
      case 'bottomRight':
        newWidth = width + dx;
        newHeight = height + dy;
        break;
    }

    if (newWidth >= 20 && newHeight >= 20) {
      onUpdate(id, {
        width: newWidth,
        height: newHeight,
        x: newX,
        y: newY,
      });
      translateX.value = newX;
      translateY.value = newY;
    }
  };

  return (
    <PanGestureHandler onGestureEvent={gestureHandler}>
      <Animated.View
        style={[
          styles.container,
          animatedStyle,
          { backgroundColor },
          isSelected && styles.selected,
        ]}
      >
        {isSelected && (
          <>
            <ResizeHandle
              position="topLeft"
              onResize={(dx, dy) => handleResize(dx, dy, 'topLeft')}
            />
            <ResizeHandle
              position="topRight"
              onResize={(dx, dy) => handleResize(dx, dy, 'topRight')}
            />
            <ResizeHandle
              position="bottomLeft"
              onResize={(dx, dy) => handleResize(dx, dy, 'bottomLeft')}
            />
            <ResizeHandle
              position="bottomRight"
              onResize={(dx, dy) => handleResize(dx, dy, 'bottomRight')}
            />
            <View style={styles.controls}>
              <TouchableOpacity
                style={styles.controlButton}
                onPress={() => onShowProperties(id)}
              >
                <Settings size={16} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={[styles.controlButton, styles.deleteButton]}
                onPress={() => onDelete(id)}
              >
                <Trash2 size={16} color="#fff" />
              </TouchableOpacity>
            </View>
          </>
        )}
        <TouchableOpacity
          style={styles.content}
          onPress={() => onSelect(id)}
          activeOpacity={0.8}
        >
          {(type === 'text' || type === 'button') && (
            <Text style={[styles.text, { color }]}>{text || type}</Text>
          )}
        </TouchableOpacity>
      </Animated.View>
    </PanGestureHandler>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
  },
  selected: {
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  content: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
    fontWeight: '500',
  },
  controls: {
    position: 'absolute',
    top: -40,
    right: 0,
    flexDirection: 'row',
    gap: 8,
    padding: 4,
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
    borderRadius: 4,
  },
  controlButton: {
    width: 32,
    height: 32,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#4c1d95',
    borderRadius: 4,
  },
  deleteButton: {
    backgroundColor: '#dc2626',
  },
});