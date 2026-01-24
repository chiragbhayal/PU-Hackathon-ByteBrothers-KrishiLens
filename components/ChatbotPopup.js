import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, TextInput, Modal, Animated } from 'react-native';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function ChatbotPopup({ visible, onClose }) {
  const { language } = useLanguage();
  const [messages, setMessages] = useState([
    {
      id: 1,
      text: language === 'hi' ? 'नमस्ते! मैं आपका कृषि सहायक हूं।' : 'Hello! I am your farm assistant.',
      isBot: true
    }
  ]);
  const [inputText, setInputText] = useState('');

  const quickQuestions = [
    { 
      text: language === 'hi' ? 'टमाटर की बीमारी' : 'Tomato diseases',
      response: language === 'hi' ? 'टमाटर में अर्ली ब्लाइट और लेट ब्लाइट मुख्य बीमारियां हैं। नियमित छिड़काव करें।' : 'Early Blight and Late Blight are main tomato diseases. Spray regularly.'
    },
    {
      text: language === 'hi' ? 'पानी कब दें' : 'When to water',
      response: language === 'hi' ? 'सुबह और शाम पानी दें। मिट्टी नम रखें।' : 'Water in morning and evening. Keep soil moist.'
    }
  ];

  const getBotResponse = (userMessage) => {
    const msg = userMessage.toLowerCase();
    if (msg.includes('disease') || msg.includes('बीमारी')) {
      return language === 'hi' ? 'संक्रमित पत्तियों को हटाएं और कवकनाशी का छिड़काव करें।' : 'Remove infected leaves and spray fungicide.';
    }
    if (msg.includes('water') || msg.includes('पानी')) {
      return language === 'hi' ? 'दिन में 2 बार पानी दें। मिट्टी की नमी जांचें।' : 'Water twice daily. Check soil moisture.';
    }
    return language === 'hi' ? 'कृपया अपना प्रश्न स्पष्ट रूप से पूछें।' : 'Please ask your question clearly.';
  };

  const sendMessage = () => {
    if (!inputText.trim()) return;

    const userMessage = { id: messages.length + 1, text: inputText, isBot: false };
    const botResponse = { id: messages.length + 2, text: getBotResponse(inputText), isBot: true };

    setMessages([...messages, userMessage, botResponse]);
    setInputText('');
  };

  const handleQuickQuestion = (question) => {
    const userMessage = { id: messages.length + 1, text: question.text, isBot: false };
    const botResponse = { id: messages.length + 2, text: question.response, isBot: true };
    setMessages([...messages, userMessage, botResponse]);
  };

  return (
    <Modal visible={visible} transparent animationType="slide">
      <View style={styles.overlay}>
        <View style={styles.popup}>
          <View style={styles.header}>
            <Text style={styles.title}>
              {language === 'hi' ? 'कृषि सहायक' : 'Farm Assistant'}
            </Text>
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <Ionicons name="close" size={24} color="#666" />
            </TouchableOpacity>
          </View>

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
            {quickQuestions.map((question, index) => (
              <TouchableOpacity 
                key={index}
                style={styles.quickButton}
                onPress={() => handleQuickQuestion(question)}
              >
                <Text style={styles.quickButtonText}>{question.text}</Text>
              </TouchableOpacity>
            ))}
          </View>

          <View style={styles.inputContainer}>
            <TextInput
              style={styles.textInput}
              value={inputText}
              onChangeText={setInputText}
              placeholder={language === 'hi' ? 'प्रश्न लिखें...' : 'Type question...'}
            />
            <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
              <Ionicons name="send" size={16} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'flex-end' },
  popup: { backgroundColor: '#FFFFFF', borderTopLeftRadius: 20, borderTopRightRadius: 20, height: '70%' },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', padding: 16, borderBottomWidth: 1, borderBottomColor: '#E0E0E0' },
  title: { fontSize: 18, fontWeight: 'bold', color: '#1B5E20' },
  closeButton: { padding: 4 },
  messagesContainer: { flex: 1, padding: 16 },
  messageRow: { marginBottom: 8 },
  botRow: { alignItems: 'flex-start' },
  userRow: { alignItems: 'flex-end' },
  messageBubble: { maxWidth: '80%', padding: 10, borderRadius: 12 },
  botBubble: { backgroundColor: '#F0F0F0' },
  userBubble: { backgroundColor: '#4CAF50' },
  messageText: { fontSize: 14 },
  botText: { color: '#333' },
  userText: { color: '#FFFFFF' },
  quickQuestions: { flexDirection: 'row', padding: 12, gap: 8 },
  quickButton: { backgroundColor: '#E8F5E8', paddingHorizontal: 12, paddingVertical: 6, borderRadius: 16, flex: 1 },
  quickButtonText: { color: '#4CAF50', fontSize: 12, textAlign: 'center' },
  inputContainer: { flexDirection: 'row', padding: 16, alignItems: 'center', borderTopWidth: 1, borderTopColor: '#E0E0E0' },
  textInput: { flex: 1, borderWidth: 1, borderColor: '#E0E0E0', borderRadius: 20, paddingHorizontal: 12, paddingVertical: 8, marginRight: 8 },
  sendButton: { width: 36, height: 36, borderRadius: 18, backgroundColor: '#4CAF50', justifyContent: 'center', alignItems: 'center' },
});