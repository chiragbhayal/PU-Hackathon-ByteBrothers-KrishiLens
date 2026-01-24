import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function GetStartedScreen() {
  const { language } = useLanguage();

  const steps = [
    {
      step: 1,
      title: language === 'hi' ? 'स्थान चुनें' : 'Choose Location',
      desc: language === 'hi' ? 'धूप वाली जगह चुनें जहाँ 6-8 घंटे धूप आती हो' : 'Select a sunny spot with 6-8 hours of sunlight',
      icon: 'location-outline'
    },
    {
      step: 2,
      title: language === 'hi' ? 'मिट्टी तैयार करें' : 'Prepare Soil',
      desc: language === 'hi' ? 'अच्छी जल निकासी वाली मिट्टी में कंपोस्ट मिलाएं' : 'Mix compost in well-draining soil',
      icon: 'earth-outline'
    },
    {
      step: 3,
      title: language === 'hi' ? 'बीज बोएं' : 'Plant Seeds',
      desc: language === 'hi' ? 'गुणवत्तापूर्ण बीज को सही गहराई पर बोएं' : 'Plant quality seeds at proper depth',
      icon: 'leaf-outline'
    },
    {
      step: 4,
      title: language === 'hi' ? 'पानी दें' : 'Water Regularly',
      desc: language === 'hi' ? 'नियमित रूप से पानी दें, लेकिन ज्यादा न दें' : 'Water regularly but avoid overwatering',
      icon: 'water-outline'
    },
    {
      step: 5,
      title: language === 'hi' ? 'देखभाल करें' : 'Care & Monitor',
      desc: language === 'hi' ? 'पौधों की नियमित जांच करें और कीटों से बचाएं' : 'Monitor plants regularly and protect from pests',
      icon: 'eye-outline'
    }
  ];

  const essentials = [
    { name: language === 'hi' ? 'गमले/कंटेनर' : 'Pots/Containers', icon: 'cube-outline' },
    { name: language === 'hi' ? 'अच्छी मिट्टी' : 'Quality Soil', icon: 'earth-outline' },
    { name: language === 'hi' ? 'बीज' : 'Seeds', icon: 'leaf-outline' },
    { name: language === 'hi' ? 'पानी का स्प्रे' : 'Water Spray', icon: 'water-outline' },
    { name: language === 'hi' ? 'छोटे औजार' : 'Small Tools', icon: 'construct-outline' },
    { name: language === 'hi' ? 'जैविक खाद' : 'Organic Fertilizer', icon: 'nutrition-outline' }
  ];

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {language === 'hi' ? 'शुरुआत करें' : 'Get Started'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.introSection}>
          <View style={styles.iconContainer}>
            <Ionicons name="home-outline" size={48} color="#4CAF50" />
          </View>
          <Text style={styles.introTitle}>
            {language === 'hi' ? 'घर की खेती शुरू करें' : 'Start Home Farming'}
          </Text>
          <Text style={styles.introDesc}>
            {language === 'hi' ? 
              'आसान चरणों में सीखें कि घर में कैसे खेती करें और ताजी सब्जियां उगाएं' :
              'Learn how to grow fresh vegetables at home with these simple steps'
            }
          </Text>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'वीडियो गाइड' : 'Video Guide'}
          </Text>
          <TouchableOpacity 
            style={styles.videoCard} 
            onPress={() => Linking.openURL('https://www.youtube.com/watch?v=dQw4w9WgXcQ')}
          >
            <View style={styles.videoThumbnail}>
              <Ionicons name="play-circle" size={48} color="#FF0000" />
            </View>
            <View style={styles.videoContent}>
              <Text style={styles.videoTitle}>
                {language === 'hi' ? 'घर की खेती - शुरुआती गाइड' : 'Home Farming - Beginner Guide'}
              </Text>
              <Text style={styles.videoDesc}>
                {language === 'hi' ? 
                  'इस वीडियो में सीखें कि घर में कैसे खेती शुरू करें' :
                  'Learn how to start home farming in this video'
                }
              </Text>
              <View style={styles.videoMeta}>
                <Ionicons name="logo-youtube" size={16} color="#FF0000" />
                <Text style={styles.videoMetaText}>YouTube • 15:30</Text>
              </View>
            </View>
            <Ionicons name="open-outline" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'आवश्यक सामग्री' : 'What You Need'}
          </Text>
          <View style={styles.essentialsGrid}>
            {essentials.map((item, index) => (
              <View key={index} style={styles.essentialItem}>
                <Ionicons name={item.icon} size={24} color="#2E7D32" />
                <Text style={styles.essentialText}>{item.name}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'चरण-दर-चरण गाइड' : 'Step-by-Step Guide'}
          </Text>
          {steps.map((step, index) => (
            <View key={index} style={styles.stepCard}>
              <View style={styles.stepNumber}>
                <Text style={styles.stepNumberText}>{step.step}</Text>
              </View>
              <View style={styles.stepIcon}>
                <Ionicons name={step.icon} size={24} color="#4CAF50" />
              </View>
              <View style={styles.stepContent}>
                <Text style={styles.stepTitle}>{step.title}</Text>
                <Text style={styles.stepDesc}>{step.desc}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.actionSection}>
          <TouchableOpacity style={styles.actionButton} onPress={() => router.push('/seed-selection')}>
            <Ionicons name="leaf-outline" size={24} color="#FFFFFF" />
            <Text style={styles.actionButtonText}>
              {language === 'hi' ? 'बीज चुनें' : 'Choose Seeds'}
            </Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.secondaryButton} onPress={() => router.push('/water-management')}>
            <Ionicons name="water-outline" size={24} color="#4CAF50" />
            <Text style={styles.secondaryButtonText}>
              {language === 'hi' ? 'पानी की व्यवस्था' : 'Water Management'}
            </Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  introSection: {
    alignItems: 'center',
    padding: 30,
  },
  iconContainer: {
    width: 80,
    height: 80,
    borderRadius: 40,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  introTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 12,
    textAlign: 'center',
  },
  introDesc: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  section: {
    paddingHorizontal: 20,
    marginBottom: 25,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  essentialsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  essentialItem: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  essentialText: {
    fontSize: 14,
    color: '#1B5E20',
    marginTop: 8,
    textAlign: 'center',
  },
  stepCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  stepNumber: {
    width: 32,
    height: 32,
    borderRadius: 16,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepNumberText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  stepIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  stepContent: {
    flex: 1,
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 4,
  },
  stepDesc: {
    fontSize: 14,
    color: '#666',
  },
  actionSection: {
    padding: 20,
    paddingBottom: 40,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  actionButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  secondaryButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: 8,
  },
  videoCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E0E0E0',
  },
  videoThumbnail: {
    width: 80,
    height: 60,
    backgroundColor: '#000000',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  videoContent: {
    flex: 1,
  },
  videoTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    marginBottom: 4,
  },
  videoDesc: {
    fontSize: 14,
    color: '#666',
    marginBottom: 8,
  },
  videoMeta: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  videoMetaText: {
    fontSize: 12,
    color: '#999',
    marginLeft: 4,
  },
});