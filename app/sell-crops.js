import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function SellCropsPage() {
  const { language } = useLanguage();

  const cropItems = [
    {
      name: language === 'hi' ? 'गेहूं' : 'Wheat',
      price: language === 'hi' ? '₹2,200 प्रति क्विंटल' : '₹2,200 per quintal',
      seller: language === 'hi' ? 'राजेश किसान' : 'Rajesh Farmer'
    },
    {
      name: language === 'hi' ? 'धान' : 'Rice',
      price: language === 'hi' ? '₹1,800 प्रति क्विंटल' : '₹1,800 per quintal',
      seller: language === 'hi' ? 'सुरेश कृषक' : 'Suresh Krishak'
    },
    {
      name: language === 'hi' ? 'आलू' : 'Potato',
      price: language === 'hi' ? '₹1,200 प्रति क्विंटल' : '₹1,200 per quintal',
      seller: language === 'hi' ? 'मुकेश फार्मर' : 'Mukesh Farmer'
    }
  ];

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(156, 39, 176, 0.7)', 'rgba(142, 36, 170, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'फसल बेचें' : 'Sell Crops'}</Text>
        </View>
        <ScrollView style={styles.content}>
          {cropItems.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.itemSeller}>{item.seller}</Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>{language === 'hi' ? 'खरीदें' : 'Sell Now'}</Text>
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
  itemCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#4A148C' },
  itemPrice: { fontSize: 16, color: '#9C27B0', marginTop: 4 },
  itemSeller: { fontSize: 14, color: '#666', marginTop: 4 },
  buyButton: { backgroundColor: '#9C27B0', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buyText: { color: '#FFFFFF', fontWeight: 'bold' }
});