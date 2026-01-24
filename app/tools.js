import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground, Image } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function ToolsPage() {
  const { language } = useLanguage();

  const toolItems = [
    {
      name: language === 'hi' ? 'कुदाल' : 'Hoe',
      price: language === 'hi' ? '₹200' : '₹200',
      seller: language === 'hi' ? 'कृषि टूल्स' : 'Krishi Tools',
      image: 'https://images.unsplash.com/photo-1595147389795-37094173bfd8?w=200&h=150&fit=crop'
    },
    {
      name: language === 'hi' ? 'फावड़ा' : 'Spade',
      price: language === 'hi' ? '₹150' : '₹150',
      seller: language === 'hi' ? 'फार्म इक्विपमेंट' : 'Farm Equipment',
      image: 'https://images.unsplash.com/photo-1617791160588-241658c0f566?w=200&h=150&fit=crop'
    },
    {
      name: language === 'hi' ? 'पानी का स्प्रे' : 'Water Sprayer',
      price: language === 'hi' ? '₹500' : '₹500',
      seller: language === 'hi' ? 'एग्रो टेक' : 'Agro Tech',
      image: 'https://images.unsplash.com/photo-1585314062340-f1a5a7c9328d?w=200&h=150&fit=crop'
    }
  ];

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(255, 152, 0, 0.7)', 'rgba(255, 193, 7, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'कृषि उपकरण' : 'Farm Tools'}</Text>
        </View>
        <ScrollView style={styles.content}>
          {toolItems.map((item, index) => (
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
  content: { flex: 1, backgroundColor: '#FFF3E0', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  itemCard: { backgroundColor: '#FFFFFF', flexDirection: 'row', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  itemImage: { width: 80, height: 80, borderRadius: 8, marginRight: 12 },
  itemDetails: { flex: 1, justifyContent: 'space-between' },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#E65100' },
  itemPrice: { fontSize: 16, color: '#FF9800', marginTop: 4 },
  itemSeller: { fontSize: 14, color: '#666', marginTop: 4 },
  buyButton: { backgroundColor: '#FF9800', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buyText: { color: '#FFFFFF', fontWeight: 'bold' }
});