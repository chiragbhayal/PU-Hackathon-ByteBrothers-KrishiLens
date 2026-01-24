import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function SeedSelectionPage() {
  const { language } = useLanguage();

  return (
    <ImageBackground source={require('../assets/images/bg.jpeg')} style={styles.container}>
      <LinearGradient colors={['rgba(139, 195, 74, 0.7)', 'rgba(104, 159, 56, 0.7)']} style={styles.overlay}>
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <Text style={styles.title}>{language === 'hi' ? 'बीज चयन' : 'Seed Selection'}</Text>
        </View>
        <ScrollView style={styles.content}>
          <Text style={styles.sectionTitle}>{language === 'hi' ? 'बीज चुनने के तरीके' : 'How to Choose Seeds'}</Text>
          <Text style={styles.tipText}>
            {language === 'hi' 
              ? '• स्थानीय किस्म के बीज चुनें\n• हाइब्रिड बीज बेहतर उत्पादन देते हैं\n• बीज की एक्सपायरी डेट चेक करें\n• प्रमाणित कंपनी से खरीदें\n• बीज का रंग और आकार देखें'
              : '• Choose local variety seeds\n• Hybrid seeds give better production\n• Check seed expiry date\n• Buy from certified companies\n• Check seed color and shape'
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
  content: { flex: 1, backgroundColor: '#F1F8E9', borderTopLeftRadius: 25, borderTopRightRadius: 25, padding: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1B5E20', marginBottom: 15 },
  tipText: { fontSize: 16, color: '#2E7D32', lineHeight: 24 }
});