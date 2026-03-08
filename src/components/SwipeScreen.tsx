import { useState } from 'react';
import { motion, useMotionValue, useTransform, AnimatePresence } from 'motion/react';
import { X, Heart, Info } from 'lucide-react';
import { CARS } from '../data/cars';

export default function SwipeScreen() {
  const [cards, setCards] = useState(CARS);
  const [exitDirection, setExitDirection] = useState<'left' | 'right' | null>(null);

  const handleSwipe = (direction: 'left' | 'right') => {
    setExitDirection(direction);
    setCards((prev) => prev.slice(1));
  };

  return (
    <div className="h-full flex flex-col items-center relative px-4 pb-20 pt-4">
      <div className="w-full flex justify-between items-center px-2 mb-6">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Cinder</h1>
        <button className="p-2 bg-white rounded-full shadow-sm text-neutral-600">
          <Info size={20} />
        </button>
      </div>

      <div className="relative w-full flex-1 flex items-center justify-center max-h-[520px]">
        <AnimatePresence custom={exitDirection}>
          {cards.map((car, index) => {
            const isTop = index === 0;
            if (index > 2) return null; // Only render top 3 cards for performance

            return (
              <Card
                key={car.id}
                car={car}
                isTop={isTop}
                index={index}
                onSwipe={handleSwipe}
              />
            );
          }).reverse()}
        </AnimatePresence>
        
        {cards.length === 0 && (
          <div className="text-center text-neutral-500 flex flex-col items-center">
            <div className="w-16 h-16 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <Heart className="text-neutral-300" size={32} />
            </div>
            <p className="font-medium">You've seen all the cars!</p>
            <button 
              onClick={() => setCards(CARS)} 
              className="mt-6 px-6 py-3 bg-orange-500 text-white rounded-full font-semibold shadow-md hover:bg-orange-600 transition-colors"
            >
              Start Over
            </button>
          </div>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center justify-center gap-8 mt-auto mb-4">
        <button
          onClick={() => handleSwipe('left')}
          disabled={cards.length === 0}
          className="w-16 h-16 bg-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center text-red-500 hover:bg-red-50 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          <X size={32} strokeWidth={2.5} />
        </button>
        <button
          onClick={() => handleSwipe('right')}
          disabled={cards.length === 0}
          className="w-16 h-16 bg-white rounded-full shadow-[0_8px_24px_rgba(0,0,0,0.08)] flex items-center justify-center text-green-500 hover:bg-green-50 hover:scale-105 active:scale-95 transition-all disabled:opacity-50 disabled:hover:scale-100"
        >
          <Heart size={32} strokeWidth={2.5} className="fill-current" />
        </button>
      </div>
    </div>
  );
}

const FALLBACK_CARS = [
  'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1502877338535-49af1a49f522?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1511919884226-fd3cad34687c?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1485291571150-772bcfc10da5?auto=format&fit=crop&w=800&q=80',
  'https://images.unsplash.com/photo-1532581140115-3e355d1ed1de?auto=format&fit=crop&w=800&q=80'
];

function Card({ car, isTop, index, onSwipe }: any) {
  const [imgSrc, setImgSrc] = useState(car.image);
  const [fallbackAttempts, setFallbackAttempts] = useState(0);

  const x = useMotionValue(0);
  const rotate = useTransform(x, [-200, 200], [-10, 10]);
  
  const likeOpacity = useTransform(x, [50, 150], [0, 1]);
  const nopeOpacity = useTransform(x, [-50, -150], [0, 1]);

  const handleDragEnd = (event: any, info: any) => {
    if (info.offset.x > 100) {
      onSwipe('right');
    } else if (info.offset.x < -100) {
      onSwipe('left');
    }
  };

  const handleImageError = () => {
    if (fallbackAttempts < FALLBACK_CARS.length) {
      // If the original image fails, try a reliable car placeholder image
      setImgSrc(FALLBACK_CARS[fallbackAttempts]);
      setFallbackAttempts(prev => prev + 1);
    }
  };

  return (
    <motion.div
      style={{
        x,
        rotate,
        zIndex: 10 - index,
      }}
      initial={{ scale: 0.95, opacity: 0, y: 20 }}
      animate={{
        scale: 1 - index * 0.05,
        y: index * 12,
        opacity: 1,
      }}
      exit={(direction) => ({
        x: direction === 'left' ? -500 : direction === 'right' ? 500 : x.get() > 0 ? 500 : -500,
        opacity: 0,
        rotate: direction === 'left' ? -20 : direction === 'right' ? 20 : x.get() > 0 ? 20 : -20,
        transition: { duration: 0.3 }
      })}
      transition={{ duration: 0.2 }}
      drag={isTop ? "x" : false}
      dragConstraints={{ left: 0, right: 0 }}
      onDragEnd={handleDragEnd}
      className="absolute w-full h-full bg-white rounded-[2rem] shadow-xl overflow-hidden cursor-grab active:cursor-grabbing border border-neutral-100 flex flex-col"
    >
      <div className="relative flex-1 bg-neutral-200">
        <img 
          src={imgSrc} 
          onError={handleImageError}
          alt={`${car.make} ${car.model}`} 
          className="w-full h-full object-cover pointer-events-none" 
        />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/80 via-black/40 to-transparent pointer-events-none" />
        
        {/* Like/Nope Overlays */}
        <motion.div 
          style={{ opacity: likeOpacity }}
          className="absolute top-8 left-8 border-4 border-green-500 text-green-500 font-bold text-4xl px-4 py-1 rounded-xl rotate-[-15deg] pointer-events-none"
        >
          LIKE
        </motion.div>
        <motion.div 
          style={{ opacity: nopeOpacity }}
          className="absolute top-8 right-8 border-4 border-red-500 text-red-500 font-bold text-4xl px-4 py-1 rounded-xl rotate-[15deg] pointer-events-none"
        >
          NOPE
        </motion.div>

        <div className="absolute bottom-5 left-5 right-5 text-white pointer-events-none">
          <h2 className="text-3xl font-bold tracking-tight drop-shadow-md">{car.make} {car.model}</h2>
          <p className="text-lg font-medium opacity-90 drop-shadow-md">{car.year}</p>
        </div>
      </div>
      <div className="p-6 bg-white h-[120px] flex flex-col justify-center">
        <p className="text-3xl font-bold text-neutral-900">{car.price}</p>
        <div className="flex gap-2 mt-3">
          <span className="px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold uppercase tracking-wider">Great Deal</span>
          <span className="px-3 py-1 bg-neutral-100 text-neutral-600 rounded-full text-xs font-bold uppercase tracking-wider">Low Miles</span>
        </div>
      </div>
    </motion.div>
  );
}
