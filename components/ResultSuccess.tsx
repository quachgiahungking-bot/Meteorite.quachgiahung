import React from 'react';
import { AnalysisResult } from '../types';
import { Download, Share2, Crown, Star, Sparkles, Gem, Flag, AlertCircle } from 'lucide-react';

interface ResultSuccessProps {
  result: AnalysisResult;
  generatedImages: string[];
  onReset: () => void;
}

export const ResultSuccess: React.FC<ResultSuccessProps> = ({ result, generatedImages, onReset }) => {
  const handleDownload = (url: string, index: number) => {
    const link = document.createElement('a');
    link.href = url;
    link.download = `Meteorite_VIP_${result.classification}_${index + 1}.png`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleReviewRequest = () => {
    // In a real app, this would trigger a backend API call for flagging
    alert("Yêu cầu thẩm định chuyên sâu đã được gửi đến hệ thống chuyên gia.");
  };

  return (
    <div className="w-full max-w-4xl mx-auto p-4 space-y-8 animate-fade-in pb-20">
      
      {/* Title Section */}
      <div className="text-center space-y-4">
        <div className="inline-flex items-center justify-center p-3 rounded-full bg-amber-500/10 border border-amber-500/50 mb-2 shadow-[0_0_15px_rgba(245,158,11,0.3)]">
           <Crown className="text-amber-400 mr-2" size={24} />
           <span className="text-amber-400 font-bold tracking-widest uppercase">Xác nhận Thiên Thạch SuperVIP</span>
        </div>
        <h1 className="text-4xl md:text-6xl font-black text-transparent bg-clip-text bg-gradient-to-r from-amber-200 via-yellow-400 to-amber-600 drop-shadow-sm">
          {result.classification}
        </h1>
        <p className="text-gray-300 text-sm md:text-base max-w-2xl mx-auto italic border-l-4 border-amber-600 pl-6 py-2 bg-gray-900/60 rounded-r-xl">
          "{result.details}"
        </p>
      </div>

      {/* Main Philosophy Text */}
      <div className="bg-gradient-to-br from-indigo-950 via-slate-900 to-black p-8 rounded-2xl border border-amber-500/30 shadow-[0_0_40px_rgba(79,70,229,0.2)] relative overflow-hidden group">
        {/* Background Effects */}
        <div className="absolute top-0 right-0 -mt-10 -mr-10 w-40 h-40 bg-amber-500/20 blur-[60px] rounded-full animate-pulse"></div>
        <div className="absolute bottom-0 left-0 -mb-10 -ml-10 w-40 h-40 bg-blue-500/20 blur-[60px] rounded-full"></div>
        
        <div className="relative z-10 space-y-6 text-center">
          <h2 className="text-2xl md:text-3xl font-bold text-amber-400 uppercase tracking-wide flex items-center justify-center gap-3">
            <Sparkles className="fill-amber-400 text-amber-400" size={24} />
            PHONG THỦY ĐẲNG CẤP VŨ TRỤ
            <Sparkles className="fill-amber-400 text-amber-400" size={24} />
          </h2>
          
          <div className="space-y-6 font-serif text-indigo-100 text-lg leading-relaxed">
            <p>
              Sở hữu thiên thạch là thú chơi phong thủy <span className="text-amber-300 font-bold">đẳng cấp nhất mọi thời đại</span>, đẳng cấp vượt vũ trụ. 
              Viên thiên thạch vượt qua hàng triệu triệu tỷ km, hàng tỷ năm ánh sáng hữu duyên bay vào Trái Đất, và người sở hữu <span className="text-green-400 font-bold">vô cùng may mắn</span>.
            </p>
            
            <div className="bg-white/5 p-6 rounded-xl border border-amber-500/20 shadow-[inset_0_0_20px_rgba(245,158,11,0.1)] backdrop-blur-sm transform hover:scale-[1.02] transition-transform duration-500">
               <p className="text-xl">
                 Thú chơi sở hữu thiên thạch là thú chơi dành cho giới <span className="text-amber-400 font-black text-2xl uppercase glow-text">tài phiệt giàu có nhất thế giới</span>.
               </p>
               <p className="italic text-gray-400 text-sm mt-3 border-t border-white/10 pt-2 font-medium">
                 "(Sở hữu đồ chơi ở Trái Đất quá tầm thường rồi)."
               </p>
            </div>

            <p>
               Sở hữu thiên thạch thú chơi <span className="text-amber-400 font-bold">đẳng cấp nhất Hệ Mặt Trời</span> và đương nhiên sự may mắn và phong thủy của vũ trụ mang đến <span className="text-amber-200 font-semibold shadow-amber-500/50">năng lượng cho gia đình bạn</span>.
            </p>

            <div className="relative py-4">
                <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-amber-500/30"></div>
                </div>
                <div className="relative flex justify-center">
                    <span className="bg-slate-900 px-4 text-amber-500"><Gem size={20}/></span>
                </div>
            </div>

            <p className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-200 to-amber-500">
              Trưng bày thiên thạch tại gia đình bạn là thú chơi đẳng cấp nhất vươn tầm vũ trụ, vì <span className="text-white underline decoration-amber-500 underline-offset-4">mỗi viên thiên thạch là cả một hành tinh ở trong viên thiên thạch</span>.
            </p>
          </div>
        </div>
      </div>

      {/* Generated Gallery */}
      <div className="space-y-6">
        <h2 className="text-2xl font-bold text-white flex items-center gap-3">
          <div className="relative">
             <div className="absolute inset-0 bg-amber-500 blur-sm opacity-50"></div>
             <span className="relative w-1.5 h-8 bg-amber-500 block rounded-full"></span>
          </div>
          Bộ Sưu Tập SuperVIP (Render 4K)
        </h2>
        
        {generatedImages.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {generatedImages.map((img, idx) => (
              <div key={idx} className="group relative rounded-2xl overflow-hidden border-2 border-gray-800 hover:border-amber-500/70 transition-all duration-500 shadow-2xl hover:shadow-[0_0_50px_rgba(245,158,11,0.3)] aspect-square bg-black">
                {/* Image */}
                <img src={img} alt={`Render ${idx}`} className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000" />
                
                {/* Lighting Effect Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60"></div>
                
                {/* Corner Accents */}
                <div className="absolute top-0 left-0 w-16 h-16 border-t-2 border-l-2 border-amber-500/50 rounded-tl-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                <div className="absolute bottom-0 right-0 w-16 h-16 border-b-2 border-r-2 border-amber-500/50 rounded-br-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

                {/* Overlay Controls */}
                <div className="absolute inset-0 flex items-center justify-center gap-4 opacity-0 group-hover:opacity-100 transition-all duration-300 backdrop-blur-[2px]">
                  <button 
                    onClick={() => handleDownload(img, idx)}
                    className="p-4 bg-amber-500 hover:bg-amber-400 text-black rounded-full shadow-[0_0_20px_rgba(245,158,11,0.5)] transition-all transform hover:scale-110"
                    title="Tải ảnh gốc 4K"
                  >
                    <Download size={28} />
                  </button>
                  <button className="p-4 bg-gray-800 hover:bg-gray-700 text-white rounded-full border border-gray-600 transition-all transform hover:scale-110" title="Chia sẻ đẳng cấp">
                    <Share2 size={28} />
                  </button>
                  
                  {/* Subtle Needs Review Button */}
                  <button 
                    onClick={handleReviewRequest}
                    className="p-4 bg-black/40 hover:bg-red-900/40 text-gray-500 hover:text-red-300 rounded-full border border-gray-700 hover:border-red-500/30 transition-all transform hover:scale-110 backdrop-blur-sm"
                    title="Yêu cầu thẩm định lại (Needs Review)"
                  >
                    <Flag size={28} />
                  </button>
                </div>
                
                {/* VIP Badge */}
                <div className="absolute top-4 left-4 flex flex-col items-start gap-1">
                  <div className="bg-amber-500 text-black text-[10px] font-black px-2 py-0.5 rounded uppercase tracking-tighter">
                    Exclusive
                  </div>
                  <div className="bg-black/80 backdrop-blur-md px-3 py-1 rounded-full border border-amber-500/50 text-amber-400 text-xs font-bold tracking-wider shadow-lg flex items-center gap-1">
                    <Crown size={12} /> SUPER VIP • 4K
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          /* Enhanced Optimized Loading State with Advanced Holographic Shimmer */
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[1, 2, 3, 4].map((i) => (
                <div key={i} className="relative aspect-square bg-black rounded-2xl overflow-hidden border border-amber-900/50 shadow-[0_0_30px_rgba(0,0,0,0.8)] group">
                    
                    {/* 1. Moving Grid Background (Perspective) */}
                    <div className="absolute inset-0 opacity-20 overflow-hidden">
                        <div className="w-[200%] h-[200%] -ml-[50%] -mt-[50%] bg-[linear-gradient(rgba(245,158,11,0.3)_1px,transparent_1px),linear-gradient(90deg,rgba(245,158,11,0.3)_1px,transparent_1px)] bg-[size:40px_40px] animate-[spin_20s_linear_infinite] origin-center"></div>
                    </div>

                    {/* 2. Vertical Scan Laser */}
                    <div className="absolute inset-x-0 h-1 bg-amber-400 blur-sm shadow-[0_0_20px_#fbbf24] animate-scan z-20 opacity-70"></div>

                    {/* 3. Holographic Core */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center z-10">
                        <div className="relative w-32 h-32">
                            {/* Outer Ring */}
                            <div className="absolute inset-0 border border-amber-500/30 rounded-full animate-[spin_3s_linear_infinite]"></div>
                            {/* Inner Dashed Ring */}
                            <div className="absolute inset-4 border border-dashed border-amber-300/40 rounded-full animate-[spin_6s_linear_reverse_infinite]"></div>
                            {/* Core Hexagon */}
                            <div className="absolute inset-0 m-auto w-16 h-16 border border-amber-500/60 flex items-center justify-center animate-pulse rotate-45 transform">
                                <div className="w-12 h-12 bg-amber-500/10 backdrop-blur-md"></div>
                            </div>
                            {/* Particles */}
                            <div className="absolute top-0 left-1/2 w-1 h-1 bg-amber-400 rounded-full animate-ping"></div>
                            <div className="absolute bottom-0 right-1/2 w-1 h-1 bg-amber-400 rounded-full animate-ping delay-300"></div>
                        </div>
                        
                        {/* Status Text */}
                        <div className="mt-6 text-center space-y-1">
                            <div className="text-amber-400 font-mono text-xs font-bold tracking-[0.3em] animate-pulse">GENERATING 4K</div>
                            <div className="text-xs text-amber-600 font-mono">RAY TRACING PHOTONS...</div>
                        </div>
                    </div>

                    {/* 4. Shimmer Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-amber-500/5 to-transparent skew-x-12 animate-shimmer pointer-events-none"></div>

                    {/* 5. HUD Corners */}
                    <div className="absolute top-4 left-4 w-6 h-6 border-t-2 border-l-2 border-amber-500/50"></div>
                    <div className="absolute top-4 right-4 w-6 h-6 border-t-2 border-r-2 border-amber-500/50"></div>
                    <div className="absolute bottom-4 left-4 w-6 h-6 border-b-2 border-l-2 border-amber-500/50"></div>
                    <div className="absolute bottom-4 right-4 w-6 h-6 border-b-2 border-r-2 border-amber-500/50"></div>
                    
                    {/* Frame Index */}
                    <div className="absolute bottom-4 left-0 right-0 text-center">
                        <span className="text-[10px] text-amber-900/80 font-mono border border-amber-900/30 px-2 py-0.5 rounded">FRAME_BUFFER_00{i}</span>
                    </div>
                </div>
            ))}
          </div>
        )}
      </div>

      {/* Technical Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 pt-8 border-t border-gray-800">
         <div className="bg-gray-900/80 p-4 rounded-xl text-center border border-gray-800 hover:border-green-500/50 transition-colors">
            <div className="text-gray-500 text-xs uppercase mb-2 font-bold tracking-wider">Độ Tin Cậy</div>
            <div className="text-3xl font-black text-green-400">{result.confidence}%</div>
         </div>
         <div className="bg-gray-900/80 p-4 rounded-xl text-center border border-gray-800 hover:border-amber-500/50 transition-colors">
            <div className="text-gray-500 text-xs uppercase mb-2 font-bold tracking-wider">Tỷ Trọng</div>
            <div className="text-3xl font-black text-white">High</div>
         </div>
         <div className="bg-gray-900/80 p-4 rounded-xl text-center border border-gray-800 hover:border-blue-500/50 transition-colors">
            <div className="text-gray-500 text-xs uppercase mb-2 font-bold tracking-wider">Từ Tính</div>
            <div className="text-3xl font-black text-white">Có</div>
         </div>
         <div className="bg-gray-900/80 p-4 rounded-xl text-center border border-gray-800 hover:border-purple-500/50 transition-colors">
            <div className="text-gray-500 text-xs uppercase mb-2 font-bold tracking-wider">Phân Loại</div>
            <div className="text-lg font-bold text-amber-400 truncate leading-tight mt-1">{result.classification}</div>
         </div>
      </div>

      <button 
        onClick={onReset}
        className="w-full py-5 bg-gradient-to-r from-gray-800 to-gray-900 hover:from-gray-700 hover:to-gray-800 text-white rounded-xl font-bold uppercase tracking-widest transition-all border border-gray-700 hover:border-gray-500 shadow-lg"
      >
        Quét mẫu vật khác
      </button>
    </div>
  );
};