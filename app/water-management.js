import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function WaterManagementPage() {
  const { language } = useLanguage();

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(33, 150, 243, 0.7)', 'rgba(30, 136, 229, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'पानी प्रबंधन' : 'Water Management'}</Text>
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>{language === 'hi' ? 'पानी देने के नियम' : 'Watering Rules'}</Text>
          <Text style={styles.tipText}>
            {language === 'hi' 
              ? '• सुबह-शाम पानी दें\n• मिट्टी में नमी बनाए रखें\n• ज्यादा पानी न दें\n• ड्रिप इरिगेशन का उपयोग करें\n• बारिश के मौसम में कम पानी दें'
              : '• Water morning and evening\n• Maintain soil moisture\n• Don\'t overwater\n• Use drip irrigation\n• Water less during rainy season'
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
  content: { flex: 1, backgroundColor: '#E3F2FD', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#0D47A1', marginBottom: 15 },
  tipText: { fontSize: 16, color: '#1976D2', lineHeight: 24 }
});