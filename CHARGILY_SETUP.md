# إعداد الدفع بواسطة Chargily (البطاقة الذهبية الجزائرية)

## نظرة عامة

تم تكامل نظام الدفع Chargily في التطبيق لدعم الدفع بالبطاقة الذهبية الجزائرية. يتضمن هذا التكامل:

- نموذج دفع آمن لإدخال معلومات البطاقة
- معالجة الدفع عبر Supabase Edge Functions
- صفحات نجاح وفشل الدفع
- تحديث تلقائي لحالة الاشتراك

## المتطلبات الأساسية

1. حساب Chargily نشط على [https://pay.chargily.net](https://pay.chargily.net)
2. مفاتيح API من لوحة تحكم Chargily

## خطوات الإعداد

### 1. الحصول على مفاتيح Chargily API

1. قم بتسجيل الدخول إلى حسابك في [Chargily Dashboard](https://pay.chargily.net/dashboard)
2. انتقل إلى قسم "API Keys"
3. احصل على المفاتيح التالية:
   - **API Key** (Secret Key): لمعالجة الدفع
   - **Webhook Secret**: للتحقق من صحة إشعارات الدفع

### 2. إضافة المفاتيح إلى Supabase

أضف المفاتيح التالية إلى متغيرات البيئة في Supabase:

```bash
# مفتاح API الخاص بـ Chargily
CHARGILY_API_KEY=your_chargily_api_key_here

# مفتاح Webhook السري
CHARGILY_WEBHOOK_SECRET=your_webhook_secret_here
```

يمكنك إضافة هذه المفاتيح من خلال:
1. Supabase Dashboard → Settings → Edge Functions → Secrets
2. أو باستخدام Supabase CLI:
   ```bash
   supabase secrets set CHARGILY_API_KEY=your_key_here
   supabase secrets set CHARGILY_WEBHOOK_SECRET=your_secret_here
   ```

### 3. تكوين Webhook في Chargily

1. في لوحة تحكم Chargily، انتقل إلى قسم "Webhooks"
2. أضف URL جديد للـ Webhook:
   ```
   https://your-project.supabase.co/functions/v1/chargily-webhook
   ```
3. حدد الأحداث التي تريد الاستماع إليها:
   - `checkout.paid` (الدفع الناجح)
   - `checkout.failed` (فشل الدفع)

### 4. اختبار التكامل

1. انتقل إلى صفحة الأسعار: `/pricing`
2. اضغط على زر "اشترك الآن" للخطة المميزة
3. أدخل معلومات بطاقة الاختبار (متوفرة في وثائق Chargily)
4. تحقق من تحديث حالة الاشتراك بعد الدفع الناجح

## معلومات فنية

### Edge Functions المستخدمة

1. **chargily-checkout**
   - المسار: `/functions/v1/chargily-checkout`
   - الوظيفة: إنشاء جلسة دفع جديدة
   - المدخلات:
     ```json
     {
       "amount": 14990,
       "currency": "dzd",
       "description": "Pro Plan Subscription",
       "cardNumber": "1234567812345678",
       "cardholderName": "محمد أحمد",
       "expiryDate": "12/25",
       "cvv": "123"
     }
     ```

2. **chargily-webhook**
   - المسار: `/functions/v1/chargily-webhook`
   - الوظيفة: معالجة إشعارات الدفع من Chargily
   - يحدث تلقائياً عند إتمام/فشل الدفع

### مكونات React المستخدمة

1. **ChargilyPayment** (`src/components/ChargilyPayment.tsx`)
   - نموذج إدخال معلومات البطاقة
   - التحقق من صحة البيانات
   - إرسال طلب الدفع

2. **PaymentSuccess** (`src/pages/PaymentSuccess.tsx`)
   - صفحة تأكيد نجاح الدفع

3. **PaymentFailure** (`src/pages/PaymentFailure.tsx`)
   - صفحة فشل الدفع مع خيارات إعادة المحاولة

## الأسعار

الخطة المميزة (Pro Plan):
- **السعر**: 14,990 دج/شهر
- **العملة**: دينار جزائري (DZD)
- **طريقة الدفع**: البطاقة الذهبية الجزائرية عبر Chargily

## الأمان

- جميع معلومات الدفع مشفرة
- لا يتم تخزين معلومات البطاقة في قاعدة البيانات
- التحقق من صحة Webhook باستخدام HMAC-SHA256
- استخدام HTTPS لجميع الاتصالات

## استكشاف الأخطاء

### الخطأ: "Chargily API key not configured"
- **الحل**: تأكد من إضافة `CHARGILY_API_KEY` إلى متغيرات البيئة في Supabase

### الخطأ: "Invalid signature"
- **الحل**: تحقق من صحة `CHARGILY_WEBHOOK_SECRET` وتطابقه مع ما في لوحة تحكم Chargily

### الدفع لا يتم تحديثه تلقائياً
- **الحل**: تأكد من أن URL الـ Webhook مضاف بشكل صحيح في لوحة تحكم Chargily

## الدعم

للحصول على دعم فني:
- وثائق Chargily: [https://dev.chargily.com/docs](https://dev.chargily.com/docs)
- دعم Chargily: support@chargily.com

## الترخيص

هذا التكامل مفتوح المصدر ومتاح للاستخدام وفقاً لشروط المشروع الرئيسي.
