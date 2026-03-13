import { useState } from 'react';
import { Send, Sparkles, ChevronLeft } from 'lucide-react';

export default function LearningScreen() {
  const [showChat, setShowChat] = useState(false);

  if (!showChat) {
    return (
      <div className="h-full flex flex-col bg-neutral-900 relative">
        <div className="px-6 py-4 bg-white border-b border-neutral-100 flex justify-between items-center z-10">
          <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Interactive Learn</h1>
        </div>
        
        <div className="flex-1 relative overflow-hidden flex items-center justify-center bg-neutral-800">
          {/* Car Image - Reliable Car Photo */}
          <img 
            src="https://images.pexels.com/photos/170811/pexels-photo-170811.jpeg?auto=compress&cs=tinysrgb&w=800" 
            alt="Car to learn about" 
            className="w-full h-full object-contain opacity-90 p-4"
            referrerPolicy="no-referrer"
          />
          
          {/* Hotspot Button on the Hood */}
          <button 
            onClick={() => setShowChat(true)}
            className="absolute top-[55%] left-[50%] -translate-x-1/2 -translate-y-1/2 w-12 h-12 bg-orange-500 text-white rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(249,115,22,0.6)] hover:scale-110 transition-transform cursor-pointer group"
          >
            <span className="absolute w-full h-full rounded-full border-2 border-orange-500 animate-ping opacity-75 group-hover:animate-none"></span>
            <span className="font-bold text-2xl relative z-10">?</span>
          </button>

          <div className="absolute bottom-10 left-0 right-0 flex justify-center pointer-events-none">
            <div className="bg-black/60 backdrop-blur-md text-white px-6 py-3 rounded-full font-medium text-sm shadow-lg border border-white/10">
              Tap the <span className="text-orange-400 font-bold">?</span> on the hood to learn
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="h-full flex flex-col bg-white animate-in slide-in-from-right-full duration-300">
      <div className="px-4 py-4 border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-10 flex items-center gap-3">
        <button 
          onClick={() => setShowChat(false)}
          className="p-2 -ml-2 text-neutral-500 hover:text-neutral-900 hover:bg-neutral-100 rounded-full transition-colors"
        >
          <ChevronLeft size={24} />
        </button>
        <div>
          <h1 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
            <Sparkles className="text-orange-500" size={20} />
            Cinder AI
          </h1>
          <p className="text-xs text-neutral-500">Transmission Expert</p>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        <div className="flex flex-col gap-1 items-center justify-center py-8 text-neutral-400">
          <div className="w-12 h-12 bg-orange-50 rounded-full flex items-center justify-center mb-2">
            <Sparkles className="text-orange-500" size={24} />
          </div>
          <p className="text-sm font-medium">Ask me anything about cars!</p>
        </div>

        <div className="flex justify-end">
          <div className="bg-orange-500 text-white px-4 py-3 rounded-2xl rounded-tr-sm max-w-[85%] shadow-sm">
            <p className="text-[15px] leading-relaxed">What does 'CVT Transmission' actually mean for my daily drive?</p>
          </div>
        </div>

        <div className="flex justify-start">
          <div className="bg-neutral-100 text-neutral-800 px-4 py-3 rounded-2xl rounded-tl-sm max-w-[85%] shadow-sm">
            <p className="text-[15px] leading-relaxed">
              Think of it like a single gear that stretches. It makes your ride smoother and saves you more on gas than a traditional automatic! 🚗💨
            </p>
          </div>
        </div>
      </div>

      <div className="p-4 border-t border-neutral-100 bg-white absolute bottom-0 left-0 right-0">
        <div className="relative flex items-center">
          <input
            type="text"
            placeholder="Ask about reliability, costs..."
            className="w-full bg-neutral-100 text-neutral-900 rounded-full pl-4 pr-12 py-3 focus:outline-none focus:ring-2 focus:ring-orange-500/20 text-[15px]"
            readOnly
          />
          <button className="absolute right-2 w-8 h-8 bg-orange-500 rounded-full flex items-center justify-center text-white shadow-sm hover:bg-orange-600 transition-colors">
            <Send size={14} className="ml-0.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
