import express from 'express';
import path from 'path';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI, Type } from '@google/genai';
import { createClient } from '@supabase/supabase-js';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// Use a mock or real Supabase client based on env presence
const supabaseUrl = process.env.SUPABASE_URL || 'https://mock.supabase.co';
const supabaseKey = process.env.SUPABASE_ANON_KEY || 'mock-key';
const supabase = createClient(supabaseUrl, supabaseKey);

async function startServer() {
  const app = express();
  const PORT = 3000;

  // Increase limit for base64 image uploads
  app.use(express.json({ limit: '50mb' }));

  // API Routes
  
  // 1. Smart Search (Gemini API)
  app.post('/api/search/smart', async (req, res) => {
    try {
      const { query } = req.body;
      if (!query) {
        return res.status(400).json({ error: 'Query is required' });
      }

      const prompt = `You are the lead clinical assistant at FAOLAT Pharmaceuticals. A user searches: "${query}". Extract the underlying symptoms or active therapeutic compounds required. Return a flat JSON string array of search terms or drug ingredients to query our catalog. (e.g., ["paracetamol", "cough syrup"]).`;

      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
            description: "List of keywords or symptoms extracted"
          }
        }
      });

      const keywords = JSON.parse(response.text || '[]');
      res.json(keywords);
    } catch (error: any) {
      console.error('Smart Search Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // 2. Products Search
  app.get('/api/products', async (req, res) => {
    try {
      const keywordsParam = req.query.keywords as string;
      let keywords: string[] = [];
      if (keywordsParam) {
        keywords = JSON.parse(keywordsParam);
      }

      // Mock data response based on keywords (since we might not have a real DB populated)
      // If we had a real supabase DB:
      // const { data } = await supabase.from('products').select('*').in('category', keywords);
      
      const mockProducts = [
        {
          id: 'prod-1',
          name: 'Premium Paracetamol 500mg',
          sku: 'FAOLAT-PCM-500',
          price: 15.99,
          description: 'High-grade paracetamol formulated for rapid absorption. Designed to alleviate acute pain and reduce fever quickly.',
          requires_prescription: false
        },
        {
          id: 'prod-2',
          name: 'Amoxicillin 250mg',
          sku: 'FAOLAT-AMX-250',
          price: 45.00,
          description: 'Broad-spectrum antibiotic. Essential for treating various bacterial infections. Must be taken exactly as prescribed.',
          requires_prescription: true
        }
      ];

      res.json(mockProducts);
    } catch (error: any) {
      console.error('Products Search Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // 3. Quick Refill Order
  app.post('/api/order/refill', async (req, res) => {
    try {
      const { patientId, productId, unitPrice, shippingAddress, paymentRef } = req.body;

      if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        // Real Supabase Flow
        const { data: product, error: prodError } = await supabase
          .from('products')
          .select('stock_quantity, name')
          .eq('id', productId)
          .single();

        if (prodError || !product || product.stock_quantity < 1) {
          throw new Error('Requested compound is temporarily out of range in fulfilment centers.');
        }

        const { data: order, error: orderError } = await supabase
          .from('orders')
          .insert({
            patient_id: patientId,
            total_amount: unitPrice,
            status: 'processing',
            shipping_address: JSON.stringify(shippingAddress),
          })
          .select()
          .single();

        if (orderError) throw orderError;

        await supabase.from('order_items').insert({
          order_id: order.id,
          product_id: productId,
          quantity: 1,
          unit_price: unitPrice,
          subtotal: unitPrice
        });

        await supabase
          .from('products')
          .update({ stock_quantity: product.stock_quantity - 1 })
          .eq('id', productId);

        res.json({ success: true, orderId: order.id });
      } else {
        // Mock success response
        res.json({ success: true, orderId: 'mock-order-' + Date.now() });
      }
    } catch (error: any) {
      console.error('Refill Order Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // 4. Paystack Webhook Listener
  app.post('/api/webhooks/paystack', async (req, res) => {
    try {
      // In a real scenario, you'd verify the cryptographic signature using your Paystack Secret Key
      // const signature = req.headers['x-paystack-signature'];
      
      const { event, data } = req.body;
      
      if (event === 'charge.success') {
        const orderId = data.metadata?.order_id;
        
        if (orderId && process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
          // Update the order status to 'processing'
          await supabase
            .from('orders')
            .update({ status: 'processing' })
            .eq('id', orderId);
            
          console.log(`[Paystack] Order ${orderId} marked as processing.`);
        }
      }
      
      res.status(200).send('Webhook received');
    } catch (error: any) {
      console.error('Webhook Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // 5. Checkout Initialization (Paystack Handoff)
  app.post('/api/checkout/initialize', async (req, res) => {
    try {
      const { email, amount, cartItems } = req.body;
      const orderId = `FAOLAT-ORD-${Date.now()}`;
      
      // Mock Paystack initialization response
      const mockPaystackResponse = {
        authorization_url: "https://checkout.paystack.com/mock-url",
        access_code: "mock_access_code",
        reference: orderId
      };
      
      res.json({ success: true, ...mockPaystackResponse });
    } catch (error: any) {
      console.error('Checkout Init Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // 6. Database Seeding via Gemini
  app.post('/api/seed', async (req, res) => {
    try {
      const prompt = `Generate a JSON array of 20 highly detailed, clinically accurate dummy pharmaceutical products for FAOLAT Pharmaceuticals. Include a mix of OTC and Prescription (Rx) drugs.
      Each object must strictly match this schema:
      {
        "id": "uuid-string",
        "name": "Product Name (e.g. Premium Paracetamol 500mg)",
        "sku": "FAOLAT-XXX-123",
        "price": 10.99,
        "description": "Rich editorial description of the clinical benefits, mechanism of action, and NAFDAC clearance.",
        "requires_prescription": boolean,
        "category": "cardiology | pain-management | antibiotics | supplements",
        "active_ingredient": "string",
        "stock_quantity": 500
      }
      Return ONLY the raw JSON array. Do not wrap in markdown blocks.`;

      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.ARRAY,
            items: {
              type: Type.OBJECT,
              properties: {
                id: { type: Type.STRING },
                name: { type: Type.STRING },
                sku: { type: Type.STRING },
                price: { type: Type.NUMBER },
                description: { type: Type.STRING },
                requires_prescription: { type: Type.BOOLEAN },
                category: { type: Type.STRING },
                active_ingredient: { type: Type.STRING },
                stock_quantity: { type: Type.NUMBER },
              },
              required: ['id', 'name', 'sku', 'price', 'description', 'requires_prescription', 'category', 'active_ingredient', 'stock_quantity']
            }
          }
        }
      });

      const products = JSON.parse(response.text || '[]');

      if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const { data, error } = await supabase.from('products').insert(products).select();
        if (error) throw error;
        return res.json({ success: true, message: 'Database seeded successfully', data });
      } else {
        return res.json({ success: true, message: 'Mock Database seeded (Return only)', data: products });
      }
    } catch (error: any) {
      console.error('Seeding Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  app.post('/api/prescription/upload', async (req, res) => {
    try {
      const { fileData, mimeType } = req.body;
      if (!fileData || !mimeType) {
        return res.status(400).json({ error: 'fileData and mimeType are required' });
      }

      // Initialize Gemini and extract data
      const response = await ai.models.generateContent({
        model: 'gemini-3.5-flash',
        contents: {
          parts: [
            {
              inlineData: {
                mimeType,
                data: fileData, // base64 string without the data:image/... prefix
              },
            },
            {
              text: 'Extract the patient name, doctor name, and a list of prescribed medications from this prescription document. Also add any additional notes.',
            },
          ],
        },
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              patientName: { type: Type.STRING, description: "Name of the patient" },
              doctorName: { type: Type.STRING, description: "Name of the doctor" },
              medications: {
                type: Type.ARRAY,
                items: { type: Type.STRING },
                description: "List of medications prescribed",
              },
              notes: { type: Type.STRING, description: "Additional notes or instructions" }
            },
            required: ['patientName', 'doctorName', 'medications'],
          },
        },
      });

      const extractedDataText = response.text;
      if (!extractedDataText) {
         throw new Error("Failed to extract data");
      }
      const extractedData = JSON.parse(extractedDataText);

      // Insert into Supabase (mock logic if env vars missing, real if present)
      let prescriptionRecord;
      if (process.env.SUPABASE_URL && process.env.SUPABASE_ANON_KEY) {
        const { data, error } = await supabase
          .from('prescriptions')
          .insert([
            {
              // Assumes an existing patient_id exists for context, using dummy for example
              patient_id: 'dummy-patient-id', 
              document_url: 'uploaded-via-api', // In a real scenario, this would be an S3/Supabase Storage URL
              status: 'pending',
              metadata: extractedData,
            },
          ])
          .select()
          .single();

        if (error) throw error;
        prescriptionRecord = data;
      } else {
        // Mock successful insertion response
        prescriptionRecord = {
          id: 'mock-uuid-' + Date.now(),
          patient_id: 'mock-patient-id',
          document_url: 'mock-url',
          status: 'pending',
          metadata: extractedData,
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString(),
        };
      }

      res.json({ success: true, prescription: prescriptionRecord, extracted: extractedData });
    } catch (error: any) {
      console.error('Prescription Upload Error:', error);
      res.status(500).json({ error: error.message });
    }
  });

  // Vite middleware for development
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

startServer();
