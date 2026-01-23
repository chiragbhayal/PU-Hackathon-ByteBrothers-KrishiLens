import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../contexts/auth-context';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, orderBy, limit, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function DashboardScreen() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [recentScans, setRecentScans] = useState([]);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'scans'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc'),
      limit(3)
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scans = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setRecentScans(scans);
    });

    return () => unsubscribe();
  }, [user]);

  const getTimeAgo = (timestamp) => {
    const now = new Date();
    const scanTime = timestamp.toDate();
    const diffMs = now - scanTime;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffDays = Math.floor(diffHours / 24);
    
    if (diffDays > 0) {
      return `${diffDays} ${diffDays === 1 ? t('dayAgo') : t('daysAgo')}`;
    } else if (diffHours > 0) {
      return `${diffHours} ${diffHours === 1 ? t('hourAgo') : t('hoursAgo')}`;
    } else {
      return t('justNow');
    }
  };

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
          
          {recentScans.length > 0 ? (
            recentScans.map((scan) => (
              <View key={scan.id} style={styles.activityCard}>
                <View style={[
                  styles.activityIcon,
                  { backgroundColor: scan.result?.severity === 'high' ? '#FF5722' : scan.result?.severity === 'moderate' ? '#FF9800' : '#2E7D32' }
                ]}>
                  <Ionicons 
                    name={scan.result?.severity === 'high' ? 'warning' : 'leaf'} 
                    size={24} 
                    color="#FFFFFF" 
                  />
                </View>
                <View style={styles.activityContent}>
                  <Text style={styles.activityTitle}>
                    {scan.result?.disease || t('cropAnalysisComplete')}
                  </Text>
                  <Text style={styles.activitySubtitle}>
                    {getTimeAgo(scan.timestamp)}
                  </Text>
                </View>
              </View>
            ))
          ) : (
            <View style={styles.activityCard}>
              <View style={styles.activityIcon}>
                <Ionicons name="leaf" size={24} color="#FFFFFF" />
              </View>
              <View style={styles.activityContent}>
                <Text style={styles.activityTitle}>{t('noRecentActivity')}</Text>
                <Text style={styles.activitySubtitle}>{t('startScanning')}</Text>
              </View>
            </View>
          )}
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