import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, KeyboardAvoidingView, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function ChatbotScreen() {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: language === 'hi' ? 'नमस्ते! मैं आपका कृषि सहायक हूं। मैं आपकी खेती से जुड़े सवालों का जवाब दे सकता हूं।' : 'Hello! I am your agricultural assistant. I can help answer your farming questions.',
      isBot: true,
      timestamp: new Date()
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    { 
      text: language === 'hi' ? 'टमाटर की बीमारी' : 'Tomato diseases',
      response: language === 'hi' ? 'टमाटर में मुख्य बीमारियां हैं: अर्ली ब्लाइट, लेट ब्लाइट, और मोज़ेक वायरस। नियमित छिड़काव और उचित जल निकासी से बचाव करें।' : 'Common tomato diseases include Early Blight, Late Blight, and Mosaic Virus. Prevent with regular spraying and proper drainage.'
    },
    {
      text: language === 'hi' ? 'पानी की मात्रा' : 'Watering amount',
      response: language === 'hi' ? 'टमाटर के पौधों को दिन में 1-2 बार पानी दें। मिट्टी नम रखें लेकिन जलभराव न होने दें।' : 'Water tomato plants 1-2 times daily. Keep soil moist but avoid waterlogging.'
    },
    {
      text: language === 'hi' ? 'उर्वरक कब दें' : 'When to fertilize',
      response: language === 'hi' ? 'रोपाई के 15 दिन बाद पहली बार उर्वरक दें। फिर हर 20-25 दिन में NPK उर्वरक का प्रयोग करें।' : 'Apply first fertilizer 15 days after transplanting. Then use NPK fertilizer every 20-25 days.'
    }
  ];

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    
    if (msg.includes('disease') || msg.includes('बीमारी')) {
      return language === 'hi' ? 'पौधों की बीमारी के लिए नियमित निरीक्षण करें। संक्रमित पत्तियों को हटाएं और कवकनाशी का छिड़काव करें।' : 'For plant diseases, inspect regularly. Remove infected leaves and spray fungicide.';
    }
    if (msg.includes('water') || msg.includes('पानी')) {
      return language === 'hi' ? 'सुबह और शाम पानी दें। मिट्टी की नमी जांचें और आवश्यकता अनुसार पानी दें।' : 'Water in morning and evening. Check soil moisture and water as needed.';
    }
    if (msg.includes('fertilizer') || msg.includes('उर्वरक')) {
      return language === 'hi' ? 'संतुलित NPK उर्वरक का प्रयोग करें। जैविक खाद भी मिलाएं।' : 'Use balanced NPK fertilizer. Also add organic compost.';
    }
    
    return language === 'hi' ? 'मुझे खुशी होगी आपकी मदद करने में। कृपया अपना प्रश्न स्पष्ट रूप से पूछें।' : 'I would be happy to help you. Please ask your question clearly.';
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = {
      id: messages.length + 1,
      text: inputText,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse = {
      id: messages.length + 2,
      text: getBotResponse(inputText),
      isBot: true,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botResponse]);
    setInputText('');
  };

  const handleQuickQuestion = (question) => {
    const userMessage = {
      id: messages.length + 1,
      text: question.text,
      isBot: false,
      timestamp: new Date()
    };

    const botResponse = {
      id: messages.length + 2,
      text: question.response,
      isBot: true,
      timestamp: new Date()
    };

    setMessages([...messages, userMessage, botResponse]);
  };

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {language === 'hi' ? 'कृषि सहायक' : 'Farm Assistant'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <KeyboardAvoidingView 
        style={styles.content} 
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <ScrollView style={styles.messagesContainer}>
          {messages.map((message) => (
            <View key={message.id} style={[styles.messageRow, message.isBot ? styles.botRow : styles.userRow]}>
              <View style={[styles.messageBubble, message.isBot ? styles.botBubble : styles.userBubble]}>
                <Text style={[styles.messageText, message.isBot ? styles.botText : styles.userText]}>
                  {message.text}
                </Text>
              </View>
            </View>
          ))}
        </ScrollView>

        <View style={styles.quickQuestions}>
          <Text style={styles.quickTitle}>
            {language === 'hi' ? 'त्वरित प्रश्न:' : 'Quick Questions:'}
          </Text>
          <ScrollView horizontal showsHorizontalScrollIndicator={false}>
            {quickQuestions.map((question, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.quickButton}
                onPress={() => handleQuickQuestion(question)}
              >
                <Text style={styles.quickButtonText}>{question.text}</Text>
              </TouchableOpacity>
            ))}
          </ScrollView>
        </View>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.textInput}
            value={inputText}
            onChangeText={setInputText}
            placeholder={language === 'hi' ? 'अपना प्रश्न लिखें...' : 'Type your question...'}
            multiline
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
            <Ionicons name="send" size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', padding: 20, paddingTop: 60 },
  backButton: { width: 40, height: 40, borderRadius: 20, backgroundColor: 'rgba(255,255,255,0.2)', justifyContent: 'center', alignItems: 'center' },
  title: { fontSize: 24, fontWeight: 'bold', color: '#FFFFFF' },
  content: { flex: 1, backgroundColor: '#F1F8E9', borderTopLeftRadius: 25, borderTopRightRadius: 25 },
  messagesContainer: { flex: 1, padding: 16 },
  messageRow: { marginBottom: 12 },
  botRow: { alignItems: 'flex-start' },
  userRow: { alignItems: 'flex-end' },
  messageBubble: { maxWidth: '80%', padding: 12, borderRadius: 16 },
  botBubble: { backgroundColor: '#FFFFFF', borderBottomLeftRadius: 4 },
  userBubble: { backgroundColor: '#4CAF50', borderBottomRightRadius: 4 },
  messageText: { fontSize: 16 },
  botText: { color: '#1B5E20' },
  userText: { color: '#FFFFFF' },
  quickQuestions: { padding: 16, borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  quickTitle: { fontSize: 16, fontWeight: 'bold', color: '#1B5E20', marginBottom: 8 },
  quickButton: { backgroundColor: '#4CAF50', paddingHorizontal: 16, paddingVertical: 8, borderRadius: 20, marginRight: 8 },
  quickButtonText: { color: '#FFFFFF', fontSize: 14, fontWeight: '600' },
  inputContainer: { flexDirection: 'row', padding: 16, alignItems: 'flex-end' },
  textInput: { flex: 1, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 20, paddingHorizontal: 16, paddingVertical: 12, backgroundColor: '#FFFFFF', marginRight: 8, maxHeight: 100 },
  sendButton: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' },
});