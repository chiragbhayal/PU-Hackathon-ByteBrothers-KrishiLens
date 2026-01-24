import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function HelpSupportScreen() {
  const { t } = useLanguage();
  const [expandedFAQ, setExpandedFAQ] = useState(null);

  const faqData = [
    {
      question: "How to scan plant diseases?",
      answer: "Open the app, tap the camera icon, point your camera at the affected plant leaf, and tap capture. The AI will analyze and provide diagnosis."
    },
    {
      question: "Why is my scan result inaccurate?",
      answer: "Ensure good lighting, focus on the affected area, and hold the camera steady. Clean the camera lens and try scanning different angles."
    },
    {
      question: "How to access scan history?",
      answer: "Go to the History tab in the bottom navigation to view all your previous scans and results."
    },
    {
      question: "Can I use the app offline?",
      answer: "The app requires internet connection for AI analysis. However, you can view previously saved results offline."
    },
    {
      question: "How to change language?",
      answer: "Go to Settings > Language and select your preferred language (English/Hindi)."
    }
  ];

  const contactOptions = [
    {
      title: "Email Support",
      subtitle: "support@krishilens.com",
      icon: "mail-outline",
      action: () => Linking.openURL('mailto:support@krishilens.com')
    },
    {
      title: "WhatsApp",
      subtitle: "+91 9876543210",
      icon: "logo-whatsapp",
      action: () => Linking.openURL('https://wa.me/919876543210')
    },
    {
      title: "Call Us",
      subtitle: "+91 9876543210",
      icon: "call-outline",
      action: () => Linking.openURL('tel:+919876543210')
    }
  ];

  const toggleFAQ = (index) => {
    setExpandedFAQ(expandedFAQ === index ? null : index);
  };

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Help & Support</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Frequently Asked Questions</Text>
          {faqData.map((faq, index) => (
            <View key={index} style={styles.faqItem}>
              <TouchableOpacity 
                style={styles.faqQuestion} 
                onPress={() => toggleFAQ(index)}
              >
                <Text style={styles.questionText}>{faq.question}</Text>
                <Ionicons 
                  name={expandedFAQ === index ? "chevron-up" : "chevron-down"} 
                  size={20} 
                  color="#2E7D32" 
                />
              </TouchableOpacity>
              {expandedFAQ === index && (
                <View style={styles.faqAnswer}>
                  <Text style={styles.answerText}>{faq.answer}</Text>
                </View>
              )}
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Contact Us</Text>
          {contactOptions.map((option, index) => (
            <TouchableOpacity key={index} style={styles.contactItem} onPress={option.action}>
              <View style={styles.contactIcon}>
                <Ionicons name={option.icon} size={24} color="#2E7D32" />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactTitle}>{option.title}</Text>
                <Text style={styles.contactSubtitle}>{option.subtitle}</Text>
              </View>
              <Ionicons name="chevron-forward" size={20} color="#666" />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Quick Guides</Text>
          
          <TouchableOpacity style={styles.guideItem}>
            <View style={styles.guideIcon}>
              <Ionicons name="camera-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.guideContent}>
              <Text style={styles.guideTitle}>How to Scan Plants</Text>
              <Text style={styles.guideSubtitle}>Step-by-step scanning guide</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.guideItem}>
            <View style={styles.guideIcon}>
              <Ionicons name="leaf-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.guideContent}>
              <Text style={styles.guideTitle}>Understanding Results</Text>
              <Text style={styles.guideSubtitle}>How to read diagnosis reports</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.guideItem}>
            <View style={styles.guideIcon}>
              <Ionicons name="medical-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.guideContent}>
              <Text style={styles.guideTitle}>Treatment Guide</Text>
              <Text style={styles.guideSubtitle}>Apply recommended treatments</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
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
  section: {
    padding: 20,
    paddingBottom: 10,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  faqItem: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    marginBottom: 12,
    overflow: 'hidden',
  },
  faqQuestion: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  questionText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
    flex: 1,
  },
  faqAnswer: {
    padding: 16,
    paddingTop: 0,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  answerText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  contactItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  contactIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactContent: {
    flex: 1,
  },
  contactTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
  },
  contactSubtitle: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 2,
  },
  guideItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  guideIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  guideContent: {
    flex: 1,
  },
  guideTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
  },
  guideSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
});