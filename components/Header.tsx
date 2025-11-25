import React from 'react';
import { Leaf } from 'lucide-react';

export const Header: React.FC = () => {
  return (
    <header className="py-6 px-4 flex justify-center items-center border-b border-sage-100 bg-white/50 backdrop-blur-sm sticky top-0 z-10">
      <div className="flex items-center gap-2 text-sage-700">
        <Leaf className="w-6 h-6" />
        <h1 className="text-xl font-bold tracking-widest text-sage-800">로즈마리를 부탁해</h1>
      </div>
    </header>
  );
};