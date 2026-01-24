import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../contexts/auth-context';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../config/firebase';

export default function HistoryScreen() {
  const { user } = useAuth();
  const { t } = useLanguage();
  const [scans, setScans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'scans'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (snapshot) => {
      const scanData = snapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setScans(scanData);
      setLoading(false);
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
      return `${diffDays} day${diffDays === 1 ? '' : 's'} ago`;
    } else if (diffHours > 0) {
      return `${diffHours} hour${diffHours === 1 ? '' : 's'} ago`;
    } else {
      return 'Just now';
    }
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low': return '#4CAF50';
      case 'moderate': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#4CAF50';
    }
  };

  const viewResult = (scan) => {
    router.push({
      pathname: '/result',
      params: {
        imageUri: scan.imageUri,
        disease: scan.result?.disease,
        confidence: scan.result?.confidence,
        recommendation: scan.result?.recommendation,
        severity: scan.result?.severity,
        treatment: scan.result?.treatment,
      }
    });
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
        <Text style={styles.title}>{t('scanHistory')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        {loading ? (
          <View style={styles.loadingContainer}>
            <Text style={styles.loadingText}>Loading history...</Text>
          </View>
        ) : scans.length === 0 ? (
          <View style={styles.emptyContainer}>
            <Ionicons name="time-outline" size={64} color="#81C784" />
            <Text style={styles.emptyTitle}>{t('noScansYet')}</Text>
            <Text style={styles.emptySubtitle}>{t('scanHistoryWillAppear')}</Text>
            <TouchableOpacity 
              style={styles.scanButton}
              onPress={() => router.push('/scan')}
            >
              <Ionicons name="camera" size={20} color="#FFFFFF" />
              <Text style={styles.scanButtonText}>{t('startScanning')}</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <ScrollView showsVerticalScrollIndicator={false}>
            <Text style={styles.statsText}>
              {scans.length} {scans.length === 1 ? 'scan' : t('scans')}
            </Text>
            
            {scans.map((scan) => (
              <TouchableOpacity 
                key={scan.id} 
                style={styles.scanCard}
                onPress={() => viewResult(scan)}
              >
                <Image source={{ uri: scan.imageUri }} style={styles.scanImage} />
                
                <View style={styles.scanInfo}>
                  <Text style={styles.scanDisease}>
                    {scan.result?.disease || 'Analysis Complete'}
                  </Text>
                  <View style={styles.scanMeta}>
                    <Text style={styles.scanTime}>
                      {getTimeAgo(scan.timestamp)}
                    </Text>
                    <Text style={styles.confidenceText}>
                      {scan.result?.confidence}%
                    </Text>
                  </View>
                </View>
                
                <Ionicons name="chevron-forward" size={20} color="#4CAF50" />
              </TouchableOpacity>
            ))}
          </ScrollView>
        )}
      </View>
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
    fontSize: 22,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    padding: 20,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingText: {
    fontSize: 16,
    color: '#4CAF50',
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 20,
    marginBottom: 8,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 30,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  statsText: {
    fontSize: 16,
    color: '#4CAF50',
    marginBottom: 20,
    fontWeight: '600',
  },
  scanCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  scanImage: {
    width: 60,
    height: 60,
    borderRadius: 8,
    marginRight: 16,
  },
  scanInfo: {
    flex: 1,
  },
  scanDisease: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  scanMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  scanTime: {
    fontSize: 14,
    color: '#666',
  },
  confidenceText: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
});