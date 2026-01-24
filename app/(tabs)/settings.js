import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useAuth } from '../../contexts/auth-context';
import { useLanguage } from '../../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function SettingsScreen() {
  const { user, logout } = useAuth();
  const { language, setLanguage, t } = useLanguage();

  const handleLogout = async () => {
    await logout();
    router.replace('/login');
  };

  const toggleLanguage = () => {
    setLanguage(language === 'en' ? 'hi' : 'en');
  };

  return (
    <LinearGradient 
      colors={['#1B5E20', '#2E7D32', '#4CAF50']}
      style={styles.container}
    >
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{t('settings')}</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('account')}</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/profile')}>
            <View style={styles.settingIcon}>
              <Ionicons name="person-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('profile')}</Text>
              <Text style={styles.settingSubtitle}>{user?.displayName || user?.email?.split('@')[0] || 'Manage your profile'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('preferences')}</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={toggleLanguage}>
            <View style={styles.settingIcon}>
              <Ionicons name="language-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('language')}</Text>
              <Text style={styles.settingSubtitle}>{language === 'en' ? 'English' : 'हिंदी'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/notifications')}>
            <View style={styles.settingIcon}>
              <Ionicons name="notifications-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('notifications')}</Text>
              <Text style={styles.settingSubtitle}>{t('manageNotifications')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>{t('support')}</Text>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/human-safety-line')}>
            <View style={styles.settingIcon}>
              <Ionicons name="shield-checkmark-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{language === 'hi' ? 'मानव सुरक्षा लाइन' : 'Human Safety Line'}</Text>
              <Text style={styles.settingSubtitle}>{language === 'hi' ? 'आपातकालीन संपर्क और सुरक्षा' : 'Emergency contacts and safety'}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/help-support')}>
            <View style={styles.settingIcon}>
              <Ionicons name="help-circle-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('helpSupport')}</Text>
              <Text style={styles.settingSubtitle}>{t('getHelp')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingItem} onPress={() => router.push('/about')}>
            <View style={styles.settingIcon}>
              <Ionicons name="information-circle-outline" size={24} color="#2E7D32" />
            </View>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>{t('about')}</Text>
              <Text style={styles.settingSubtitle}>{t('appVersionInfo')}</Text>
            </View>
            <Ionicons name="chevron-forward" size={20} color="#666" />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
          <Ionicons name="log-out-outline" size={24} color="#FFFFFF" />
          <Text style={styles.logoutButtonText}>{t('logout')}</Text>
        </TouchableOpacity>
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
    fontSize: 28,
    fontWeight: 'bold',
    color: '#FFFFFF',
    letterSpacing: 0.5,
  },
  content: {
    flex: 1,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
    paddingTop: 20,
  },
  section: {
    marginBottom: 30,
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 15,
    letterSpacing: 0.3,
  },
  settingItem: {
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
  settingIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  settingContent: {
    flex: 1,
  },
  settingTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#1B5E20',
  },
  settingSubtitle: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF5722',
    marginHorizontal: 20,
    marginVertical: 20,
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  logoutButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
});