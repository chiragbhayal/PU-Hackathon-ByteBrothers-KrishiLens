import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function AboutScreen() {
  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>About</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.logoSection}>
          <View style={styles.logoContainer}>
            <Ionicons name="leaf" size={60} color="#FFFFFF" />
          </View>
          <Text style={styles.appName}>KrishiLens</Text>
          <Text style={styles.version}>Version 1.0.0</Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>About KrishiLens</Text>
          <Text style={styles.description}>
            KrishiLens is an AI-powered plant disease detection app designed specifically for farmers and agricultural enthusiasts. 
            Using advanced machine learning technology, we help identify plant diseases quickly and provide actionable treatment recommendations.
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Key Features</Text>
          <View style={styles.featureItem}>
            <Ionicons name="camera" size={20} color="#2E7D32" />
            <Text style={styles.featureText}>AI-powered disease detection</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="medical" size={20} color="#2E7D32" />
            <Text style={styles.featureText}>Treatment recommendations</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="time" size={20} color="#2E7D32" />
            <Text style={styles.featureText}>Scan history tracking</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="language" size={20} color="#2E7D32" />
            <Text style={styles.featureText}>Multi-language support</Text>
          </View>
          <View style={styles.featureItem}>
            <Ionicons name="storefront" size={20} color="#2E7D32" />
            <Text style={styles.featureText}>Agricultural marketplace</Text>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Our Mission</Text>
          <Text style={styles.description}>
            To empower farmers with cutting-edge technology for better crop health management, 
            leading to improved agricultural productivity and sustainable farming practices.
          </Text>
        </View>

        <View style={styles.infoCard}>
          <Text style={styles.copyright}>© 2026 KrishiLens. All rights reserved.</Text>
          <Text style={styles.tagline}>Empowering Agriculture with AI</Text>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  logoSection: {
    alignItems: 'center',
    padding: 30,
  },
  logoContainer: {
    width: 120,
    height: 120,
    borderRadius: 60,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  appName: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  version: {
    fontSize: 16,
    color: '#4CAF50',
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#1B5E20',
    marginLeft: 12,
  },
  infoCard: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  copyright: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  tagline: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2E7D32',
  },
});