import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function BuyOrdersScreen() {
  const { language } = useLanguage();
  const [activeTab, setActiveTab] = useState('create');

  const buyOrders = [
    {
      id: 1,
      product: language === 'hi' ? 'गेहूं' : 'Wheat',
      quantity: '100 kg',
      price: '₹2,500',
      location: language === 'hi' ? 'दिल्ली' : 'Delhi',
      status: 'active'
    },
    {
      id: 2,
      product: language === 'hi' ? 'चावल' : 'Rice',
      quantity: '50 kg',
      price: '₹3,000',
      location: language === 'hi' ? 'पंजाब' : 'Punjab',
      status: 'completed'
    }
  ];

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {language === 'hi' ? 'खरीद ऑर्डर' : 'Buy Orders'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <View style={styles.content}>
        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'create' && styles.activeTab]}
            onPress={() => setActiveTab('create')}
          >
            <Text style={[styles.tabText, activeTab === 'create' && styles.activeTabText]}>
              {language === 'hi' ? 'नया ऑर्डर' : 'Create Order'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, activeTab === 'my' && styles.activeTab]}
            onPress={() => setActiveTab('my')}
          >
            <Text style={[styles.tabText, activeTab === 'my' && styles.activeTabText]}>
              {language === 'hi' ? 'मेरे ऑर्डर' : 'My Orders'}
            </Text>
          </TouchableOpacity>
        </View>

        <ScrollView style={styles.scrollContent}>
          {activeTab === 'create' ? (
            <View style={styles.createForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{language === 'hi' ? 'उत्पाद' : 'Product'}</Text>
                <TextInput style={styles.input} placeholder={language === 'hi' ? 'उत्पाद का नाम' : 'Product name'} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{language === 'hi' ? 'मात्रा' : 'Quantity'}</Text>
                <TextInput style={styles.input} placeholder={language === 'hi' ? 'मात्रा (kg)' : 'Quantity (kg)'} />
              </View>
              <View style={styles.inputGroup}>
                <Text style={styles.label}>{language === 'hi' ? 'कीमत' : 'Price'}</Text>
                <TextInput style={styles.input} placeholder={language === 'hi' ? 'कीमत प्रति kg' : 'Price per kg'} />
              </View>
              <TouchableOpacity style={styles.submitButton}>
                <Text style={styles.submitText}>{language === 'hi' ? 'ऑर्डर बनाएं' : 'Create Order'}</Text>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={styles.ordersList}>
              {buyOrders.map((order) => (
                <View key={order.id} style={styles.orderCard}>
                  <View style={styles.orderHeader}>
                    <Text style={styles.productName}>{order.product}</Text>
                    <View style={[styles.statusBadge, { backgroundColor: order.status === 'active' ? '#4CAF50' : '#FF9800' }]}>
                      <Text style={styles.statusText}>
                        {order.status === 'active' ? (language === 'hi' ? 'सक्रिय' : 'Active') : (language === 'hi' ? 'पूर्ण' : 'Complete')}
                      </Text>
                    </View>
                  </View>
                  <Text style={styles.orderDetail}>{language === 'hi' ? 'मात्रा: ' : 'Quantity: '}{order.quantity}</Text>
                  <Text style={styles.orderDetail}>{language === 'hi' ? 'कीमत: ' : 'Price: '}{order.price}</Text>
                  <Text style={styles.orderDetail}>{language === 'hi' ? 'स्थान: ' : 'Location: '}{order.location}</Text>
                </View>
              ))}
            </View>
          )}
        </ScrollView>
      </View>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 60 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  content: { flex: 1, backgroundColor: '#F1F8E9', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  tabContainer: { flexDirection: 'row', padding: 20, paddingBottom: 0 },
  tab: { flex: 1, padding: 12, alignItems: 'center', borderRadius: 8, marginHorizontal: 4 },
  activeTab: { backgroundColor: '#4CAF50' },
  tabText: { fontSize: 16, color: '#666' },
  activeTabText: { color: '#FFFFFF', fontWeight: 'bold' },
  scrollContent: { flex: 1, padding: 20 },
  createForm: { backgroundColor: '#FFFFFF', padding: 20, borderRadius: 12 },
  inputGroup: { marginBottom: 16 },
  label: { fontSize: 16, fontWeight: '600', color: '#1B5E20', marginBottom: 8 },
  input: { borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 8, padding: 12, fontSize: 16 },
  submitButton: { backgroundColor: '#4CAF50', padding: 16, borderRadius: 8, alignItems: 'center', marginTop: 20 },
  submitText: { color: '#FFFFFF', fontSize: 16, fontWeight: 'bold' },
  ordersList: {},
  orderCard: { backgroundColor: '#FFFFFF', padding: 16, borderRadius: 12, marginBottom: 12 },
  orderHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 8 },
  productName: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20' },
  statusBadge: { paddingHorizontal: 8, paddingVertical: 4, borderRadius: 12 },
  statusText: { color: '#FFFFFF', fontSize: 12, fontWeight: 'bold' },
  orderDetail: { fontSize: 14, color: '#666', marginBottom: 4 },
});