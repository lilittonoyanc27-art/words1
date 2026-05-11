import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  Trophy, RotateCcw, 
  Star, CheckCircle2, 
  AlertCircle,
  Gem,
  ArrowLeft
} from 'lucide-react';
import { GAME_WORDS } from './vocabData';

export default function GameView({ onBack }: { onBack: () => void }) {
  const [score, setScore] = useState(0);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [selectedLetters, setSelectedLetters] = useState<number[]>([]);
  const [isCorrect, setIsCorrect] = useState<boolean | null>(null);
  const [gameCompleted, setGameCompleted] = useState(false);

  const gameWords = useMemo(() => {
    return GAME_WORDS.map(w => ({
      ...w,
      cleanSpanish: w.spanish.toLowerCase().replace(/\s+/g, '')
    }));
  }, []);

  const currentWord = gameWords[currentIndex];

  const scrambledLetters = useMemo(() => {
    if (!currentWord) return [];
    const letters = currentWord.cleanSpanish.split('').map((char, originalIndex) => ({
      char: char.toUpperCase(),
      originalIndex
    }));
    
    for (let i = letters.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [letters[i], letters[j]] = [letters[j], letters[i]];
    }
    return letters;
  }, [currentWord]);

  const handleLetterClick = (scrambledIdx: number) => {
    if (isCorrect !== null) return;
    
    if (selectedLetters.includes(scrambledIdx)) {
      setSelectedLetters(prev => prev.filter(idx => idx !== scrambledIdx));
      return;
    }
    
    const newSelected = [...selectedLetters, scrambledIdx];
    setSelectedLetters(newSelected);
    
    if (newSelected.length === currentWord.cleanSpanish.length) {
      const spelled = newSelected.map(idx => scrambledLetters[idx].char).join('').toLowerCase();
      if (spelled === currentWord.cleanSpanish) {
        setIsCorrect(true);
        setScore(prev => prev + 10);
        
        setTimeout(() => {
          nextWord();
        }, 1500);
      } else {
        setIsCorrect(false);
        setTimeout(() => {
          nextWord(); // Move to next word even if incorrect, as requested
        }, 2500);
      }
    }
  };

  const nextWord = () => {
    setIsCorrect(null);
    setSelectedLetters([]);
    
    if (currentIndex < gameWords.length - 1) {
      setCurrentIndex(prev => prev + 1);
    } else {
      setGameCompleted(true);
    }
  };

  const resetGame = () => {
    setScore(0);
    setCurrentIndex(0);
    setSelectedLetters([]);
    setIsCorrect(null);
    setGameCompleted(false);
  };

  if (gameCompleted) {
    return (
      <div className="max-w-2xl mx-auto py-12 px-4 text-center space-y-8">
        <motion.div
           initial={{ scale: 0.8, opacity: 0 }}
           animate={{ scale: 1, opacity: 1 }}
           className="bg-white rounded-[48px] p-8 sm:p-12 shadow-2xl border-4 border-slate-50 space-y-8"
        >
          <Trophy className="w-20 h-20 text-yellow-400 mx-auto" />
          <div className="space-y-2">
            <h2 className="text-4xl font-black text-slate-900 uppercase italic">ԽԱՂՆ ԱՎԱՐՏՎԱԾ Է!</h2>
            <p className="text-xl font-bold text-slate-500">
               Դու հավաքեցիր <span className="text-indigo-600 font-black">{score}</span> միավոր:
            </p>
          </div>

          <div className="flex flex-col gap-3">
            <button 
              onClick={resetGame}
              className="bg-indigo-600 text-white py-4 rounded-2xl font-black italic uppercase text-sm tracking-widest flex items-center justify-center gap-2 hover:bg-indigo-700 transition-all shadow-lg"
            >
              <RotateCcw className="w-4 h-4" /> Նորից խաղալ
            </button>
            <button 
              onClick={onBack}
              className="bg-slate-100 text-slate-500 py-4 rounded-2xl font-black italic uppercase text-sm tracking-widest flex items-center justify-center gap-2 hover:bg-slate-200 transition-all"
            >
              Գլխավոր Մենյու
            </button>
          </div>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto px-4 pb-32 space-y-12 pt-8">
      {/* Header Info */}
      <div className="flex justify-between items-center bg-white p-6 rounded-[32px] shadow-xl border border-slate-50">
         <div className="flex items-center gap-3">
            <div className="p-3 bg-indigo-50 rounded-2xl">
               <Gem className="w-6 h-6 text-indigo-600" />
            </div>
            <div>
               <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Միավորներ</div>
               <div className="text-2xl font-black text-indigo-600">{score}</div>
            </div>
         </div>
         <div className="text-right">
            <div className="text-[10px] font-black text-slate-400 uppercase tracking-widest">Առաջընթաց</div>
            <div className="text-2xl font-black text-slate-900">{currentIndex + 1} / {gameWords.length}</div>
         </div>
      </div>

      {/* Game Area */}
      <motion.div
        key={currentIndex}
        initial={{ y: 20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="bg-white rounded-[40px] sm:rounded-[64px] p-6 sm:p-16 shadow-2xl border-b-8 border-slate-100 text-center space-y-10 relative"
      >
        <div className="space-y-4">
          <div className="inline-flex items-center gap-2 px-6 py-2 rounded-full bg-slate-50 text-slate-500 font-black text-[10px] uppercase tracking-widest border border-slate-100">
             <Star className="w-3 h-3 text-indigo-500" /> Գուշակիր բառը
          </div>
          <h2 className="text-4xl sm:text-7xl font-black text-slate-900 uppercase italic leading-tight">
            {currentWord.armenian}
          </h2>
          <div className="text-7xl sm:text-9xl drop-shadow-lg">{currentWord.emoji}</div>
        </div>

        {/* Answer Slots */}
        <div className="flex flex-wrap justify-center gap-1.5 sm:gap-3 min-h-[50px] sm:min-h-[80px]">
          {Array.from({ length: currentWord.cleanSpanish.length }).map((_, i) => (
            <motion.div
              key={i}
              initial={{ scale: 0.8 }}
              animate={{ 
                scale: 1,
                backgroundColor: isCorrect === true ? '#22c55e' : isCorrect === false ? '#ef4444' : '#f8fafc',
                color: isCorrect !== null ? '#ffffff' : '#0f172a'
              }}
              className="w-10 h-10 sm:w-16 sm:h-16 rounded-xl sm:rounded-2xl border-b-2 sm:border-b-4 border-slate-200 flex items-center justify-center text-xl sm:text-4xl font-black uppercase"
            >
              {selectedLetters[i] !== undefined ? scrambledLetters[selectedLetters[i]].char : ''}
            </motion.div>
          ))}
        </div>

        {/* Scrambled Letters */}
        <div className="flex flex-wrap justify-center gap-2 sm:gap-4 pt-4">
           {scrambledLetters.map((letter, i) => (
             <motion.button
               key={i}
               whileHover={{ scale: 1.1, y: -5 }}
               whileTap={{ scale: 0.9 }}
               onClick={() => handleLetterClick(i)}
               disabled={selectedLetters.includes(i) || isCorrect !== null}
               className={`
                 w-14 h-14 sm:w-24 sm:h-24 rounded-2xl sm:rounded-[36px] font-black text-2xl sm:text-5xl shadow-md transition-all
                 ${selectedLetters.includes(i) 
                   ? 'bg-slate-100 text-slate-200 cursor-not-allowed scale-90 border-transparent' 
                   : 'bg-white text-slate-900 border-b-4 border-slate-100 hover:border-indigo-400'
                 }
               `}
             >
               {letter.char}
             </motion.button>
           ))}
        </div>

        <div className="h-10">
          <AnimatePresence>
            {isCorrect === true && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="text-green-500 font-black uppercase tracking-widest text-sm flex items-center justify-center gap-2"
              >
                <CheckCircle2 className="w-5 h-5" /> ՃԻՇՏ Է! +10 ՄԻԱՎՈՐ
              </motion.div>
            )}
            {isCorrect === false && (
              <motion.div 
                initial={{ opacity: 0, scale: 0.5 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-1"
              >
                <div className="text-red-500 font-black uppercase tracking-widest text-xs flex items-center justify-center gap-2">
                  <AlertCircle className="w-4 h-4" /> ՍԽԱԼ Է!
                </div>
                <div className="text-indigo-600 font-black uppercase text-base italic">
                  ՃԻՇՏ Է՝ {currentWord.cleanSpanish.toUpperCase()}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.div>
    </div>
  );
}
