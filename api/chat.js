import { createChatReply } from './chat-core.js';

export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.setHeader('Allow', 'POST');
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const result = await createChatReply({
    apiKey: process.env.GEMINI_API_KEY,
    message: req.body?.message,
    history: req.body?.history,
  });

  return res.status(result.status).json(result.body);
}
