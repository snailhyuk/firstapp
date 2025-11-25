import React, { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { DiagnosisForm } from './components/DiagnosisForm';
import { ResultDisplay } from './components/ResultDisplay';
import { LoadingScreen } from './components/LoadingScreen';
import { analyzeRosemaryHealth } from './services/geminiService';
import { DiagnosisResult } from './types';

const App: React.FC = () => {
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<DiagnosisResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleDiagnosisRequest = async (symptoms: string, imageFile: File) => {
    setLoading(true);
    setError(null);
    setResult(null);

    try {
      const diagnosisData = await analyzeRosemaryHealth(symptoms, imageFile);
      setResult(diagnosisData);
    } catch (err: any) {
      console.error("Diagnosis failed", err);
      setError("진단 중 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setResult(null);
    setError(null);
  };

  return (
    <div className="flex flex-col min-h-screen bg-earth-50 selection:bg-sage-200 selection:text-sage-900">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-2xl">
        
        {loading && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-earth-50/90 backdrop-blur-sm transition-opacity duration-500">
            <LoadingScreen />
          </div>
        )}

        {!loading && !result && (
          <div className="animate-fadeIn">
             <div className="mb-8 text-center">
                <h2 className="text-2xl font-bold text-sage-800 mb-2">당신의 반려 식물을 도와드릴게요</h2>
                <p className="text-stone-600">
                  현재 로즈마리의 모습과 상태를 알려주시면,<br/>
                  AI 식물 의사가 맞춤형 처방을 내려드립니다.
                </p>
             </div>
             <DiagnosisForm onSubmit={handleDiagnosisRequest} />
          </div>
        )}

        {error && (
          <div className="mt-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-700 text-center animate-fadeIn">
            {error}
            <button 
              onClick={() => setError(null)}
              className="block mx-auto mt-2 text-sm underline hover:text-red-800"
            >
              다시 시도하기
            </button>
          </div>
        )}

        {!loading && result && (
          <ResultDisplay result={result} onReset={handleReset} />
        )}

      </main>

      <Footer />
    </div>
  );
};

export default App;