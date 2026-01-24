import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function GovernmentSubsidyScreen() {
  const { language } = useLanguage();

  const subsidies = [
    {
      name: language === 'hi' ? 'कृषि यंत्र सब्सिडी' : 'Farm Equipment Subsidy',
      description: language === 'hi' ? 'ट्रैक्टर, हार्वेस्टर पर 50% तक सब्सिडी' : 'Up to 50% subsidy on tractors, harvesters',
      amount: language === 'hi' ? '₹50,000 - ₹5,00,000' : '₹50,000 - ₹5,00,000',
      eligibility: language === 'hi' ? 'सभी किसान' : 'All farmers',
      icon: 'construct-outline',
      color: '#FF9800'
    },
    {
      name: language === 'hi' ? 'बीज सब्सिडी' : 'Seed Subsidy',
      description: language === 'hi' ? 'प्रमाणित बीजों पर 75% तक सब्सिडी' : 'Up to 75% subsidy on certified seeds',
      amount: language === 'hi' ? '₹500 - ₹10,000' : '₹500 - ₹10,000',
      eligibility: language === 'hi' ? 'छोटे किसान' : 'Small farmers',
      icon: 'leaf-outline',
      color: '#4CAF50'
    },
    {
      name: language === 'hi' ? 'ड्रिप सिंचाई सब्सिडी' : 'Drip Irrigation Subsidy',
      description: language === 'hi' ? 'ड्रिप सिंचाई सिस्टम पर 90% सब्सिडी' : '90% subsidy on drip irrigation systems',
      amount: language === 'hi' ? '₹15,000 - ₹80,000' : '₹15,000 - ₹80,000',
      eligibility: language === 'hi' ? 'सभी श्रेणी' : 'All categories',
      icon: 'water-outline',
      color: '#2196F3'
    },
    {
      name: language === 'hi' ? 'सोलर पंप सब्सिडी' : 'Solar Pump Subsidy',
      description: language === 'hi' ? 'सोलर वाटर पंप पर 70% सब्सिडी' : '70% subsidy on solar water pumps',
      amount: language === 'hi' ? '₹30,000 - ₹1,50,000' : '₹30,000 - ₹1,50,000',
      eligibility: language === 'hi' ? 'सभी किसान' : 'All farmers',
      icon: 'sunny-outline',
      color: '#FF5722'
    },
    {
      name: language === 'hi' ? 'उर्वरक सब्सिडी' : 'Fertilizer Subsidy',
      description: language === 'hi' ? 'DAP, यूरिया पर प्रत्यक्ष सब्सिडी' : 'Direct subsidy on DAP, Urea',
      amount: language === 'hi' ? '₹200 - ₹500 प्रति बैग' : '₹200 - ₹500 per bag',
      eligibility: language === 'hi' ? 'सभी किसान' : 'All farmers',
      icon: 'nutrition-outline',
      color: '#9C27B0'
    }
  ];

  const handleApply = (schemeName) => {
    Linking.openURL('https://pmkisan.gov.in/');
  };

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {language === 'hi' ? 'सरकारी सब्सिडी' : 'Government Subsidy'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'उपलब्ध सब्सिडी योजनाएं' : 'Available Subsidy Schemes'}
          </Text>
          
          {subsidies.map((subsidy, index) => (
            <View key={index} style={styles.subsidyCard}>
              <View style={[styles.subsidyIcon, { backgroundColor: subsidy.color }]}>
                <Ionicons name={subsidy.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.subsidyContent}>
                <Text style={styles.subsidyName}>{subsidy.name}</Text>
                <Text style={styles.subsidyDescription}>{subsidy.description}</Text>
                <View style={styles.subsidyDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="cash-outline" size={16} color="#4CAF50" />
                    <Text style={styles.detailText}>{subsidy.amount}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="people-outline" size={16} color="#FF9800" />
                    <Text style={styles.detailText}>{subsidy.eligibility}</Text>
                  </View>
                </View>
                <TouchableOpacity 
                  style={styles.applyButton}
                  onPress={() => handleApply(subsidy.name)}
                >
                  <Text style={styles.applyButtonText}>
                    {language === 'hi' ? 'आवेदन करें' : 'Apply Now'}
                  </Text>
                  <Ionicons name="arrow-forward" size={16} color="#FFFFFF" />
                </TouchableOpacity>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.infoSection}>
          <Text style={styles.infoTitle}>
            {language === 'hi' ? 'आवेदन की प्रक्रिया' : 'Application Process'}
          </Text>
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>1</Text>
            <Text style={styles.stepText}>
              {language === 'hi' ? 'आधार कार्ड और बैंक खाता तैयार रखें' : 'Keep Aadhaar card and bank account ready'}
            </Text>
          </View>
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>2</Text>
            <Text style={styles.stepText}>
              {language === 'hi' ? 'ऑनलाइन पोर्टल पर रजिस्टर करें' : 'Register on online portal'}
            </Text>
          </View>
          <View style={styles.stepCard}>
            <Text style={styles.stepNumber}>3</Text>
            <Text style={styles.stepText}>
              {language === 'hi' ? 'आवश्यक दस्तावेज अपलोड करें' : 'Upload required documents'}
            </Text>
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
  section: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  subsidyCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  subsidyIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  subsidyContent: {
    flex: 1,
  },
  subsidyName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  subsidyDescription: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  subsidyDetails: {
    marginBottom: 12,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 4,
  },
  detailText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
  applyButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#4CAF50',
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    alignSelf: 'flex-start',
  },
  applyButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
    marginRight: 4,
  },
  infoSection: {
    padding: 20,
    paddingTop: 0,
  },
  infoTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    color: '#FFFFFF',
    textAlign: 'center',
    lineHeight: 32,
    fontSize: 16,
    fontWeight: 'bold',
    marginRight: 16,
  },
  stepText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
  },
});