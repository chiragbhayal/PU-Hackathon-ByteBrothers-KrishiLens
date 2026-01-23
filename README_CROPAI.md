# CropAI - AI-Powered Crop Health Diagnosis Mobile App

A React Native mobile application that allows farmers to diagnose crop health issues using AI-powered image analysis.

## 🌱 Features

- **User Authentication**: Firebase email/password authentication
- **Crop Scanning**: Camera and gallery image selection
- **AI Analysis**: Mock AI diagnosis with confidence scores
- **Scan History**: Personal scan history with Firestore
- **Clean UI**: Agriculture-themed green design
- **Cross-Platform**: Works on iOS and Android

## 📱 App Flow

1. **Splash Screen** → Auto-navigation based on auth state
2. **Login/Register** → Firebase authentication
3. **Home Dashboard** → Quick actions and stats
4. **Scan Screen** → Camera/gallery image selection
5. **Result Screen** → AI analysis results display
6. **History Screen** → Previous scan results

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- Expo CLI: `npm install -g @expo/cli`
- Firebase account

### Installation

1. **Clone and Install**
   ```bash
   cd CropAI
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
CropAI/
├── app/                    # App screens (Expo Router)
│   ├── (tabs)/            # Tab navigation screens
│   │   ├── index.js       # Home dashboard
│   │   ├── history.js     # Scan history
│   │   └── _layout.js     # Tab layout
│   ├── index.js           # Splash screen
│   ├── login.js           # Login screen
│   ├── register.js        # Register screen
│   ├── scan.js            # Camera/scan screen
│   ├── result.js          # AI result display
│   └── _layout.js         # Root layout
├── config/
│   └── firebase.js        # Firebase configuration
├── contexts/
│   └── auth-context.js    # Authentication context
├── constants/
│   └── theme.ts           # App colors and fonts
└── assets/                # Images and icons
```

## 🔧 Key Technologies

- **React Native**: Cross-platform mobile development
- **Expo**: Development platform and tools
- **Firebase Auth**: User authentication
- **Firestore**: NoSQL database for scan history
- **Expo Router**: File-based navigation
- **Expo Image Picker**: Camera and gallery access

## 🎨 Design System

### Colors (Agriculture Theme)
- Primary Green: `#4CAF50`
- Dark Green: `#2E7D32`
- Light Green: `#81C784`
- Background: `#F1F8E9`
- Text: `#1B5E20`

### Components
- Rounded buttons (12px border radius)
- Card-based layouts with shadows
- Consistent 20px padding
- Green color scheme throughout

## 🤖 AI Integration

Currently uses **mock AI responses** for demonstration. To connect real AI:

### Option 1: REST API
```javascript
// In scan.js, replace mock analysis:
const response = await fetch('YOUR_AI_API_ENDPOINT', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ image: base64Image })
});
const result = await response.json();
```

### Option 2: Cloud Functions
```javascript
// Use Firebase Cloud Functions
import { httpsCallable } from 'firebase/functions';
const analyzeImage = httpsCallable(functions, 'analyzeImage');
const result = await analyzeImage({ imageData });
```

## 📊 Mock AI Response Format

```javascript
{
  disease: "Nitrogen Deficiency",
  confidence: 87,
  recommendation: "Apply nitrogen-rich fertilizer (NPK 20-10-10) at 2kg per acre",
  severity: "Moderate",
  treatment: "Immediate fertilizer application recommended"
}
```

## 🔒 Security

- Firebase Authentication handles user security
- Firestore rules ensure users only access their data
- No sensitive data stored locally
- Image URIs are temporary and local

## 📱 Testing

### Manual Testing Checklist
- [ ] User registration works
- [ ] User login works
- [ ] Camera permission requested
- [ ] Photo capture works
- [ ] Gallery selection works
- [ ] Mock AI analysis displays
- [ ] Results save to Firestore
- [ ] History screen shows saved scans
- [ ] Logout works
- [ ] Navigation flows correctly

### Test Users
Create test accounts:
- Email: `farmer1@test.com`, Password: `test123`
- Email: `farmer2@test.com`, Password: `test123`

## 🚨 Common Issues & Fixes

### 1. Firebase Config Error
**Error**: "Firebase config not found"
**Fix**: Update `config/firebase.js` with your actual Firebase config

### 2. Camera Permission
**Error**: Camera not working
**Fix**: Test on physical device, not simulator

### 3. Firestore Permission Denied
**Error**: "Missing or insufficient permissions"
**Fix**: Check Firestore rules allow authenticated users

### 4. Navigation Issues
**Error**: Screen not found
**Fix**: Ensure all screen files are `.js` extension

## 🎯 Demo Script

### For Hackathon Presentation:

1. **Show Splash Screen** (2 seconds)
2. **Register New User** 
   - Email: `demo@cropai.com`
   - Password: `demo123`
3. **Navigate Home Dashboard**
   - Show clean agriculture UI
   - Point out quick actions
4. **Scan Crop**
   - Take photo of any leaf/plant
   - Show analysis loading
   - Display mock AI results
5. **View History**
   - Show saved scan in history
   - Tap to view details again
6. **Highlight Features**
   - Firebase authentication
   - Real-time database
   - Professional UI
   - Ready for AI integration

## 🔮 Future Enhancements

- Real AI model integration
- Offline mode with local storage
- Push notifications for treatment reminders
- Weather integration
- Crop calendar and planning
- Community features
- Multi-language support
- Advanced analytics dashboard

## 📄 License

This project is for educational/hackathon purposes.

---

**Ready for Hackathon Demo! 🏆**

The app is fully functional with mock AI responses and can be easily connected to a real AI backend when ready.