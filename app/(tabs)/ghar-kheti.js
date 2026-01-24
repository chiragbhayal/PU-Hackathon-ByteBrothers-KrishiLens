import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/auth-context';
import { useLanguage } from '../../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function GharKhetiScreen() {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const khetiTips = [
    {
      icon: 'play-circle-outline',
      title: language === 'hi' ? 'शुरू करें' : 'Get Started',
      desc: language === 'hi' ? 'आसान वीडियो गाइड देखें' : 'Easy video guide',
      color: '#9C27B0'
    },
    {
      icon: 'leaf-outline',
      title: language === 'hi' ? 'बीज चुनें' : 'Choose Seeds',
      desc: language === 'hi' ? 'अच्छे गुणवत्ता के बीज का चयन करें' : 'Select quality seeds for better growth',
      color: '#8BC34A'
    },
    {
      icon: 'water-outline',
      title: language === 'hi' ? 'पानी की व्यवस्था' : 'Water Management',
      desc: language === 'hi' ? 'सही समय पर पानी देना जरूरी है' : 'Proper watering schedule is essential',
      color: '#2196F3'
    },
    {
      icon: 'sunny-outline',
      title: language === 'hi' ? 'धूप की जरूरत' : 'Sunlight Requirements',
      desc: language === 'hi' ? 'पौधों को 6-8 घंटे धूप चाहिए' : 'Plants need 6-8 hours of sunlight',
      color: '#FF9800'
    },
    {
      icon: 'nutrition-outline',
      title: language === 'hi' ? 'पोषक तत्व' : 'Nutrients',
      desc: language === 'hi' ? 'जैविक खाद का उपयोग करें' : 'Use organic fertilizers',
      color: '#4CAF50'
    },
    {
      icon: 'bug-outline',
      title: language === 'hi' ? 'कीट नियंत्रण' : 'Pest Control',
      desc: language === 'hi' ? 'प्राकृतिक कीटनाशक का प्रयोग' : 'Use natural pesticides',
      color: '#F44336'
    }
  ];

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
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              {language === 'hi' ? 'घर की खेती' : 'Home Farming'}
            </Text>
            <Text style={styles.subtitle}>
              {language === 'hi' ? 'घर में खेती की जानकारी' : 'Home Farming Guide'}
            </Text>
          </View>
          <View style={{ width: 40 }} />
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.tipsSection}>
            <Text style={styles.sectionTitle}>
              {language === 'hi' ? 'खेती के टिप्स' : 'Farming Tips'}
            </Text>
            
            {khetiTips.map((tip, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.tipCard}
                onPress={() => {
                  if (index === 0) router.push('/get-started');
                  else if (index === 1) router.push('/seed-selection');
                  else if (index === 2) router.push('/water-management');
                  else if (index === 4) router.push('/organic-fertilizer');
                  else if (index === 5) router.push('/pest-control');
                }}
              >
                <View style={[styles.tipIcon, { backgroundColor: tip.color }]}>
                  <Ionicons name={tip.icon} size={24} color="#FFFFFF" />
                </View>
                <View style={styles.tipContent}>
                  <Text style={styles.tipTitle}>{tip.title}</Text>
                  <Text style={styles.tipDesc}>{tip.desc}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#2E7D32" />
              </TouchableOpacity>
            ))}
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
  headerContent: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#C8E6C9',
    marginTop: 8,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  tipsSection: {
    padding: 20,
    paddingBottom: 100,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 20,
    letterSpacing: 0.5,
  },
  tipCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  tipContent: {
    flex: 1,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  tipDesc: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  quickActions: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 100,
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
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  actionContent: {
    flex: 1,
  },
  actionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  actionSubtitle: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
});