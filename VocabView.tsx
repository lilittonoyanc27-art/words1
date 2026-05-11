import React from 'react';
import { motion } from 'motion/react';
import { 
  BookOpen, Home, ArrowLeft,
  Sparkles, Search
} from 'lucide-react';
import { A1_VOCAB } from './vocabData';

export default function VocabView({ onBack, onPlay }: { onBack: () => void, onPlay: () => void }) {
  return (
    <div className="max-w-4xl mx-auto px-4 pb-32 pt-8 space-y-12">
      {/* Header */}
      <section className="text-center space-y-4">
        <div className="inline-flex p-3 bg-indigo-100 rounded-2xl shadow-inner">
           <BookOpen className="w-8 h-8 text-indigo-600" />
        </div>
        <h2 className="text-4xl sm:text-6xl font-black text-slate-900 uppercase italic tracking-tighter">
          A1 ԲԱՌԱՐԱՆ
        </h2>
        <p className="text-slate-500 font-bold italic max-w-xl mx-auto">
          Հիմնական իսպաներեն բառեր A1 մակարդակի համար:
        </p>
      </section>

      {/* Word Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {A1_VOCAB.map((word, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: i * 0.03 }}
            className="group bg-white p-6 rounded-[32px] border-b-4 border-slate-100 shadow-xl hover:shadow-2xl transition-all text-center space-y-3"
          >
            <div className="text-4xl group-hover:scale-125 transition-transform drop-shadow-sm">
              {word.emoji}
            </div>
            <div className="space-y-0.5">
              <p className="text-lg font-black italic text-slate-900 group-hover:text-indigo-600 transition-colors uppercase leading-tight">
                {word.spanish}
              </p>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest leading-tight">
                {word.armenian}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* CTA Section */}
      <section className="bg-indigo-600 rounded-[48px] p-8 sm:p-12 text-white text-center space-y-8 shadow-2xl relative overflow-hidden">
        <div className="absolute top-0 right-0 p-8 opacity-10">
           <Sparkles className="w-32 h-32 rotate-12" />
        </div>
        <div className="relative z-10 space-y-4">
          <h3 className="text-3xl sm:text-5xl font-black italic uppercase tracking-tighter">Պատրա՞ստ ես</h3>
          <p className="text-indigo-100 font-bold opacity-80 italic">Սկսիր մրցույթը և ստուգիր քո գիտելիքները:</p>
        </div>
        <div className="relative z-10 flex flex-col sm:flex-row gap-4 justify-center">
          <button 
            onClick={onPlay}
            className="bg-white text-indigo-600 px-10 py-5 rounded-2xl font-black italic uppercase tracking-widest hover:scale-105 active:scale-95 transition-all shadow-xl"
          >
            ՍԿՍԵԼ ՄՐՑՈՒՅԹԸ
          </button>
          <button 
            onClick={onBack}
            className="bg-indigo-500/30 backdrop-blur-md text-white border border-indigo-400 px-10 py-5 rounded-2xl font-black italic uppercase tracking-widest hover:bg-indigo-500/50 transition-all flex items-center justify-center gap-2"
          >
            <ArrowLeft className="w-5 h-5" /> ՀԵՏ
          </button>
        </div>
      </section>
    </div>
  );
}
