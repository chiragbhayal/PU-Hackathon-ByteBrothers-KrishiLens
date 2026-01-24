import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function OrganicFertilizerPage() {
  const { language } = useLanguage();

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(76, 175, 80, 0.7)', 'rgba(67, 160, 71, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'जैविक खाद' : 'Organic Fertilizer'}</Text>
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>{language === 'hi' ? 'जैविक खाद के फायदे' : 'Benefits of Organic Fertilizer'}</Text>
          <Text style={styles.tipText}>
            {language === 'hi' 
              ? '• घर का कचरा इस्तेमाल करें\n• गोबर की खाद डालें\n• केंचुआ खाद बनाएं\n• हरी खाद का प्रयोग करें\n• मिट्टी की उर्वरता बढ़ाता है'
              : '• Use kitchen waste\n• Apply cow dung manure\n• Make vermicompost\n• Use green manure\n• Increases soil fertility'
            }
          </Text>
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
  content: { flex: 1, backgroundColor: '#E8F5E8', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1B5E20', marginBottom: 15 },
  tipText: { fontSize: 16, color: '#2E7D32', lineHeight: 24 }
});