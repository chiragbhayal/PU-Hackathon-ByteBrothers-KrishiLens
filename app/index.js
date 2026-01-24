import React, { useState } from 'react';
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../contexts/auth-context';
import { useLanguage } from '../contexts/language-context';

export default function SplashScreen() {
  const { user, loading } = useAuth();
  const { language, setLanguage, t } = useLanguage();
  const [showLanguageSelect, setShowLanguageSelect] = useState(true);

  const handleLanguageSelect = (lang) => {
    setLanguage(lang);
    setShowLanguageSelect(false);
    
    setTimeout(() => {
      if (user) {
        router.replace('/(tabs)');
      } else {
        router.replace('/login');
      }
    }, 500);
  };

  if (showLanguageSelect) {
    return (
      <LinearGradient 
        colors={['#1B5E20', '#2E7D32', '#4CAF50']}
        style={styles.container}
      >
        <View style={styles.logoSection}>
          <LinearGradient 
            colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
            style={styles.logoContainer}
          >
            <Text style={styles.logoText}>🌱</Text>
          </LinearGradient>
          <Text style={styles.title}>KrishiLens</Text>
          <Text style={styles.tagline}>{t('tagline')}</Text>
        </View>
        
        <View style={styles.languageSection}>
          <Text style={styles.selectLanguageText}>{t('selectLanguage')}</Text>
          
          <TouchableOpacity 
            style={styles.languageButton}
            onPress={() => handleLanguageSelect('en')}
          >
            <LinearGradient 
              colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
              style={styles.buttonGradient}
            >
              <Text style={styles.languageButtonText}>
                🇺🇸 English
              </Text>
            </LinearGradient>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.languageButton}
            onPress={() => handleLanguageSelect('hi')}
          >
            <LinearGradient 
              colors={['rgba(255,255,255,0.9)', 'rgba(255,255,255,0.7)']}
              style={styles.buttonGradient}
            >
              <Text style={styles.languageButtonText}>
                🇮🇳 हिंदी
              </Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </LinearGradient>
    );
  }

  return (
    <LinearGradient 
      colors={['#1B5E20', '#2E7D32', '#4CAF50']}
      style={styles.container}
    >
      <View style={styles.logoSection}>
        <LinearGradient 
          colors={['rgba(255,255,255,0.3)', 'rgba(255,255,255,0.1)']}
          style={styles.logoContainer}
        >
          <Text style={styles.logoText}>🌱</Text>
        </LinearGradient>
        <Text style={styles.title}>KrishiLens</Text>
        <Text style={styles.tagline}>{t('tagline')}</Text>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  logoSection: {
    alignItems: 'center',
    marginBottom: 60,
  },
  logoContainer: {
    width: 140,
    height: 140,
    borderRadius: 70,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.4,
    shadowRadius: 15,
    elevation: 10,
  },
  logoText: {
    fontSize: 60,
  },
  title: {
    fontSize: 48,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
    textAlign: 'center',
    letterSpacing: 3,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 5,
  },
  tagline: {
    fontSize: 20,
    color: 'rgba(255,255,255,0.9)',
    textAlign: 'center',
    lineHeight: 26,
    fontWeight: '500',
  },
  languageSection: {
    alignItems: 'center',
    gap: 20,
    width: '100%',
  },
  selectLanguageText: {
    fontSize: 24,
    color: '#FFFFFF',
    fontWeight: 'bold',
    marginBottom: 10,
    textShadowColor: 'rgba(0,0,0,0.3)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 3,
  },
  languageButton: {
    width: '85%',
    borderRadius: 25,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.4,
    shadowRadius: 12,
    elevation: 8,
  },
  buttonGradient: {
    paddingVertical: 18,
    paddingHorizontal: 30,
    alignItems: 'center',
  },
  languageButtonText: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#1B5E20',
    letterSpacing: 1,
    textAlign: 'center',
  },
});