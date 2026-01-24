import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image, ScrollView, Share, Alert } from 'react-native';
import { router, useLocalSearchParams } from 'expo-router';
import { Ionicons } from '@expo/vector-icons';
import * as Speech from 'expo-speech';
import { useLanguage } from '../contexts/language-context';

export default function ResultScreen() {
  const params = useLocalSearchParams();
  const { imageUri, disease, confidence, recommendation, severity, treatment } = params;
  const { language } = useLanguage();
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [translatedContent, setTranslatedContent] = useState(null);
  const [isTranslating, setIsTranslating] = useState(false);

  const translateText = async (text, targetLang) => {
    try {
      const response = await fetch(
        `https://translate.googleapis.com/translate_a/single?client=gtx&sl=auto&tl=${targetLang}&dt=t&q=${encodeURIComponent(text)}`
      );
      const data = await response.json();
      return data[0][0][0];
    } catch (error) {
      console.error('Translation error:', error);
      return text;
    }
  };

  const handleTranslate = async () => {
    if (isTranslating) return;
    
    setIsTranslating(true);
    const targetLang = language === 'hi' ? 'en' : 'hi';
    
    try {
      const textsToTranslate = [
        disease, recommendation, treatment, severity,
        'Analysis Result', 'Diagnosis', 'Confidence', 'Severity', 'Recommendation', 'Treatment',
        'Why This Happens', 'What to Do Next', 'Scan Another', 'Go Home',
        'This condition typically occurs due to environmental factors, nutrient deficiencies, or pathogen infections. Poor drainage, excessive moisture, or inadequate nutrition can create favorable conditions for disease development.',
        '1. Apply the recommended treatment immediately\n2. Monitor the affected area daily\n3. Improve drainage and air circulation\n4. Consider preventive measures for future crops\n5. Consult an agricultural expert if symptoms persist'
      ];
      
      const translations = await Promise.all(
        textsToTranslate.map(text => translateText(text, targetLang))
      );
      
      setTranslatedContent({
        disease: translations[0],
        recommendation: translations[1],
        treatment: translations[2],
        severity: translations[3],
        analysisResult: translations[4],
        diagnosis: translations[5],
        confidence: translations[6],
        severityLabel: translations[7],
        recommendationLabel: translations[8],
        treatmentLabel: translations[9],
        whyTitle: translations[10],
        whatToDoTitle: translations[11],
        scanAnother: translations[12],
        goHome: translations[13],
        whyText: translations[14],
        actionText: translations[15],
        targetLang
      });
    } catch (error) {
      Alert.alert('Translation Error', 'Failed to translate content. Please try again.');
    } finally {
      setIsTranslating(false);
    }
  };

  const clearTranslation = () => {
    setTranslatedContent(null);
  };

  const currentContent = translatedContent || {
    disease,
    recommendation,
    treatment,
    severity: severity
  };

  const getConfidenceColor = (confidence) => {
    if (confidence >= 80) return '#4CAF50';
    if (confidence >= 60) return '#FF9800';
    return '#F44336';
  };

  const getSeverityColor = (severity) => {
    switch (severity?.toLowerCase()) {
      case 'low': return '#4CAF50';
      case 'moderate': return '#FF9800';
      case 'high': return '#F44336';
      default: return '#4CAF50';
    }
  };

  const speakResult = async () => {
    if (isSpeaking) {
      Speech.stop();
      setIsSpeaking(false);
      return;
    }

    const content = translatedContent || { disease, recommendation, treatment, severity };
    const textToSpeak = translatedContent?.targetLang === 'hi' || (!translatedContent && language === 'hi')
      ? `रोग: ${content.disease}। विश्वास स्तर: ${confidence} प्रतिशत। गंभीरता: ${content.severity}। सिफारिश: ${content.recommendation}। उपचार: ${content.treatment}`
      : `Disease: ${content.disease}. Confidence level: ${confidence} percent. Severity: ${content.severity}. Recommendation: ${content.recommendation}. Treatment: ${content.treatment}`;

    const speechOptions = {
      language: (translatedContent?.targetLang === 'hi' || (!translatedContent && language === 'hi')) ? 'hi-IN' : 'en-US',
      pitch: 1.0,
      rate: 0.8,
      onStart: () => setIsSpeaking(true),
      onDone: () => setIsSpeaking(false),
      onStopped: () => setIsSpeaking(false),
      onError: () => setIsSpeaking(false),
    };

    Speech.speak(textToSpeak, speechOptions);
  };

  const shareResult = async () => {
    try {
      await Share.share({
        message: `KrishiLens Analysis Result:\\n\\nDisease: ${disease}\\nConfidence: ${confidence}%\\nSeverity: ${severity}\\n\\nRecommendation: ${recommendation}\\n\\nTreatment: ${treatment}`,
        title: 'KrishiLens Analysis Result'
      });
    } catch (error) {
      console.error('Error sharing:', error);
    }
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>{translatedContent?.analysisResult || 'Analysis Result'}</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity 
            onPress={translatedContent ? clearTranslation : handleTranslate} 
            style={[styles.translateButton, isTranslating && styles.translateButtonDisabled]}
            disabled={isTranslating}
          >
            <Ionicons 
              name={translatedContent ? "refresh" : "language"} 
              size={20} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={speakResult} style={styles.speakButton}>
            <Ionicons 
              name={isSpeaking ? "stop-circle" : "volume-high"} 
              size={20} 
              color="#FFFFFF" 
            />
          </TouchableOpacity>
          <TouchableOpacity onPress={shareResult} style={styles.shareButton}>
            <Ionicons name="share-outline" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.content}>
        {imageUri && (
          <View style={styles.imageContainer}>
            <Image source={{ uri: imageUri }} style={styles.image} />
          </View>
        )}

        <View style={styles.resultCard}>
          <View style={styles.resultHeader}>
            <Ionicons name="medical" size={32} color="#4CAF50" />
            <Text style={styles.resultTitle}>{translatedContent?.diagnosis || 'Diagnosis'}</Text>
          </View>
          
          <View style={styles.diseaseInfo}>
            <Text style={styles.diseaseName}>{currentContent.disease}</Text>
            {translatedContent && (
              <Text style={styles.translationNote}>
                Translated to {translatedContent.targetLang === 'hi' ? 'Hindi' : 'English'}
              </Text>
            )}
            <View style={styles.confidenceContainer}>
              <Text style={styles.confidenceLabel}>{translatedContent?.confidence || 'Confidence'}:</Text>
              <Text style={[styles.confidenceValue, { color: getConfidenceColor(confidence) }]}>
                {confidence}%
              </Text>
            </View>
            
            <View style={styles.progressBarContainer}>
              <View style={styles.progressBarBackground}>
                <View 
                  style={[
                    styles.progressBarFill, 
                    { 
                      width: `${confidence}%`,
                      backgroundColor: getConfidenceColor(confidence)
                    }
                  ]} 
                />
              </View>
            </View>
            <View style={styles.severityContainer}>
              <Text style={styles.severityLabel}>{translatedContent?.severityLabel || 'Severity'}:</Text>
              <View style={[styles.severityBadge, { backgroundColor: getSeverityColor(severity) }]}>
                <Text style={styles.severityText}>{currentContent.severity}</Text>
              </View>
            </View>
          </View>
        </View>

        <View style={styles.recommendationCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="bulb" size={24} color="#FF9800" />
            <Text style={styles.cardTitle}>{translatedContent?.recommendationLabel || 'Recommendation'}</Text>
          </View>
          <Text style={styles.recommendationText}>{currentContent.recommendation}</Text>
        </View>

        <View style={styles.treatmentCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="leaf" size={24} color="#4CAF50" />
            <Text style={styles.cardTitle}>{translatedContent?.treatmentLabel || 'Treatment'}</Text>
          </View>
          <Text style={styles.treatmentText}>{currentContent.treatment}</Text>
        </View>

        <View style={styles.whyCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="help-circle" size={24} color="#2196F3" />
            <Text style={styles.cardTitle}>{translatedContent?.whyTitle || 'Why This Happens'}</Text>
          </View>
          <Text style={styles.whyText}>{translatedContent?.whyText || 'This condition typically occurs due to environmental factors, nutrient deficiencies, or pathogen infections. Poor drainage, excessive moisture, or inadequate nutrition can create favorable conditions for disease development.'}</Text>
        </View>

        <View style={styles.actionCard}>
          <View style={styles.cardHeader}>
            <Ionicons name="checkmark-circle" size={24} color="#FF9800" />
            <Text style={styles.cardTitle}>{translatedContent?.whatToDoTitle || 'What to Do Next'}</Text>
          </View>
          <Text style={styles.actionText}>{translatedContent?.actionText || '1. Apply the recommended treatment immediately\n2. Monitor the affected area daily\n3. Improve drainage and air circulation\n4. Consider preventive measures for future crops\n5. Consult an agricultural expert if symptoms persist'}</Text>
        </View>

        <View style={styles.actions}>
          <TouchableOpacity 
            style={styles.primaryButton}
            onPress={() => router.push('/scan')}
          >
            <Ionicons name="camera" size={20} color="#FFFFFF" />
            <Text style={styles.primaryButtonText}>{translatedContent?.scanAnother || 'Scan Another'}</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => router.push('/(tabs)')}
          >
            <Ionicons name="home" size={20} color="#4CAF50" />
            <Text style={styles.secondaryButtonText}>{translatedContent?.goHome || 'Go Home'}</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1B5E20',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 20,
    paddingTop: 60,
  },
  headerActions: {
    flexDirection: 'row',
    gap: 8,
  },
  translateButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  translateButtonDisabled: {
    opacity: 0.5,
  },
  backButton: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  speakButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  shareButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#FFFFFF',
  },
  content: {
    flex: 1,
    padding: 20,
    backgroundColor: '#F1F8E9',
    borderTopLeftRadius: 25,
    borderTopRightRadius: 25,
  },
  imageContainer: {
    alignItems: 'center',
    marginBottom: 24,
  },
  image: {
    width: 200,
    height: 200,
    borderRadius: 12,
  },
  resultCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  resultHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  resultTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginLeft: 12,
  },
  diseaseInfo: {
    gap: 12,
  },
  diseaseName: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1B5E20',
  },
  translationNote: {
    fontSize: 12,
    color: '#FF9800',
    fontStyle: 'italic',
    marginTop: 4,
  },
  confidenceContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  confidenceLabel: {
    fontSize: 16,
    color: '#4CAF50',
  },
  confidenceValue: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  severityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  severityLabel: {
    fontSize: 16,
    color: '#4CAF50',
  },
  severityBadge: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
  },
  severityText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  progressBarContainer: {
    marginTop: 8,
  },
  progressBarBackground: {
    height: 8,
    backgroundColor: '#E0E0E0',
    borderRadius: 4,
    overflow: 'hidden',
  },
  progressBarFill: {
    height: '100%',
    borderRadius: 4,
  },
  recommendationCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  treatmentCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginLeft: 8,
  },
  recommendationText: {
    fontSize: 16,
    color: '#1B5E20',
    lineHeight: 24,
  },
  treatmentText: {
    fontSize: 16,
    color: '#1B5E20',
    lineHeight: 24,
  },
  whyCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  whyText: {
    fontSize: 16,
    color: '#1B5E20',
    lineHeight: 24,
  },
  actionCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    marginBottom: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  actionText: {
    fontSize: 16,
    color: '#1B5E20',
    lineHeight: 24,
  },
  actions: {
    flexDirection: 'row',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  secondaryButton: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderColor: '#4CAF50',
    padding: 16,
    borderRadius: 12,
    gap: 8,
  },
  primaryButtonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButtonText: {
    color: '#4CAF50',
    fontSize: 16,
    fontWeight: '600',
  },
});