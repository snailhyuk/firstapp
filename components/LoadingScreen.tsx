import React from 'react';

export const LoadingScreen: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center p-8 text-center">
      {/* Abstract Rosemary Animation */}
      <div className="relative w-32 h-40 mb-6">
        <svg viewBox="0 0 100 120" className="w-full h-full overflow-visible">
          {/* Stem */}
          <path 
            d="M50 110 Q50 60 50 10" 
            stroke="#729c72" 
            strokeWidth="3" 
            fill="none" 
            strokeLinecap="round"
            className="origin-bottom animate-gentleSway"
          />
          
          {/* Leaves - Group 1 */}
          <g className="origin-center animate-gentleSway" style={{ animationDelay: '0.2s' }}>
            <path d="M50 90 Q30 80 20 70" stroke="#729c72" strokeWidth="2" fill="none" />
            <path d="M50 90 Q70 80 80 70" stroke="#729c72" strokeWidth="2" fill="none" />
          </g>

          {/* Leaves - Group 2 */}
          <g className="origin-center animate-gentleSway" style={{ animationDelay: '0.4s' }}>
            <path d="M50 70 Q35 60 25 50" stroke="#729c72" strokeWidth="2" fill="none" />
            <path d="M50 70 Q65 60 75 50" stroke="#729c72" strokeWidth="2" fill="none" />
          </g>

          {/* Leaves - Group 3 */}
          <g className="origin-center animate-gentleSway" style={{ animationDelay: '0.6s' }}>
            <path d="M50 50 Q40 40 30 30" stroke="#729c72" strokeWidth="2" fill="none" />
            <path d="M50 50 Q60 40 70 30" stroke="#729c72" strokeWidth="2" fill="none" />
          </g>
          
           {/* Leaves - Top */}
          <g className="origin-center animate-gentleSway" style={{ animationDelay: '0.8s' }}>
             <path d="M50 30 Q45 20 40 10" stroke="#729c72" strokeWidth="2" fill="none" />
             <path d="M50 30 Q55 20 60 10" stroke="#729c72" strokeWidth="2" fill="none" />
          </g>
        </svg>
      </div>
      
      <h3 className="text-xl font-medium text-sage-800 mb-2 animate-pulse">
        로즈마리를 진단하고 있어요
      </h3>
      <p className="text-sage-500 text-sm">
        잠시만 기다려주세요...
      </p>
    </div>
  );
};