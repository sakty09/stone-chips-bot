const { Client, LocalAuth } = require('whatsapp-web.js');
const qrcode = require('qrcode-terminal');

const client = new Client({
    authStrategy: new LocalAuth(),
    puppeteer: {
        headless: true,
        args: [
            '--no-sandbox',
            '--disable-setuid-sandbox',
            '--disable-dev-shm-usage',
            '--disable-accelerated-2d-canvas',
            '--no-first-run',
            '--no-zygote',
            '--single-process',
            '--disable-gpu'
        ]
    }
});

// जब सर्वर पर QR कोड जनरेट होगा, यह उसे टर्मिनल (Logs) में दिखाएगा
client.on('qr', (qr) => {
    console.log('--- QR CODE START ---');
    qrcode.generate(qr, { small: true });
    console.log('--- ऊपर दिए गए QR कोड को दूसरे फ़ोन से फोटो खींचकर स्कैन करें ---');
});

client.on('ready', () => {
    console.log('✅ आपका स्टोन चिप्स बॉट अब 24 घंटे के लिए एक्टिव है!');
});

// कस्टमर के मैसेज का जवाब देना
client.on('message', async (msg) => {
    const input = msg.body.trim().toLowerCase();

    if (input === 'hi' || input === 'hello' || input === 'नमस्ते' || input === 'start') {
        const welcomeText = 
`🏗️ *रामेश्वर स्टोन क्रशर & चिप्स* में आपका स्वागत है! 🙏

कृपया नीचे दिए गए विकल्पों में से किसी एक का नंबर टाइप करके जवाब दें:
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
