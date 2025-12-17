import React, { useState, useEffect } from 'react';
import { GoogleGenAI } from "@google/genai";
import { Section, SectionHeader, Card } from './Shared';
import { Sparkles, Send, Bot, AlertCircle, MapPin, Navigation } from 'lucide-react';

const SUGGESTED_QUESTIONS = [
  "أين أقرب فرع للبنك الأهلي؟",
  "ابحث عن مكاتب تقييم عقاري في الرياض",
  "كيف يمكنني إعادة جدولة القرض الشخصي؟",
  "ما هي شروط الإعفاء من المديونية؟"
];

interface MapSource {
  title: string;
  uri: string;
}

const AiAssistant: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [mapSources, setMapSources] = useState<MapSource[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [userLocation, setUserLocation] = useState<{latitude: number, longitude: number} | null>(null);

  // Attempt to get user location on mount for better map grounding results
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          });
        },
        (err) => {
          console.debug("Location access denied or error:", err);
          // Defaulting to Riyadh center if location is denied can be handled by the model or generic query
        }
      );
    }
  }, []);

  const handleAsk = async (textToAsk: string = query) => {
    if (!textToAsk.trim()) return;

    setLoading(true);
    setError('');
    setResponse('');
    setMapSources([]);
    setQuery(textToAsk); // Update input if clicked from suggestions

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      
      const systemInstruction = `
        أنت "مساعد ريفانس الذكي"، مستشار مالي ومكاني متخصص لمنصة "ريفانس المالية" في المملكة العربية السعودية.
        
        دورك:
        1. تقديم إجابات مالية دقيقة حول القروض، السجل الائتماني (سمة)، واللوائح المالية.
        2. مساعدة المستخدمين في العثور على المواقع الجغرافية المهمة باستخدام خرائط جوجل (مثل: فروع البنوك، أجهزة الخدمة الذاتية أبشر/ناجز، مكاتب التقييم العقاري).
        3. التحدث بنبرة مهنية، ودودة، ومطمئنة باللغة العربية.
        
        عندما يسأل المستخدم عن مكان (مثال: "أين أقرب فرع..." أو "ابحث عن مكاتب..."):
        - استخدم أداة خرائط جوجل للبحث.
        - قدم قائمة واضحة بالأسماء والعناوين في ردك النصي.
        
        ملاحظة: خدمات ريفانس تشمل: الخدمات التمويلية، القضائية، المصرفية، العقارية، الزكوية، والائتمانية.
      `;

      // Construct tool config with location if available
      const toolConfig = userLocation ? {
        googleSearch: {
             // retrievalConfig is sometimes used here based on specific SDK versions for grounding, 
             // but for standard tools we pass it as part of the request context or prompt usually.
             // Based on instructions provided:
             retrievalConfig: {
                latLng: {
                  latitude: userLocation.latitude,
                  longitude: userLocation.longitude
                }
             }
        } 
      } : undefined;

      // Note: In the SDK instruction, it says toolConfig -> retrievalConfig -> latLng is for googleMaps tool.
      // We will follow the instruction pattern.
      const requestConfig: any = {
          systemInstruction: systemInstruction,
          temperature: 0.7,
          tools: [{ googleMaps: {} }],
      };

      if (userLocation) {
          requestConfig.toolConfig = {
              retrievalConfig: {
                  latLng: {
                      latitude: userLocation.latitude,
                      longitude: userLocation.longitude
                  }
              }
          };
      }

      const result = await ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: textToAsk,
        config: requestConfig
      });

      const responseText = result.text || 'عذراً، لم أتمكن من استخراج الإجابة حالياً.';
      setResponse(responseText);

      // Extract Map Links from Grounding Metadata
      const extractedMaps: MapSource[] = [];
      const groundingChunks = result.candidates?.[0]?.groundingMetadata?.groundingChunks;

      if (groundingChunks) {
          groundingChunks.forEach((chunk: any) => {
              if (chunk.maps?.uri) {
                  extractedMaps.push({
                      title: chunk.maps.title || 'موقع على الخريطة',
                      uri: chunk.maps.uri
                  });
              } 
              // Sometimes map results might come in specific answer source structures depending on query type
              // We strictly look for maps URIs as per instruction
          });
      }
      setMapSources(extractedMaps);

    } catch (err) {
      console.error(err);
      setError('حدث خطأ أثناء الاتصال بالمساعد الذكي. يرجى المحاولة لاحقاً.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <Section id="ai-assistant">
      <Card className="border-gold shadow-[0_0_15px_rgba(199,169,105,0.15)] overflow-hidden relative">
        {/* Decorative background accent */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-brand via-gold to-brand"></div>
        
        <SectionHeader 
          eyebrow="أدوات ذكية" 
          title="مستشار ريفانس الذكي" 
          subtitle="احصل على إجابات مالية ومكانية فورية مدعومة ببيانات خرائط جوجل الحية."
        />

        <div className="flex flex-col gap-4 mt-2">
          {/* Output Area */}
          {(response || loading || error) && (
            <div className={`rounded-2xl p-4 min-h-[100px] transition-all duration-300 ${error ? 'bg-red-50 border border-red-100' : 'bg-white border border-gold/20'}`}>
              {loading ? (
                <div className="flex flex-col items-center justify-center h-full py-2 gap-3">
                  <Sparkles className="text-gold animate-spin" size={24} />
                  <span className="text-[12px] text-muted animate-pulse">جاري البحث والتحليل (مالي ومكاني)...</span>
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-600 text-[12px]">
                  <AlertCircle size={16} />
                  {error}
                </div>
              ) : (
                <div className="flex flex-col gap-3">
                  <div className="flex items-start gap-3">
                    <div className="w-8 h-8 rounded-full bg-brand text-gold flex items-center justify-center shrink-0 mt-1 shadow-sm">
                      <Bot size={18} />
                    </div>
                    <div className="flex-1">
                      <p className="text-[13px] text-brand leading-7 whitespace-pre-line">
                        {response}
                      </p>
                    </div>
                  </div>

                  {/* Render Map Sources if available */}
                  {mapSources.length > 0 && (
                      <div className="mt-2 pr-11">
                          <h4 className="text-[11px] font-bold text-muted mb-2 flex items-center gap-1">
                              <Navigation size={12} className="text-gold" />
                              المواقع المقترحة على الخريطة:
                          </h4>
                          <div className="grid grid-cols-1 gap-2">
                              {mapSources.map((map, idx) => (
                                  <a 
                                    key={idx} 
                                    href={map.uri} 
                                    target="_blank" 
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-3 bg-gray-50 hover:bg-[#FFFBF2] p-2.5 rounded-[12px] border border-gray-100 hover:border-gold/30 transition-all group"
                                  >
                                      <div className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-brand group-hover:text-gold shrink-0">
                                          <MapPin size={16} />
                                      </div>
                                      <div className="flex-1 overflow-hidden">
                                          <div className="text-[12px] font-bold text-brand truncate">{map.title}</div>
                                          <div className="text-[10px] text-muted truncate dir-ltr text-right">{map.uri.replace('https://', '')}</div>
                                      </div>
                                      <div className="text-[10px] bg-brand text-white px-2 py-1 rounded-md opacity-0 group-hover:opacity-100 transition-opacity">
                                          فتح
                                      </div>
                                  </a>
                              ))}
                          </div>
                      </div>
                  )}

                  <div className="mt-3 pt-2 border-t border-gray-100 text-[10px] text-muted flex items-center gap-1">
                    <Sparkles size={10} className="text-gold" />
                    إجابة مولدة بواسطة Gemini 2.5 مع بيانات خرائط Google.
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Input Area */}
          <div className="relative">
            <textarea
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="اسأل عن خدمات مالية أو ابحث عن مواقع قريبة (مثال: أين أقرب صراف آلي؟)"
              className="w-full bg-white border border-gold/40 rounded-[16px] p-3 pl-[60px] text-[13px] text-brand placeholder:text-muted/60 focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold/30 min-h-[50px] resize-none shadow-inner transition-colors"
              rows={2}
            />
            
            <div className="absolute left-2 bottom-2 flex gap-2">
                <button 
                  onClick={() => handleAsk()}
                  disabled={loading || !query.trim()}
                  className="w-8 h-8 rounded-full bg-brand text-gold flex items-center justify-center hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:cursor-not-allowed shadow-md"
                >
                  {loading ? <span className="w-3 h-3 border-2 border-gold border-t-transparent rounded-full animate-spin" /> : <Send size={14} className="ml-0.5" />}
                </button>
            </div>
          </div>

          {/* Suggested Chips */}
          <div className="flex flex-wrap gap-2 justify-start">
            {SUGGESTED_QUESTIONS.map((q, idx) => (
              <button
                key={idx}
                onClick={() => handleAsk(q)}
                className="text-[10px] px-3 py-1.5 rounded-full bg-white border border-gold/30 text-muted hover:border-gold hover:text-brand hover:bg-gold/5 transition-colors cursor-pointer"
              >
                {q}
              </button>
            ))}
          </div>
        </div>
      </Card>
    </Section>
  );
};

export default AiAssistant;