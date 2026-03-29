import { useState, useEffect } from 'react';

const PlayerSide = ({ name, score, innings, isYellow, onScoreUpdate, onNameUpdate }) => {
  const average = innings > 0 ? (score / innings).toFixed(3) : "0.000";

  return (
    <div className={`relative flex-1 flex flex-col items-center pt-8 pb-10 ${isYellow ? 'bg-yellow-400' : 'bg-white'}`}>
      <div className="w-11/12 max-w-sm mb-4">
        <input 
          type="text" 
          value={name}
          onChange={(e) => onNameUpdate(e.target.value)}
          className={`w-full text-center text-3xl font-semibold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-black/20 ${isYellow ? 'bg-yellow-300 text-black' : 'bg-gray-100 text-black'}`}
        />
      </div>

      <div 
        className="flex-grow flex items-center justify-center cursor-pointer select-none active:scale-95 transition-transform"
        onClick={() => onScoreUpdate(1)}
      >
        <div className="text-[25vh] leading-none font-bold tabular-nums tracking-tighter text-black">
          {score}
        </div>
      </div>

      <div className="flex flex-col items-center gap-6 mt-auto">
        <div className="bg-white/90 px-4 py-1 rounded border border-gray-300 shadow-sm text-2xl font-mono">
          {average}
        </div>
        
        <button 
          onClick={() => onScoreUpdate(-1)}
          className="w-16 h-12 bg-gray-400 rounded-xl flex items-center justify-center text-white active:bg-gray-500 transition-colors shadow-sm"
          aria-label="Decrement Score"
        >
          <div className="w-6 h-1 bg-white rounded-full"></div>
        </button>
      </div>
    </div>
  );
};

export default function Scoreboard() {
  const [innings, setInnings] = useState(0);
  const [playerA, setPlayerA] = useState({ name: 'Jugador A', score: 0 });
  const [playerB, setPlayerB] = useState({ name: 'Jugador B', score: 0 });
  const [isAboutOpen, setIsAboutOpen] = useState(false);

  // Force landscape mode using Screen Orientation API if available on mobile
  useEffect(() => {
    const lockLandscape = async () => {
      if (typeof screen !== 'undefined' && screen.orientation && screen.orientation.lock) {
        try {
          await screen.orientation.lock('landscape');
        } catch (e) {
          console.log("Orientation lock not supported or failed", e);
        }
      }
    };
    lockLandscape();
  }, []);

  return (
    <div className="flex w-screen h-screen overflow-hidden font-sans pt-safe pb-safe pl-safe pr-safe">
      <PlayerSide 
        name={playerA.name} 
        score={playerA.score} 
        innings={innings} 
        isYellow={false}
        onNameUpdate={(name) => setPlayerA({...playerA, name})}
        onScoreUpdate={(delta) => setPlayerA({...playerA, score: Math.max(0, playerA.score + delta)})}
      />

      <PlayerSide 
        name={playerB.name} 
        score={playerB.score} 
        innings={innings} 
        isYellow={true}
        onNameUpdate={(name) => setPlayerB({...playerB, name})}
        onScoreUpdate={(delta) => setPlayerB({...playerB, score: Math.max(0, playerB.score + delta)})}
      />

      {/* Innings Overlay Counter */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 bg-gray-200 rounded-b-3xl shadow-xl flex flex-col items-center py-4 px-6 z-10">
        <span className="text-xl font-medium tracking-widest text-gray-800 mb-1">ENTRADAS</span>
        <button 
          className="text-8xl font-bold mb-4 cursor-pointer active:scale-95 transition-transform select-none"
          onClick={() => setInnings(i => i + 1)}
        >
          {innings}
        </button>
        <button 
          onClick={() => setInnings(i => Math.max(0, i - 1))}
          className="w-16 h-12 bg-gray-400 rounded-xl flex items-center justify-center text-white active:bg-gray-500 transition-colors"
          aria-label="Decrement Innings"
        >
          <div className="w-6 h-1 bg-white rounded-full"></div>
        </button>
      </div>

      {/* Reset Button */}
      <button 
        className="absolute bottom-10 left-1/2 -translate-x-1/2 p-3 text-gray-400 active:text-gray-600 transition-colors z-10"
        onClick={() => {
          if(confirm('¿Reiniciar partida?')) {
            setInnings(0);
            setPlayerA({...playerA, score: 0});
            setPlayerB({...playerB, score: 0});
          }
        }}
        aria-label="Reset Match"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M3 12a9 9 0 1 0 9-9 9.75 9.75 0 0 0-6.74 2.74L3 8"/>
          <path d="M3 3v5h5"/>
        </svg>
      </button>

      {/* About Button */}
      <button 
        className="absolute bottom-6 right-6 p-2 text-gray-500 hover:text-gray-800 active:scale-95 transition-all z-10"
        onClick={() => setIsAboutOpen(true)}
        aria-label="Acerca de"
      >
        <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
      </button>

      {/* About Modal */}
      {isAboutOpen && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4 backdrop-blur-sm" onClick={() => setIsAboutOpen(false)}>
          <div 
            className="bg-white rounded-2xl p-8 max-w-sm w-full shadow-2xl relative text-center"
            onClick={e => e.stopPropagation()}
          >
            <button 
              className="absolute top-4 right-4 text-gray-400 hover:text-gray-700 p-1"
              onClick={() => setIsAboutOpen(false)}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>
            
            <div className="w-48 mx-auto mb-6 flex justify-center drop-shadow-md">
              <img 
                src="/pauloconde.webp" 
                alt="Logo Paulo Conde" 
                className="w-full h-auto object-contain"
                onError={(e) => { e.target.style.display = 'none'; }}
              />
            </div>
            
            <p className="text-gray-700 font-medium leading-tight mb-2">
              Marcador digital para billar desarrollado por Paulo Conde
            </p>
            <p className="text-gray-400 font-mono text-sm mb-6">Versión 1.3.0</p>
            
            <div className="flex flex-col gap-3 font-medium">
              <a 
                href="https://pauloconde.dev" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
                pauloconde.dev
              </a>
              <a 
                href="https://github.com/pauloconde" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-gray-900 hover:bg-black text-white py-3 px-4 rounded-xl transition-colors flex items-center justify-center gap-2"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"></path></svg>
                github.com/pauloconde
              </a>
            </div>
            
            <p className="text-sm text-gray-400 mt-6 mt-8">
              Billiard Scoreboard PWA
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
