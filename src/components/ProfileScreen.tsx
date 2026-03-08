import { useState } from 'react';
import { Menu, X, ChevronRight, Heart } from 'lucide-react';
import { CARS } from '../data/cars';

export default function ProfileScreen() {
  const [showSavedCars, setShowSavedCars] = useState(false);
  const [showDropdown, setShowDropdown] = useState(false);

  const FALLBACK_CARS = [
    'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80',
    'https://images.unsplash.com/photo-1502877338535-49af1a49f522?auto=format&fit=crop&w=800&q=80'
  ];

  return (
    <div className="h-full flex flex-col bg-neutral-50 relative">
      <div className="px-6 py-4 bg-white border-b border-neutral-100 flex justify-between items-center relative">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Profile & Filters</h1>
        <button onClick={() => setShowDropdown(!showDropdown)} className="text-neutral-400 hover:text-neutral-900 transition-colors">
          <Menu size={24} />
        </button>
        
        {/* Dropdown Menu */}
        {showDropdown && (
          <div className="absolute top-16 right-6 w-48 bg-white rounded-2xl shadow-lg border border-neutral-100 overflow-hidden z-20">
            <button 
              onClick={() => { setShowSavedCars(true); setShowDropdown(false); }}
              className="w-full text-left px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 border-b border-neutral-50"
            >
              Saved Cars
            </button>
            <button 
              onClick={() => setShowDropdown(false)}
              className="w-full text-left px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50 border-b border-neutral-50"
            >
              Help
            </button>
            <button 
              onClick={() => setShowDropdown(false)}
              className="w-full text-left px-4 py-3 text-sm font-medium text-neutral-700 hover:bg-neutral-50"
            >
              About
            </button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-6 pb-24">
        <div className="bg-white rounded-3xl p-5 shadow-sm border border-neutral-100">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-16 h-16 bg-orange-100 rounded-full flex items-center justify-center text-orange-500 font-bold text-xl">
              JD
            </div>
            <div>
              <h2 className="font-bold text-lg text-neutral-900">John Doe</h2>
              <p className="text-sm text-neutral-500">Looking for a daily driver</p>
            </div>
          </div>

          <div className="space-y-5">
            <h3 className="font-semibold text-neutral-900 text-sm uppercase tracking-wider">Preferences</h3>

            <div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-neutral-600">Price Range</span>
                <span className="font-medium text-neutral-900">$15k - $35k</span>
              </div>
              <div className="h-2 bg-neutral-100 rounded-full overflow-hidden">
                <div className="h-full bg-orange-500 w-1/2 ml-[20%] rounded-full"></div>
              </div>
            </div>

            <div className="pt-2">
              <span className="text-neutral-600 text-sm block mb-3">Body Style</span>
              <div className="flex flex-wrap gap-2">
                {['SUV', 'Sedan', 'Coupe', 'Truck'].map((style, i) => (
                  <span key={style} className={`px-4 py-2 rounded-full text-sm font-medium ${i < 2 ? 'bg-orange-500 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600'}`}>
                    {style}
                  </span>
                ))}
              </div>
            </div>
            
            <div className="pt-2">
              <span className="text-neutral-600 text-sm block mb-3">Fuel Type</span>
              <div className="flex flex-wrap gap-2">
                {['Gas', 'Hybrid', 'Electric'].map((style, i) => (
                  <span key={style} className={`px-4 py-2 rounded-full text-sm font-medium ${i === 1 ? 'bg-orange-500 text-white shadow-sm' : 'bg-neutral-100 text-neutral-600'}`}>
                    {style}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-3xl shadow-sm border border-neutral-100 overflow-hidden">
          {['Saved Cars', 'My Garage', 'Account Settings'].map((item, i) => (
            <div 
              key={item} 
              onClick={() => i === 0 && setShowSavedCars(true)}
              className={`flex items-center justify-between p-4 cursor-pointer hover:bg-neutral-50 ${i !== 2 ? 'border-b border-neutral-100' : ''}`}
            >
              <span className="font-medium text-neutral-700">{item}</span>
              <ChevronRight size={20} className="text-neutral-400" />
            </div>
          ))}
        </div>
      </div>

      {/* Saved Cars Overlay */}
      {showSavedCars && (
        <div className="absolute inset-0 bg-neutral-50 z-50 flex flex-col animate-in slide-in-from-right-full duration-300">
          <div className="px-6 py-4 bg-white border-b border-neutral-100 flex justify-between items-center sticky top-0 z-10">
            <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Saved Cars</h1>
            <button onClick={() => setShowSavedCars(false)} className="text-neutral-400 hover:text-neutral-900 transition-colors">
              <X size={24} />
            </button>
          </div>
          <div className="flex-1 overflow-y-auto p-4 space-y-4 pb-24">
            {CARS.slice(1, 4).map((car) => (
              <div key={car.id} className="flex gap-4 bg-white p-3 rounded-2xl shadow-sm border border-neutral-100">
                <img 
                  src={car.image} 
                  alt={car.model} 
                  className="w-24 h-24 object-cover rounded-xl"
                  onError={(e) => {
                    (e.target as HTMLImageElement).src = FALLBACK_CARS[car.id % FALLBACK_CARS.length];
                  }}
                />
                <div className="flex-1 flex flex-col justify-center">
                  <h3 className="font-bold text-neutral-900">{car.make} {car.model}</h3>
                  <p className="text-sm text-neutral-500">{car.year}</p>
                  <p className="font-semibold text-orange-500 mt-1">{car.price}</p>
                </div>
                <button className="self-center p-2 text-red-500 hover:bg-red-50 rounded-full transition-colors">
                  <Heart size={20} className="fill-current" />
                </button>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
