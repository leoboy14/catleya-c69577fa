import { useEffect } from 'react';

interface IntroLoaderProps {
  onFinish: () => void;
}

export const IntroLoader = ({ onFinish }: IntroLoaderProps) => {
  useEffect(() => {
    const timer = setTimeout(onFinish, 1800);
    return () => clearTimeout(timer);
  }, [onFinish]);

  return (
    <div className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-green-50 transition-opacity animate-fadein">
      <img
        src="/smile.png"
        alt="Smiling person"
        className="w-28 h-28 mb-6 rounded-full object-cover border-4 border-green-200 animate-bounce"
        style={{ animationDuration: '1.2s' }}
      />
      <h2 className="text-2xl font-bold text-green-800 mb-2 animate-fadein">Helloooo, Kayangyangg</h2>
      <p className="text-green-700 animate-fadein">For Kayangg Job Hunting</p>
    </div>
  );
};

// Animations (add to global CSS if not present):
// .animate-fadein { animation: fadeIn 0.7s; }
// @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } } 