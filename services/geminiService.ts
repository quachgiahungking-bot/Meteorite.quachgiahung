import { GoogleGenAI, Type, SchemaType } from "@google/genai";
import { AnalysisResult } from "../types";

// Helper to extract base64 from a file or blob
export const fileToGenerativePart = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = reader.result as string;
      // Remove data url prefix (e.g. "data:image/jpeg;base64,")
      const base64Data = base64String.split(',')[1];
      resolve(base64Data);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
};

export const analyzeMeteoriteImage = async (base64Image: string): Promise<AnalysisResult> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    
    // Using gemini-2.5-flash for fast but accurate vision analysis
    const modelId = "gemini-2.5-flash"; 

    const systemInstruction = `
      Bạn là chuyên gia thẩm định thiên thạch hàng đầu thế giới với 50 năm kinh nghiệm. 
      Nhiệm vụ: Phân tích hình ảnh mẫu vật để xác định xem đó có phải là thiên thạch hay không.
      
      Tiêu chí bắt buộc (Deep Analysis):
      1. Lớp vỏ nóng chảy (Fusion Crust): Đen, bóng hoặc mờ, mỏng <1mm.
      2. Regmaglypts: Các vết lõm giống vân tay do mài mòn khí động học.
      3. Độ đặc/Tỷ trọng: Cảm quan về sức nặng, cấu trúc khối đặc.
      4. Màu sắc: Đen, nâu, đỏ gỉ (do oxy hóa sắt/niken).
      5. Hình dáng khí động học: Bo tròn, không sắc cạnh gãy vỡ tự nhiên như đá núi lửa thường.

      Nếu là đá Trái Đất (đá núi lửa, xỉ than, quặng sắt...), hãy từ chối thẳng thắn.
      Độ tin cậy (confidence) phải > 85% mới kết luận là thiên thạch.
    `;

    const response = await ai.models.generateContent({
      model: modelId,
      contents: {
        parts: [
          { inlineData: { mimeType: "image/jpeg", data: base64Image } },
          { text: "Phân tích mẫu vật này. Đây là thiên thạch hay đá Trái Đất? Trả về kết quả JSON." }
        ]
      },
      config: {
        systemInstruction: systemInstruction,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            isMeteorite: { type: Type.BOOLEAN },
            classification: { type: Type.STRING, description: "Loại thiên thạch (Iron, Stony, Pallasite...) hoặc loại đá Trái Đất" },
            confidence: { type: Type.NUMBER, description: "Điểm tin cậy từ 0-100" },
            details: { type: Type.STRING, description: "Mô tả chi tiết vẻ đẹp và đặc tính khoa học" },
            reasoning: { type: Type.STRING, description: "Lý do kỹ thuật cho kết luận" }
          },
          required: ["isMeteorite", "classification", "confidence", "details", "reasoning"]
        }
      }
    });

    if (response.text) {
      return JSON.parse(response.text) as AnalysisResult;
    }
    throw new Error("Không nhận được phản hồi phân tích.");

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    throw error;
  }
};

export const generateShowcaseImages = async (description: string, classification: string): Promise<string[]> => {
  try {
    const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
    // Using gemini-3-pro-image-preview for high quality renders as requested (4K simulation via prompt)
    const modelId = "gemini-3-pro-image-preview";

    const basePrompt = `
      Professional product photography, cinematic 4K render, luxury style.
      Subject: A magnificent ${classification} meteorite specimen.
      Context: Placed on a high-end "SuperVIP" museum display stand made of black glass and gold accents.
      Lighting: Studio spotlight, rim lighting, dramatic shadows, emphasizing the metallic fusion crust and regmaglypts.
      Atmosphere: Expensive, mysterious, cosmic.
      Details based on analysis: ${description}.
    `;

    const prompts = [
      `${basePrompt} View: Front detailed close-up showing texture.`,
      `${basePrompt} View: 45-degree angle displaying aerodynamic shape.`,
      `${basePrompt} View: Top-down view on the luxury stand.`,
      `${basePrompt} View: Dramatic low angle with lens flare.`
    ];

    const imagePromises = prompts.map(async (p) => {
        const response = await ai.models.generateContent({
            model: modelId,
            contents: { parts: [{ text: p }] },
            config: {
                imageConfig: {
                    aspectRatio: "1:1",
                    imageSize: "1K" // API limitation: usually 1K is max for direct gen, we simulate 4K quality via prompt detail.
                }
            }
        });
        
        for (const part of response.candidates?.[0]?.content?.parts || []) {
            if (part.inlineData) {
                return `data:image/png;base64,${part.inlineData.data}`;
            }
        }
        return null;
    });

    const results = await Promise.all(imagePromises);
    return results.filter((url): url is string => url !== null);

  } catch (error) {
    console.error("Image Generation Error:", error);
    // Return empty array to handle gracefully in UI
    return [];
  }
};
