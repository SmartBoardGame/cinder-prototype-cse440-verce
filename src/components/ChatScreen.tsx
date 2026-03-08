export default function ChatScreen() {
  return (
    <div className="h-full flex flex-col bg-white">
      <div className="px-6 py-4 border-b border-neutral-100">
        <h1 className="text-2xl font-bold text-neutral-900 tracking-tight">Messages</h1>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center gap-4 p-3 rounded-2xl hover:bg-neutral-50 cursor-pointer transition-colors">
            <div className="w-14 h-14 bg-neutral-200 rounded-full flex-shrink-0 overflow-hidden relative">
              <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt="Seller" className="w-full h-full object-cover grayscale opacity-80" />
              {i === 1 && <div className="absolute top-0 right-0 w-3 h-3 bg-orange-500 border-2 border-white rounded-full"></div>}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex justify-between items-baseline mb-1">
                <h3 className={`font-semibold truncate ${i === 1 ? 'text-neutral-900' : 'text-neutral-700'}`}>Seller {i}</h3>
                <span className={`text-xs ${i === 1 ? 'text-orange-500 font-medium' : 'text-neutral-400'}`}>
                  {i === 1 ? '12:30 PM' : `${i}d ago`}
                </span>
              </div>
              <p className={`text-sm truncate ${i === 1 ? 'text-neutral-800 font-medium' : 'text-neutral-500'}`}>
                {i === 1 ? 'Yes, it has a clean title.' : 'Is the car still available?'}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
