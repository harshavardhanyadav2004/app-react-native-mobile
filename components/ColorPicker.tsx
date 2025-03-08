import React from 'react';
import { View, StyleSheet, TouchableOpacity, Text } from 'react-native';

const COLORS = [
  '#6d28d9', '#dc2626', '#2563eb', '#16a34a', '#ea580c',
  '#84cc16', '#7c3aed', '#14b8a6', '#f59e0b', '#ec4899',
  '#000000', '#ffffff', '#64748b', '#1e293b', '#334155'
];

interface ColorPickerProps {
  selectedColor: string;
  onColorChange: (color: string) => void;
}

export default function ColorPicker({ selectedColor, onColorChange }: ColorPickerProps) {
  return (
    <View style={styles.container}>
      <View style={styles.colorsGrid}>
        {COLORS.map((color) => (
          <TouchableOpacity
            key={color}
            style={[
              styles.colorButton,
              { backgroundColor: color },
              selectedColor === color && styles.selectedColor,
              color === '#ffffff' && styles.whiteColorBorder
            ]}
            onPress={() => onColorChange(color)}
          />
        ))}
      </View>
      <View style={styles.currentColor}>
        <Text style={styles.currentColorLabel}>Selected Color:</Text>
        <View style={[styles.currentColorPreview, { backgroundColor: selectedColor }]} />
        <Text style={styles.currentColorValue}>{selectedColor}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 8,
  },
  colorsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
    marginBottom: 16,
  },
  colorButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    margin: 4,
  },
  selectedColor: {
    borderWidth: 3,
    borderColor: '#8b5cf6',
  },
  whiteColorBorder: {
    borderWidth: 1,
    borderColor: '#e2e8f0',
  },
  currentColor: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  currentColorLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  currentColorPreview: {
    width: 24,
    height: 24,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
  currentColorValue: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
});