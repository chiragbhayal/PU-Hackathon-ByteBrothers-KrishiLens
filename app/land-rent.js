import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function LandRentPage() {
  const { language } = useLanguage();

  const landItems = [
    {
      name: language === 'hi' ? '5 एकड़ कृषि भूमि' : '5 Acre Agricultural Land',
      price: language === 'hi' ? '₹15,000 प्रति माह' : '₹15,000 per month',
      location: language === 'hi' ? 'गुड़गांव, हरियाणा' : 'Gurgaon, Haryana'
    },
    {
      name: language === 'hi' ? '2 एकड़ सिंचित भूमि' : '2 Acre Irrigated Land',
      price: language === 'hi' ? '₹8,000 प्रति माह' : '₹8,000 per month',
      location: language === 'hi' ? 'मेरठ, उत्तर प्रदेश' : 'Meerut, UP'
    },
    {
      name: language === 'hi' ? '10 एकड़ फार्म हाउस' : '10 Acre Farm House',
      price: language === 'hi' ? '₹25,000 प्रति माह' : '₹25,000 per month',
      location: language === 'hi' ? 'फरीदाबाद, हरियाणा' : 'Faridabad, Haryana'
    }
  ];

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(121, 85, 72, 0.7)', 'rgba(141, 110, 99, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'जमीन किराए पर' : 'Land Rent'}</Text>
        </View>
        <ScrollView style={styles.content}>
          {landItems.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.itemLocation}>{item.location}</Text>
              <TouchableOpacity style={styles.contactButton}>
                <Text style={styles.contactText}>{language === 'hi' ? 'संपर्क करें' : 'Contact'}</Text>
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
  content: { flex: 1, backgroundColor: '#EFEBE9', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  itemCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#3E2723' },
  itemPrice: { fontSize: 16, color: '#795548', marginTop: 4 },
  itemLocation: { fontSize: 14, color: '#666', marginTop: 4 },
  contactButton: { backgroundColor: '#795548', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  contactText: { color: '#FFFFFF', fontWeight: 'bold' }
});