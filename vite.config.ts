import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import { createChatReply } from './api/chat-core.js'

function readRequestBody(req: any) {
  return new Promise<string>((resolve, reject) => {
    let body = '';

    req.on('data', chunk => {
      body += chunk;
    });

    req.on('end', () => resolve(body));
    req.on('error', reject);
  });
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');

  return {
    plugins: [
      react(),
      {
        name: 'local-gemini-api',
        configureServer(server) {
          server.middlewares.use('/api/chat', async (req, res) => {
            res.setHeader('Content-Type', 'application/json');

            if (req.method !== 'POST') {
              res.statusCode = 405;
              res.setHeader('Allow', 'POST');
              res.end(JSON.stringify({ error: 'Method not allowed' }));
              return;
            }

            try {
              const rawBody = await readRequestBody(req);
              const body = rawBody ? JSON.parse(rawBody) : {};
              const result = await createChatReply({
                apiKey: env.GEMINI_API_KEY,
                message: body.message,
                history: body.history,
              });

              res.statusCode = result.status;
              res.end(JSON.stringify(result.body));
            } catch (error) {
              res.statusCode = 400;
              res.end(JSON.stringify({ error: 'Request chatbot tidak valid.' }));
            }
          });
        },
      },
    ],
  server: {
    port: 5173,
    open: true
  }
  };
})
