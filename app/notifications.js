import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';

export default function NotificationsScreen() {
  const [pushEnabled, setPushEnabled] = useState(true);
  const [scanReminders, setScanReminders] = useState(true);
  const [updateAlerts, setUpdateAlerts] = useState(true);

  const notifications = [
    {
      id: 1,
      title: "New Update Available!",
      message: "KrishiLens v1.1.0 is now available with improved disease detection accuracy",
      time: "2 hours ago",
      type: "update",
      icon: "download-outline",
      unread: true
    },
    {
      id: 2,
      title: "Scan Reminder",
      message: "Don't forget to check your tomato plants today",
      time: "1 day ago",
      type: "reminder",
      icon: "time-outline",
      unread: false
    },
    {
      id: 3,
      title: "Treatment Success",
      message: "Your recent treatment for Early Blight was successful!",
      time: "3 days ago",
      type: "success",
      icon: "checkmark-circle-outline",
      unread: false
    }
  ];

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>Notifications</Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Settings</Text>
          
          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Push Notifications</Text>
              <Text style={styles.settingSubtitle}>Receive app notifications</Text>
            </View>
            <Switch
              value={pushEnabled}
              onValueChange={setPushEnabled}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={pushEnabled ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Scan Reminders</Text>
              <Text style={styles.settingSubtitle}>Daily plant check reminders</Text>
            </View>
            <Switch
              value={scanReminders}
              onValueChange={setScanReminders}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={scanReminders ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>

          <View style={styles.settingItem}>
            <View style={styles.settingContent}>
              <Text style={styles.settingTitle}>Update Alerts</Text>
              <Text style={styles.settingSubtitle}>App update notifications</Text>
            </View>
            <Switch
              value={updateAlerts}
              onValueChange={setUpdateAlerts}
              trackColor={{ false: '#E0E0E0', true: '#4CAF50' }}
              thumbColor={updateAlerts ? '#FFFFFF' : '#FFFFFF'}
            />
          </View>
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Recent Notifications</Text>
          {notifications.map((notification) => (
            <TouchableOpacity key={notification.id} style={styles.notificationItem}>
              <View style={[styles.notificationIcon, { backgroundColor: notification.unread ? '#4CAF50' : '#E8F5E8' }]}>
                <Ionicons 
                  name={notification.icon} 
                  size={24} 
                  color={notification.unread ? '#FFFFFF' : '#2E7D32'} 
                />
              </View>
              <View style={styles.notificationContent}>
                <Text style={[styles.notificationTitle, { fontWeight: notification.unread ? 'bold' : '600' }]}>
                  {notification.title}
                </Text>
                <Text style={styles.notificationMessage}>{notification.message}</Text>
                <Text style={styles.notificationTime}>{notification.time}</Text>
              </View>
              {notification.unread && <View style={styles.unreadDot} />}
            </TouchableOpacity>
          ))}
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
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
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
  notificationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  notificationIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  notificationContent: {
    flex: 1,
  },
  notificationTitle: {
    fontSize: 16,
    color: '#1B5E20',
    marginBottom: 4,
  },
  notificationMessage: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  notificationTime: {
    fontSize: 12,
    color: '#999',
  },
  unreadDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#4CAF50',
  },
});