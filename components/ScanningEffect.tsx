import React, { useEffect, useState } from 'react';
import { ShieldCheck, Database, Search, Activity, Layers, Zap, Scale, Eye } from 'lucide-react';
import { CheckpointLog } from '../types';

interface ScanningEffectProps {
  imageSrc: string;
}

const steps = [
  { icon: Search, text: "Quét bề mặt quang học (Optical Scan)" },
  { icon: Layers, text: "Phân tích lớp vỏ nóng chảy (Fusion Crust)" },
  { icon: Database, text: "So khớp dữ liệu thiên thạch toàn cầu" },
  { icon: Activity, text: "Kiểm tra dấu vân tay khí động học (Regmaglypts)" },
  { icon: Scale, text: "Ước tính tỷ trọng & độ đặc khối (Density)" },
  { icon: Zap, text: "Phân tích phổ màu oxy hóa (Oxidation Spectrum)" },
  { icon: Eye, text: "Kiểm định cấu trúc tinh thể (Crystal Structure)" },
  { icon: ShieldCheck, text: "Tổng hợp kết quả Ensemble (x10 Models)" },
];

export const ScanningEffect: React.FC<ScanningEffectProps> = ({ imageSrc }) => {
  const [activeStep, setActiveStep] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveStep((prev) => (prev < steps.length - 1 ? prev + 1 : prev));
    }, 600); // Cycle through steps every 600ms
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="relative w-full max-w-md mx-auto aspect-[3/4] bg-gray-900 rounded-2xl overflow-hidden border-2 border-amber-500/50 shadow-[0_0_30px_rgba(245,158,11,0.3)]">
      {/* Background Image being scanned */}
      <img src={imageSrc} alt="Analyzing" className="absolute inset-0 w-full h-full object-cover opacity-60" />
      
      {/* Scan Line Animation */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-amber-500/20 to-transparent animate-scan h-[20%] w-full z-10 border-b border-amber-400/50 box-shadow-[0_0_15px_#fbbf24]"></div>

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.1)_1px,transparent_1px)] bg-[size:20px_20px] z-0"></div>

      {/* HUD Overlay */}
      <div className="absolute inset-0 z-20 flex flex-col justify-end p-6 bg-gradient-to-t from-black via-black/80 to-transparent">
        <h3 className="text-amber-400 font-mono text-lg font-bold mb-4 animate-pulse uppercase tracking-widest">
          Đang phân tích hệ thống...
        </h3>
        <div className="space-y-3">
          {steps.map((step, index) => {
             const Icon = step.icon;
             const isActive = index === activeStep;
             const isCompleted = index < activeStep;
             
             return (
              <div key={index} className={`flex items-center gap-3 transition-all duration-300 ${isActive || isCompleted ? 'opacity-100 translate-x-0' : 'opacity-30 -translate-x-2'}`}>
                <div className={`p-1.5 rounded-full ${isActive ? 'bg-amber-500 text-black animate-spin' : isCompleted ? 'bg-green-500 text-black' : 'bg-gray-800 text-gray-500'}`}>
                  <Icon size={14} />
                </div>
                <span className={`text-xs font-mono ${isActive ? 'text-amber-300 font-bold' : isCompleted ? 'text-green-400' : 'text-gray-500'}`}>
                  {step.text}
                </span>
                {isActive && <span className="text-amber-500 text-xs ml-auto">PROCESSING...</span>}
                {isCompleted && <span className="text-green-500 text-xs ml-auto">OK</span>}
              </div>
             );
          })}
        </div>
      </div>
    </div>
  );
};
