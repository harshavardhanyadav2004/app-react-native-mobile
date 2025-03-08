import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Plus, Search, Filter } from 'lucide-react-native';
import Animated, { FadeInUp, FadeInRight } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';

type Project = {
  id: string;
  name: string;
  description: string;
  lastEdited: string;
  thumbnail: string;
};

const PROJECTS: Project[] = [
  {
    id: '1',
    name: 'E-Commerce App',
    description: 'Mobile shopping experience with cart and checkout',
    lastEdited: '2 hours ago',
    thumbnail: 'https://images.unsplash.com/photo-1607082349566-187342175e2f?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '2',
    name: 'Social Media Feed',
    description: 'Instagram-like feed with stories and posts',
    lastEdited: 'Yesterday',
    thumbnail: 'https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?q=80&w=300&auto=format&fit=crop',
  },
  {
    id: '3',
    name: 'Task Manager',
    description: 'Productivity app with task lists and reminders',
    lastEdited: '3 days ago',
    thumbnail: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?q=80&w=300&auto=format&fit=crop',
  },
];

export default function ProjectsScreen() {
  const insets = useSafeAreaInsets();
  const [projects, setProjects] = useState<Project[]>(PROJECTS);

  const renderProjectItem = ({ item, index }: { item: Project; index: number }) => (
    <Animated.View entering={FadeInUp.delay(index * 100).duration(600)}>
      <TouchableOpacity
        style={styles.projectCard}
        onPress={() => router.push('/(tabs)/editor')}
      >
        <Image source={{ uri: item.thumbnail }} style={styles.projectThumbnail} />
        <View style={styles.projectInfo}>
          <Text style={styles.projectName}>{item.name}</Text>
          <Text style={styles.projectDescription}>{item.description}</Text>
          <Text style={styles.projectLastEdited}>Last edited: {item.lastEdited}</Text>
        </View>
      </TouchableOpacity>
    </Animated.View>
  );

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#4338ca']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>Hello, Harsha</Text>
          <Text style={styles.title}>Your Projects</Text>
        </View>
        <TouchableOpacity style={styles.profileButton}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?q=80&w=100&auto=format&fit=crop' }}
            style={styles.profileImage}
          />
        </TouchableOpacity>
      </View>

      <Animated.View entering={FadeInRight.duration(800)} style={styles.searchContainer}>
        <View style={styles.searchInputContainer}>
          <Search size={20} color="#94a3b8" style={styles.searchIcon} />
          <Text style={styles.searchPlaceholder}>Search projects...</Text>
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#fff" />
        </TouchableOpacity>
      </Animated.View>

      <FlatList
        data={projects}
        renderItem={renderProjectItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.projectsList}
        showsVerticalScrollIndicator={false}
      />

      <TouchableOpacity
        style={styles.fabButton}
        onPress={() => router.push('/(tabs)/editor')}
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
    </View>
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
    paddingTop: 20,
    paddingBottom: 10,
  },
  greeting: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#94a3b8',
    marginBottom: 4,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 28,
    color: '#f8fafc',
  },
  profileButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    overflow: 'hidden',
    borderWidth: 2,
    borderColor: '#8b5cf6',
  },
  profileImage: {
    width: '100%',
    height: '100%',
  },
  searchContainer: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginVertical: 20,
  },
  searchInputContainer: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    paddingHorizontal: 15,
    paddingVertical: 12,
    marginRight: 10,
  },
  searchIcon: {
    marginRight: 10,
  },
  searchPlaceholder: {
    fontFamily: 'Inter-Regular',
    color: '#94a3b8',
    fontSize: 16,
  },
  filterButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 12,
    width: 48,
    height: 48,
    justifyContent: 'center',
    alignItems: 'center',
  },
  projectsList: {
    padding: 20,
    paddingBottom: 100,
  },
  projectCard: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderRadius: 16,
    overflow: 'hidden',
    marginBottom: 20,
  },
  projectThumbnail: {
    width: '100%',
    height: 160,
  },
  projectInfo: {
    padding: 16,
  },
  projectName: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#f8fafc',
    marginBottom: 4,
  },
  projectDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#cbd5e1',
    marginBottom: 8,
  },
  projectLastEdited: {
    fontFamily: 'Inter-Regular',
    fontSize: 12,
    color: '#94a3b8',
  },
  fabButton: {
    position: 'absolute',
    bottom: 30,
    right: 30,
    width: 60,
    height: 60,
    borderRadius: 30,
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