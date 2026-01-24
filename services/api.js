// API Configuration for FastAPI backend
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'https://plant-ai-api-1.onrender.com';

export const apiService = {
  // Enhanced healthy leaf detection and multi-disease handling
  processAnalysisResult: (data, language = 'en') => {
    // Check for nutrient deficiency first
    const nutrientDeficiency = apiService.detectNutrientDeficiency(data, data.all_predictions);
    if (nutrientDeficiency && data.confidence < 0.7) {
      return {
        disease: nutrientDeficiency.replace(/_/g, ' '),
        confidence: 75,
        severity: 'Low', // Nutrient deficiencies are generally low severity
        recommendation: apiService.getRecommendationForDisease(nutrientDeficiency, language),
        treatment: apiService.getTreatmentForDisease(nutrientDeficiency, language),
        isNutrientDeficiency: true
      };
    }
    // Handle multiple diseases if present
    if (data.all_predictions && data.all_predictions.length > 1) {
      const diseases = data.all_predictions
        .filter(p => p.confidence > 0.25 && !p.disease.includes('healthy'))
        .slice(0, 3);
      
      if (diseases.length > 1) {
        const diseaseNames = diseases.map(d => d.disease.replace(/_/g, ' ')).join(', ');
        return {
          disease: `Multiple diseases: ${diseaseNames}`,
          confidence: Math.round(diseases[0].confidence * 100),
          severity: 'High',
          recommendation: language === 'hi' ? 
            `कई बीमारियां मिलीं: ${diseaseNames}। तुरंत कृषि विशेषज्ञ से संपर्क करें।` :
            `Multiple diseases detected: ${diseaseNames}. Consult agricultural expert immediately.`,
          treatment: language === 'hi' ? 
            'व्यापक उपचार योजना के लिए विशेषज्ञ सलाह लें' :
            'Seek expert advice for comprehensive treatment plan',
          multipleSymptoms: true
        };
      }
    }

    // Single disease or healthy detection
    const disease = data.disease || data.top_1?.disease;
    const confidence = data.confidence ? Math.round(data.confidence * 100) : 
                      data.top_1 ? Math.round(data.top_1.confidence_percent) : 0;

    // Enhanced healthy detection
    if (disease && (disease.includes('healthy') || disease.includes('Healthy'))) {
      if (confidence >= 80) {
        return {
          disease: 'Healthy Plant',
          confidence: confidence,
          severity: 'None',
          recommendation: language === 'hi' ? 
            'पौधा पूर्णतः स्वस्थ है! वर्तमान देखभाल जारी रखें। NPK उर्वरक (19-19-19) का नियमित प्रयोग करें।' :
            'Plant is completely healthy! Continue current care. Apply NPK fertilizer (19-19-19) regularly.',
          treatment: language === 'hi' ? 
            'नियमित पानी, धूप और मिट्टी की जांच करते रहें' :
            'Maintain regular watering, sunlight and soil monitoring',
          isHealthy: true
        };
      } else {
        // Low confidence healthy - might be early disease
        return {
          disease: 'Possibly Healthy',
          confidence: confidence,
          severity: 'Monitor',
          recommendation: language === 'hi' ? 
            'पौधा स्वस्थ लग रहा है लेकिन निगरानी रखें। कुछ दिन बाद फिर जांच करें।' :
            'Plant appears healthy but monitor closely. Check again in few days.',
          treatment: language === 'hi' ? 
            'निवारक उपाय के रूप में नीम का तेल छिड़कें' :
            'Apply neem oil as preventive measure',
          needsMonitoring: true
        };
      }
    }

    // Disease detected
    const leafType = data.leaf_type || 'mature_leaf';
    return {
      disease: disease.replace(/_/g, ' '),
      confidence: confidence,
      severity: apiService.getSeverityFromConfidence(confidence, disease, language),
      recommendation: apiService.getRecommendationForDisease(disease, language, leafType),
      treatment: apiService.getTreatmentForDisease(disease, language),
      leafType: leafType,
      isDiseased: true
    };
  },

  // Get leaf-specific recommendations
  getLeafSpecificRecommendation: (disease, leafType, language = 'en') => {
    const leafSpecific = {
      'young_leaf': {
        'Tomato_Early_blight': {
          en: 'Young leaves: Apply Mancozeb immediately. Remove affected leaves to prevent spread',
          hi: 'नई पत्तियां: तुरंत मैंकोजेब डालें। फैलाव रोकने के लिए प्रभावित पत्तियों को हटाएं'
        },
        'Tomato_Late_blight': {
          en: 'Young leaves: Use Metalaxyl + Mancozeb combination. Critical stage - act fast',
          hi: 'नई पत्तियां: मेटालैक्सिल + मैंकोजेब मिश्रण का उपयोग करें। महत्वपूर्ण चरण - तुरंत कार्य करें'
        }
      },
      'mature_leaf': {
        'Tomato_Early_blight': {
          en: 'Mature leaves: Apply Chlorothalonil. Prune lower branches for air circulation',
          hi: 'परिपक्व पत्तियां: क्लोरोथैलोनिल डालें। हवा के संचार के लिए निचली शाखाओं की छंटाई करें'
        },
        'Tomato_Late_blight': {
          en: 'Mature leaves: Use Cymoxanil systemic fungicide. Remove all infected foliage',
          hi: 'परिपक्व पत्तियां: साइमोक्सानिल सिस्टमिक कवकनाशी का उपयोग करें। सभी संक्रमित पत्तियों को हटाएं'
        }
      },
      'old_leaf': {
        'Tomato_Early_blight': {
          en: 'Old leaves: Remove immediately. Apply copper fungicide to prevent upward spread',
          hi: 'पुरानी पत्तियां: तुरंत हटाएं। ऊपर की ओर फैलाव रोकने के लिए कॉपर कवकनाशी डालें'
        },
        'Tomato_Late_blight': {
          en: 'Old leaves: Complete removal required. Spray remaining plant with Propamocarb',
          hi: 'पुरानी पत्तियां: पूर्ण हटाना आवश्यक। बचे हुए पौधे पर प्रोपामोकार्ब का छिड़काव करें'
        }
      }
    };

    const normalizedDisease = disease.includes('_') ? disease : disease.replace(/\s+/g, '_');
    return leafSpecific[leafType]?.[normalizedDisease]?.[language] || 
           apiService.getRecommendationForDisease(disease, language);
  },
  // Enhanced nutrient deficiency detection
  detectNutrientDeficiency: (imageData, predictions) => {
    const symptoms = {
      nitrogen: ['yellowing_old_leaves', 'stunted_growth', 'pale_green'],
      phosphorus: ['purple_leaves', 'dark_green', 'poor_root'],
      potassium: ['brown_edges', 'yellow_margins', 'weak_stems'],
      magnesium: ['interveinal_chlorosis', 'yellow_between_veins'],
      calcium: ['blossom_end_rot', 'brown_tips', 'necrotic_spots'],
      iron: ['young_leaf_chlorosis', 'green_veins_yellow_leaf'],
      sulfur: ['overall_yellowing', 'young_leaves_affected'],
      zinc: ['small_leaves', 'short_internodes', 'white_spots'],
      boron: ['thick_brittle_leaves', 'hollow_stems']
    };

    const detectedSymptoms = imageData.detected_symptoms || [];
    const nutrientScores = {};

    Object.keys(symptoms).forEach(nutrient => {
      const matchingSymptoms = symptoms[nutrient].filter(symptom => 
        detectedSymptoms.includes(symptom)
      );
      if (matchingSymptoms.length > 0) {
        nutrientScores[nutrient] = matchingSymptoms.length / symptoms[nutrient].length;
      }
    });

    // Fix the reduce error by checking if nutrientScores has keys
    const scoreKeys = Object.keys(nutrientScores);
    if (scoreKeys.length === 0) return null;
    
    const topDeficiency = scoreKeys.reduce((a, b) => 
      nutrientScores[a] > nutrientScores[b] ? a : b
    );

    if (nutrientScores[topDeficiency] > 0.5) {
      return `${topDeficiency.charAt(0).toUpperCase() + topDeficiency.slice(1)}_deficiency`;
    }

    return null;
  },

  // Get recommendation based on disease
  getRecommendationForDisease: (disease, language = 'en', leafType = null) => {
    // If leaf type is specified, get leaf-specific recommendation
    if (leafType) {
      return apiService.getLeafSpecificRecommendation(disease, leafType, language);
    }
    const recommendations = {
      'Tomato_Early_blight': {
        en: 'Apply Mancozeb or Chlorothalonil fungicide. Improve air circulation between plants',
        hi: 'मैंकोजेब या क्लोरोथैलोनिल कवकनाशी का प्रयोग करें। पौधों के बीच हवा का संचार बेहतर करें'
      },
      'Tomato_Late_blight': {
        en: 'Use Metalaxyl or Cymoxanil systemic fungicide. Avoid overhead watering',
        hi: 'मेटालैक्सिल या साइमोक्सानिल सिस्टमिक कवकनाशी का उपयोग करें। ऊपर से पानी देने से बचें'
      },
      'Tomato_Leaf_Mold': {
        en: 'Apply Azoxystrobin or Tebuconazole. Reduce humidity and improve ventilation',
        hi: 'एजोक्सीस्ट्रोबिन या टेबुकोनाजोल का प्रयोग करें। नमी कम करें और वेंटिलेशन बेहतर करें'
      },
      'Tomato_Septoria_leaf_spot': {
        en: 'Use Copper hydroxide or Propiconazole. Remove infected leaves immediately',
        hi: 'कॉपर हाइड्रॉक्साइड या प्रोपिकोनाजोल का उपयोग करें। संक्रमित पत्तियों को तुरंत हटाएं'
      },
      'Tomato_Spider_mites': {
        en: 'Apply Abamectin or Spiromesifen miticide. Increase humidity around plants',
        hi: 'एबामेक्टिन या स्पिरोमेसिफेन माइटिसाइड का प्रयोग करें। पौधों के आसपास नमी बढ़ाएं'
      },
      'Tomato_Target_Spot': {
        en: 'Use Difenoconazole or Pyraclostrobin. Ensure proper plant spacing',
        hi: 'डिफेनोकोनाजोल या पायराक्लोस्ट्रोबिन का उपयोग करें। उचित पौधों की दूरी बनाए रखें'
      },
      'Tomato_Bacterial_spot': {
        en: 'Apply Copper sulfate or Streptomycin. Use drip irrigation to avoid leaf wetness',
        hi: 'कॉपर सल्फेट या स्ट्रेप्टोमाइसिन का प्रयोग करें। पत्तियों को गीला होने से बचने के लिए ड्रिप सिंचाई का उपयोग करें'
      },
      'Tomato_Mosaic_virus': {
        en: 'No chemical cure. Remove infected plants. Control aphids with Imidacloprid',
        hi: 'कोई रासायनिक इलाज नहीं। संक्रमित पौधों को हटाएं। इमिडाक्लोप्रिड से एफिड्स को नियंत्रित करें'
      },
      'Tomato_Yellow_Leaf_Curl_Virus': {
        en: 'Control whiteflies with Thiamethoxam. Remove infected plants immediately',
        hi: 'थायामेथोक्साम से सफेद मक्खी को नियंत्रित करें। संक्रमित पौधों को तुरंत हटाएं'
      },
      'Tomato_healthy': {
        en: 'Plant is perfectly healthy! Continue NPK fertilizer (19-19-19) and regular monitoring. Ensure 6-8 hours sunlight daily.',
        hi: 'पौधा बिल्कुल स्वस्थ है! NPK उर्वरक (19-19-19) और नियमित निगरानी जारी रखें। दैनिक 6-8 घंटे धूप सुनिश्चित करें।'
      },
      // Nutrient deficiencies - Enhanced detection
      'Nitrogen_deficiency': {
        en: 'Apply Urea (46-0-0) 20g/plant or Ammonium sulfate. Yellowing starts from older leaves, stunted growth',
        hi: 'यूरिया (46-0-0) 20 ग्राम/पौधा या अमोनियम सल्फेट डालें। पुरानी पत्तियों से पीलापन शुरू, बौनी वृद्धि'
      },
      'Phosphorus_deficiency': {
        en: 'Use DAP (18-46-0) 15g/plant or Single Super Phosphate. Purple/dark green leaves, poor root development',
        hi: 'DAP (18-46-0) 15 ग्राम/पौधा या सिंगल सुपर फॉस्फेट डालें। बैंगनी/गहरी हरी पत्तियां, जड़ विकास खराब'
      },
      'Potassium_deficiency': {
        en: 'Apply Muriate of Potash (0-0-60) 10g/plant. Brown/yellow leaf edges, weak stems, poor fruit quality',
        hi: 'म्यूरिएट ऑफ पोटाश (0-0-60) 10 ग्राम/पौधा डालें। भूरे/पीले पत्ती किनारे, कमजोर तना, फल गुणवत्ता खराब'
      },
      'Magnesium_deficiency': {
        en: 'Use Epsom salt (MgSO4) 5g/plant. Yellowing between leaf veins while veins stay green (interveinal chlorosis)',
        hi: 'एप्सम साल्ट (MgSO4) 5 ग्राम/पौधा डालें। पत्ती की नसों के बीच पीलापन जबकि नसें हरी रहती हैं'
      },
      'Calcium_deficiency': {
        en: 'Apply Calcium chloride foliar spray 2g/L. Blossom end rot in fruits, brown leaf tips',
        hi: 'कैल्शियम क्लोराइड पत्तीय छिड़काव 2 ग्राम/लीटर करें। फलों में ब्लॉसम एंड रॉट, पत्ती के सिरे भूरे'
      },
      'Iron_deficiency': {
        en: 'Use Iron chelate (Fe-EDTA) foliar spray 1g/L. Young leaves turn yellow while veins remain green',
        hi: 'आयरन चिलेट (Fe-EDTA) पत्तीय छिड़काव 1 ग्राम/लीटर करें। नई पत्तियां पीली, नसें हरी रहती हैं'
      },
      'Sulfur_deficiency': {
        en: 'Apply Ammonium sulfate 15g/plant. Overall yellowing similar to nitrogen but starts from young leaves',
        hi: 'अमोनियम सल्फेट 15 ग्राम/पौधा डालें। नाइट्रोजन जैसा पीलापन लेकिन नई पत्तियों से शुरू'
      },
      'Zinc_deficiency': {
        en: 'Use Zinc sulfate foliar spray 2g/L. Small leaves, short internodes, white/bronze spots',
        hi: 'जिंक सल्फेट पत्तीय छिड़काव 2 ग्राम/लीटर करें। छोटी पत्तियां, छोटे इंटरनोड्स, सफेद/कांस्य धब्बे'
      },
      'Boron_deficiency': {
        en: 'Apply Borax foliar spray 0.5g/L. Thick, brittle leaves, poor fruit set, hollow stems',
        hi: 'बोरेक्स पत्तीय छिड़काव 0.5 ग्राम/लीटर करें। मोटी, भंगुर पत्तियां, फल सेट खराब, खोखले तने'
      }
    };
    
    const normalizedDisease = disease.includes('_') ? disease : disease.replace(/\s+/g, '_');
    
    return recommendations[normalizedDisease]?.[language] || 
           (language === 'hi' ? 'कृषि विशेषज्ञ से सलाह लें' : 'Consult agricultural expert');
  },

  // Get treatment based on disease
  getTreatmentForDisease: (disease, language = 'en') => {
    const treatments = {
      'Tomato_Early_blight': {
        en: 'Remove affected leaves, apply fungicide every 7-10 days, ensure proper spacing',
        hi: 'प्रभावित पत्तियों को हटाएं, हर 7-10 दिन में कवकनाशी डालें, उचित दूरी बनाए रखें'
      },
      'Tomato_Late_blight': {
        en: 'Apply preventive fungicide, improve drainage, avoid wet foliage',
        hi: 'निवारक कवकनाशी डालें, जल निकासी सुधारें, गीली पत्तियों से बचें'
      },
      'Tomato_Leaf_Mold': {
        en: 'Increase ventilation, reduce watering frequency, apply organic fungicide',
        hi: 'वेंटिलेशन बढ़ाएं, पानी देने की आवृत्ति कम करें, जैविक कवकनाशी डालें'
      },
      'Tomato_healthy': {
        en: 'Keep maintaining regular watering, adequate sunlight, and monitor for any changes',
        hi: 'नियमित पानी, पर्याप्त धूप बनाए रखें और किसी भी बदलाव की निगरानी करें'
      }
    };
    
    // Normalize disease name for lookup (handle both formats)
    const normalizedDisease = disease.includes('_') ? disease : disease.replace(/\s+/g, '_');
    
    return treatments[normalizedDisease]?.[language] || 
           (language === 'hi' ? 'सुझाई गई उपचार योजना का पालन करें' : 'Follow recommended treatment plan');
  },
  // Analyze crop image with FastAPI - OPTIMIZED
  analyzeCrop: async (imageUri, language = 'en') => {
    const primaryEndpoint = '/predict'; // Use most reliable endpoint first
    
    try {
      console.log('Analyzing with primary endpoint:', `${API_BASE_URL}${primaryEndpoint}`);
      
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'crop.jpg', // Shorter filename
      });
      formData.append('language', language);

      const response = await fetch(`${API_BASE_URL}${primaryEndpoint}`, {
        method: 'POST',
        body: formData,
        timeout: 15000, // 15 second timeout
      });

      if (response.ok) {
        const data = await response.json();
        console.log('Success! Received data:', data);
        
        // Use enhanced processing
        const result = apiService.processAnalysisResult(data, language);
        
        return {
          success: true,
          data: result
        };
      }
    } catch (error) {
      console.log('Primary endpoint failed:', error.message);
    }
    
    // Fallback to other endpoints only if primary fails
    const fallbackEndpoints = ['/analyze', '/upload', '/'];
    
    for (const endpoint of fallbackEndpoints) {
      try {
        const response = await fetch(`${API_BASE_URL}${endpoint}`, {
          method: 'POST',
          body: new FormData().append('file', {
            uri: imageUri,
            type: 'image/jpeg',
            name: 'crop.jpg',
          }),
          timeout: 10000, // Shorter timeout for fallbacks
        });

        if (response.ok) {
          const data = await response.json();
          const result = apiService.processAnalysisResult(data, language);
          return { success: true, data: result };
        }
      } catch (error) {
        continue; // Skip to next endpoint quickly
      }
    }
    
    throw new Error('Analysis failed. Check connection.');
  },

  // Calculate severity based on confidence and disease type - FIXED
  getSeverityFromConfidence: (confidence, disease, language = 'en') => {
    const normalizedDisease = disease ? disease.toLowerCase().replace(/\s+/g, '_') : '';
    
    // Healthy conditions - always show None/Low severity
    const healthyConditions = [
      'tomato_healthy', 'healthy_plant', 'healthy', 'possibly_healthy'
    ];
    
    // Nutrient deficiencies - always Low severity (treatable)
    const nutrientDeficiencies = [
      'nitrogen_deficiency', 'phosphorus_deficiency', 'potassium_deficiency',
      'magnesium_deficiency', 'calcium_deficiency', 'iron_deficiency',
      'sulfur_deficiency', 'zinc_deficiency', 'boron_deficiency'
    ];
    
    // High risk diseases - always show high severity if detected
    const highRiskDiseases = [
      'tomato_late_blight', 'tomato_mosaic_virus', 'tomato_yellow_leaf_curl_virus',
      'tomato_bacterial_spot', 'tomato_target_spot'
    ];
    
    // Check if it's healthy - return None or Low
    if (healthyConditions.some(healthy => normalizedDisease.includes(healthy))) {
      return language === 'hi' ? 'कोई नहीं' : 'None';
    }
    
    // Check if it's nutrient deficiency - always Low
    if (nutrientDeficiencies.some(nutrient => normalizedDisease.includes(nutrient))) {
      return language === 'hi' ? 'कम' : 'Low';
    }
    
    // Check if it's high risk disease - always High
    if (highRiskDiseases.some(risk => normalizedDisease.includes(risk))) {
      return language === 'hi' ? 'उच्च' : 'High';
    }
    
    // For other diseases, use confidence-based severity
    if (confidence >= 80) {
      return language === 'hi' ? 'उच्च' : 'High';
    } else if (confidence >= 50) {
      return language === 'hi' ? 'मध्यम' : 'Moderate';
    } else {
      return language === 'hi' ? 'कम' : 'Low';
    }
  },

  // Handle multiple disease detection
  handleMultipleDiseases: (predictions, language = 'en') => {
    if (!predictions || predictions.length <= 1) return null;
    
    const topDiseases = predictions.slice(0, 3).filter(p => p.confidence > 0.3);
    if (topDiseases.length <= 1) return null;
    
    const diseaseList = topDiseases.map(p => 
      `${p.disease.replace(/_/g, ' ')} (${Math.round(p.confidence * 100)}%)`
    ).join(', ');
    
    return {
      en: `Multiple symptoms detected: ${diseaseList}. Consult expert for comprehensive treatment.`,
      hi: `कई लक्षण मिले: ${diseaseList}। व्यापक उपचार के लिए विशेषज्ञ से सलाह लें।`
    }[language];
  }
};

export default apiService;