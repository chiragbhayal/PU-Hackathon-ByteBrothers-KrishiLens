import React, { createContext, useContext, useState, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const StatsContext = createContext();

export const useStats = () => {
  const context = useContext(StatsContext);
  if (!context) {
    throw new Error('useStats must be used within a StatsProvider');
  }
  return context;
};

export const StatsProvider = ({ children }) => {
  const [stats, setStats] = useState({
    totalScans: 0,
    healthyPlants: 0,
    diseasedPlants: 0,
    plantsHealed: 0
  });

  useEffect(() => {
    loadStats();
  }, []);

  const loadStats = async () => {
    try {
      const savedStats = await AsyncStorage.getItem('userStats');
      if (savedStats) {
        setStats(JSON.parse(savedStats));
      }
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const saveStats = async (newStats) => {
    try {
      await AsyncStorage.setItem('userStats', JSON.stringify(newStats));
      setStats(newStats);
    } catch (error) {
      console.error('Error saving stats:', error);
    }
  };

  const updateStats = (scanResult) => {
    const newStats = { ...stats };
    newStats.totalScans += 1;
    
    if (scanResult.isHealthy) {
      newStats.healthyPlants += 1;
    } else {
      newStats.diseasedPlants += 1;
    }
    
    saveStats(newStats);
  };

  const markPlantHealed = () => {
    const newStats = { ...stats };
    newStats.plantsHealed += 1;
    saveStats(newStats);
  };

  return (
    <StatsContext.Provider value={{ stats, updateStats, markPlantHealed }}>
      {children}
    </StatsContext.Provider>
  );
};