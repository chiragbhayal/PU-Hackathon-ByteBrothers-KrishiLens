import React, { createContext, useContext, useState } from 'react';

const LanguageContext = createContext({});

const translations = {
  en: {
    appName: 'KrishiLens',
    tagline: 'AI-Powered Crop Health Diagnosis',
    selectLanguage: 'Select Language',
    english: 'English',
    hindi: 'हिंदी',
    welcomeBack: 'Welcome Back',
    signInToContinue: 'Sign in to continue',
    email: 'Email',
    password: 'Password',
    signIn: 'Sign In',
    signingIn: 'Signing In...',
    dontHaveAccount: "Don't have an account? Sign Up",
    createAccount: 'Create Account',
    joinKrishiLens: 'Join KrishiLens today',
    confirmPassword: 'Confirm Password',
    signUp: 'Sign Up',
    creatingAccount: 'Creating Account...',
    alreadyHaveAccount: 'Already have an account? Sign In',
    welcomeBack2: 'Welcome back!',
    quickActions: 'Quick Actions',
    scanCrop: 'Scan Crop',
    scanCropDesc: 'Take a photo to analyze crop health',
    scanHistory: 'Scan History',
    scanHistoryDesc: 'View your previous scan results',
    yourStats: 'Your Stats',
    totalScans: 'Total Scans',
    thisWeek: 'This Week',
    noImageSelected: 'No image selected',
    takePhotoOrSelect: 'Take a photo or select from gallery',
    takePhoto: 'Take Photo',
    gallery: 'Gallery',
    analyzeCrop: 'Analyze Crop',
    analyzing: 'Analyzing...',
    analysisResult: 'Analysis Result',
    diagnosis: 'Diagnosis',
    confidence: 'Confidence',
    severity: 'Severity',
    recommendation: 'Recommendation',
    treatment: 'Treatment',
    scanAnother: 'Scan Another',
    goHome: 'Go Home',
    noScansYet: 'No scans yet',
    scanHistoryWillAppear: 'Your scan history will appear here',
    startScanning: 'Start Scanning',
    scans: 'scans',
    dashboard: 'Dashboard',
    recentActivity: 'Recent Activity',
    quickTools: 'Quick Tools',
    cropAnalysisComplete: 'Crop Analysis Complete',
    diseaseDetected: 'Disease Detected',
    hoursAgo: 'hours ago',
    dayAgo: 'day ago',
    analytics: 'Analytics',
    language: 'Language',
    help: 'Help',
    share: 'Share'
  },
  hi: {
    appName: 'KrishiLens',
    tagline: 'AI-संचालित फसल स्वास्थ्य निदान',
    selectLanguage: 'भाषा चुनें',
    english: 'English',
    hindi: 'हिंदी',
    welcomeBack: 'वापस स्वागत है',
    signInToContinue: 'जारी रखने के लिए साइन इन करें',
    email: 'ईमेल',
    password: 'पासवर्ड',
    signIn: 'साइन इन',
    signingIn: 'साइन इन हो रहा है...',
    dontHaveAccount: 'खाता नहीं है? साइन अप करें',
    createAccount: 'खाता बनाएं',
    joinKrishiLens: 'आज ही KrishiLens में शामिल हों',
    confirmPassword: 'पासवर्ड की पुष्टि करें',
    signUp: 'साइन अप',
    creatingAccount: 'खाता बनाया जा रहा है...',
    alreadyHaveAccount: 'पहले से खाता है? साइन इन करें',
    welcomeBack2: 'वापस स्वागत है!',
    quickActions: 'त्वरित कार्य',
    scanCrop: 'फसल स्कैन करें',
    scanCropDesc: 'फसल स्वास्थ्य का विश्लेषण करने के लिए फोटो लें',
    scanHistory: 'स्कैन इतिहास',
    scanHistoryDesc: 'अपने पिछले स्कैन परिणाम देखें',
    yourStats: 'आपके आंकड़े',
    totalScans: 'कुल स्कैन',
    thisWeek: 'इस सप्ताह',
    noImageSelected: 'कोई छवि चयनित नहीं',
    takePhotoOrSelect: 'फोटो लें या गैलरी से चुनें',
    takePhoto: 'फोटो लें',
    gallery: 'गैलरी',
    analyzeCrop: 'फसल का विश्लेषण करें',
    analyzing: 'विश्लेषण हो रहा है...',
    analysisResult: 'विश्लेषण परिणाम',
    diagnosis: 'निदान',
    confidence: 'विश्वास',
    severity: 'गंभीरता',
    recommendation: 'सिफारिश',
    treatment: 'उपचार',
    scanAnother: 'दूसरा स्कैन करें',
    goHome: 'होम जाएं',
    noScansYet: 'अभी तक कोई स्कैन नहीं',
    scanHistoryWillAppear: 'आपका स्कैन इतिहास यहां दिखाई देगा',
    startScanning: 'स्कैनिंग शुरू करें',
    scans: 'स्कैन',
    dashboard: 'डैशबोर्ड',
    recentActivity: 'हाल की गतिविधि',
    quickTools: 'त्वरित उपकरण',
    cropAnalysisComplete: 'फसल विश्लेषण पूर्ण',
    diseaseDetected: 'रोग का पता चला',
    hoursAgo: 'घंटे पहले',
    dayAgo: 'दिन पहले',
    analytics: 'विश्लेषण',
    language: 'भाषा',
    help: 'सहायता',
    share: 'साझा करें'
  }
};

export function LanguageProvider({ children }) {
  const [language, setLanguage] = useState('en');

  const t = (key) => translations[language][key] || key;

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
}