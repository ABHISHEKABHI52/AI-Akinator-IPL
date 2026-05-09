# IPL MindReader AI 🏏🤖

> **Akinator की तरह IPL खेलाड़ियों को पहचानने वाला एक अत्याधुनिक AI ऐप्लिकेशन**

## 🎯 परियोजना का विवरण

**IPL MindReader AI** एक उत्पादन-तैयार हैकेथॉन परियोजना है जो आर्टिफिशियल इंटेलिजेंस और आधुनिक वेब तकनीकों को जोड़ती है। यह ऐप्लिकेशन प्रोबेबिलिस्टिक रीजनिंग का उपयोग करके IPL क्रिकेटरों को केवल 8-12 स्मार्ट सवालों में सही तरीके से पहचान लेता है।

### मुख्य विशेषताएं:
- ✨ **शानदार UI/UX** - साइबरपंक थीम के साथ गोल्ड और इलेक्ट्रिक ब्लू रंग
- 🧠 **एडवांस्ड AI रीजनिंग** - एंट्रॉपी-आधारित प्रश्न चयन
- 🔥 **Gemini AI Integration** - डायनामिक प्रश्न और व्याख्या के लिए
- 📊 **रीयल-टाइम एनालिटिक्स** - गेम परफॉर्मेंस ट्रैकिंग
- 🎮 **1000+ IPL खिलाड़ियों का डेटा** - व्यापक और सटीक डेटासेट
- 🚀 **क्लाउड-रेडी** - Vercel पर तुरंत डिप्लॉय करें

## 🛠️ तकनीकी स्टैक

### Frontend:
- **Next.js 14** - React फ्रेमवर्क
- **TailwindCSS** - स्टाइलिंग
- **Framer Motion** - एनिमेशन
- **Firebase** - रीयल-टाइम डेटा और एनालिटिक्स

### Backend:
- **Node.js + Express** - REST API सर्वर
- **Google Generative AI (Gemini)** - AI-चालित प्रश्न
- **Firebase Admin SDK** - डेटा पर्सिस्टेंस
- **Custom Probabilistic Reasoning Engine** - IPL डेटा एनालिसिस

### डेटा:
- **1000+ जेनरेटेड IPL प्लेयर प्रोफाइलस** - रोल, टीम, अवार्ड्स, विशेषताएं

## 🚀 शुरुआत करना

### पहले स्टेप्स:

```bash
# रिपो को क्लोन करें
git clone https://github.com/ABHISHEKABHI52/AI-Akinator-IPL.git
cd "AI-Akinator-IPL"

# डिपेंडेंसीज इंस्टॉल करें
npm install

# बैकएंड डिपेंडेंसीज
cd backend
npm install

# फ्रंटएंड डिपेंडेंसीज
cd ../frontend
npm install
```

### एनवायरनमेंट सेटअप:

**backend/.env.local** बनाएं:
```env
GEMINI_API_KEY=your_gemini_api_key_here
BACKEND_PORT=4001
FIREBASE_PROJECT_ID=ipl-mindreader-ai
```

**frontend/.env.local** बनाएं:
```env
NEXT_PUBLIC_FIREBASE_API_KEY=your_firebase_api_key
NEXT_PUBLIC_FIREBASE_PROJECT_ID=ipl-mindreader-ai
NEXT_PUBLIC_API_BASE_URL=http://localhost:4001
```

### डेवलपमेंट सर्वर शुरू करें:

**टर्मिनल 1 - बैकएंड:**
```bash
cd backend
npm run dev
# http://localhost:4001 पर चलेगा
```

**टर्मिनल 2 - फ्रंटएंड:**
```bash
cd frontend
npm run dev
# http://localhost:3000 पर चलेगा
```

## 📱 कैसे खेलें

1. 🏠 **लैंडिंग पेज** पर जाएं
2. ▶️ **"Play Now"** बटन क्लिक करें
3. 🤔 एक IPL खिलाड़ी की सोच लीजिए
4. ❓ AI के सवालों का ईमानदारी से जवाब दें
5. 🎯 AI आपकी सोचे हुए खिलाड़ी को सही तरीके से पहचान लेगा!

## 🎮 गेम फ़्लो

```
लैंडिंग → गेम शुरू → सवाल-जवाब → (8-12 सवाल) → AI का अनुमान → फीडबैक
```

### AI की रीजनिंग प्रक्रिया:
1. **फिल्टरिंग** - उत्तरों के आधार पर खिलाड़ियों को हटाता है
2. **कॉन्फिडेंस कैलकुलेशन** - सर्वश्रेष्ठ उम्मीदवार की संभावना दिखाता है
3. **एंट्रॉपी-आधारित सवाल** - अगला सवाल चुनने के लिए सूचना लाभ
4. **80% थ्रेसहोल्ड** - जब विश्वास पर्याप्त हो तो अनुमान लगाता है

## 📊 डेटासेट

### खिलाड़ी प्रोफाइल में शामिल जानकारी:
- नाम, देश, रोल (बल्लेबाज़/गेंदबाज़/ऑलराउंडर)
- IPL टीम्स, कप्तानी का अनुभव
- अवार्ड्स (ऑरेंज कैप, पर्पल कैप)
- बैटिंग स्टाइल, बोलिंग टाइप
- फिनिशर, आक्रामक बल्लेबाज़, डेथ बोलर स्टेटस
- लीजेंड/रिटायर्ड स्टेटस

### डेटासेट जेनरेट करना:

```bash
cd backend
npm run generate:dataset
# यह 1000 यूनिक IPL प्लेयर प्रोफाइल बनाएगा
```

## 🔧 API एंडपॉइंट्स

### गेम API:

**गेम शुरू करें:**
```
POST /game/start
Response: {
  gameId, question, candidates, currentQuestionId, confidence
}
```

**सवाल का जवाब दें:**
```
POST /game/answer
Body: { gameId, answer: "yes|no|maybe|unknown" }
Response: { question, candidates, confidence, currentQuestionId }
```

**AI का अनुमान:**
```
POST /game/guess
Body: { gameId }
Response: { playerName, confidence, reasoning }
```

**गेम की स्थिति:**
```
GET /game/status?gameId=<gameId>
Response: { gameState, totalQuestions, candidates }
```

### एडमिन API:

**डेटासेट जानकारी:**
```
GET /admin/dataset/info
Response: { playerCount, uniqueRoles, samplePlayers }
```

**डेटासेट रीजेनरेट करें:**
```
POST /admin/dataset/generate
Response: { status, playerCount }
```

## 📈 एनालिटिक्स डैशबोर्ड

`/analytics` पेज पर देखें:
- गेम एक्यूरेसी रेट
- औसत प्रश्न संख्या
- सर्वाधिक पहचाने गए खिलाड़ी
- कॉन्फिडेंस ट्रेंड चार्ट

## 🎨 थीम और डिज़ाइन

### कलर पैलेट:
- **प्राइमरी**: नीोन गोल्ड (#FFD700)
- **सेकेंडरी**: इलेक्ट्रिक ब्लू (#00D4FF)
- **बैकग्राउंड**: लक्जरी ब्लैक (#0A0A0A)
- **एक्सेंट**: साइबरपंक पर्पल

### डिज़ाइन तत्व:
- ✨ ग्लासमॉर्फिज़्म प्रभाव
- 🌊 स्टेडियम लाइटिंग एनिमेशन
- 🎬 सिनेमैटिक ट्रांजिशन्स
- 📱 पूरी तरह रेस्पॉन्सिव

## 🧪 टेस्टिंग

### मैनुअल टेस्टिंग:

```bash
# सभी सर्वर्स रनिंग होने चाहिए
npm run dev  # रूट डायरेक्टरी से

# टेस्ट करें: http://localhost:3000
# 1. एक खिलाड़ी सोचें
# 2. सभी सवालों का जवाब दें
# 3. AI की सही पहचान की जांच करें
```

## 🚀 प्रोडक्शन डिप्लॉयमेंट

### Vercel पर डिप्लॉय करें:

```bash
# अपने Vercel खाते से कनेक्ट करें
vercel --prod

# या GitHub से ऑटो-डिप्लॉय सेटअप करें
```

### Render/Railway पर बैकएंड:

1. नई प्रोजेक्ट बनाएं
2. GitHub रिपो कनेक्ट करें
3. बिल्ड कमांड सेट करें: `npm install`
4. स्टार्ट कमांड: `cd backend && npm start`
5. एनवायरनमेंट वेरिएबल्स जोड़ें

## 📁 प्रोजेक्ट स्ट्रक्चर

```
IPL-Akinator-AI/
├── backend/
│   ├── src/
│   │   ├── index.js
│   │   ├── app.js
│   │   ├── config/
│   │   │   ├── firebase.js
│   │   │   └── gemini.js
│   │   ├── lib/
│   │   │   └── iplReasoning.js
│   │   ├── services/
│   │   │   ├── sessionStore.js
│   │   │   └── analyticsService.js
│   │   ├── routes/
│   │   │   ├── gameRoutes.js
│   │   │   └── adminRoutes.js
│   │   └── data/
│   │       ├── playerSeeds.js
│   │       └── ipl-players.generated.json
│   ├── scripts/
│   │   └── generateDataset.js
│   ├── package.json
│   └── .env.local
├── frontend/
│   ├── app/
│   │   ├── page.js (लैंडिंग)
│   │   ├── game/
│   │   ├── thinking/
│   │   ├── guess/
│   │   ├── feedback/
│   │   ├── analytics/
│   │   ├── admin/
│   │   └── globals.css
│   ├── lib/
│   │   ├── api.js
│   │   ├── firebase.js
│   │   └── game-store.js
│   ├── components/
│   │   ├── site-shell.js
│   │   ├── game-console.js
│   │   ├── player-card.js
│   │   └── charts.js
│   ├── package.json
│   ├── next.config.js
│   ├── postcss.config.cjs
│   ├── tailwind.config.js
│   └── .env.local
├── package.json (रूट)
├── .env.example
├── .gitignore
└── README.md
```

## 🤝 योगदान

इस प्रोजेक्ट को बेहतर बनाने में मदद करना चाहते हैं?

1. फोर्क करें
2. नई ब्रांच बनाएं: `git checkout -b feature/amazing-feature`
3. बदलाव कमिट करें: `git commit -m 'Add amazing feature'`
4. पुश करें: `git push origin feature/amazing-feature`
5. Pull Request खोलें

## 📝 लाइसेंस

यह प्रोजेक्ट MIT लाइसेंस के तहत है।

## 🙏 धन्यवाद

इस हैकेथॉन प्रोजेक्ट के लिए:
- Google Gemini API
- Firebase
- Next.js कम्युनिटी
- IPL क्रिकेट डेटा

## 📞 संपर्क

- **GitHub**: [@ABHISHEKABHI52](https://github.com/ABHISHEKABHI52)
- **Email**: abhishekabhijit.work@gmail.com

---

**⭐ अगर यह प्रोजेक्ट पसंद आया तो Star दे दीजिए!**

**Made with 🔥 for IPL Cricket Fans**
