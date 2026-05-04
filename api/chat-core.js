export const FALLBACK_ERROR = 'Maaf, layanan chatbot sedang mengalami kendala. Silakan coba lagi beberapa saat.';

const SYSTEM_INSTRUCTION = `Kamu adalah E-Builder Assistant, chatbot customer service resmi untuk website E-Builder. Tugasmu hanya membantu pengguna terkait layanan E-Builder, yaitu platform jasa perbaikan, renovasi, desain, dan pembangunan rumah. Jawab dengan bahasa Indonesia yang jelas, singkat, dan ramah. Jangan menjawab pertanyaan di luar konteks E-Builder. Jika pertanyaan tidak berhubungan dengan E-Builder, jawab: Maaf, saya hanya bisa membantu pertanyaan seputar layanan E-Builder. Jika informasi tidak tersedia dalam konteks, jawab: Informasi tersebut belum tersedia di E-Builder. Silakan hubungi admin untuk detail lebih lanjut.`;

const E_BUILDER_CONTEXT = `E-Builder adalah marketplace jasa perbaikan dan pembangunan rumah berbasis website. Pengguna dapat mencari layanan, melihat kategori jasa, memilih penyedia jasa, melakukan pemesanan, dan memberikan ulasan. Layanan E-Builder mencakup instalasi listrik, pengecatan rumah, renovasi rumah, pembangunan rumah, arsitek, desain interior, desain eksterior, tukang harian, tukang borongan, plumbing, perbaikan atap, plafon, dinding, lantai, keramik, kanopi, pagar, dan konsultasi estimasi biaya bangunan.`;

function normalizeHistory(history) {
  if (!Array.isArray(history)) return [];

  return history
    .filter((item) => item && typeof item.text === 'string' && (item.from === 'user' || item.from === 'bot'))
    .slice(-8)
    .map((item) => ({
      role: item.from === 'user' ? 'user' : 'model',
      parts: [{ text: item.text.slice(0, 1000) }],
    }));
}

function getGeminiText(data) {
  return data?.candidates?.[0]?.content?.parts
    ?.map((part) => part.text)
    .filter(Boolean)
    .join('\n')
    .trim();
}

export async function createChatReply({ apiKey, message, history }) {
  const trimmedMessage = typeof message === 'string' ? message.trim() : '';

  if (!apiKey) {
    return { status: 500, body: { error: 'Gemini API key belum dikonfigurasi.' } };
  }

  if (!trimmedMessage) {
    return { status: 400, body: { error: 'Pesan tidak boleh kosong.' } };
  }

  let timeout;

  try {
    const controller = new AbortController();
    timeout = setTimeout(() => controller.abort(), 15000);

    const response = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.5-flash:generateContent',
      {
        method: 'POST',
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          'x-goog-api-key': apiKey,
        },
        body: JSON.stringify({
          systemInstruction: {
            role: 'system',
            parts: [{ text: SYSTEM_INSTRUCTION }],
          },
          contents: [
            {
              role: 'user',
              parts: [{ text: `Konteks E-Builder:\n${E_BUILDER_CONTEXT}` }],
            },
            {
              role: 'model',
              parts: [{ text: 'Saya memahami konteks E-Builder dan hanya akan menjawab pertanyaan terkait E-Builder.' }],
            },
            ...normalizeHistory(history),
            {
              role: 'user',
              parts: [{ text: trimmedMessage.slice(0, 2000) }],
            },
          ],
          generationConfig: {
            temperature: 0.2,
            topP: 0.8,
            maxOutputTokens: 400,
          },
        }),
      },
    );

    const responseText = await response.text();
    const data = responseText ? JSON.parse(responseText) : {};

    if (!response.ok) {
      return {
        status: response.status,
        body: { error: data?.error?.message || FALLBACK_ERROR },
      };
    }

    const reply = getGeminiText(data);
    if (!reply) {
      return { status: 502, body: { error: FALLBACK_ERROR } };
    }

    return { status: 200, body: { reply } };
  } catch (error) {
    return { status: 500, body: { error: FALLBACK_ERROR } };
  } finally {
    clearTimeout(timeout);
  }
}
