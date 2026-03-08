import { useState } from 'react';
import { Car, MessageCircle, Lightbulb, User } from 'lucide-react';
import SwipeScreen from './components/SwipeScreen';
import ChatScreen from './components/ChatScreen';
import LearningScreen from './components/LearningScreen';
import ProfileScreen from './components/ProfileScreen';

export default function App() {
  const [activeTab, setActiveTab] = useState('swipe');

  return (
    <div className="min-h-screen bg-neutral-900 flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-[375px] h-[812px] bg-white rounded-[3rem] shadow-2xl overflow-hidden relative border-[8px] border-neutral-800 flex flex-col">
        {/* Status Bar Mock */}
        <div className="h-12 w-full flex items-center justify-between px-6 pt-2 pb-1 bg-transparent absolute top-0 z-50 pointer-events-none">
          <span className="text-sm font-semibold text-neutral-800">9:41</span>
          <div className="flex gap-1.5 items-center">
            <div className="w-4 h-3 bg-neutral-800 rounded-sm"></div>
            <div className="w-4 h-3 bg-neutral-800 rounded-sm"></div>
            <div className="w-6 h-3 bg-neutral-800 rounded-sm"></div>
          </div>
        </div>

        {/* Content Area */}
        <div className="flex-1 overflow-hidden relative bg-neutral-50 pt-12">
          {activeTab === 'swipe' && <SwipeScreen />}
          {activeTab === 'chat' && <ChatScreen />}
          {activeTab === 'learning' && <LearningScreen />}
          {activeTab === 'profile' && <ProfileScreen />}
        </div>

        {/* Bottom Navigation */}
        <div className="absolute bottom-0 left-0 right-0 h-20 bg-white/90 backdrop-blur-md border-t border-neutral-100 flex items-center justify-around px-4 pb-6 pt-2 z-40">
          <NavItem icon={<Car />} label="Garage" isActive={activeTab === 'swipe'} onClick={() => setActiveTab('swipe')} />
          <NavItem icon={<MessageCircle />} label="Messages" isActive={activeTab === 'chat'} onClick={() => setActiveTab('chat')} />
          <NavItem icon={<Lightbulb />} label="Learn" isActive={activeTab === 'learning'} onClick={() => setActiveTab('learning')} />
          <NavItem icon={<User />} label="Profile" isActive={activeTab === 'profile'} onClick={() => setActiveTab('profile')} />
        </div>
      </div>
    </div>
  );
}

function NavItem({ icon, label, isActive, onClick }: any) {
  return (
    <button
      onClick={onClick}
      className={`flex flex-col items-center justify-center w-16 gap-1 transition-colors ${
        isActive ? 'text-orange-500' : 'text-neutral-400 hover:text-neutral-600'
      }`}
    >
      <div className={`[&>svg]:w-6 [&>svg]:h-6 transition-transform ${isActive ? 'scale-110' : ''}`}>
        {icon}
      </div>
      <span className="text-[10px] font-medium">{label}</span>
    </button>
  );
}
