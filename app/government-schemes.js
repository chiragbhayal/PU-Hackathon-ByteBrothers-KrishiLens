import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function GovernmentSchemesPage() {
  const { language } = useLanguage();

  const schemes = [
    {
      name: language === 'hi' ? 'प्रधानमंत्री किसान सम्मान निधि' : 'PM Kisan Samman Nidhi',
      benefit: language === 'hi' ? '₹6,000 प्रति वर्ष' : '₹6,000 per year',
      desc: language === 'hi' ? 'छोटे और सीमांत किसानों को आर्थिक सहायता' : 'Financial support to small and marginal farmers'
    },
    {
      name: language === 'hi' ? 'फसल बीमा योजना' : 'Crop Insurance Scheme',
      benefit: language === 'hi' ? 'फसल नुकसान की भरपाई' : 'Crop loss compensation',
      desc: language === 'hi' ? 'प्राकृतिक आपदा से फसल नुकसान का बीमा' : 'Insurance for crop loss due to natural disasters'
    },
    {
      name: language === 'hi' ? 'किसान क्रेडिट कार्ड' : 'Kisan Credit Card',
      benefit: language === 'hi' ? 'कम ब्याज दर पर लोन' : 'Low interest rate loans',
      desc: language === 'hi' ? 'खेती के लिए आसान लोन व्यवस्था' : 'Easy loan facility for farming'
    },
    {
      name: language === 'hi' ? 'मृदा स्वास्थ्य कार्ड' : 'Soil Health Card',
      benefit: language === 'hi' ? 'मुफ्त मिट्टी जांच' : 'Free soil testing',
      desc: language === 'hi' ? 'मिट्टी की गुणवत्ता की जांच और सुझाव' : 'Soil quality testing and recommendations'
    }
  ];

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(156, 39, 176, 0.7)', 'rgba(142, 36, 170, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'सरकारी योजनाएं' : 'Government Schemes'}</Text>
        </View>
        <ScrollView style={styles.content}>
          {schemes.map((scheme, index) => (
            <View key={index} style={styles.schemeCard}>
              <Text style={styles.schemeName}>{scheme.name}</Text>
              <Text style={styles.schemeBenefit}>{scheme.benefit}</Text>
              <Text style={styles.schemeDesc}>{scheme.desc}</Text>
              <TouchableOpacity style={styles.applyButton}>
                <Text style={styles.applyText}>{language === 'hi' ? 'आवेदन करें' : 'Apply Now'}</Text>
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  overlay: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', padding: 20, paddingTop: 60 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center', marginRight: 15 },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  content: { flex: 1, backgroundColor: '#F3E5F5', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  schemeCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  schemeName: { fontSize: 18, fontWeight: 'bold', color: '#4A148C' },
  schemeBenefit: { fontSize: 16, color: '#9C27B0', marginTop: 4, fontWeight: '600' },
  schemeDesc: { fontSize: 14, color: '#666', marginTop: 4 },
  applyButton: { backgroundColor: '#9C27B0', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  applyText: { color: '#FFFFFF', fontWeight: 'bold' }
});