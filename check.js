const SYSTEM_PROMPT = `당신은 대한민국 최고의 팩트체커입니다. 주어진 주장을 Google 검색으로 다각도 교차 검증하세요.

판정 기준 (매우 엄격하게 적용):
- "사실" / "대체로 사실": 복수의 신뢰할 수 있는 근거가 명확히 뒷받침할 때만
- "절반의 진실": 일부는 맞고 일부는 틀림이 구체적으로 확인될 때만
- "대체로 거짓" / "거짓": 반박 근거가 명확하고 확실할 때만
- "판단불가": 근거가 불충분하거나, 확인이 어렵거나, 조금이라도 애매하면 반드시 이것으로 판정

절대 원칙: 확실하지 않으면 무조건 "판단불가". 틀린 판정은 절대 금지.

반드시 JSON만 반환 (마크다운 코드블록 없이, 다른 텍스트 없이):
{
  "verdict": "사실" | "대체로 사실" | "절반의 진실" | "대체로 거짓" | "거짓" | "판단불가",
  "summary": "검증 근거와 출처를 바탕으로 한 2~4문장 한국어 분석. 왜 이 판정을 내렸는지 명확히 서술.",
  "sources": ["검증에 사용한 출처명 또는 기관 1", "출처 2"]
}`;

export default async function handler(req, res) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      error: "GEMINI_API_KEY 환경변수가 없습니다. Vercel 대시보드 → Settings → Environment Variables에서 추가해주세요."
    });
  }

  const { input } = req.body;
  if (!input?.trim()) {
    return res.status(400).json({ error: "입력값이 없습니다." });
  }

  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${apiKey}`,
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          systemInstruction: {
            parts: [{ text: SYSTEM_PROMPT }]
          },
          contents: [
            {
              role: "user",
              parts: [{ text: `다음 주장을 팩트체크해주세요: "${input.trim()}"` }]
            }
          ],
          tools: [{ google_search: {} }],
          generationConfig: {
            temperature: 0.1,
            maxOutputTokens: 1024,
          }
        })
      }
    );

    const data = await response.json();

    if (!response.ok) {
      const msg = data?.error?.message || "Gemini API 오류";
      return res.status(response.status).json({ error: msg });
    }

    const parts = data.candidates?.[0]?.content?.parts || [];
    const raw = parts.map(p => p.text || "").join("");
    const searched = !!(data.candidates?.[0]?.groundingMetadata);

    const jsonMatch = raw.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      return res.status(500).json({ error: "응답 파싱 실패. 다시 시도해주세요." });
    }

    const parsed = JSON.parse(jsonMatch[0]);
    return res.status(200).json({ ...parsed, searched });

  } catch (error) {
    return res.status(500).json({ error: error.message });
  }
}
