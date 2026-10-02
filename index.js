const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');
const http = require('http');

// Render पोर्ट बाइंडिंग फिक्स
const port = process.env.PORT || 10000;
http.createServer((req, res) => {
    res.writeHead(200, { 'Content-Type': 'text/plain' });
    res.end('Stone chips bot is running smoothly!');
}).listen(port, '0.0.0.0');

// व्हाट्सऐप क्लाइंट कॉन्फ़िगरेशन (Docker Path के साथ)
const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        executablePath: '/usr/bin/google-chrome-stable', // Docker के क्रोम का सही रास्ता
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-gpu'
        ]
    }
});

// Render Logs में QR कोड प्रिंट करना
client.on('qr', (qr) => {
    console.log('👉 --- QR CODE START --- 👈');
    qrcode.generate(qr, { small: true });
    console.log('👉 --- ऊपर दिए गए QR कोड को स्कैन करें --- 👈');
});

client.on('ready', () => {
    console.log('✅ बधाई हो! आपका स्टोन चिप्स बॉट अब पूरी तरह लाइव है!');
});

// कस्टमर रिप्लाई (गिट्टी बिज़नेस ऑप्शंस)
client.on('message', async (msg) => {
    const input = msg.body.trim().toLowerCase();

    if (input === 'hi' || input === 'hello' || input === 'नमस्ते' || input === 'start') {
        const welcomeText = 
`🏗️ *रामेश्वर स्टोन क्रशर & चिप्स* में आपका स्वागत है! 🙏

कृपया किसी एक विकल्प का नंबर टाइप करके जवाब दें:
*1.* गिट्टी के साइज और रेट (Rates) 💰
*2.* डिलीवरी लोकेशन (Delivery Info) 🚛
*3.* नया ऑर्डर बुक करें (Book Order) 📝
*4.* हमारे मैनेजर से बात करें (Call Manager) 📞`;
        
        await msg.reply(welcomeText);
    }
    else if (input === '1') {
        await msg.reply(`📊 *आज के गिट्टी के रेट (प्रति CFT):*\n\n• *10mm:* ₹___ \n• *20mm:* ₹___ \n• *40mm:* ₹___ \n\n👉 मुख्य मेनू के लिए *hi* लिखें।`);
    }
    else if (input === '2') {
        await msg.reply(`🚛 *डिलीवरी की जानकारी:*\n\n• हम हाइवा और ट्रैक्टर से डिलीवरी देते हैं।\n• अपना पिनकोड भेजें ताकि भाड़ा बताया जा सके।\n\n👉 मुख्य मेनू के लिए *hi* लिखें।`);
    }
    else if (input === '3') {
        await msg.reply(`📝 *ऑर्डर के लिए कृपया यह जानकारी भेजें:*\n1. आपका नाम:\n2. पूरा पता:\n3. गिट्टी का साइज:\n4. कितनी गाड़ी चाहिए:`);
    }
    else if (input === '4') {
        await msg.reply(`📞 मुख्य मैनेजर का नंबर: +91 XXXXXXXXXX\n(सुबह 8 से शाम 6 बजे तक)`);
    }
});

client.initialize();
