import React, { useState, useRef } from 'react';
import { Camera, Upload, Info, Hexagon } from 'lucide-react';
import { analyzeMeteoriteImage, generateShowcaseImages, fileToGenerativePart } from './services/geminiService';
import { ScanningEffect } from './components/ScanningEffect';
import { ResultSuccess } from './components/ResultSuccess';
import { ResultFailure } from './components/ResultFailure';
import { AppState, AnalysisResult } from './types';

export default function App() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [analysisResult, setAnalysisResult] = useState<AnalysisResult | null>(null);
  const [generatedImages, setGeneratedImages] = useState<string[]>([]);
  const [errorMsg, setErrorMsg] = useState<string>('');
  
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    try {
      setAppState(AppState.ANALYZING);
      const base64 = await fileToGenerativePart(file);
      setCapturedImage(`data:${file.type};base64,${base64}`);
      
      // Artificial delay to allow the "Scanning Effect" to play for at least 4 seconds
      // This builds anticipation and trust in the "Ensemble x10" process
      const analysisPromise = analyzeMeteoriteImage(base64);
      const delayPromise = new Promise(resolve => setTimeout(resolve, 5000));
      
      const [result] = await Promise.all([analysisPromise, delayPromise]);
      
      setAnalysisResult(result);

      if (result.isMeteorite) {
        setAppState(AppState.SUCCESS);
        // Start generating images in background
        generateShowcaseImages(result.details, result.classification).then(imgs => {
          setGeneratedImages(imgs);
        });
      } else {
        setAppState(AppState.FAILURE);
      }

    } catch (err) {
      console.error(err);
      setErrorMsg("Lỗi kết nối AI. Vui lòng thử lại.");
      setAppState(AppState.ERROR);
    }
  };

  const handleCameraCapture = () => {
    // In a real mobile PWA, this would trigger the native camera.
    // For this web implementation, we'll trigger the file input with capture attribute
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const resetApp = () => {
    setAppState(AppState.IDLE);
    setCapturedImage(null);
    setAnalysisResult(null);
    setGeneratedImages([]);
    setErrorMsg('');
  };

  return (
    <div className="min-h-screen bg-black text-gray-100 flex flex-col font-sans selection:bg-amber-500 selection:text-black">
      
      {/* Header */}
      <header className="fixed top-0 w-full z-50 bg-black/80 backdrop-blur-md border-b border-gray-800">
        <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Hexagon className="text-amber-500 fill-amber-500/20" size={28} />
            <span className="text-xl font-bold tracking-tighter text-white">
              METEORITE <span className="text-amber-500">VIP</span>
            </span>
          </div>
          <div className="flex items-center gap-4 text-xs font-mono text-gray-500">
             <span className="hidden md:inline-block">• AI ENSEMBLE X10</span>
             <span className="hidden md:inline-block">• GLOBAL DATA</span>
             <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_#22c55e]"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 flex flex-col items-center justify-center pt-20 px-4 pb-12 w-full max-w-7xl mx-auto">
        
        {/* State: IDLE */}
        {appState === AppState.IDLE && (
          <div className="w-full max-w-2xl text-center space-y-12 animate-fade-in py-10">
            <div className="space-y-4">
              <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-br from-white via-gray-200 to-gray-600">
                THẨM ĐỊNH <br/> THIÊN THẠCH
              </h1>
              <p className="text-gray-400 text-lg max-w-md mx-auto">
                Sử dụng công nghệ AI Ensemble đa tầng để phân tích cấu trúc, mật độ và thành phần hóa học qua hình ảnh 4K.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full px-4">
              <button 
                onClick={handleCameraCapture}
                className="group relative flex flex-col items-center justify-center h-48 bg-gray-900 border border-gray-700 hover:border-amber-500 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(245,158,11,0.15)]"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-amber-500 transition-colors">
                  <Camera className="text-white" size={32} />
                </div>
                <span className="text-xl font-bold text-white">Chụp ảnh mẫu vật</span>
                <span className="text-xs text-gray-500 mt-2 uppercase tracking-widest">Camera AI</span>
              </button>

              <button 
                onClick={() => fileInputRef.current?.click()}
                className="group relative flex flex-col items-center justify-center h-48 bg-gray-900 border border-gray-700 hover:border-blue-500 rounded-2xl transition-all duration-300 hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
              >
                <div className="w-16 h-16 bg-gray-800 rounded-full flex items-center justify-center mb-4 group-hover:bg-blue-500 transition-colors">
                  <Upload className="text-white" size={32} />
                </div>
                <span className="text-xl font-bold text-white">Tải ảnh 4K</span>
                <span className="text-xs text-gray-500 mt-2 uppercase tracking-widest">Upload File</span>
              </button>
            </div>

            <div className="flex items-center justify-center gap-2 text-gray-600 text-xs mt-8">
              <Info size={14} />
              <span>Hỗ trợ định dạng JPG, PNG, HEIC chất lượng cao</span>
            </div>
          </div>
        )}

        {/* State: ANALYZING */}
        {appState === AppState.ANALYZING && capturedImage && (
          <ScanningEffect imageSrc={capturedImage} />
        )}

        {/* State: SUCCESS */}
        {appState === AppState.SUCCESS && analysisResult && (
          <ResultSuccess 
            result={analysisResult} 
            generatedImages={generatedImages}
            onReset={resetApp}
          />
        )}

        {/* State: FAILURE */}
        {appState === AppState.FAILURE && analysisResult && (
          <ResultFailure result={analysisResult} onReset={resetApp} />
        )}

        {/* State: ERROR */}
        {appState === AppState.ERROR && (
          <div className="text-center space-y-4">
            <div className="text-red-500 font-bold text-xl">Lỗi Hệ Thống</div>
            <p className="text-gray-400">{errorMsg}</p>
            <button onClick={resetApp} className="px-6 py-2 bg-gray-800 rounded-lg hover:bg-gray-700">Thử lại</button>
          </div>
        )}

        {/* Hidden File Input */}
        <input 
          type="file" 
          ref={fileInputRef} 
          className="hidden" 
          accept="image/*" 
          onChange={handleFileUpload} 
        />

      </main>

      {/* Footer */}
      <footer className="w-full bg-black py-6 border-t border-gray-900 text-center">
        <p className="text-gray-700 text-xs font-mono">
          METEORITE VIP AI © 2024. POWERED BY GOOGLE GEMINI.
        </p>
      </footer>
    </div>
  );
}
