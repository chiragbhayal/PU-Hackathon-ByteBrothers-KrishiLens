import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function SeedsPage() {
  const { language } = useLanguage();

  const seedItems = [
    {
      name: language === 'hi' ? 'टमाटर के बीज' : 'Tomato Seeds',
      price: language === 'hi' ? '₹50 प्रति पैकेट' : '₹50 per packet',
      seller: language === 'hi' ? 'राम कृषि केंद्र' : 'Ram Krishi Kendra'
    },
    {
      name: language === 'hi' ? 'मिर्च के बीज' : 'Chili Seeds',
      price: language === 'hi' ? '₹30 प्रति पैकेट' : '₹30 per packet',
      seller: language === 'hi' ? 'श्याम सीड्स' : 'Shyam Seeds'
    },
    {
      name: language === 'hi' ? 'धनिया के बीज' : 'Coriander Seeds',
      price: language === 'hi' ? '₹25 प्रति पैकेट' : '₹25 per packet',
      seller: language === 'hi' ? 'गुप्ता एग्रो' : 'Gupta Agro'
    }
  ];

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(27, 94, 32, 0.7)', 'rgba(46, 125, 50, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'बीज और पौधे' : 'Seeds & Plants'}</Text>
        </View>
        <ScrollView style={styles.content}>
          {seedItems.map((item, index) => (
            <View key={index} style={styles.itemCard}>
              <Text style={styles.itemName}>{item.name}</Text>
              <Text style={styles.itemPrice}>{item.price}</Text>
              <Text style={styles.itemSeller}>{item.seller}</Text>
              <TouchableOpacity style={styles.buyButton}>
                <Text style={styles.buyText}>{language === 'hi' ? 'खरीदें' : 'Buy Now'}</Text>
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
  content: { flex: 1, backgroundColor: '#F1F8E9', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  itemCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  itemName: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20' },
  itemPrice: { fontSize: 16, color: '#4CAF50', marginTop: 4 },
  itemSeller: { fontSize: 14, color: '#666', marginTop: 4 },
  buyButton: { backgroundColor: '#4CAF50', padding: 10, borderRadius: 8, marginTop: 10, alignItems: 'center' },
  buyText: { color: '#FFFFFF', fontWeight: 'bold' }
});