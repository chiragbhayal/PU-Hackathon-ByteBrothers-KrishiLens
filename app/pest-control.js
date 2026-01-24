import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import { useLanguage } from '../contexts/language-context';
import { Ionicons } from '@expo/vector-icons';

export default function PestControlScreen() {
  const { language } = useLanguage();

  const commonPests = [
    {
      name: language === 'hi' ? 'एफिड्स' : 'Aphids',
      symptoms: language === 'hi' ? 'पत्तियों पर छोटे हरे कीड़े' : 'Small green insects on leaves',
      solution: language === 'hi' ? 'नीम का तेल या साबुन का पानी छिड़कें' : 'Spray neem oil or soapy water',
      icon: 'bug-outline',
      color: '#FF5722'
    },
    {
      name: language === 'hi' ? 'सफेद मक्खी' : 'Whiteflies',
      symptoms: language === 'hi' ? 'पत्तियों के नीचे सफेद कीड़े' : 'White insects under leaves',
      solution: language === 'hi' ? 'पीले चिपचिपे जाल लगाएं' : 'Use yellow sticky traps',
      icon: 'airplane-outline',
      color: '#FF9800'
    },
    {
      name: language === 'hi' ? 'कैटरपिलर' : 'Caterpillars',
      symptoms: language === 'hi' ? 'पत्तियों में छेद' : 'Holes in leaves',
      solution: language === 'hi' ? 'हाथ से हटाएं या बीटी स्प्रे करें' : 'Hand pick or use BT spray',
      icon: 'remove-circle-outline',
      color: '#4CAF50'
    },
    {
      name: language === 'hi' ? 'स्पाइडर माइट्स' : 'Spider Mites',
      symptoms: language === 'hi' ? 'पत्तियों पर जाले और पीले धब्बे' : 'Webs and yellow spots on leaves',
      solution: language === 'hi' ? 'नमी बढ़ाएं और नीम का तेल छिड़कें' : 'Increase humidity and spray neem oil',
      icon: 'globe-outline',
      color: '#9C27B0'
    }
  ];

  const naturalSolutions = [
    {
      name: language === 'hi' ? 'नीम का तेल' : 'Neem Oil',
      use: language === 'hi' ? 'सभी प्रकार के कीड़ों के लिए' : 'For all types of pests',
      recipe: language === 'hi' ? '10ml नीम तेल + 1L पानी + 2ml साबुन' : '10ml neem oil + 1L water + 2ml soap',
      icon: 'leaf-outline'
    },
    {
      name: language === 'hi' ? 'साबुन का घोल' : 'Soap Solution',
      use: language === 'hi' ? 'एफिड्स और सफेद मक्खी के लिए' : 'For aphids and whiteflies',
      recipe: language === 'hi' ? '5ml तरल साबुन + 1L पानी' : '5ml liquid soap + 1L water',
      icon: 'water-outline'
    },
    {
      name: language === 'hi' ? 'लहसुन स्प्रे' : 'Garlic Spray',
      use: language === 'hi' ? 'कीड़ों को भगाने के लिए' : 'To repel insects',
      recipe: language === 'hi' ? '5 लहसुन की कली + 1L पानी में उबालें' : '5 garlic cloves + 1L water, boil',
      icon: 'nutrition-outline'
    }
  ];

  const preventiveMeasures = [
    {
      title: language === 'hi' ? 'साफ-सफाई' : 'Cleanliness',
      desc: language === 'hi' ? 'मृत पत्तियों और खरपतवार को हटाएं' : 'Remove dead leaves and weeds',
      icon: 'trash-outline'
    },
    {
      title: language === 'hi' ? 'नियमित जांच' : 'Regular Inspection',
      desc: language === 'hi' ? 'रोज पौधों की जांच करें' : 'Check plants daily',
      icon: 'eye-outline'
    },
    {
      title: language === 'hi' ? 'साथी पौधे' : 'Companion Plants',
      desc: language === 'hi' ? 'तुलसी, पुदीना लगाएं' : 'Plant basil, mint',
      icon: 'flower-outline'
    },
    {
      title: language === 'hi' ? 'हवा का संचार' : 'Air Circulation',
      desc: language === 'hi' ? 'पौधों के बीच जगह रखें' : 'Keep space between plants',
      icon: 'refresh-outline'
    }
  ];

  return (
    <LinearGradient colors={['#1B5E20', '#2E7D32', '#4CAF50']} style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <Ionicons name="arrow-back" size={24} color="#FFFFFF" />
        </TouchableOpacity>
        <Text style={styles.title}>
          {language === 'hi' ? 'कीट नियंत्रण' : 'Pest Control'}
        </Text>
        <View style={{ width: 40 }} />
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'आम कीड़े और उनका इलाज' : 'Common Pests & Solutions'}
          </Text>
          {commonPests.map((pest, index) => (
            <View key={index} style={styles.pestCard}>
              <View style={[styles.pestIcon, { backgroundColor: pest.color }]}>
                <Ionicons name={pest.icon} size={24} color="#FFFFFF" />
              </View>
              <View style={styles.pestContent}>
                <Text style={styles.pestName}>{pest.name}</Text>
                <Text style={styles.pestSymptoms}>{pest.symptoms}</Text>
                <Text style={styles.pestSolution}>{pest.solution}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'प्राकृतिक समाधान' : 'Natural Solutions'}
          </Text>
          {naturalSolutions.map((solution, index) => (
            <View key={index} style={styles.solutionCard}>
              <View style={styles.solutionIcon}>
                <Ionicons name={solution.icon} size={24} color="#4CAF50" />
              </View>
              <View style={styles.solutionContent}>
                <Text style={styles.solutionName}>{solution.name}</Text>
                <Text style={styles.solutionUse}>{solution.use}</Text>
                <Text style={styles.solutionRecipe}>{solution.recipe}</Text>
              </View>
            </View>
          ))}
        </View>

        <View style={styles.section}>
          <Text style={styles.sectionTitle}>
            {language === 'hi' ? 'बचाव के उपाय' : 'Prevention Tips'}
          </Text>
          <View style={styles.tipsGrid}>
            {preventiveMeasures.map((tip, index) => (
              <View key={index} style={styles.tipCard}>
                <Ionicons name={tip.icon} size={32} color="#4CAF50" />
                <Text style={styles.tipTitle}>{tip.title}</Text>
                <Text style={styles.tipDesc}>{tip.desc}</Text>
              </View>
            ))}
          </View>
        </View>

        <View style={styles.warningCard}>
          <Ionicons name="warning-outline" size={24} color="#FF9800" />
          <Text style={styles.warningText}>
            {language === 'hi' ? 
              'हमेशा प्राकृतिक तरीकों को प्राथमिकता दें। रसायनों का उपयोग अंतिम विकल्प के रूप में करें।' :
              'Always prioritize natural methods. Use chemicals as a last resort.'
            }
          </Text>
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
  pestCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  pestIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  pestContent: {
    flex: 1,
  },
  pestName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  pestSymptoms: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  pestSolution: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  solutionCard: {
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
  },
  solutionIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#E8F5E8',
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  solutionContent: {
    flex: 1,
  },
  solutionName: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginBottom: 4,
  },
  solutionUse: {
    fontSize: 14,
    color: '#666',
    marginBottom: 4,
  },
  solutionRecipe: {
    fontSize: 14,
    color: '#4CAF50',
    fontWeight: '600',
  },
  tipsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  tipCard: {
    width: '48%',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
  },
  tipTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#1B5E20',
    marginTop: 8,
    textAlign: 'center',
  },
  tipDesc: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
    textAlign: 'center',
  },
  warningCard: {
    flexDirection: 'row',
    backgroundColor: '#FFF3E0',
    padding: 16,
    margin: 20,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#FFE0B2',
  },
  warningText: {
    flex: 1,
    fontSize: 14,
    color: '#E65100',
    marginLeft: 12,
    lineHeight: 20,
  },
});