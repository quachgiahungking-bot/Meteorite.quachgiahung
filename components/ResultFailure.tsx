import React from 'react';
import { AnalysisResult } from '../types';
import { RefreshCcw, AlertTriangle } from 'lucide-react';

interface ResultFailureProps {
  result: AnalysisResult;
  onReset: () => void;
}

export const ResultFailure: React.FC<ResultFailureProps> = ({ result, onReset }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[60vh] p-6 text-center space-y-6 max-w-md mx-auto">
      <div className="w-24 h-24 bg-red-500/10 rounded-full flex items-center justify-center mb-4 ring-4 ring-red-500/20">
        <AlertTriangle className="text-red-500" size={48} />
      </div>
      
      <h2 className="text-3xl font-bold text-white">Chưa phát hiện thiên thạch</h2>
      
      <div className="bg-gray-800/50 p-6 rounded-xl border border-gray-700 w-full">
        <h3 className="text-red-400 font-bold mb-2 uppercase tracking-wide">Kết quả phân tích</h3>
        <p className="text-white text-lg font-medium mb-2">{result.classification}</p>
        <p className="text-gray-400 text-sm leading-relaxed text-left">
          {result.reasoning}
        </p>
      </div>

      <p className="text-gray-500 text-sm italic">
        "Đừng nản lòng! Việc tìm kiếm thiên thạch cần sự kiên nhẫn. Hãy thử với một mẫu vật khác có các dấu hiệu rõ ràng hơn."
      </p>

      <button 
        onClick={onReset}
        className="group relative w-full py-4 bg-amber-600 hover:bg-amber-500 text-white rounded-xl font-bold text-lg transition-all shadow-[0_0_20px_rgba(217,119,6,0.4)] hover:shadow-[0_0_30px_rgba(217,119,6,0.6)] flex items-center justify-center gap-2"
      >
        <RefreshCcw className="group-hover:rotate-180 transition-transform duration-500" />
        Thay mẫu vật
      </button>
    </div>
  );
};
