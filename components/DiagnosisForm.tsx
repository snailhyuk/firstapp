import React, { useState, useRef } from 'react';
import { Camera, Upload, X } from 'lucide-react';

interface DiagnosisFormProps {
  onSubmit: (symptoms: string, imageFile: File) => void;
}

export const DiagnosisForm: React.FC<DiagnosisFormProps> = ({ onSubmit }) => {
  const [symptoms, setSymptoms] = useState('');
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files && event.target.files[0]) {
      const file = event.target.files[0];
      setSelectedFile(file);
      const url = URL.createObjectURL(file);
      setPreviewUrl(url);
    }
  };

  const handleClearFile = () => {
    setSelectedFile(null);
    setPreviewUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (symptoms && selectedFile) {
      onSubmit(symptoms, selectedFile);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-6 rounded-2xl shadow-sm border border-sage-100">
      
      {/* Symptom Input */}
      <div>
        <label htmlFor="symptoms" className="block text-sm font-semibold text-sage-800 mb-2 tracking-wide">
          상태 및 증상 기록
        </label>
        <textarea
          id="symptoms"
          rows={4}
          className="w-full p-4 rounded-xl bg-sage-50 border border-sage-200 focus:ring-2 focus:ring-sage-400 focus:border-sage-400 outline-none transition-all resize-none text-stone-700 placeholder-sage-300 leading-relaxed"
          placeholder="예: 잎이 갈색으로 변하고 끝이 말라가요. 최근에 물을 많이 주긴 했어요."
          value={symptoms}
          onChange={(e) => setSymptoms(e.target.value)}
          required
        />
      </div>

      {/* Image Upload */}
      <div>
        <label className="block text-sm font-semibold text-sage-800 mb-2 tracking-wide">
          로즈마리 사진 업로드
        </label>
        
        {!previewUrl ? (
          <div 
            onClick={() => fileInputRef.current?.click()}
            className="border-2 border-dashed border-sage-200 rounded-xl p-8 flex flex-col items-center justify-center cursor-pointer hover:bg-sage-50 transition-colors group h-48"
          >
            <Camera className="w-10 h-10 text-sage-300 group-hover:text-sage-500 mb-2 transition-colors" />
            <span className="text-sage-400 text-sm group-hover:text-sage-600 font-medium">
              사진을 선택하거나 찍어서 올려주세요
            </span>
            <input 
              type="file" 
              ref={fileInputRef}
              onChange={handleFileChange} 
              accept="image/*" 
              className="hidden" 
              required
            />
          </div>
        ) : (
          <div className="relative rounded-xl overflow-hidden border border-sage-200 h-64 bg-stone-100">
            <img src={previewUrl} alt="Preview" className="w-full h-full object-cover" />
            <button
              type="button"
              onClick={handleClearFile}
              className="absolute top-2 right-2 bg-black/50 text-white p-1.5 rounded-full hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>

      {/* Submit Button */}
      <button
        type="submit"
        disabled={!symptoms || !selectedFile}
        className={`w-full py-4 rounded-xl font-bold text-lg tracking-widest shadow-md transition-all transform hover:-translate-y-0.5 active:translate-y-0
          ${(!symptoms || !selectedFile) 
            ? 'bg-stone-300 text-stone-500 cursor-not-allowed' 
            : 'bg-sage-600 text-white hover:bg-sage-700 hover:shadow-lg'
          }`}
      >
        로즈마리 상태 진단하기
      </button>
    </form>
  );
};