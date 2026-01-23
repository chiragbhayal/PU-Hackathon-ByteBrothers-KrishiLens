import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../contexts/auth-context';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { t } = useLanguage();

  return (
    <LinearGradient 
      colors={['#1B5E20', '#2E7D32', '#4CAF50']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('dashboard')}</Text>
        <View style={styles.placeholder} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('recentActivity')}</Text>
          
          <View style={styles.activityCard}>
            <View style={styles.activityIcon}>
              <Ionicons name="leaf" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{t('cropAnalysisComplete')}</Text>
              <Text style={styles.activitySubtitle}>2 {t('hoursAgo')}</Text>
            </View>
          </View>

          <View style={styles.activityCard}>
            <View style={[styles.activityIcon, { backgroundColor: '#FF9800' }]}>
              <Ionicons name="warning" size={24} color="#FFFFFF" />
            </View>
            <View style={styles.activityContent}>
              <Text style={styles.activityTitle}>{t('diseaseDetected')}</Text>
              <Text style={styles.activitySubtitle}>1 {t('dayAgo')}</Text>
            </View>
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('quickTools')}</Text>
          
          <View style={styles.toolsGrid}>
            <TouchableOpacity style={styles.toolCard}>
              <Ionicons name="analytics" size={32} color="#2E7D32" />
              <Text style={styles.toolTitle}>{t('analytics')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolCard} onPress={() => router.push('/language')}>
              <Ionicons name="language" size={32} color="#2E7D32" />
              <Text style={styles.toolTitle}>{t('language')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolCard}>
              <Ionicons name="help-circle" size={32} color="#2E7D32" />
              <Text style={styles.toolTitle}>{t('help')}</Text>
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.toolCard}>
              <Ionicons name="share" size={32} color="#2E7D32" />
              <Text style={styles.toolTitle}>{t('share')}</Text>
            </TouchableOpacity>
          </View>
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
    justifyContent: 'space-between',
    alignItems: 'center',
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
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 40,
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 16,
    letterSpacing: 0.5,
  },
  activityCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  activityIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#2E7D32',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  activitySubtitle: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 2,
  },
  toolsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  toolCard: {
    width: '47%',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    minHeight: 100,
  },
  toolTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#1B5E20',
    marginTop: 8,
  },
});