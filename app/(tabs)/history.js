import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity, Image, ActivityIndicator } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../contexts/auth-context';
import { collection, query, where, orderBy, onSnapshot } from 'firebase/firestore';
import { db } from '../../config/firebase';

export default function HistoryScreen() {
  const [scans, setScans] = useState([]);
  const [filteredScans, setFilteredScans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [showFilters, setShowFilters] = useState(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user) return;

    const q = query(
      collection(db, 'scans'),
      where('userId', '==', user.uid),
      orderBy('timestamp', 'desc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const scanData = [];
      querySnapshot.forEach((doc) => {
        scanData.push({ id: doc.id, ...doc.data() });
      });
      setScans(scanData);
      setFilteredScans(scanData);
      setLoading(false);
    });

    return () => unsubscribe();
  }, [user]);

  const formatDate = (timestamp) => {
    if (!timestamp) return 'Unknown date';
    const date = timestamp.toDate ? timestamp.toDate() : new Date(timestamp);
    return date.toLocaleDateString() + ' ' + date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#4CAF50';
    if (confidence >= 60) return '#FF9800';
    return '#F44336';
  };

  const filterScans = (filterType) => {
    setSelectedFilter(filterType);
    let filtered = scans;
    
    switch (filterType) {
      case 'high':
        filtered = scans.filter(scan => scan.result.severity?.toLowerCase() === 'high');
        break;
      case 'moderate':
        filtered = scans.filter(scan => scan.result.severity?.toLowerCase() === 'moderate');
        break;
      case 'low':
        filtered = scans.filter(scan => scan.result.severity?.toLowerCase() === 'low');
        break;
      case 'recent':
        filtered = scans.filter(scan => {
          const scanDate = scan.timestamp?.toDate ? scan.timestamp.toDate() : new Date(scan.timestamp);
          const daysDiff = (new Date() - scanDate) / (1000 * 60 * 60 * 24);
          return daysDiff <= 7;
        });
        break;
      case 'today':
        filtered = scans.filter(scan => {
          const scanDate = scan.timestamp?.toDate ? scan.timestamp.toDate() : new Date(scan.timestamp);
          const today = new Date();
          return scanDate.toDateString() === today.toDateString();
        });
        break;
      case 'week':
        filtered = scans.filter(scan => {
          const scanDate = scan.timestamp?.toDate ? scan.timestamp.toDate() : new Date(scan.timestamp);
          const daysDiff = (new Date() - scanDate) / (1000 * 60 * 60 * 24);
          return daysDiff <= 7;
        });
        break;
      case 'month':
        filtered = scans.filter(scan => {
          const scanDate = scan.timestamp?.toDate ? scan.timestamp.toDate() : new Date(scan.timestamp);
          const daysDiff = (new Date() - scanDate) / (1000 * 60 * 60 * 24);
          return daysDiff <= 30;
        });
        break;
      default:
        filtered = scans;
    }
    
    setFilteredScans(filtered);
    setShowFilters(false);
  };

  const renderScanItem = ({ item }) => (
    <TouchableOpacity 
      style={styles.scanCard}
      onPress={() => router.push({
        pathname: '/result',
        params: {
          imageUri: item.imageUri,
          disease: item.result.disease,
          confidence: item.result.confidence,
          recommendation: item.result.recommendation,
          severity: item.result.severity,
          treatment: item.result.treatment,
        }
      })}
    >
      <Image source={{ uri: item.imageUri }} style={styles.scanImage} />
      <View style={styles.scanInfo}>
        <Text style={styles.diseaseName}>{item.result.disease}</Text>
        <Text style={styles.scanDate}>{formatDate(item.timestamp)}</Text>
        <View style={styles.confidenceContainer}>
          <Text style={styles.confidenceLabel}>Confidence:</Text>
          <Text style={[styles.confidenceValue, { color: getConfidenceColor(item.result.confidence) }]}>
            {item.result.confidence}%
          </Text>
        </View>
      </View>
      <Ionicons name="chevron-forward" size={24} color="#4CAF50" />
    </TouchableOpacity>
  );

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#4CAF50" />
        <Text style={styles.loadingText}>Loading scan history...</Text>
      </View>
    );
  }

  return (
    <LinearGradient 
      colors={['#1B5E20', '#2E7D32', '#4CAF50']}
      style={styles.gradient}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Scan History</Text>
        <TouchableOpacity onPress={() => setShowFilters(!showFilters)} style={styles.filterButton}>
          <Ionicons name="filter" size={24} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.subtitle}>{filteredScans.length} scans</Text>
        
        {showFilters && (
          <View style={styles.filterContainer}>
            <TouchableOpacity 
              style={[styles.filterChip, selectedFilter === 'all' && styles.activeFilter]}
              onPress={() => filterScans('all')}
            >
              <Text style={[styles.filterText, selectedFilter === 'all' && styles.activeFilterText]}>All</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, selectedFilter === 'high' && styles.activeFilter]}
              onPress={() => filterScans('high')}
            >
              <Text style={[styles.filterText, selectedFilter === 'high' && styles.activeFilterText]}>High Severity</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, selectedFilter === 'moderate' && styles.activeFilter]}
              onPress={() => filterScans('moderate')}
            >
              <Text style={[styles.filterText, selectedFilter === 'moderate' && styles.activeFilterText]}>Moderate</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, selectedFilter === 'low' && styles.activeFilter]}
              onPress={() => filterScans('low')}
            >
              <Text style={[styles.filterText, selectedFilter === 'low' && styles.activeFilterText]}>Low Severity</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, selectedFilter === 'recent' && styles.activeFilter]}
              onPress={() => filterScans('recent')}
            >
              <Text style={[styles.filterText, selectedFilter === 'recent' && styles.activeFilterText]}>Recent</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, selectedFilter === 'today' && styles.activeFilter]}
              onPress={() => filterScans('today')}
            >
              <Text style={[styles.filterText, selectedFilter === 'today' && styles.activeFilterText]}>Today</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, selectedFilter === 'week' && styles.activeFilter]}
              onPress={() => filterScans('week')}
            >
              <Text style={[styles.filterText, selectedFilter === 'week' && styles.activeFilterText]}>This Week</Text>
            </TouchableOpacity>
            <TouchableOpacity 
              style={[styles.filterChip, selectedFilter === 'month' && styles.activeFilter]}
              onPress={() => filterScans('month')}
            >
              <Text style={[styles.filterText, selectedFilter === 'month' && styles.activeFilterText]}>This Month</Text>
            </TouchableOpacity>
          </View>
        )}

      {filteredScans.length === 0 ? (
        <View style={styles.emptyContainer}>
          <Ionicons name="time-outline" size={64} color="#81C784" />
          <Text style={styles.emptyTitle}>No scans yet</Text>
          <Text style={styles.emptySubtitle}>Your scan history will appear here</Text>
          <TouchableOpacity 
            style={styles.scanButton}
            onPress={() => router.push('/scan')}
          >
            <Ionicons name="camera" size={20} color="#FFFFFF" />
            <Text style={styles.scanButtonText}>Start Scanning</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <FlatList
          data={filteredScans}
          renderItem={renderScanItem}
          keyExtractor={(item) => item.id}
          contentContainerStyle={styles.listContainer}
          showsVerticalScrollIndicator={false}
        />
      )}
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  gradient: {
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
    letterSpacing: 0.5,
  },
  placeholder: {
    width: 40,
  },
  filterButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  filterContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    paddingHorizontal: 20,
    paddingBottom: 10,
    gap: 8,
  },
  filterChip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: '#C8E6C9',
  },
  activeFilter: {
    backgroundColor: '#2E7D32',
    borderColor: '#2E7D32',
  },
  filterText: {
    fontSize: 12,
    color: '#1B5E20',
    fontWeight: '500',
  },
  activeFilterText: {
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
  },
  subtitle: {
    fontSize: 16,
    color: '#4CAF50',
    paddingHorizontal: 20,
    marginBottom: 10,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F1F8E9',
  },
  loadingText: {
    marginTop: 16,
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
    marginTop: 16,
  },
  emptySubtitle: {
    fontSize: 16,
    color: '#4CAF50',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 32,
  },
  scanButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
    gap: 8,
  },
  scanButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  listContainer: {
    paddingHorizontal: 20,
    paddingBottom: 20,
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
  diseaseName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
  },
  scanDate: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 4,
    gap: 4,
  },
  confidenceLabel: {
    fontSize: 12,
    color: '#81C784',
  },
  confidenceValue: {
    fontSize: 12,
    fontWeight: '600',
  },
});
