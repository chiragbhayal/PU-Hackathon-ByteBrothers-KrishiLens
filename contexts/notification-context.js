import React, { createContext, useContext, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const NotificationContext = createContext();

export const useNotifications = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error('useNotifications must be used within NotificationProvider');
  }
  return context;
};

export const NotificationProvider = ({ children }) => {
  const [notifications, setNotifications] = useState([
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
    }
  ]);

  const addNotification = async (notification) => {
    const newNotification = {
      id: Date.now(),
      ...notification,
      time: 'Just now',
      unread: true
    };
    
    const updatedNotifications = [newNotification, ...notifications];
    setNotifications(updatedNotifications);
    
    try {
      await AsyncStorage.setItem('notifications', JSON.stringify(updatedNotifications));
    } catch (error) {
      console.error('Error saving notification:', error);
    }
  };

  return (
    <NotificationContext.Provider value={{ notifications, addNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};