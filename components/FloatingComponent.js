import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated } from 'react-native';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';
import { router } from 'expo-router';

export default function FloatingComponent() {
  const { language } = useLanguage();
  const [isExpanded, setIsExpanded] = useState(false);

  const toggleExpanded = () => {
    setIsExpanded(!isExpanded);
  };

  const handleHelpContact = () => {
    setIsExpanded(false);
    router.push('/human-safety-line');
  };

  const handleChatbot = () => {
    setIsExpanded(false);
    router.push('/chatbot');
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={[styles.floatingButton, isExpanded && styles.expandedButton]} 
        onPress={toggleExpanded}
      >
        <Ionicons 
          name={isExpanded ? "close" : "help-circle"} 
          size={24} 
          color="#FFFFFF" 
        />
      </TouchableOpacity>
      
      {isExpanded && (
        <View style={styles.expandedContent}>
          <Text style={styles.title}>
            {language === 'hi' ? 'सहायता' : 'Help'}
          </Text>
          <TouchableOpacity style={styles.helpItem} onPress={handleChatbot}>
            <Ionicons name="chatbubble-ellipses-outline" size={20} color="#4CAF50" />
            <Text style={styles.helpText}>
              {language === 'hi' ? 'चैटबॉट' : 'Chatbot'}
            </Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.helpItem} onPress={handleHelpContact}>
            <Ionicons name="call-outline" size={20} color="#4CAF50" />
            <Text style={styles.helpText}>
              {language === 'hi' ? 'सहायता संपर्क' : 'Help Contact'}
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 100,
    right: 20,
    zIndex: 1000,
  },
  floatingButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 8,
  },
  expandedButton: {
    backgroundColor: '#FF5722',
  },
  expandedContent: {
    position: 'absolute',
    bottom: 70,
    right: 0,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    minWidth: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 8,
  },
  title: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 12,
  },
  helpItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 8,
  },
  helpText: {
    fontSize: 14,
    color: '#333',
    marginLeft: 8,
  },
});