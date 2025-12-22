# Chargily Payment Integration Setup (Algerian Golden Card)

## Overview

Chargily payment system has been integrated into the application to support payments with the Algerian Golden Card (CIB). This integration includes:

- Secure payment form for card details entry
- Payment processing via Supabase Edge Functions
- Success and failure payment pages
- Automatic subscription status updates

## Prerequisites

1. Active Chargily account at [https://pay.chargily.net](https://pay.chargily.net)
2. API keys from Chargily Dashboard

## Setup Steps

### 1. Obtain Chargily API Keys

1. Log in to your [Chargily Dashboard](https://pay.chargily.net/dashboard)
2. Navigate to "API Keys" section
3. Obtain the following keys:
   - **API Key** (Secret Key): For payment processing
   - **Webhook Secret**: For verifying payment notifications

### 2. Add Keys to Supabase

Add the following environment variables to Supabase:

```bash
# Chargily API Key
CHARGILY_API_KEY=your_chargily_api_key_here

# Webhook Secret Key
CHARGILY_WEBHOOK_SECRET=your_webhook_secret_here
```

You can add these keys through:
1. Supabase Dashboard → Settings → Edge Functions → Secrets
2. Or using Supabase CLI:
   ```bash
   supabase secrets set CHARGILY_API_KEY=your_key_here
   supabase secrets set CHARGILY_WEBHOOK_SECRET=your_secret_here
   ```

### 3. Configure Webhook in Chargily

1. In Chargily Dashboard, go to "Webhooks" section
2. Add a new Webhook URL:
   ```
   https://your-project.supabase.co/functions/v1/chargily-webhook
   ```
3. Select the events you want to listen to:
   - `checkout.paid` (Successful payment)
   - `checkout.failed` (Failed payment)

### 4. Test the Integration

1. Navigate to pricing page: `/pricing`
2. Click "Subscribe Now" button for Pro plan
3. Enter test card details (available in Chargily docs)
4. Verify subscription status update after successful payment

## Technical Details

### Edge Functions

1. **chargily-checkout**
   - Path: `/functions/v1/chargily-checkout`
   - Purpose: Create new payment session
   - Input:
     ```json
     {
       "amount": 14990,
       "currency": "dzd",
       "description": "Pro Plan Subscription",
       "cardNumber": "1234567812345678",
       "cardholderName": "John Doe",
       "expiryDate": "12/25",
       "cvv": "123"
     }
     ```

2. **chargily-webhook**
   - Path: `/functions/v1/chargily-webhook`
   - Purpose: Process payment notifications from Chargily
   - Triggers automatically on payment completion/failure

### React Components

1. **ChargilyPayment** (`src/components/ChargilyPayment.tsx`)
   - Card details input form
   - Data validation
   - Payment request submission

2. **PaymentSuccess** (`src/pages/PaymentSuccess.tsx`)
   - Payment success confirmation page

3. **PaymentFailure** (`src/pages/PaymentFailure.tsx`)
   - Payment failure page with retry options

## Pricing

Pro Plan:
- **Price**: 14,990 DZD/month
- **Currency**: Algerian Dinar (DZD)
- **Payment Method**: Algerian Golden Card via Chargily

## Security

- All payment information is encrypted
- Card details are not stored in the database
- Webhook verification using HMAC-SHA256
- HTTPS for all communications

## Troubleshooting

### Error: "Chargily API key not configured"
- **Solution**: Ensure `CHARGILY_API_KEY` is added to Supabase environment variables

### Error: "Invalid signature"
- **Solution**: Verify `CHARGILY_WEBHOOK_SECRET` matches the one in Chargily Dashboard

### Payment doesn't update automatically
- **Solution**: Ensure Webhook URL is correctly added in Chargily Dashboard

## Support

For technical support:
- Chargily Documentation: [https://dev.chargily.com/docs](https://dev.chargily.com/docs)
- Chargily Support: support@chargily.com

## License

This integration is open source and available for use according to the main project terms.
