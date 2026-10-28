import express from 'express';
import { createServer as createViteServer } from 'vite';
import { GoogleGenAI } from '@google/genai';
import dotenv from 'dotenv';

dotenv.config();

async function startServer() {
  const app = express();
  app.use(express.json());

  // API endpoint for Gemini AI curriculum generation
  app.post('/api/generate-ai', async (req, res) => {
    try {
      const { prompt, systemInstruction } = req.body;
      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        return res.status(500).json({ error: 'GEMINI_API_KEY tidak dikonfigurasi. Silakan atur kunci API Anda di panel Secrets AI Studio.' });
      }

      const ai = new GoogleGenAI({ apiKey });
      const response = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          systemInstruction: systemInstruction || 'Anda adalah AI Copilot ahli kurikulum pendidikan tinggi, Outcome-Based Education (OBE), dan desain instruksional untuk Universitas Pattimura (Unpatti). Berikan respons dalam Bahasa Indonesia yang formal, akademis, dan terstruktur sesuai Standar Nasional Dikti.',
        },
      });

      res.json({ text: response.text });
    } catch (err: any) {
      console.error('Gemini API Error:', err);
      res.status(500).json({ error: err.message || 'Gagal memproses AI generator' });
    }
  });

  const vite = await createViteServer({
    server: { middlewareMode: true },
    appType: 'spa',
  });

  app.use(vite.middlewares);

  const port = Number(process.env.PORT) || 3000;
  app.listen(port, '0.0.0.0', () => {
    console.log(`AKURAT - OBE Server running on port ${port}`);
  });
}

startServer();
