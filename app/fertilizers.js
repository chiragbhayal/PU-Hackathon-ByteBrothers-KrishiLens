import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function FertilizersPage() {
  const { language } = useLanguage();

  const fertilizerItems = [
    {
      name: language === 'hi' ? 'जैविक खाद' : 'Organic Fertilizer',
      price: language === 'hi' ? '₹300 प्रति किलो' : '₹300 per kg',
      seller: language === 'hi' ? 'ऑर्गेनिक फार्म' : 'Organic Farm',
      image: 'https://images.unsplash.com/photo-1574263867128-a3d5c1b1deaa?w=200&h=150&fit=crop'
    },
    {
      name: language === 'hi' ? 'नीम का तेल' : 'Neem Oil',
      price: language === 'hi' ? '₹150 प्रति लीटर' : '₹150 per liter',
      seller: language === 'hi' ? 'नेचुरल केयर' : 'Natural Care',
      image: 'https://images.unsplash.com/photo-1582719471384-894fbb16e074?w=200&h=150&fit=crop'
    },
    {
      name: language === 'hi' ? 'कंपोस्ट खाद' : 'Compost Fertilizer',
      price: language === 'hi' ? '₹200 प्रति किलो' : '₹200 per kg',
      seller: language === 'hi' ? 'ग्रीन एग्रो' : 'Green Agro',
      image: 'https://images.unsplash.com/photo-1416879595882-3373a0480b5b?w=200&h=150&fit=crop'
    }
  ];

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(33, 150, 243, 0.7)', 'rgba(3, 169, 244, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'उर्वरक और कीटनाशक' : 'Fertilizers & Pesticides'}</Text>
        </View>
        <ScrollView style={styles.content}>
          {fertilizerItems.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Image source={{ uri: item.image }} style={styles.itemImage} />
              <View style={styles.itemDetails}>
                <Text style={styles.itemName}>{item.name}</Text>
                <Text style={styles.itemPrice}>{item.price}</Text>
                <Text style={styles.itemSeller}>{item.seller}</Text>
                <TouchableOpacity style={styles.buyButton}>
                  <Text style={styles.buyText}>{language === 'hi' ? 'खरीदें' : 'Buy Now'}</Text>
                </TouchableOpacity>
              </View>
            </View>
          ))}
          
          <View style={styles.infoCard}>
            <Ionicons name="information-circle-outline" size={24} color="#2196F3" />
            <Text style={styles.infoText}>
              {language === 'hi' ? 
                'उर्वरक और कीटनाशक का उपयोग करते समय सुरक्षा दिशानिर्देशों का पालन करें' :
                'Always follow safety guidelines when using fertilizers and pesticides'
              }
            </Text>
          </View>
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
  content: { flex: 1, backgroundColor: '#E3F2FD', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  itemCard: { backgroundColor: '#FFFFFF', flexDirection: 'row', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  itemImage: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  itemDetails: { flex: 1, justifyContent: 'space-between' },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#0D47A1' },
  itemPrice: { fontSize: 16, color: '#2196F3', marginTop: 4 },
  itemSeller: { fontSize: 14, color: '#666', marginTop: 4 },
  buyButton: { backgroundColor: '#2196F3', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buyText: { color: '#FFFFFF', fontWeight: 'bold' },
  infoCard: {
    flexDirection: 'row',
    backgroundColor: '#E3F2FD',
    padding: 16,
    marginTop: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#BBDEFB',
  },
  infoText: {
    flex: 1,
    fontSize: 14,
    color: '#1976D2',
    marginLeft: 12,
    lineHeight: 20,
  },
});