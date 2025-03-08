import React from 'react';
import { View, Text, TextInput, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { X } from 'lucide-react-native';
import Animated, { FadeInRight, FadeOutRight } from 'react-native-reanimated';
import ColorPicker from './ColorPicker';

interface PropertyPanelProps {
  component: any;
  onUpdateProperty: (property: string, value: any) => void;
  onClose: () => void;
}

export default function PropertyPanel({ component, onUpdateProperty, onClose }: PropertyPanelProps) {
  if (!component) return null;

  return (
    <Animated.View 
      style={styles.container}
      entering={FadeInRight}
      exiting={FadeOutRight}
    >
      <View style={styles.header}>
        <Text style={styles.title}>Properties</Text>
        <TouchableOpacity onPress={onClose}>
          <X size={24} color="#fff" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content}>
        {/* Position Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Position</Text>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>X</Text>
              <TextInput
                style={styles.input}
                value={String(Math.round(component?.x || 0))}
                onChangeText={(value) => onUpdateProperty('x', Number(value))}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Y</Text>
              <TextInput
                style={styles.input}
                value={String(Math.round(component?.y || 0))}
                onChangeText={(value) => onUpdateProperty('y', Number(value))}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Size Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Size</Text>
          <View style={styles.row}>
            <View style={styles.field}>
              <Text style={styles.label}>Width</Text>
              <TextInput
                style={styles.input}
                value={String(Math.round(component?.width || 100))}
                onChangeText={(value) => onUpdateProperty('width', Number(value))}
                keyboardType="numeric"
              />
            </View>
            <View style={styles.field}>
              <Text style={styles.label}>Height</Text>
              <TextInput
                style={styles.input}
                value={String(Math.round(component?.height || 100))}
                onChangeText={(value) => onUpdateProperty('height', Number(value))}
                keyboardType="numeric"
              />
            </View>
          </View>
        </View>

        {/* Colors Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Colors</Text>
          <View style={styles.field}>
            <Text style={styles.label}>Background Color</Text>
            <ColorPicker
              selectedColor={component?.backgroundColor || '#ffffff'}
              onColorChange={(color: any) => onUpdateProperty('backgroundColor', color)}
            />
          </View>
          <View style={styles.field}>
            <Text style={styles.label}>Text Color</Text>
            <ColorPicker
              selectedColor={component?.color || '#000000'}
              onColorChange={(color: any) => onUpdateProperty('color', color)}
            />
          </View>
        </View>

        {/* Content Section for Text & Button Components */}
        {(component?.type === 'text' || component?.type === 'button') && (
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>Content</Text>
            <View style={styles.field}>
              <Text style={styles.label}>Text</Text>
              <TextInput
                style={styles.input}
                value={component?.text || ''}
                onChangeText={(value) => onUpdateProperty('text', value)}
                placeholder="Enter text..."
                placeholderTextColor="#64748b"
              />
            </View>
          </View>
        )}
      </ScrollView>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    right: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: '#1e1b4b',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 10, // Ensure it appears above other components
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  section: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#fff',
    marginBottom: 12,
  },
  row: {
    flexDirection: 'row',
    gap: 12,
  },
  field: {
    flex: 1,
    marginBottom: 12,
  },
  label: {
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 4,
  },
  input: {
    backgroundColor: '#312e81',
    borderRadius: 6,
    padding: 8,
    color: '#fff',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.1)',
  },
});
