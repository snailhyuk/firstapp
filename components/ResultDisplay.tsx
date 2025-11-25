import React from 'react';
import { DiagnosisResult } from '../types';
import { Stethoscope, Droplets, ArrowRightCircle } from 'lucide-react';

interface ResultDisplayProps {
  result: DiagnosisResult;
  onReset: () => void;
}

export const ResultDisplay: React.FC<ResultDisplayProps> = ({ result, onReset }) => {
  return (
    <div className="space-y-8 animate-fadeIn pb-10">
      
      {/* 1. Diagnosis Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-sage-100 overflow-hidden">
        <div className="bg-sage-100 p-4 border-b border-sage-200 flex items-center gap-3">
          <div className="bg-sage-600 p-2 rounded-full text-white">
            <Stethoscope className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-sage-900 tracking-wider">진단 결과</h3>
        </div>
        
        <div className="p-8">
          <h4 className="text-2xl font-bold text-sage-800 mb-6 border-b border-sage-50 pb-4 tracking-wide">
            {result.diagnosisTitle}
          </h4>
          <p className="text-stone-700 leading-loose text-lg tracking-wide font-medium">
            {result.diagnosisDescription}
          </p>
        </div>
      </section>

      {/* Visual Connector */}
      <div className="flex justify-center -my-2 opacity-50">
        <div className="h-8 w-px bg-sage-300"></div>
      </div>

      {/* 2. Solution Section */}
      <section className="bg-white rounded-2xl shadow-sm border border-earth-200 overflow-hidden ring-4 ring-earth-50">
        <div className="bg-earth-100 p-4 border-b border-earth-200 flex items-center gap-3">
          <div className="bg-earth-500 p-2 rounded-full text-white">
            <Droplets className="w-5 h-5" />
          </div>
          <h3 className="text-lg font-bold text-earth-900 tracking-wider">맞춤 솔루션</h3>
        </div>

        <div className="p-8 bg-earth-50/30">
          <ul className="space-y-6">
            {result.solutions.map((solution, index) => (
              <li 
                key={index} 
                className="flex items-start gap-4 p-4 bg-white rounded-xl border border-earth-100 shadow-sm hover:shadow-md transition-shadow"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <ArrowRightCircle className="w-6 h-6 text-earth-500 flex-shrink-0 mt-1" />
                <span className="text-stone-700 leading-loose tracking-wide text-lg">
                  {solution}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* Action Button */}
      <div className="pt-4 text-center">
        <button
          onClick={onReset}
          className="px-8 py-3 bg-stone-200 text-stone-600 rounded-full font-medium hover:bg-stone-300 transition-colors tracking-widest text-sm"
        >
          다른 로즈마리 진단하기
        </button>
      </div>

    </div>
  );
};