import "jsr:@supabase/functions-js/edge-runtime.d.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization, X-Client-Info, Apikey",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 200,
      headers: corsHeaders,
    });
  }

  try {
    const { amount, currency, description, cardNumber, cardholderName, expiryDate, cvv } = await req.json();

    // Get Chargily API key from environment variables
    const chargilyApiKey = Deno.env.get("CHARGILY_API_KEY");
    
    if (!chargilyApiKey) {
      throw new Error("Chargily API key not configured");
    }

    // Chargily API endpoint for payment
    const chargilyEndpoint = "https://pay.chargily.net/api/v2/checkouts";

    // Create checkout session with Chargily
    const chargilyResponse = await fetch(chargilyEndpoint, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${chargilyApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        amount: amount,
        currency: currency || "dzd",
        description: description,
        success_url: `${req.headers.get("origin")}/payment/success`,
        failure_url: `${req.headers.get("origin")}/payment/failure`,
        webhook_url: `${Deno.env.get("SUPABASE_URL")}/functions/v1/chargily-webhook`,
        metadata: {
          cardNumber: cardNumber,
          cardholderName: cardholderName,
          expiryDate: expiryDate,
        },
      }),
    });

    const chargilyData = await chargilyResponse.json();

    if (!chargilyResponse.ok) {
      return new Response(
        JSON.stringify({
          success: false,
          message: chargilyData.message || "فشلت عملية الدفع",
        }),
        {
          status: 400,
          headers: {
            ...corsHeaders,
            "Content-Type": "application/json",
          },
        }
      );
    }

    return new Response(
      JSON.stringify({
        success: true,
        checkoutUrl: chargilyData.checkout_url,
        checkoutId: chargilyData.id,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({
        success: false,
        message: error.message || "حدث خطأ في معالجة الدفع",
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});