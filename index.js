const express = require('express');
const bodyParser = require('body-parser');
const axios = require('axios');
const path = require('path');

const app = express();
app.use(bodyParser.json());

const PAGE_ACCESS_TOKEN = process.env.PAGE_ACCESS_TOKEN || 'EAAQeZBnCRe5cBPmoSaqXWZCv0egIzsYZAMwE2qmincP5NQPA2BtT5vnrzrzzVn3yWYQDMASg9OZBxb7MQkfPnMDCuYvRnPmGd6QMVpBedQjF4vOPYL79YopqEEBjAiG2tKvukWzMH6ZCVnZClI5ZBUhtsfroCWS5QCpKjuPjsCp5LBEpM5lNNwgjssTkvEOdchC91AJD2gvhgczH97NIoH8HhyU0AZDZD';

// صفحة رئيسية بسيطة
app.get('/', (req, res) => {
    res.send(`
        <html>
            <head>
                <title>Nasheeen Egypt Messenger Bot</title>
                <link rel="icon" href="/favicon.ico" type="image/x-icon">
            </head>
            <body>
                <h1>Nasheeen Egypt Messenger Bot is running ✅</h1>
            </body>
        </html>
    `);
});

// تقديم فافيكون بسيط
app.get('/favicon.ico', (req, res) => {
    res.sendFile(path.join(__dirname, 'favicon.ico'));
});

// التحقق من Webhook
app.get('/webhook', (req, res) => {
    const VERIFY_TOKEN = "nasheeenEgypt";
    const mode = req.query['hub.mode'];
    const token = req.query['hub.verify_token'];
    const challenge = req.query['hub.challenge'];
    if (mode && token) {
        if (mode === 'subscribe' && token === VERIFY_TOKEN) {
            res.status(200).send(challenge);
        } else {
            res.sendStatus(403);
        }
    }
});

// استقبال الرسائل
app.post('/webhook', async (req, res) => {
    const body = req.body;
    if (body.object === 'page') {
        body.entry.forEach(async entry => {
            const webhookEvent = entry.messaging[0];
            const senderId = webhookEvent.sender.id;
            if (webhookEvent.message && webhookEvent.message.text) {
                const msg = webhookEvent.message.text.toLowerCase();

                let reply = "مع حضرتك كابتن زين، من فضلك اختار فرع:\n1️⃣ العباسية\n2️⃣ مصر الجديدة\n3️⃣ الجيزة\n4️⃣ القليوبية";

                if (msg.includes("1")) {
                    reply = `لو هتشرفني التمرين الجي ارجو التاكيد\nمواعيد التدريبات من مواليد ٢٠١٣ حتي ٢٠٢٢ الاحد ٨ م والخميس ٧ مساءا\nمواعيد التدريبات من ٩٩ حتي ٢٠١٢ يوم الاحد ٩ مساءا يوم الخميس ٨ مساءا\n\nالعنوان: ملعب تربية رياضية فيصل بشارع فيصل الرئيسي امام فرع ڤودافون\nلوكيشن: https://maps.app.goo.gl/DP5fs7hZsSQzh2bD8\n\nقيمة الاشتراك بعد الخصم 400 ✅\nقيمة طقم التدريبات بعد الخصم 250 ✅\نإجمالي قيمة الاشتراك والطقم 650 🔥\نالاشتراك الأساسي 450 شهريا`;
                } else if (msg.includes("2")) {
                    reply = `لو هتشرفني التمرين الجي ارجو التاكيد\nمواعيد التدريبات من مواليد ٢٠١١ حتي ٢٠٢٢ يومي الجمعة الساعة ٨ مساءا والثلاثاء الساعة ٨ مساءا\nمن مواليد ٩٩ حتي ٢٠١٠ يومي الجمعة ٨ مساءا والثلاثاء الساعة ٨ مساءا\n\nالعنوان: ملاعب الليسية الفرنسية امام نادي الجلاء مباشرة ( بجوار محطة مترو هارون )\nلوكيشن: https://maps.app.goo.gl/QeVKAaMvtFCmPCwK9?g_st=com.google.maps.preview.copy\n\نقيمة الاشتراك بعد الخصم 400 ✅\نقيمة طقم التدريبات بعد الخصم 250 ✅\نإجمالي قيمة الاشتراك والطقم 650 🔥\نالاشتراك الأساسي 450 شهريا`;
                } else if (msg.includes("3")) {
                    reply = `لو هتشرفني يوم الاثنين القادم\nمواعيد التدريبات من مواليد ٢٠١٣ حتي ٢٠٢١ الساعة ٦.٣٠ مساءا يومي الاثنين والخميس\nومن مواليد ٩٩ حتي ٢٠١٢ الساعة ٨ مساءا يومي الاثنين والخميس\n\nالعنوان: كلية الهندسة بالعباسية بجوار محطة مترو عبده باشا\nلوكيشن: https://maps.app.goo.gl/Z4D3wVnHZ2Sk613Y7?g_st=com.google.maps.preview.copy\n\نقيمة الاشتراك بعد الخصم 400 ✅\نقيمة طقم التدريبات بعد الخصم 250 ✅\نإجمالي قيمة الاشتراك والطقم 650 🔥\نالاشتراك الأساسي 450 شهريا`;
                } else if (msg.includes("4")) {
                    reply = `هستأذنك تواصل مع ك محمد العطار مسؤل فرع بنها على الرقم +20 12 00931729 للحصول على كل البيانات`;
                } else if (msg.includes("0")) {
                    reply = "مع حضرتك كابتن زين مدير التسويق في ناشئين مصر 🤝\نقطاع ناشئين مصر موجودين فين 🇪🇬\n1️⃣ فرع العباسية ( كلية الهندسة )\n2️⃣ فرع مصر الجديدة ( مدرسة الليسية )\ن3️⃣ فرع الجيزة ( فيصل )\ن4️⃣ فرع القليوبية ( بنها )\نلو سمحت ابعتلي ساكن فين او اقرب فرع لحضرتك ومواليد كام لارسال كافة التفاصيل 🤝 تشرفت بحضرتك";
                }

                await axios.post(`https://graph.facebook.com/v17.0/me/messages?access_token=${PAGE_ACCESS_TOKEN}`, {
                    recipient: { id: senderId },
                    message: { text: reply }
                });
            }
        });
        res.status(200).send('EVENT_RECEIVED');
    } else {
        res.sendStatus(404);
    }
});

app.listen(process.env.PORT || 3000, () => console.log('Server is running'));
