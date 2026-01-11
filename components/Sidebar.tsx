
import React, { useState } from 'react';
import { 
  LayoutDashboard, Pill, Stethoscope, Settings, FileText, Search, Wind, 
  Dna, Siren, Microscope, Crosshair, Binary, Ambulance, Flame, Skull, 
  HeartPulse, Baby, Brain, Droplet, Droplets, Hammer, Scissors, Eye, 
  Smile, PersonStanding, ShieldPlus, Plane, Apple, Gavel, ShieldCheck, 
  Scale, LineChart, ClipboardCheck, GraduationCap, Radio, ScanEye, 
  CheckSquare, Activity, Zap, FileOutput, MessageCircle, AlertOctagon, 
  BookOpen, GitMerge, LayoutGrid, HeartHandshake, Languages, Trophy, 
  AlertTriangle, Syringe
} from 'lucide-react';
import { AppTab, CategoryType } from '../types';

interface SidebarProps {
  activeTab: AppTab;
  onTabChange: (tab: AppTab) => void;
}

type ToolItem = {
  icon: any;
  label: string;
  id: AppTab;
  desc?: string;
};

export const Sidebar: React.FC<SidebarProps> = ({ activeTab, onTabChange }) => {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('clinical');

  // Define tools per category
  const tools: Record<CategoryType, ToolItem[]> = {
    clinical: [
      { icon: Stethoscope, label: 'التشخيص الذكي', id: 'diagnosis' },
      { icon: Pill, label: 'دليل الأدوية', id: 'drugs' },
      { icon: Siren, label: 'فرز الطوارئ', id: 'triage' },
      { icon: FileText, label: 'الموثق الطبي', id: 'scribe' },
      { icon: Microscope, label: 'المختبر', id: 'lab' },
      { icon: ScanEye, label: 'الأشعة', id: 'radiology' },
      { icon: Radio, label: 'نظام SBAR', id: 'sbar' },
      { icon: GitMerge, label: 'المسارات', id: 'algorithm' },
      { icon: CheckSquare, label: 'الإجراءات', id: 'procedure' },
      { icon: Wind, label: 'العناية المركزة', id: 'ventilator' },
      { icon: Droplet, label: 'السوائل', id: 'fluids' },
      { icon: ShieldCheck, label: 'المضادات', id: 'antibiotic' },
    ],
    specialty: [
      { icon: Scissors, label: 'الجراحة', id: 'surgery' },
      { icon: Baby, label: 'الأطفال', id: 'pediatric' },
      { icon: Baby, label: 'نساء وتوليد', id: 'obgyn' }, // Icon reused, ideally use distinct
      { icon: HeartPulse, label: 'القلب (ECG)', id: 'ecg' },
      { icon: Brain, label: 'الأعصاب', id: 'neuro' },
      { icon: Activity, label: 'الجلدية', id: 'derma' }, // Using Activity as placeholder or keep original icon
      { icon: Brain, label: 'النفسية', id: 'psych' },
      { icon: Hammer, label: 'العظام', id: 'ortho' },
      { icon: Eye, label: 'العيون', id: 'ophtha' },
      { icon: Smile, label: 'الأسنان', id: 'dental' },
      { icon: Ambulance, label: 'الصدمات', id: 'trauma' },
      { icon: Flame, label: 'الحروق', id: 'burn' },
      { icon: Skull, label: 'السموم', id: 'toxicology' },
      { icon: Droplets, label: 'الدم', id: 'heme' },
      { icon: Binary, label: 'الأورام', id: 'onco' },
      { icon: Droplet, label: 'الكلى', id: 'nephro' },
      { icon: Crosshair, label: 'استراتيجية الجراحة', id: 'surg_strategy' },
      { icon: PersonStanding, label: 'التأهيل', id: 'rehab' },
      { icon: ShieldPlus, label: 'اللقاحات', id: 'vax' },
    ],
    academic: [
      { icon: BookOpen, label: 'المكتبة', id: 'library' },
      { icon: Search, label: 'الباحث العلمي', id: 'research' },
      { icon: Scale, label: 'الأدلة (EBM)', id: 'evidence' },
      { icon: Trophy, label: 'اختبر معلوماتك', id: 'quiz' },
      { icon: LineChart, label: 'الإحصاء', id: 'stats' },
      { icon: GraduationCap, label: 'محاكي OSCE', id: 'osce' },
      { icon: Brain, label: 'المجلس الطبي', id: 'board' },
      { icon: Search, label: 'المحقق الطبي', id: 'detective' },
      { icon: Dna, label: 'الجينات', id: 'gene' },
    ],
    utilities: [
      { icon: Languages, label: 'المترجم', id: 'translator' },
      { icon: Zap, label: 'حاسبة المخاطر', id: 'calc' },
      { icon: Apple, label: 'نمط الحياة', id: 'lifestyle' },
      { icon: HeartHandshake, label: 'المبسط', id: 'simplifier' },
      { icon: Scale, label: 'الأخلاقيات', id: 'ethics' },
      { icon: Gavel, label: 'الطب الشرعي', id: 'forensic' },
      { icon: Plane, label: 'طب السفر', id: 'travel' },
      { icon: AlertOctagon, label: 'تحليل M&M', id: 'mnm' },
      { icon: FileOutput, label: 'تقرير العمليات', id: 'op_note' },
    ]
  };

  const categories: { id: CategoryType; label: string; icon: any }[] = [
    { id: 'clinical', label: 'السريري', icon: Activity },
    { id: 'specialty', label: 'التخصصات', icon: Stethoscope },
    { id: 'academic', label: 'الأكاديمي', icon: GraduationCap },
    { id: 'utilities', label: 'الأدوات', icon: LayoutGrid },
  ];

  return (
    <aside className="hidden md:flex flex-col w-20 lg:w-[280px] border-l border-white/5 bg-[#0b1121]/95 backdrop-blur-2xl h-full z-50 transition-all duration-300">
      
      {/* Header & Dashboard Link */}
      <div className="p-4 border-b border-white/5">
        <div className="flex items-center gap-3 mb-6 px-2">
          <div className="w-8 h-8 rounded-xl bg-gradient-to-tr from-sky-500 to-blue-600 flex items-center justify-center shadow-lg shadow-sky-500/20 shrink-0">
              <span className="font-bold text-white text-xs">21</span>
          </div>
          <div className="hidden lg:flex flex-col">
             <span className="text-white font-bold text-lg tracking-tight leading-none">21UMAS</span>
             <span className="text-[10px] text-gray-500 uppercase tracking-widest mt-0.5">Medical OS</span>
          </div>
        </div>

        <button 
          onClick={() => onTabChange('dashboard')}
          className={`w-full flex items-center gap-3 p-3 rounded-xl transition-all duration-200 group ${
            activeTab === 'dashboard'
              ? 'bg-sky-600 text-white shadow-lg shadow-sky-900/20'
              : 'bg-gray-800/50 text-gray-400 hover:bg-gray-800 hover:text-white'
          }`}
        >
          <LayoutDashboard size={20} />
          <span className="hidden lg:block font-bold">لوحة التحكم</span>
        </button>
      </div>

      {/* Category Tabs (Top Switcher) */}
      <div className="flex justify-between px-2 py-3 gap-1 overflow-x-auto scrollbar-none border-b border-white/5">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`flex flex-col items-center justify-center p-2 rounded-lg transition-all flex-1 min-w-[50px] ${
              activeCategory === cat.id
                ? 'bg-white/10 text-sky-400 shadow-inner'
                : 'text-gray-500 hover:text-gray-300 hover:bg-white/5'
            }`}
            title={cat.label}
          >
            <cat.icon size={20} />
            <span className="text-[10px] font-medium mt-1 hidden lg:block">{cat.label}</span>
          </button>
        ))}
      </div>

      {/* Tool List */}
      <nav className="flex-1 overflow-y-auto px-3 py-4 space-y-1 scrollbar-thin scrollbar-thumb-gray-800">
        <div className="lg:px-2 mb-2 text-[10px] font-bold text-gray-500 uppercase tracking-wider flex items-center gap-2">
           <span className="w-1 h-1 rounded-full bg-sky-500"></span>
           <span className="hidden lg:block">أدوات القسم: {categories.find(c => c.id === activeCategory)?.label}</span>
        </div>
        
        {tools[activeCategory].map((item) => {
          const isActive = activeTab === item.id;
          const Icon = item.icon;
          return (
            <button 
              key={item.id}
              onClick={() => onTabChange(item.id)}
              className={`
                w-full flex items-center gap-3 p-2.5 rounded-xl transition-all duration-200 group relative
                ${isActive 
                  ? 'bg-gradient-to-r from-sky-500/10 to-transparent text-sky-400 border-r-2 border-sky-500' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-gray-200'
                }
              `}
              title={item.label}
            >
              <Icon size={18} className={`${isActive ? 'text-sky-400' : 'text-gray-500 group-hover:text-gray-300'} shrink-0`} />
              <span className="hidden lg:block text-sm font-medium whitespace-nowrap overflow-hidden text-ellipsis">{item.label}</span>
            </button>
          );
        })}
      </nav>

      {/* Footer */}
      <div className="p-4 border-t border-white/5 bg-[#0b1121]/50">
        <button className="flex items-center gap-3 w-full p-2 text-gray-400 hover:text-white transition-colors group">
          <Settings size={18} className="group-hover:rotate-90 transition-transform duration-500" />
          <span className="hidden lg:block text-sm">الإعدادات</span>
        </button>
      </div>
    </aside>
  );
};
