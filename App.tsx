import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Home, Map,
  ArrowRight, Star,
  Sparkles, BookOpen
} from 'lucide-react';
import { AppScreen } from './types';
import GameView from './GameView';
import VocabView from './VocabView';

function MainMenu({ setScreen }: { setScreen: (s: AppScreen) => void }) {
  return (
    <div className="flex flex-col items-center gap-12 sm:gap-20 py-12 sm:py-24 text-center px-4">
      <div className="text-center space-y-6 max-w-3xl relative">
        <div className="flex justify-center gap-4">
           {[...Array(3)].map((_, i) => (
             <motion.div 
               key={i}
               animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1], y: [0, -10, 0] }}
               transition={{ repeat: Infinity, duration: 3, delay: i * 0.5 }}
             >
               <Sparkles className="w-12 h-12 sm:w-16 sm:h-16 text-indigo-500 opacity-60" />
             </motion.div>
           ))}
        </div>
        <div className="space-y-4">
          <h1 className="text-4xl xs:text-5xl sm:text-8xl md:text-9xl font-black text-slate-950 tracking-tighter uppercase italic leading-none">
            ԻՍՊԱՆԵՐԵՆ <br/><span className="text-indigo-600">A1 ԼԵԶՈՒ</span>
          </h1>
          <p className="text-xs sm:text-2xl md:text-3xl font-bold text-indigo-500 uppercase tracking-[0.2em]">
            ԻՆՏԵՐԱԿՏԻՎ ՈՒՍՈՒՑՈՒՄ
          </p>
        </div>
      </div>
      
      <div className="w-full max-w-xl space-y-6">
        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('vocab')}
          className="group relative w-full overflow-hidden bg-white p-8 sm:p-12 rounded-[40px] shadow-2xl border-b-[8px] border-slate-100"
        >
          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-5 transition-opacity" />
          <div className="relative z-10 flex items-center gap-6 text-slate-900 text-left">
            <div className="p-5 bg-indigo-50 rounded-[32px] shadow-inner rotate-3 group-hover:rotate-12 transition-transform">
              <BookOpen className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-500" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-indigo-600 transition-colors">ԲԱՌԱՐԱՆ</h3>
              <p className="text-slate-400 text-sm sm:text-base font-bold italic leading-tight">Սովորիր A1 մակարդակի հիմնական բառերը:</p>
            </div>
            <ArrowRight className="w-8 h-8 opacity-20 group-hover:opacity-100 group-hover:translate-x-2 transition-all hidden sm:block text-indigo-500" />
          </div>
        </motion.button>

        <motion.button
          whileHover={{ scale: 1.05, y: -5 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => setScreen('game')}
          className="group relative w-full overflow-hidden bg-slate-950 p-8 sm:p-12 rounded-[40px] shadow-2xl border-b-[12px] border-slate-950"
        >
          <div className="absolute inset-0 bg-indigo-600 opacity-0 group-hover:opacity-10 transition-opacity" />
          <div className="relative z-10 flex items-center gap-6 text-white text-left">
            <div className="p-5 bg-white/10 rounded-[32px] backdrop-blur-md shadow-inner -rotate-6 group-hover:rotate-6 transition-transform">
              <Star className="w-8 h-8 sm:w-12 sm:h-12 text-indigo-400" />
            </div>
            <div className="space-y-1 flex-1">
              <h3 className="text-2xl sm:text-4xl font-black italic uppercase tracking-tighter leading-tight group-hover:text-indigo-400 transition-colors">ԽԱՂ-ԻՆՔՆԱՍՏՈՒԳՈՒՄ</h3>
              <p className="text-white/70 text-sm sm:text-base font-bold italic leading-tight">Ստուգիր քո գիտելիքները նոր բառերով:</p>
            </div>
            <ArrowRight className="w-8 h-8 opacity-40 group-hover:opacity-100 group-hover:translate-x-4 transition-all hidden sm:block text-indigo-500" />
          </div>
        </motion.button>
      </div>

      <div className="flex gap-6">
        {[Star, Home, Sparkles].map((Icon, i) => (
          <div key={i} className="w-16 h-16 bg-white rounded-3xl shadow-xl flex items-center justify-center border border-slate-100 odd:rotate-12 even:-rotate-12">
             <Icon className="w-8 h-8 text-indigo-500" />
          </div>
        ))}
      </div>
    </div>
  );
}

export default function App() {
  const [screen, setScreen] = useState<AppScreen>('menu');

  return (
    <div className="min-h-screen bg-[#F8FAFC] font-sans selection:bg-indigo-100 selection:text-indigo-600 overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 bg-white/90 backdrop-blur-2xl border border-white/20 shadow-2xl rounded-full px-8 py-5 flex items-center gap-8 sm:gap-12 max-w-[95vw] overflow-x-auto no-scrollbar">
        <NavButton 
          active={screen === 'menu'} 
          icon={<Map />} 
          label="Մենյու" 
          onClick={() => setScreen('menu')} 
        />
        <NavButton 
          active={screen === 'vocab'} 
          icon={<BookOpen />} 
          label="Բառարան" 
          onClick={() => setScreen('vocab')} 
        />
        <NavButton 
          active={screen === 'game'} 
          icon={<Star />} 
          label="Խաղ" 
          onClick={() => setScreen('game')} 
        />
      </nav>

      <main className="relative z-10 w-full min-h-screen">
        <AnimatePresence mode="wait">
          <motion.div
            key={screen}
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ type: 'spring', damping: 30, stiffness: 200 }}
          >
            {screen === 'menu' && <MainMenu setScreen={setScreen} />}
            {screen === 'vocab' && <VocabView onBack={() => setScreen('menu')} onPlay={() => setScreen('game')} />}
            {screen === 'game' && <GameView onBack={() => setScreen('menu')} />}
          </motion.div>
        </AnimatePresence>
      </main>

      {/* Decorative background */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden opacity-50">
        <div className="absolute top-[-15%] left-[-15%] w-[50%] h-[50%] bg-indigo-100 rounded-full blur-[140px]" />
        <div className="absolute bottom-[-15%] right-[-15%] w-[50%] h-[50%] bg-rose-50 rounded-full blur-[140px]" />
      </div>

      <footer className="px-4 py-24 text-center pb-32">
        <p className="text-[10px] font-black text-slate-300 uppercase tracking-[0.5em]">
           &copy; 2026 ԻՍՊԱՆԵՐԵՆԻ ՈՒՍՈՒՑՈՒՄ: A1 ՄԱԿԱՐԴԱԿ
        </p>
      </footer>
    </div>
  );
}

function NavButton({ active, icon, label, onClick }: { active: boolean, icon: any, label: string, onClick: () => void }) {
  return (
    <button 
      onClick={onClick}
      className={`flex flex-col items-center gap-1.5 group transition-all ${active ? 'scale-110' : 'opacity-40 hover:opacity-100'}`}
    >
      <div className={`p-2.5 rounded-2xl transition-colors ${active ? 'bg-indigo-600 text-white shadow-xl shadow-indigo-100' : 'text-slate-600'}`}>
        {React.cloneElement(icon, { size: 20, strokeWidth: 2.5 })}
      </div>
      <span className={`text-[10px] font-black uppercase tracking-[0.2em] ${active ? 'text-indigo-600' : 'text-slate-500'}`}>
        {label}
      </span>
    </button>
  );
}
