
import React, { useState } from 'react';
import { ModelMode } from '../types';
import { Zap, BrainCircuit, ChevronDown, Cpu, Sparkles, Feather } from 'lucide-react';

interface ModelSelectorProps {
  currentMode: ModelMode;
  onModeChange: (mode: ModelMode) => void;
  disabled: boolean;
}

export const ModelSelector: React.FC<ModelSelectorProps> = ({ currentMode, onModeChange, disabled }) => {
  const [isOpen, setIsOpen] = useState(false);

  const models = [
    { id: 'gemini-3-pro-preview', label: 'Gemini 3.0 Pro', icon: BrainCircuit, color: 'text-purple-400', desc: 'Reasoning' },
    { id: 'gemini-2.5-pro', label: 'Gemini 2.5 Pro', icon: BrainCircuit, color: 'text-indigo-400', desc: 'Advanced' },
    { id: 'gemini-3-flash-preview', label: 'Gemini 3.0 Flash', icon: Zap, color: 'text-amber-400', desc: 'Fast & Smart' },
    { id: 'gemini-2.5-flash', label: 'Gemini 2.5 Flash', icon: Zap, color: 'text-yellow-400', desc: 'Balanced' },
    { id: 'gemini-flash-latest', label: 'Gemini Flash 1.5/2', icon: Sparkles, color: 'text-cyan-400', desc: 'Production' },
    { id: 'gemini-2.0-flash', label: 'Gemini 2.0 Flash', icon: Cpu, color: 'text-blue-400', desc: 'Legacy' },
    { id: 'gemini-flash-lite-latest', label: 'Flash Lite', icon: Feather, color: 'text-emerald-400', desc: 'Lightweight' },
    { id: 'gemini-2.5-flash-lite', label: 'Flash Lite 2.5', icon: Feather, color: 'text-green-400', desc: 'Economy' },
  ];

  const currentModel = models.find(m => m.id === currentMode) || models[0];

  return (
    <div className="relative">
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className="flex items-center gap-2 bg-[#0f172a] border border-gray-700 hover:border-gray-600 px-3 py-2 rounded-xl text-xs font-medium transition-all duration-200 min-w-[160px] justify-between group"
      >
        <div className="flex items-center gap-2">
          <currentModel.icon size={14} className={currentModel.color} />
          <div className="flex flex-col items-start leading-none gap-0.5">
             <span className="text-gray-200">{currentModel.label}</span>
             <span className="text-[9px] text-gray-500 font-normal tracking-wide">{currentModel.desc}</span>
          </div>
        </div>
        <ChevronDown size={12} className={`text-gray-500 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          <div className="fixed inset-0 z-40" onClick={() => setIsOpen(false)} />
          <div className="absolute top-full left-0 mt-2 w-64 bg-[#0f172a] border border-gray-700 rounded-xl shadow-2xl z-50 overflow-hidden animate-in fade-in zoom-in-95 duration-100">
            <div className="py-1 max-h-[300px] overflow-y-auto scrollbar-thin scrollbar-thumb-gray-800">
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-gray-900/50">
                High Reasoning (Pro)
              </div>
              {models.filter(m => m.id.includes('pro')).map((model) => (
                <ModelOption key={model.id} model={model} current={currentMode} onSelect={(m) => { onModeChange(m as ModelMode); setIsOpen(false); }} />
              ))}
              
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-gray-900/50 mt-1">
                High Speed (Flash)
              </div>
              {models.filter(m => m.id.includes('flash') && !m.id.includes('lite')).map((model) => (
                <ModelOption key={model.id} model={model} current={currentMode} onSelect={(m) => { onModeChange(m as ModelMode); setIsOpen(false); }} />
              ))}

              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-gray-500 tracking-wider bg-gray-900/50 mt-1">
                Lightweight (Lite)
              </div>
              {models.filter(m => m.id.includes('lite')).map((model) => (
                <ModelOption key={model.id} model={model} current={currentMode} onSelect={(m) => { onModeChange(m as ModelMode); setIsOpen(false); }} />
              ))}
            </div>
          </div>
        </>
      )}
    </div>
  );
};

const ModelOption = ({ model, current, onSelect }: any) => (
  <button
    onClick={() => onSelect(model.id)}
    className={`w-full flex items-center gap-3 px-3 py-2.5 text-left transition-colors hover:bg-white/5 ${
      current === model.id ? 'bg-sky-500/10 border-l-2 border-sky-500' : 'border-l-2 border-transparent'
    }`}
  >
    <model.icon size={16} className={model.color} />
    <div className="flex flex-col">
       <span className={`text-sm ${current === model.id ? 'text-white font-bold' : 'text-gray-300'}`}>{model.label}</span>
       <span className="text-[10px] text-gray-500">{model.id}</span>
    </div>
  </button>
);
