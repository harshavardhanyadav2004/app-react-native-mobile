import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Linking } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ExternalLink, Code, Layers, Zap, Users, Star } from 'lucide-react-native';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { LinearGradient } from 'expo-linear-gradient';

export default function AboutScreen() {
  const insets = useSafeAreaInsets();

  const openLink = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <View style={[styles.container, { paddingTop: insets.top }]}>
      <LinearGradient
        colors={['#1e1b4b', '#312e81', '#4338ca']}
        style={StyleSheet.absoluteFill}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      />

      <ScrollView 
        style={styles.scrollView}
        contentContainerStyle={styles.contentContainer}
        showsVerticalScrollIndicator={false}
      >
        <Animated.View entering={FadeInDown.delay(100).duration(800)} style={styles.header}>
          <Image
            source={{ uri: 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=300&auto=format&fit=crop' }}
            style={styles.logo}
          />
          <Text style={styles.title}>AppCraft</Text>
          <Text style={styles.subtitle}>Create beautiful mobile apps with drag and drop</Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(200).duration(800)} style={styles.section}>
          <Text style={styles.sectionTitle}>About the Platform</Text>
          <Text style={styles.sectionText}>
            AppCraft is a powerful drag-and-drop interface that allows anyone to create 
            professional mobile applications without writing code. Our platform combines 
            intuitive design tools with advanced functionality to help you bring your app 
            ideas to life quickly and easily.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(300).duration(800)} style={styles.featuresContainer}>
          <Text style={styles.featuresTitle}>Key Features</Text>
          
          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Layers size={24} color="#8b5cf6" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Drag & Drop Interface</Text>
              <Text style={styles.featureDescription}>
                Easily place and position UI elements anywhere on the screen with our intuitive drag and drop system.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Code size={24} color="#8b5cf6" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>No Coding Required</Text>
              <Text style={styles.featureDescription}>
                Build fully functional apps without writing a single line of code. Perfect for designers and non-technical users.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Zap size={24} color="#8b5cf6" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Real-time Preview</Text>
              <Text style={styles.featureDescription}>
                See your changes instantly with our real-time preview feature. What you see is what you get.
              </Text>
            </View>
          </View>

          <View style={styles.featureCard}>
            <View style={styles.featureIconContainer}>
              <Users size={24} color="#8b5cf6" />
            </View>
            <View style={styles.featureContent}>
              <Text style={styles.featureTitle}>Collaboration</Text>
              <Text style={styles.featureDescription}>
                Work together with your team in real-time. Share projects and collaborate seamlessly.
              </Text>
            </View>
          </View>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(400).duration(800)} style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.sectionText}>
            We believe that app development should be accessible to everyone. Our mission is to democratize 
            mobile app creation by providing powerful tools that don't require technical expertise. 
            We're committed to helping entrepreneurs, designers, and businesses bring their ideas to market 
            faster and more efficiently.
          </Text>
        </Animated.View>

        <Animated.View entering={FadeInDown.delay(500).duration(800)} style={styles.ctaContainer}>
          <LinearGradient
            colors={['#8b5cf6', '#6d28d9']}
            style={styles.ctaGradient}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            <Star size={24} color="#fff" style={styles.ctaIcon} />
            <Text style={styles.ctaTitle}>Ready to build your app?</Text>
            <Text style={styles.ctaText}>
              Start creating your first project today and bring your app idea to life!
            </Text>
            <TouchableOpacity 
              style={styles.ctaButton}
              onPress={() => openLink('https://example.com/get-started')}
            >
              <Text style={styles.ctaButtonText}>Get Started</Text>
              <ExternalLink size={16} color="#6d28d9" style={{ marginLeft: 5 }} />
            </TouchableOpacity>
          </LinearGradient>
        </Animated.View>

        <View style={styles.footer}>
          <Text style={styles.footerText}>© 2025 AppBuilder. All rights reserved.</Text>
          <View style={styles.footerLinks}>
            <TouchableOpacity onPress={() => openLink('https://example.com/terms')}>
              <Text style={styles.footerLink}>Terms</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://example.com/privacy')}>
              <Text style={styles.footerLink}>Privacy</Text>
            </TouchableOpacity>
            <TouchableOpacity onPress={() => openLink('https://example.com/contact')}>
              <Text style={styles.footerLink}>Contact</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
  },
  scrollView: {
    flex: 1,
  },
  contentContainer: {
    paddingBottom: 40,
  },
  header: {
    alignItems: 'center',
    paddingTop: 30,
    paddingBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    borderRadius: 20,
    marginBottom: 20,
  },
  title: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    color: '#f8fafc',
    marginBottom: 8,
  },
  subtitle: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#cbd5e1',
    textAlign: 'center',
    paddingHorizontal: 40,
  },
  section: {
    padding: 20,
    marginBottom: 10,
  },
  sectionTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#f8fafc',
    marginBottom: 15,
  },
  sectionText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#cbd5e1',
    lineHeight: 24,
  },
  featuresContainer: {
    padding: 20,
    marginBottom: 20,
  },
  featuresTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 22,
    color: '#f8fafc',
    marginBottom: 20,
  },
  featureCard: {
    flexDirection: 'row',
    backgroundColor: 'rgba(255, 255, 255, 0.05)',
    borderRadius: 16,
    padding: 20,
    marginBottom: 15,
  },
  featureIconContainer: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 15,
  },
  featureContent: {
    flex: 1,
  },
  featureTitle: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 18,
    color: '#f8fafc',
    marginBottom: 5,
  },
  featureDescription: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#cbd5e1',
    lineHeight: 22,
  },
  ctaContainer: {
    paddingHorizontal: 20,
    marginBottom: 30,
  },
  ctaGradient: {
    borderRadius: 20,
    padding: 30,
    alignItems: 'center',
  },
  ctaIcon: {
    marginBottom: 15,
  },
  ctaTitle: {
    fontFamily: 'Poppins-Bold',
    fontSize: 24,
    color: '#fff',
    marginBottom: 10,
    textAlign: 'center',
  },
  ctaText: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    color: '#f8fafc',
    textAlign: 'center',
    marginBottom: 20,
  },
  ctaButton: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    paddingHorizontal: 25,
    paddingVertical: 12,
    borderRadius: 30,
    alignItems: 'center',
  },
  ctaButtonText: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 16,
    color: '#6d28d9',
  },
  footer: {
    padding: 20,
    alignItems: 'center',
  },
  footerText: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    color: '#94a3b8',
    marginBottom: 15,
  },
  footerLinks: {
    flexDirection: 'row',
  },
  footerLink: {
    fontFamily: 'Inter-Medium',
    fontSize: 14,
    color: '#8b5cf6',
    marginHorizontal: 10,
  },
});