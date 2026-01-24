import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, ImageBackground } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/auth-context';
import { useLanguage } from '../../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function MarketplaceScreen() {
  const { user } = useAuth();
  const { t, language } = useLanguage();

  const marketplaceItems = [
    {
      icon: 'leaf-outline',
      title: language === 'hi' ? 'बीज और पौधे' : 'Seeds & Plants',
      desc: language === 'hi' ? 'गुणवत्तापूर्ण बीज और पौधे खरीदें' : 'Buy quality seeds and plants',
      color: '#4CAF50'
    },
    {
      icon: 'build-outline',
      title: language === 'hi' ? 'कृषि उपकरण' : 'Farm Tools',
      desc: language === 'hi' ? 'खेती के लिए आवश्यक उपकरण' : 'Essential farming equipment',
      color: '#FF9800'
    },
    {
      icon: 'flask-outline',
      title: language === 'hi' ? 'उर्वरक और कीटनाशक' : 'Fertilizers & Pesticides',
      desc: language === 'hi' ? 'जैविक और रासायनिक उर्वरक' : 'Organic and chemical fertilizers',
      color: '#2196F3'
    },
    {
      icon: 'map-outline',
      title: language === 'hi' ? 'जमीन किराए पर' : 'Land Rent',
      desc: language === 'hi' ? 'जमीन किराए पर लें या दें' : 'Rent or lease agricultural land',
      color: '#795548'
    },
    {
      icon: 'library-outline',
      title: language === 'hi' ? 'योजनाएं' : 'Schemes',
      desc: language === 'hi' ? 'सरकारी योजनाएं और सब्सिडी' : 'Government schemes and subsidies',
      color: '#9C27B0'
    },
    {
      icon: 'storefront-outline',
      title: language === 'hi' ? 'फसल बेचें' : 'Sell Crops',
      desc: language === 'hi' ? 'अपनी फसल को बेहतर दाम पर बेचें' : 'Sell your crops at better prices',
      color: '#E91E63'
    },
    {
      icon: 'megaphone-outline',
      title: language === 'hi' ? 'अभियान' : 'Campaigns',
      desc: language === 'hi' ? 'कृषि अभियान और कार्यक्रम' : 'Agricultural campaigns and events',
      color: '#673AB7'
    }
  ];

  return (
    <ImageBackground 
      source={require('../../assets/images/bg.jpeg')} 
      style={styles.container}
      resizeMode="cover"
    >
      <LinearGradient 
        colors={['rgba(27, 94, 32, 0.7)', 'rgba(46, 125, 50, 0.7)', 'rgba(76, 175, 80, 0.7)']} 
        style={styles.overlay}
      >
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
            <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
          </TouchableOpacity>
          <View style={styles.headerContent}>
            <Text style={styles.title}>
              {language === 'hi' ? 'बाज़ार' : 'Marketplace'}
            </Text>
            <Text style={styles.subtitle}>
              {language === 'hi' ? 'कृषि उत्पाद खरीदें और बेचें' : 'Buy and sell agricultural products'}
            </Text>
          </View>
          <View style={styles.orderCards}>
            <TouchableOpacity style={styles.buyCard} onPress={() => router.push('/buy-orders')}>
              <Ionicons name="bag-outline" size={16} color="#4CAF50" />
              <Text style={styles.cardText}>{language === 'hi' ? 'खरीदें' : 'Buy'}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.sellCard} onPress={() => router.push('/sell-orders')}>
              <Ionicons name="storefront-outline" size={16} color="#FF5722" />
              <Text style={styles.cardText}>{language === 'hi' ? 'बेचें' : 'Sell'}</Text>
            </TouchableOpacity>
          </View>
        </View>

        <ScrollView style={styles.content}>
          <View style={styles.itemsSection}>
            {marketplaceItems.map((item, index) => (
              <TouchableOpacity 
                key={index} 
                style={styles.itemCard}
                onPress={() => {
                  if (index === 0) router.push('/seeds');
                  else if (index === 1) router.push('/tools');
                  else if (index === 2) router.push('/fertilizers');
                  else if (index === 3) router.push('/land-rent');
                  else if (index === 4) router.push('/schemes');
                  else if (index === 5) router.push('/sell-crops');
                  else if (index === 6) router.push('/campaigns');
                }}
              >
                <View style={[styles.itemIcon, { backgroundColor: item.color }]}>
                  <Ionicons name={item.icon} size={24} color="#FFFFFF" />
                </View>
                <View style={styles.itemContent}>
                  <Text style={styles.itemTitle}>{item.title}</Text>
                  <Text style={styles.itemDesc}>{item.desc}</Text>
                </View>
                <Ionicons name="chevron-forward" size={20} color="#2E7D32" />
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>
      </LinearGradient>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  overlay: {
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
  headerContent: {
    alignItems: 'center',
    flex: 1,
  },
  title: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#C8E6C9',
    marginTop: 8,
    fontWeight: '500',
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  itemsSection: {
    padding: 20,
    paddingBottom: 100,
  },
  itemCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  itemIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  itemContent: {
    flex: 1,
  },
  itemTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  itemDesc: {
    fontSize: 14,
    color: '#4CAF50',
    marginTop: 4,
  },
  orderCards: {
    flexDirection: 'column',
    gap: 8,
  },
  buyCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#4CAF50',
  },
  sellCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FF5722',
  },
  cardText: {
    fontSize: 12,
    fontWeight: '600',
    marginLeft: 4,
    color: '#1B5E20',
  },
});