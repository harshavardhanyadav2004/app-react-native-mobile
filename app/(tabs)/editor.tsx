import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AlignHorizontalSpaceAround, AlignVerticalSpaceAround, ArrowLeft, Barcode, Box, Calendar, Camera, ChevronDown, ChevronRight, Circle, Clock, Compass, CreditCard, Divide, File as FileEdit, FileInput, FileSliders, Image as ImageIcon, Layers, LayoutGrid, List, Loader, Map, MessageCircle, MessageSquare, Music2, Navigation, Play, Plus, QrCode, Radio, Save, ScrollText, Square, SquareCheck, Table2, ToggleLeft, Type, Upload, Video } from 'lucide-react-native';
import Animated, { useSharedValue, useAnimatedStyle, withSpring, FadeIn } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DraggableComponent from '../../components/DraggableComponent';
import PropertyPanel from '../../components/PropertyPanel';

type ComponentCategory = 'basic' | 'layout' | 'navigation' | 'media' | 'form' | 'data';
const PANEL_WIDTH = 300;
interface ComponentDefinition {
  type: string;
  icon: React.ReactNode;
  label: string;
  category: ComponentCategory;
  defaultWidth: number;
  defaultHeight: number;
  defaultProps?: Record<string, any>;
}

const COMPONENTS: ComponentDefinition[] = [
  { type: 'button', icon: <Square size={24} color="#fff" />, label: 'Button', category: 'basic', defaultWidth: 150, defaultHeight: 50 },
  { type: 'text', icon: <Type size={24} color="#fff" />, label: 'Text', category: 'basic', defaultWidth: 200, defaultHeight: 40 },
  { type: 'image', icon: <ImageIcon size={24} color="#fff" />, label: 'Image', category: 'basic', defaultWidth: 200, defaultHeight: 200 },
  { type: 'textInput', icon: <MessageSquare size={24} color="#fff" />, label: 'Text Input', category: 'basic', defaultWidth: 200, defaultHeight: 50 },
  { type: 'switch', icon: <ToggleLeft size={24} color="#fff" />, label: 'Switch', category: 'basic', defaultWidth: 60, defaultHeight: 30 },
  { type: 'checkbox', icon: <SquareCheck size={24} color="#fff" />, label: 'Checkbox', category: 'basic', defaultWidth: 24, defaultHeight: 24 },
  { type: 'radio', icon: <Radio size={24} color="#fff" />, label: 'Radio Button', category: 'basic', defaultWidth: 24, defaultHeight: 24 },
  { type: 'progress', icon: <Loader size={24} color="#fff" />, label: 'Progress Bar', category: 'basic', defaultWidth: 200, defaultHeight: 10 },
  { type: 'slider', icon: <FileSliders size={24} color="#fff" />, label: 'Slider', category: 'basic', defaultWidth: 200, defaultHeight: 40 },

  // Layout Components
  { type: 'container', icon: <Box size={24} color="#fff" />, label: 'Container', category: 'layout', defaultWidth: 300, defaultHeight: 200 },
  { type: 'row', icon: <AlignHorizontalSpaceAround size={24} color="#fff" />, label: 'Row', category: 'layout', defaultWidth: 300, defaultHeight: 100 },
  { type: 'column', icon: <AlignVerticalSpaceAround size={24} color="#fff" />, label: 'Column', category: 'layout', defaultWidth: 100, defaultHeight: 300 },
  { type: 'grid', icon: <LayoutGrid size={24} color="#fff" />, label: 'Grid', category: 'layout', defaultWidth: 300, defaultHeight: 300 },
  { type: 'divider', icon: <Divide size={24} color="#fff" />, label: 'Divider', category: 'layout', defaultWidth: 300, defaultHeight: 1 },
  { type: 'card', icon: <CreditCard size={24} color="#fff" />, label: 'Card', category: 'layout', defaultWidth: 300, defaultHeight: 200 },
  { type: 'list', icon: <List size={24} color="#fff" />, label: 'List', category: 'layout', defaultWidth: 300, defaultHeight: 400 },
  { type: 'scrollView', icon: <ScrollText size={24} color="#fff" />, label: 'ScrollView', category: 'layout', defaultWidth: 300, defaultHeight: 400 },
  { type: 'modal', icon: <MessageCircle size={24} color="#fff" />, label: 'Modal', category: 'layout', defaultWidth: 300, defaultHeight: 400 },
  { type: 'accordion', icon: <ChevronRight size={24} color="#fff" />, label: 'Accordion', category: 'layout', defaultWidth: 300, defaultHeight: 200 },

  // Navigation Components
  { type: 'tabBar', icon: <Navigation size={24} color="#fff" />, label: 'Tab Bar', category: 'navigation', defaultWidth: 300, defaultHeight: 60 },
  { type: 'drawer', icon: <Square size={24} color="#fff" />, label: 'Drawer Menu', category: 'navigation', defaultWidth: 300, defaultHeight: 600 },
  { type: 'stack', icon: <Layers size={24} color="#fff" />, label: 'Navigation Stack', category: 'navigation', defaultWidth: 300, defaultHeight: 600 },
  { type: 'breadcrumbs', icon: <Compass size={24} color="#fff" />, label: 'Breadcrumbs', category: 'navigation', defaultWidth: 300, defaultHeight: 40 },

  // Media Components
  { type: 'video', icon: <Video size={24} color="#fff" />, label: 'Video Player', category: 'media', defaultWidth: 300, defaultHeight: 200 },
  { type: 'audio', icon: <Music2 size={24} color="#fff" />, label: 'Audio Player', category: 'media', defaultWidth: 300, defaultHeight: 80 },
  { type: 'lottie', icon: <Play size={24} color="#fff" />, label: 'Lottie Animation', category: 'media', defaultWidth: 200, defaultHeight: 200 },
  { type: 'map', icon: <Map size={24} color="#fff" />, label: 'Map View', category: 'media', defaultWidth: 300, defaultHeight: 300 },

  // Form Components
  { type: 'datePicker', icon: <Calendar size={24} color="#fff" />, label: 'Date Picker', category: 'form', defaultWidth: 200, defaultHeight: 50 },
  { type: 'timePicker', icon: <Clock size={24} color="#fff" />, label: 'Time Picker', category: 'form', defaultWidth: 200, defaultHeight: 50 },
  { type: 'dropdown', icon: <ChevronDown size={24} color="#fff" />, label: 'Dropdown', category: 'form', defaultWidth: 200, defaultHeight: 50 },
  { type: 'fileUpload', icon: <Upload size={24} color="#fff" />, label: 'File Upload', category: 'form', defaultWidth: 200, defaultHeight: 100 },

  // Data Components
  { type: 'dataTable', icon: <Table2 size={24} color="#fff" />, label: 'Data Table', category: 'data', defaultWidth: 400, defaultHeight: 300 },
  { type: 'qrScanner', icon: <QrCode size={24} color="#fff" />, label: 'QR Scanner', category: 'data', defaultWidth: 300, defaultHeight: 300 },
  { type: 'barcodeScanner', icon: <Barcode size={24} color="#fff" />, label: 'Barcode Scanner', category: 'data', defaultWidth: 300, defaultHeight: 300 },
  { type: 'richText', icon: <FileEdit size={24} color="#fff" />, label: 'Rich Text Editor', category: 'data', defaultWidth: 300, defaultHeight: 200 },
  { type: 'camera', icon: <Camera size={24} color="#fff" />, label: 'Camera', category: 'data', defaultWidth: 300, defaultHeight: 400 },
];

interface DraggableComponentData {
  id: string;
  type: string;
  x: number;
  y: number;
  width: number;
  height: number;
  text?: string;
  color?: string;
  backgroundColor?: string;
  props?: Record<string, any>;

}

export default function EditorScreen() {
  const insets = useSafeAreaInsets();
  const [components, setComponents] = useState<DraggableComponentData[]>([]);
  const [selectedComponent, setSelectedComponent] = useState<string | null>(null);
  const [isComponentsPanelOpen, setIsComponentsPanelOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState<ComponentCategory>('basic');
  const [isDragging, setIsDragging] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const componentsPanelWidth = useSharedValue(0);
  const [selectedComponentId, setSelectedComponentId] = useState(null);
const [showProperties, setShowProperties] = useState(false);
const [isClosing, setIsClosing] = useState(false);


// Function to handle showing properties
const handleShowProperties = (componentId: React.SetStateAction<null>) => {
  setSelectedComponentId(componentId);
  setShowProperties(true);
};

const closeComponentsPanel = () => {
  setIsClosing(true); 
  componentsPanelWidth.value = withSpring(0);
  setIsComponentsPanelOpen(false);
  setTimeout(() => setIsClosing(false), 500); 
};
const toggleComponentsPanel = () => {
  if (isClosing) return;
  if (componentsPanelWidth.value === 0) {
    // Open Panel
    componentsPanelWidth.value = withSpring(300);
  } else {
    // Close Panel
    componentsPanelWidth.value = withSpring(0);
  }
  setIsComponentsPanelOpen(!isComponentsPanelOpen);
};

  const componentsPanelStyle = useAnimatedStyle(() => ({
    width: componentsPanelWidth.value,
  }));

  const addComponent = (componentDef: ComponentDefinition) => {
    const newComponent: DraggableComponentData = {
      id: `component-${Date.now()}`,
      type: componentDef.type,
      x: 100,
      y: 200,
      width: componentDef.defaultWidth,
      height: componentDef.defaultHeight,
      props: componentDef.defaultProps,
      backgroundColor: '#6d28d9',
      color: '#ffffff',
    };

    setComponents([...components, newComponent]);
  };

  const updateComponent = (id: string, updates: Partial<DraggableComponentData>) => {
    setComponents(components.map(component =>
      component.id === id ? { ...component, ...updates } : component
    ));
  };

  const deleteComponent = (id: string) => {
    setComponents(components.filter(component => component.id !== id));
    setSelectedComponent(null);
  };

  const handleSave = () => {
    setIsLoading(true);
    // Implement save functionality
    setTimeout(() => {
      setIsLoading(false);
    }, 1500);
  };
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <View style={[styles.container, { paddingTop: insets.top }]}>
        <LinearGradient
          colors={['#1e1b4b', '#312e81', '#4338ca']}
          style={StyleSheet.absoluteFill}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        <View style={styles.header}>
          <Text style={styles.title}>App Editor</Text>
          <TouchableOpacity
            style={styles.saveButton}
            onPress={handleSave}
            disabled={isLoading}
          >
            {isLoading ? (
              <Text style={styles.saveButtonText}>Saving...</Text>
            ) : (
              <>
                <Save size={18} color="#fff" style={{ marginRight: 5 }} />
                <Text style={styles.saveButtonText}>Save</Text>
              </>
            )}
          </TouchableOpacity>
        </View>

        <View style={styles.editorContainer}>
          <View style={styles.phoneFrame}>
            <View style={styles.phoneHeader}>
              <View style={styles.phoneNotch} />
            </View>
            <View style={styles.phoneContent}>
              {components.map((component) => (
                <DraggableComponent
                 key={component.id}
                  {...component}
                  isSelected={selectedComponent === component.id}
                  onSelect={setSelectedComponent}
                  onUpdate={updateComponent}
                  onDelete={deleteComponent} 
                  onShowProperties={handleShowProperties}
                          />
              ))}
            </View>
            <View style={styles.phoneFooter}>
              <View style={styles.phoneHomeIndicator} />
            </View>
          </View>
        </View>

        <TouchableOpacity
          style={styles.fabButton}
          onPress={toggleComponentsPanel}
        >
          <LinearGradient
            colors={['#8b5cf6', '#6d28d9']}
            style={styles.fabGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Plus size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>

        <Animated.View style={[styles.componentsPanel, componentsPanelStyle]}>
          <View style={styles.componentsPanelHeader}>
            <Text style={styles.componentsPanelTitle}>Components</Text>
            <TouchableOpacity onPress={closeComponentsPanel}>
              <ArrowLeft size={24} color="#fff" />
            </TouchableOpacity>
          </View>

          <ScrollView 
            horizontal 
            style={styles.categoriesScroll}
            showsHorizontalScrollIndicator={false}
          >
            {[
              { id: 'basic', label: 'Basic UI', icon: <Square size={20} color="#fff" /> },
              { id: 'layout', label: 'Layout', icon: <LayoutGrid size={20} color="#fff" /> },
              { id: 'navigation', label: 'Navigation', icon: <Navigation size={20} color="#fff" /> },
              { id: 'media', label: 'Media', icon: <Video size={20} color="#fff" /> },
              { id: 'form', label: 'Form', icon: <FileInput size={20} color="#fff" /> },
              { id: 'data', label: 'Data', icon: <Table2 size={20} color="#fff" /> },
            ].map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryButton,
                  selectedCategory === category.id && styles.categoryButtonActive
                ]}
                onPress={() => setSelectedCategory(category.id as ComponentCategory)}
              >
                {category.icon}
                <Text style={[
                  styles.categoryButtonText,
                  selectedCategory === category.id && styles.categoryButtonTextActive
                ]}>
                  {category.label}
                </Text>
              </TouchableOpacity>
            ))}
          </ScrollView>

          <ScrollView style={styles.componentsList}>
            {COMPONENTS.filter(c => c.category === selectedCategory).map((component) => (
              <TouchableOpacity
                key={component.type}
                style={styles.componentItem}
                onPress={() => addComponent(component)}
              >
                {component.icon}
                <Text style={styles.componentItemText}>{component.label}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </Animated.View>
        {showProperties && selectedComponentId && (
  <PropertyPanel 
    component={components.find(comp => comp.id === selectedComponentId)}
    onClose={() => setShowProperties(false)}  // Ensure this function is called
    onUpdateProperty={(property: string, value: any) => {
      setComponents(prevComponents =>
        prevComponents.map(comp =>
          comp.id === selectedComponentId ? { ...comp, [property]: value } : comp
        )
      );
    }}  
  />
)}

      </View>
    </GestureHandlerRootView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 15,
  },
  title: {
    fontSize: 20,
    fontWeight: '600',
    color: '#f8fafc',
  },
  saveButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#6d28d9',
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 8,
  },
  saveButtonText: {
    fontSize: 14,
    color: '#fff',
    fontWeight: '500',
  },
  editorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  phoneFrame: {
    width: 280,
    height: 560,
    backgroundColor: '#1e293b',
    borderRadius: 30,
    overflow: 'hidden',
    borderWidth: 8,
    borderColor: '#334155',
  },
  phoneHeader: {
    height: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneNotch: {
    width: 120,
    height: 20,
    backgroundColor: '#000',
    borderRadius: 10,
  },
  phoneContent: {
    flex: 1,
    backgroundColor: '#0f172a',
    position: 'relative',
  },
  phoneFooter: {
    height: 30,
    backgroundColor: '#000',
    justifyContent: 'center',
    alignItems: 'center',
  },
  phoneHomeIndicator: {
    width: 100,
    height: 5,
    backgroundColor: '#fff',
    borderRadius: 3,
  },
  componentsPanel: {
    position: 'absolute',
    top: 0,
    right: 0,
    height: '100%',
    backgroundColor: 'rgba(15, 23, 42, 0.95)',
    borderLeftWidth: 1,
    borderLeftColor: 'rgba(255, 255, 255, 0.1)',
    zIndex: 10,
  },
  componentsPanelHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  componentsPanelTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#f8fafc',
  },
  categoriesScroll: {
    flexGrow: 0,
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginRight: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
  },
  categoryButtonActive: {
    backgroundColor: '#6d28d9',
  },
  categoryButtonText: {
    fontSize: 14,
    color: '#94a3b8',
    marginLeft: 8,
    fontWeight: '500',
  },
  categoryButtonTextActive: {
    color: '#fff',
  },
  componentsList: {
    flex: 1,
    padding: 15,
  },
  componentItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 10,
    marginBottom: 10,
  },
  componentItemText: {
    fontSize: 16,
    color: '#f8fafc',
    marginLeft: 15,
    fontWeight: '500',
  },
  fabButton: {
    position: 'absolute',
    bottom: 90,
    right: 20,
    width: 56,
    height: 56,
    borderRadius: 28,
    overflow: 'hidden',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 3,
  },
  fabGradient: {
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
});

