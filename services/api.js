// API Configuration for FastAPI backend
const API_BASE_URL = process.env.EXPO_PUBLIC_API_BASE_URL || 'http://localhost:8000';

export const apiService = {
  // Analyze crop image
  analyzeCrop: async (imageUri) => {
    try {
      const formData = new FormData();
      formData.append('file', {
        uri: imageUri,
        type: 'image/jpeg',
        name: 'crop_image.jpg',
      });

      const response = await fetch(`${API_BASE_URL}/analyze-crop`, {
        method: 'POST',
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        body: formData,
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const result = await response.json();
      return {
        success: true,
        data: result
      };
    } catch (error) {
      console.error('API Error:', error);
      return {
        success: false,
        error: error.message
      };
    }
  },

  // Mock fallback
  getMockAnalysis: () => {
    const diseases = [
      'Nitrogen Deficiency',
      'Potassium Deficiency', 
      'Leaf Blight',
      'Powdery Mildew'
    ];
    
    const recommendations = [
      'Apply nitrogen-rich fertilizer (NPK 20-10-10) at 2kg per acre',
      'Use potassium sulfate fertilizer at 1.5kg per acre',
      'Apply fungicide spray every 7 days for 3 weeks',
      'Improve air circulation and reduce humidity'
    ];

    const randomIndex = Math.floor(Math.random() * diseases.length);
    
    return {
      disease: diseases[randomIndex],
      confidence: Math.floor(Math.random() * 30) + 70,
      recommendation: recommendations[randomIndex],
      severity: ['Low', 'Moderate', 'High'][Math.floor(Math.random() * 3)],
      treatment: 'Follow recommended treatment plan and monitor progress'
    };
  }
};

export default apiService;