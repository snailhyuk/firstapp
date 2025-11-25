import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="py-6 mt-8 text-center text-stone-400 text-xs tracking-wider">
      <p>&copy; {new Date().getFullYear()} Lichen Studio. All rights reserved.</p>
    </footer>
  );
};