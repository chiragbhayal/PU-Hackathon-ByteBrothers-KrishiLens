import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function CampaignsScreen() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('upcoming');

  const upcomingCampaigns = [
    {
      title: language === 'hi' ? 'जैविक खेती प्रशिक्षण' : 'Organic Farming Training',
      date: language === 'hi' ? '15 दिसंबर 2024' : 'December 15, 2024',
      location: language === 'hi' ? 'दिल्ली' : 'Delhi',
      participants: '500+',
      icon: 'leaf-outline',
      color: '#4CAF50'
    },
    {
      title: language === 'hi' ? 'कृषि तकनीक मेला' : 'Agriculture Tech Fair',
      date: language === 'hi' ? '20 दिसंबर 2024' : 'December 20, 2024',
      location: language === 'hi' ? 'मुंबई' : 'Mumbai',
      participants: '1000+',
      icon: 'construct-outline',
      color: '#FF9800'
    }
  ];

  const ongoingCampaigns = [
    {
      title: language === 'hi' ? 'मुफ्त मिट्टी जांच' : 'Free Soil Testing',
      date: language === 'hi' ? '1-31 दिसंबर 2024' : 'Dec 1-31, 2024',
      location: language === 'hi' ? 'पंजाब' : 'Punjab',
      participants: '2000+',
      icon: 'earth-outline',
      color: '#2196F3'
    },
    {
      title: language === 'hi' ? 'बीज वितरण अभियान' : 'Seed Distribution Drive',
      date: language === 'hi' ? '10-25 दिसंबर 2024' : 'Dec 10-25, 2024',
      location: language === 'hi' ? 'हरियाणा' : 'Haryana',
      participants: '1500+',
      icon: 'nutrition-outline',
      color: '#9C27B0'
    }
  ];

  const completedCampaigns = [
    {
      title: language === 'hi' ? 'किसान स्वास्थ्य मेला' : 'Farmer Health Fair',
      date: language === 'hi' ? '15 नवंबर 2024' : 'November 15, 2024',
      location: language === 'hi' ? 'उत्तर प्रदेश' : 'Uttar Pradesh',
      participants: '3000+',
      icon: 'medical-outline',
      color: '#F44336'
    },
    {
      title: language === 'hi' ? 'डिजिटल कृषि प्रशिक्षण' : 'Digital Agriculture Training',
      date: language === 'hi' ? '5 नवंबर 2024' : 'November 5, 2024',
      location: language === 'hi' ? 'राजस्थान' : 'Rajasthan',
      participants: '800+',
      icon: 'phone-portrait-outline',
      color: '#607D8B'
    }
  ];

  const getCampaigns = () => {
    switch (activeTab) {
      case 'upcoming': return upcomingCampaigns;
      case 'ongoing': return ongoingCampaigns;
      case 'completed': return completedCampaigns;
      default: return upcomingCampaigns;
    }
  };

  const getTabColor = (tab) => {
    if (tab === activeTab) return '#4CAF50';
    return '#666';
  };

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {language === 'hi' ? 'अभियान' : 'Campaigns'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'upcoming' && styles.activeTab]}
            onPress={() => setActiveTab('upcoming')}
          >
            <Text style={[styles.tabText, { color: getTabColor('upcoming') }]}>
              {language === 'hi' ? 'आगामी' : 'Upcoming'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'ongoing' && styles.activeTab]}
            onPress={() => setActiveTab('ongoing')}
          >
            <Text style={[styles.tabText, { color: getTabColor('ongoing') }]}>
              {language === 'hi' ? 'चालू' : 'Ongoing'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'completed' && styles.activeTab]}
            onPress={() => setActiveTab('completed')}
          >
            <Text style={[styles.tabText, { color: getTabColor('completed') }]}>
              {language === 'hi' ? 'पूर्ण' : 'Completed'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.campaignsList}>
          {getCampaigns().map((campaign, index) => (
            <View key={index} style={styles.campaignCard}>
              <View style={[styles.campaignIcon, { backgroundColor: campaign.color }]}>
                <Ionicons name={campaign.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.campaignContent}>
                <Text style={styles.campaignTitle}>{campaign.title}</Text>
                <View style={styles.campaignDetails}>
                  <View style={styles.detailRow}>
                    <Ionicons name="calendar-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{campaign.date}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="location-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{campaign.location}</Text>
                  </View>
                  <View style={styles.detailRow}>
                    <Ionicons name="people-outline" size={16} color="#666" />
                    <Text style={styles.detailText}>{campaign.participants}</Text>
                  </View>
                </View>
              </View>
              <View style={styles.statusBadge}>
                <Text style={styles.statusText}>
                  {activeTab === 'upcoming' ? (language === 'hi' ? 'आगामी' : 'Upcoming') :
                   activeTab === 'ongoing' ? (language === 'hi' ? 'चालू' : 'Live') :
                   (language === 'hi' ? 'पूर्ण' : 'Done')}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>
      </View>
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
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 12,
    padding: 4,
  },
  tab: {
    flex: 1,
    paddingVertical: 12,
    alignItems: 'center',
    borderRadius: 8,
  },
  activeTab: {
    backgroundColor: '#E8F5E8',
  },
  tabText: {
    fontSize: 16,
    fontWeight: '600',
  },
  campaignsList: {
    flex: 1,
    paddingHorizontal: 20,
  },
  campaignCard: {
    flexDirection: 'row',
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
  campaignIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  campaignContent: {
    flex: 1,
  },
  campaignTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 8,
  },
  campaignDetails: {
    gap: 4,
  },
  detailRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  detailText: {
    fontSize: 14,
    color: '#666',
    marginLeft: 8,
  },
  statusBadge: {
    backgroundColor: '#E8F5E8',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statusText: {
    fontSize: 12,
    color: '#4CAF50',
    fontWeight: '600',
  },
});