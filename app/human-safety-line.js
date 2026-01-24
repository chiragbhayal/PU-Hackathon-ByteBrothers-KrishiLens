import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Linking, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function HumanSafetyLineScreen() {
  const { language } = useLanguage();

  const emergencyContacts = [
    {
      name: language === 'hi' ? 'पुलिस' : 'Police',
      number: '100',
      icon: 'shield-outline',
      color: '#F44336'
    },
    {
      name: language === 'hi' ? 'एम्बुलेंस' : 'Ambulance',
      number: '108',
      icon: 'medical-outline',
      color: '#FF5722'
    },
    {
      name: language === 'hi' ? 'फायर ब्रिगेड' : 'Fire Brigade',
      number: '101',
      icon: 'flame-outline',
      color: '#FF9800'
    },
    {
      name: language === 'hi' ? 'महिला हेल्पलाइन' : 'Women Helpline',
      number: '1091',
      icon: 'person-outline',
      color: '#E91E63'
    },
    {
      name: language === 'hi' ? 'कृषि विभाग' : 'Agriculture Department',
      number: '1551',
      icon: 'leaf-outline',
      color: '#4CAF50'
    },
    {
      name: language === 'hi' ? 'किसान कॉल सेंटर' : 'Kisan Call Center',
      number: '1800-180-1551',
      icon: 'call-outline',
      color: '#2196F3'
    }
  ];

  const safetyTips = [
    {
      title: language === 'hi' ? 'कृषि सुरक्षा' : 'Agricultural Safety',
      tips: language === 'hi' ? [
        'कीटनाशक का उपयोग करते समय मास्क पहनें',
        'खेत में काम करते समय उचित कपड़े पहनें',
        'मशीनरी का उपयोग सावधानी से करें'
      ] : [
        'Wear mask when using pesticides',
        'Wear proper clothing while working in fields',
        'Use machinery with caution'
      ],
      icon: 'leaf-outline',
      color: '#4CAF50'
    },
    {
      title: language === 'hi' ? 'व्यक्तिगत सुरक्षा' : 'Personal Safety',
      tips: language === 'hi' ? [
        'अकेले दूर के खेत में न जाएं',
        'मोबाइल फोन हमेशा साथ रखें',
        'परिवार को अपनी जानकारी दें'
      ] : [
        'Do not go to distant fields alone',
        'Always carry mobile phone',
        'Inform family about your whereabouts'
      ],
      icon: 'person-outline',
      color: '#2196F3'
    }
  ];

  const handleCall = (number) => {
    Alert.alert(
      language === 'hi' ? 'कॉल करें' : 'Make Call',
      `${language === 'hi' ? 'क्या आप' : 'Do you want to call'} ${number}?`,
      [
        { text: language === 'hi' ? 'रद्द करें' : 'Cancel', style: 'cancel' },
        { 
          text: language === 'hi' ? 'कॉल करें' : 'Call', 
          onPress: () => Linking.openURL(`tel:${number}`)
        }
      ]
    );
  };

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {language === 'hi' ? 'मानव सुरक्षा लाइन' : 'Human Safety Line'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.emergencySection}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'आपातकालीन संपर्क' : 'Emergency Contacts'}
          </Text>
          
          {emergencyContacts.map((contact, index) => (
            <TouchableOpacity 
              key={index} 
              style={styles.contactCard}
              onPress={() => handleCall(contact.number)}
            >
              <View style={[styles.contactIcon, { backgroundColor: contact.color }]}>
                <Ionicons name={contact.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.contactContent}>
                <Text style={styles.contactName}>{contact.name}</Text>
                <Text style={styles.contactNumber}>{contact.number}</Text>
              </View>
              <Ionicons name="call-outline" size={24} color={contact.color} />
            </TouchableOpacity>
          ))}
        </View>

        <View style={styles.safetySection}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'सुरक्षा सुझाव' : 'Safety Tips'}
          </Text>
          
          {safetyTips.map((category, index) => (
            <View key={index} style={styles.tipCard}>
              <View style={styles.tipHeader}>
                <View style={[styles.tipIcon, { backgroundColor: category.color }]}>
                  <Ionicons name={category.icon} size={20} color="#FFFFFF" />
                </View>
                <Text style={styles.tipTitle}>{category.title}</Text>
              </View>
              {category.tips.map((tip, tipIndex) => (
                <View key={tipIndex} style={styles.tipItem}>
                  <Text style={styles.tipBullet}>•</Text>
                  <Text style={styles.tipText}>{tip}</Text>
                </View>
              ))}
            </View>
          ))}
        </View>

        <View style={styles.warningCard}>
          <Ionicons name="warning-outline" size={24} color="#FF9800" />
          <Text style={styles.warningText}>
            {language === 'hi' ? 
              'आपातकाल में तुरंत संबंधित नंबर पर कॉल करें। देरी न करें।' :
              'In emergency, call the relevant number immediately. Do not delay.'
            }
          </Text>
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
  emergencySection: {
    padding: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
  },
  contactCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  contactIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  contactContent: {
    flex: 1,
  },
  contactName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  contactNumber: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: '600',
    marginTop: 2,
  },
  safetySection: {
    padding: 20,
    paddingTop: 0,
  },
  tipCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tipHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  tipIcon: {
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  tipTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  tipItem: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 8,
  },
  tipBullet: {
    fontSize: 16,
    color: '#4CAF50',
    marginRight: 8,
    marginTop: 2,
  },
  tipText: {
    flex: 1,
    fontSize: 14,
    color: '#333',
    lineHeight: 20,
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 16,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#E65100',
    marginLeft: 12,
    lineHeight: 20,
    fontWeight: '500',
  },
});