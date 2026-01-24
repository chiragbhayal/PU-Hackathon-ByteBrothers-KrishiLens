import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/auth-context';
import { useLanguage } from '../../contexts/language-context';
import { useStats } from '../../contexts/stats-context';
import { Ionicons } from '@expo/vector-icons';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { t, language } = useLanguage();
  const { stats } = useStats();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/bg.jpeg')} 
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient 
        colors={['rgba(27, 94, 32, 0.7)', 'rgba(46, 125, 50, 0.7)', 'rgba(76, 175, 80, 0.7)']} 
        style={styles.overlay}
      >
      <View style={styles.header}>
        <View>
          <Text style={styles.greeting}>{t('welcomeBack2')}</Text>
          <Text style={styles.userEmail}>{user?.displayName || user?.email?.split('@')[0] || 'User'}</Text>
        </View>
        <TouchableOpacity onPress={() => router.push('/profile')} style={styles.logoutButton}>
          <Ionicons name="person-outline" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <ScrollView style={styles.content} contentContainerStyle={styles.contentContainer}>
        <View style={styles.quickActions}>
          <Text style={styles.sectionTitle}>{t('quickActions')}</Text>
          
          <View style={styles.actionGrid}>
            <TouchableOpacity 
              style={styles.squareActionCard}
              onPress={() => router.push('/crop-selection')}
            >
              <View style={[styles.squareActionIcon, { backgroundColor: '#FF5722' }]}>
                <Ionicons name="camera" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.squareActionTitle}>{t('scanCrop')}</Text>
              <Text style={styles.squareActionSubtitle}>{t('scanCropDesc')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.squareActionCard}
              onPress={() => router.push('/history')}
            >
              <View style={[styles.squareActionIcon, { backgroundColor: '#FF9800' }]}>
                <Ionicons name="time" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.squareActionTitle}>{t('scanHistory')}</Text>
              <Text style={styles.squareActionSubtitle}>{t('scanHistoryDesc')}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.squareActionCard}
              onPress={() => router.push('/land-rent')}
            >
              <View style={[styles.squareActionIcon, { backgroundColor: '#795548' }]}>
                <Ionicons name="map-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.squareActionTitle}>{language === 'hi' ? 'जमीन किराये पर' : 'Land Rent'}</Text>
              <Text style={styles.squareActionSubtitle}>{language === 'hi' ? 'किराये पर' : 'Rent'}</Text>
            </TouchableOpacity>

            <TouchableOpacity 
              style={styles.squareActionCard}
              onPress={() => router.push('/schemes')}
            >
              <View style={[styles.squareActionIcon, { backgroundColor: '#9C27B0' }]}>
                <Ionicons name="library-outline" size={32} color="#FFFFFF" />
              </View>
              <Text style={styles.squareActionTitle}>{language === 'hi' ? 'योजनाएं' : 'Schemes'}</Text>
              <Text style={styles.squareActionSubtitle}>{language === 'hi' ? 'योजनाएं' : 'Schemes'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <View style={styles.stats}>
          <Text style={styles.sectionTitle}>{t('yourStats')}</Text>
          <View style={styles.statsGrid}>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.totalScans}</Text>
              <Text style={styles.statLabel}>Total Scans</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.healthyPlants}</Text>
              <Text style={styles.statLabel}>Healthy Plants</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.diseasedPlants}</Text>
              <Text style={styles.statLabel}>Diseased Plants</Text>
            </View>
            <View style={styles.statCard}>
              <Text style={styles.statNumber}>{stats.plantsHealed}</Text>
              <Text style={styles.statLabel}>Plants Healed</Text>
            </View>
          </View>
        </View>
       </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    paddingTop: 60,
  },
  greeting: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  userEmail: {
    fontSize: 14,
    color: '#C8E6C9',
    marginTop: 4,
    fontWeight: '500',
  },
  logoutButton: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  contentContainer: {
    paddingBottom: 100,
  },
  quickActions: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  actionGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
    justifyContent: 'space-between',
  },
  squareActionCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  squareActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  squareActionTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    letterSpacing: 0.3,
    textAlign: 'center',
  },
  squareActionSubtitle: {
    fontSize: 12,
    color: '#4CAF50',
    marginTop: 4,
    fontWeight: '500',
    textAlign: 'center',
  },
  actionCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  actionIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 6,
    elevation: 4,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    letterSpacing: 0.3,
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
    fontWeight: '500',
  },
  stats: {
    padding: 20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  statCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.2,
    shadowRadius: 10,
    elevation: 6,
  },
  statNumber: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#2E7D32',
    letterSpacing: 0.5,
  },
  statLabel: {
    fontSize: 14,
    color: '#1B5E20',
    marginTop: 8,
    fontWeight: '600',
  },
});