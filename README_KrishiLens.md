# KrishiLens - AI-Powered Plant Disease Detection App

A comprehensive React Native mobile application that empowers farmers with AI-powered plant disease detection, home farming guidance, and agricultural marketplace access.

## 🌱 Features

### Core Features
- **AI Disease Detection**: Advanced plant disease identification with treatment recommendations
- **User Authentication**: Secure Firebase email/password authentication
- **Scan History**: Personal scan history with detailed analytics
- **Multi-language Support**: Hindi and English language options
- **User Statistics**: Track scans, healthy plants, diseased plants, and plants healed

### Home Farming (Ghar Kheti)
- **Get Started Guide**: Step-by-step home farming tutorial
- **Seed Selection**: Comprehensive seed selection guidance
- **Water Management**: Irrigation and watering best practices
- **Organic Fertilizers**: Natural fertilizer recommendations
- **Pest Control**: Organic pest management solutions
- **Video Tutorials**: YouTube integration for visual learning

### Agricultural Marketplace
- **Seeds & Tools**: Browse and purchase farming supplies
- **Fertilizers**: Organic and chemical fertilizer options
- **Government Schemes**: Access to agricultural subsidies
- **Land Rental**: Connect with land owners
- **Crop Selling**: Direct farmer-to-buyer platform

### Additional Features
- **Profile Management**: Complete user profile with editing capabilities
- **Settings**: Notifications, language, and app preferences
- **Help & Support**: FAQ, contact options, and user guides
- **About Page**: App information and version details

## 📱 App Architecture

### Navigation Structure
1. **Splash Screen** → Authentication check
2. **Authentication** → Login/Register with Firebase
3. **Tab Navigation**:
   - **Home**: Dashboard with stats and quick actions
   - **Ghar Kheti**: Home farming guidance and tutorials
   - **Marketplace**: Agricultural products and services
   - **Settings**: User preferences and app configuration
4. **Scan Flow**: Camera → Analysis → Results → History
5. **Profile Management**: View/Edit user information

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI: `npm install -g @expo/cli`
- Firebase account
- React Native development environment

### Installation

1. **Clone and Install**
   ```bash
   cd KrishiLens
   npm install
   ```

2. **Setup Firebase** (See FIREBASE_SETUP.md)
   - Create Firebase project
   - Enable Authentication (Email/Password)
   - Create Firestore database
   - Update `config/firebase.js` with your config

3. **Run the App**
   ```bash
   npm start
   # or
   expo start
   ```

4. **Test on Device**
   - Install Expo Go app on your phone
   - Scan QR code from terminal
   - Or use iOS/Android simulator

## 📁 Project Structure

```
KrishiLens/
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.js       # Home dashboard with stats
│   │   ├── ghar-kheti.js  # Home farming hub
│   │   ├── marketplace.js # Agricultural marketplace
│   │   ├── settings.js    # App settings
│   │   └── _layout.js     # Tab layout
│   ├── index.js           # Splash screen
│   ├── login.js           # Login screen
│   ├── register.js        # Register screen
│   ├── scan.js            # Camera/scan screen
│   ├── result.js          # AI result display
│   ├── history.js         # Scan history
│   ├── profile.js         # User profile
│   ├── edit-profile.js    # Profile editing
│   ├── get-started.js     # Home farming guide
│   ├── pest-control.js    # Pest management
│   ├── notifications.js   # App notifications
│   ├── help-support.js    # Help and support
│   ├── about.js           # About page
│   └── _layout.js         # Root layout
├── config/
│   └── firebase.js        # Firebase configuration
├── contexts/
│   ├── auth-context.js    # Authentication context
│   ├── language-context.js # Language switching
│   └── stats-context.js   # User statistics
├── services/
│   └── api.js             # API service layer
├── constants/
│   └── theme.ts           # App colors and fonts
└── assets/                # Images and icons
```

## 🔧 Key Technologies

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **Firebase Auth**: User authentication
- **Firestore**: NoSQL database for data storage
- **AsyncStorage**: Local data persistence
- **Expo Router**: File-based navigation
- **Expo Image Picker**: Camera and gallery access
- **Expo Speech**: Text-to-speech functionality
- **React Context**: State management

## 🎨 Design System

### Colors (Agriculture Theme)
- Primary Green: `#4CAF50`
- Dark Green: `#2E7D32`, `#1B5E20`
- Light Green: `#81C784`, `#C8E6C9`
- Background: `#F1F8E9`
- Text: `#1B5E20`
- Accent: `#FF5722`, `#FF9800`

### Design Principles
- Agriculture-focused green color palette
- Card-based layouts with subtle shadows
- Consistent 20px padding and 12px border radius
- Gradient backgrounds for headers
- Icon-driven navigation and actions

## 🤖 AI Integration

### Current Implementation
- **Fast Analysis**: 2-second timeout for quick results
- **Fallback System**: Mock data when API is slow
- **Disease Detection**: Comprehensive plant disease database
- **Treatment Recommendations**: Detailed treatment plans
- **Confidence Scoring**: AI confidence levels

### API Integration
```javascript
// services/api.js
const analyzeImage = async (imageUri, language) => {
  const formData = new FormData();
  formData.append('file', {
    uri: imageUri,
    type: 'image/jpeg',
    name: 'plant.jpg'
  });
  
  const response = await fetch('YOUR_AI_ENDPOINT', {
    method: 'POST',
    body: formData,
    headers: { 'Content-Type': 'multipart/form-data' }
  });
  
  return response.json();
};
```

## 📊 User Statistics

### Tracked Metrics
- **Total Scans**: Complete scan count
- **Healthy Plants**: Plants identified as healthy
- **Diseased Plants**: Plants with detected diseases
- **Plants Healed**: Successfully treated plants

### Data Persistence
- Local storage with AsyncStorage
- Real-time updates on home dashboard
- Persistent across app sessions

## 🌐 Multi-language Support

### Supported Languages
- **English**: Default language
- **Hindi**: Complete translation

### Implementation
```javascript
// Language switching context
const { language, setLanguage, t } = useLanguage();

// Usage
<Text>{t('scanCrop')}</Text> // "Scan Crop" or "फसल स्कैन करें"
```

## 🔒 Security & Privacy

- **Firebase Authentication**: Secure user management
- **Firestore Rules**: User data isolation
- **Local Storage**: Encrypted sensitive data
- **Image Privacy**: Temporary local image storage
- **No PII Collection**: Privacy-focused design

## 📱 Testing

### Test Accounts
```
Email: farmer@test.com
Password: test123

Email: demo@krishilens.com
Password: demo123
```

### Testing Checklist
- [ ] User registration and login
- [ ] Camera and gallery access
- [ ] AI disease detection
- [ ] Scan history persistence
- [ ] Language switching
- [ ] Profile management
- [ ] Statistics tracking
- [ ] Home farming guides
- [ ] Marketplace navigation
- [ ] Notifications system

## 🎯 Demo Flow

### For Presentation:

1. **App Launch** → Show splash screen and authentication
2. **Home Dashboard** → Display user stats and quick actions
3. **Plant Scanning** → Demonstrate camera capture and AI analysis
4. **Results Display** → Show disease detection with treatment
5. **Home Farming** → Navigate through Ghar Kheti features
6. **Marketplace** → Browse agricultural products
7. **Profile & Settings** → Show user management features

## 🚨 Common Issues & Solutions

### Firebase Configuration
```javascript
// Ensure proper Firebase config in config/firebase.js
export const firebaseConfig = {
  apiKey: "your-api-key",
  authDomain: "your-project.firebaseapp.com",
  // ... other config
};
```

### Camera Permissions
- Test on physical device for camera functionality
- Ensure proper permissions in app.json

### Language Context
- Wrap app with LanguageProvider
- Use translation keys consistently

## 🔮 Future Enhancements

### Technical Improvements
- **Real AI Model**: Integration with TensorFlow Lite
- **Offline Mode**: Local AI model for offline detection
- **Push Notifications**: Treatment reminders and updates
- **Weather Integration**: Weather-based recommendations

### Feature Additions
- **Community Forum**: Farmer discussion platform
- **Expert Consultation**: Connect with agricultural experts
- **Crop Calendar**: Seasonal farming guidance
- **IoT Integration**: Sensor data integration
- **Blockchain**: Supply chain transparency

### Business Features
- **Premium Subscriptions**: Advanced AI features
- **Marketplace Commission**: Revenue from transactions
- **Advertisement Platform**: Targeted agricultural ads
- **Insurance Integration**: Crop insurance services

## 📄 License

This project is developed for agricultural empowerment and educational purposes.

---

**KrishiLens - Empowering Agriculture with AI 🌾**

A complete agricultural ecosystem in your pocket, from disease detection to marketplace access.