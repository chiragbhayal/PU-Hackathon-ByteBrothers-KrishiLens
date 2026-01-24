import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function CropSelectionScreen() {
  const { language } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState(null);

  const categories = [
    {
      id: 'vegetables',
      name: language === 'hi' ? 'सब्जियां' : 'Vegetables',
      icon: 'leaf-outline',
      color: '#4CAF50',
      crops: [
        { id: 'tomato', name: language === 'hi' ? 'टमाटर' : 'Tomato', icon: '🍅' }
      ]
    }
  ];

  const handleCropSelect = (crop) => {
    router.push({
      pathname: '/scan',
      params: {
        selectedCrop: crop.id,
        cropName: crop.name,
        category: selectedCategory
      }
    });
  };

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {language === 'hi' ? 'फसल चुनें' : 'Select Crop'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        {!selectedCategory ? (
          <View>
            <View style={styles.introSection}>
              <Text style={styles.introTitle}>
                {language === 'hi' ? 'फसल की श्रेणी चुनें' : 'Choose Crop Category'}
              </Text>
              <Text style={styles.introDesc}>
                {language === 'hi' ? 
                  'पहले अपनी फसल की श्रेणी चुनें, फिर विशिष्ट फसल का चयन करें' :
                  'First select your crop category, then choose specific crop'
                }
              </Text>
            </View>

            <View style={styles.categoriesGrid}>
              {categories.map((category) => (
                <TouchableOpacity 
                  key={category.id}
                  style={styles.categoryCard}
                  onPress={() => setSelectedCategory(category.id)}
                >
                  <View style={[styles.categoryIcon, { backgroundColor: category.color }]}>
                    <Ionicons name={category.icon} size={32} color="#FFFFFF" />
                  </View>
                  <Text style={styles.categoryName}>{category.name}</Text>
                  <Text style={styles.cropCount}>
                    {categories.find(c => c.id === category.id).crops.length} {language === 'hi' ? 'फसलें' : 'crops'}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        ) : (
          <View>
            <View style={styles.backToCategories}>
              <TouchableOpacity 
                style={styles.backToCategoriesBtn}
                onPress={() => setSelectedCategory(null)}
              >
                <Ionicons name="chevron-back" size={20} color="#4CAF50" />
                <Text style={styles.backToCategoriesText}>
                  {language === 'hi' ? 'श्रेणियों पर वापस जाएं' : 'Back to Categories'}
                </Text>
              </TouchableOpacity>
            </View>

            <View style={styles.cropsSection}>
              <Text style={styles.sectionTitle}>
                {categories.find(c => c.id === selectedCategory)?.name}
              </Text>
              <View style={styles.cropsGrid}>
                {categories.find(c => c.id === selectedCategory)?.crops.map((crop) => (
                  <TouchableOpacity 
                    key={crop.id}
                    style={styles.cropCard}
                    onPress={() => handleCropSelect(crop)}
                  >
                    <Text style={styles.cropIcon}>{crop.icon}</Text>
                    <Text style={styles.cropName}>{crop.name}</Text>
                  </TouchableOpacity>
                ))}
              </View>
            </View>
          </View>
        )}
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 60 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  content: { flex: 1, backgroundColor: '#F1F8E9', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  introSection: { alignItems: 'center', padding: 30 },
  introTitle: { fontSize: 22, fontWeight: 'bold', color: '#1B5E20', marginBottom: 12, textAlign: 'center' },
  introDesc: { fontSize: 16, color: '#666', textAlign: 'center', lineHeight: 24 },
  categoriesGrid: { paddingHorizontal: 20 },
  categoryCard: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 16, marginBottom: 16, alignItems: 'center', shadowColor: '#000', shadowOffset: { width: 0, height: 4 }, shadowOpacity: 0.1, shadowRadius: 8, elevation: 4 },
  categoryIcon: { width: 60, height: 60, borderRadius: 30, justifyContent: 'center', alignItems: 'center', marginBottom: 12 },
  categoryName: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20', marginBottom: 4 },
  cropCount: { fontSize: 14, color: '#666' },
  backToCategories: { padding: 20, paddingBottom: 10 },
  backToCategoriesBtn: { flexDirection: 'row', alignItems: 'center' },
  backToCategoriesText: { fontSize: 16, color: '#4CAF50', marginLeft: 4, fontWeight: '600' },
  cropsSection: { paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: 'bold', color: '#1B5E20', marginBottom: 20, textAlign: 'center' },
  cropsGrid: { flexDirection: 'row', flexWrap: 'wrap', justifyContent: 'space-between' },
  cropCard: { width: '48%', backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, alignItems: 'center', marginBottom: 12, shadowColor: '#000', shadowOffset: { width: 0, height: 2 }, shadowOpacity: 0.1, shadowRadius: 4, elevation: 3 },
  cropIcon: { fontSize: 32, marginBottom: 8 },
  cropName: { fontSize: 16, fontWeight: '600', color: '#1B5E20', textAlign: 'center' },
});