import { Send, Sparkles } from 'lucide-react';

export default function LearningScreen() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-4 border-b border-neutral-100 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <h1 className="text-xl font-bold text-neutral-900 flex items-center gap-2">
          <Sparkles className="text-orange-500" size={20} />
          Cinder AI
        </h1>
        <p className="text-sm text-neutral-500">Your personal car expert</p>
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
