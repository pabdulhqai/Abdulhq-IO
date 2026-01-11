
import React, { useState, useEffect } from 'react';
import { AppTab } from '../types';
import { 
  Search, Stethoscope, Brain, GraduationCap, LayoutGrid, ArrowLeft, 
  Clock, Activity, Sparkles, ChevronRight, Zap, Command, Menu
} from 'lucide-react';

interface WelcomeProps {
  onNavigate: (tab: AppTab) => void;
}

export const Welcome: React.FC<WelcomeProps> = ({ onNavigate }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 5) setGreeting('تصبح على خير');
    else if (hour < 12) setGreeting('صباح الخير');
    else if (hour < 18) setGreeting('مساء الخير');
    else setGreeting('مساء الخير');
  }, []);

  // Simplified tool mapping for search
  const allTools = [
    { id: 'diagnosis', label: 'التشخيص الذكي', cat: 'clinical' },
    { id: 'drugs', label: 'دليل الأدوية', cat: 'clinical' },
    { id: 'surgery', label: 'الجراحة', cat: 'specialty' },
    { id: 'pediatric', label: 'طب الأطفال', cat: 'specialty' },
    { id: 'research', label: 'الباحث العلمي', cat: 'academic' },
    { id: 'translator', label: 'المترجم الطبي', cat: 'utilities' },
    { id: 'triage', label: 'فرز الطوارئ', cat: 'clinical' },
    { id: 'ecg', label: 'تخطيط القلب', cat: 'specialty' },
  ];

  const filteredTools = searchQuery 
    ? allTools.filter(t => t.label.includes(searchQuery))
    : [];

  const navigateToCategory = (tabId: AppTab) => {
    onNavigate(tabId);
  };

  return (
    <div className="flex flex-col h-full overflow-y-auto scrollbar-none pb-32">
      
      {/* Hero Section */}
      <div className="relative w-full bg-gradient-to-b from-sky-900/20 to-transparent pt-12 pb-8 px-6 md:px-12 text-center md:text-right border-b border-white/5">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
           <div className="text-center md:text-right w-full md:w-auto animate-fade-up">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-sky-500/10 border border-sky-500/20 text-sky-400 text-xs font-bold mb-3 mx-auto md:mx-0">
                 <Sparkles size={12} />
                 <span>Medical OS v2.1</span>
              </div>
              <h1 className="text-4xl md:text-6xl font-bold text-white mb-2 tracking-tight">
                {greeting}، دكتور.
              </h1>
              <p className="text-gray-400 text-lg md:text-xl leading-relaxed max-w-lg">
                نظامك الطبي المتكامل للتشخيص، التعليم، وإدارة الرعاية الصحية.
              </p>
           </div>
           
           {/* Quick Status Widgets (Desktop Only) */}
           <div className="hidden md:flex gap-4 animate-fade-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-[#1e293b]/50 border border-gray-700 p-4 rounded-2xl w-32 text-center backdrop-blur-sm">
                 <Clock className="mx-auto text-emerald-400 mb-2" size={24} />
                 <div className="text-2xl font-bold text-white">0</div>
                 <div className="text-xs text-gray-500">مهام معلقة</div>
              </div>
              <div className="bg-[#1e293b]/50 border border-gray-700 p-4 rounded-2xl w-32 text-center backdrop-blur-sm">
                 <Activity className="mx-auto text-sky-400 mb-2" size={24} />
                 <div className="text-2xl font-bold text-white">100%</div>
                 <div className="text-xs text-gray-500">حالة النظام</div>
              </div>
           </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto w-full px-4 md:px-12 mt-8 space-y-10">
        
        {/* Universal Search */}
        <div className="relative group z-20 animate-fade-up" style={{ animationDelay: '0.2s' }}>
          <div className="absolute inset-0 bg-gradient-to-r from-sky-500/20 to-indigo-500/20 rounded-2xl blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
          <div className="relative bg-[#1e293b] border border-gray-700 rounded-2xl flex items-center p-4 shadow-xl focus-within:ring-2 focus-within:ring-sky-500/50 transition-all">
            <Search className="text-gray-400 mr-2 shrink-0" size={24} />
            <input 
              type="text" 
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="ابحث عن أداة، مرض، أو دواء..." 
              className="bg-transparent border-none outline-none text-white text-lg w-full placeholder-gray-500"
            />
            <div className="hidden md:flex items-center gap-1 text-xs text-gray-500 bg-gray-800 px-2 py-1 rounded border border-gray-700">
              <Command size={10} /> K
            </div>
          </div>
          
          {/* Search Dropdown */}
          {searchQuery && (
            <div className="absolute top-full left-0 right-0 mt-2 bg-[#1e293b] border border-gray-700 rounded-xl shadow-2xl p-2 z-50">
               {filteredTools.length > 0 ? (
                 filteredTools.map(tool => (
                   <button 
                    key={tool.id} 
                    onClick={() => onNavigate(tool.id as AppTab)}
                    className="w-full text-right p-3 hover:bg-white/5 rounded-lg flex items-center justify-between group"
                   >
                     <span className="text-white font-bold">{tool.label}</span>
                     <span className="text-xs text-gray-500 group-hover:text-sky-400 capitalize">{tool.cat}</span>
                   </button>
                 ))
               ) : (
                 <div className="p-4 text-center text-gray-500">لا توجد نتائج مطابقة.</div>
               )}
            </div>
          )}
        </div>

        {/* The 4 Main Sectors (Grid) */}
        {!searchQuery && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 animate-fade-up" style={{ animationDelay: '0.3s' }}>
            
            {/* Clinical */}
            <div 
              onClick={() => navigateToCategory('diagnosis')}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-3xl border border-gray-800 hover:border-indigo-500/50 hover:shadow-lg hover:shadow-indigo-500/10 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-indigo-500/10 transition-colors"></div>
              <div className="w-12 h-12 bg-indigo-500/20 rounded-2xl flex items-center justify-center text-indigo-400 mb-4 group-hover:scale-110 transition-transform">
                <Stethoscope size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">الطب السريري</h3>
              <p className="text-sm text-gray-400 mb-4">التشخيص، الأدوية، الطوارئ، والتوثيق الطبي.</p>
              <div className="flex items-center text-xs font-bold text-indigo-400 group-hover:translate-x-1 transition-transform">
                <span>فتح القسم</span> <ChevronRight size={14} />
              </div>
            </div>

            {/* Specialties */}
            <div 
              onClick={() => navigateToCategory('surgery')}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-3xl border border-gray-800 hover:border-emerald-500/50 hover:shadow-lg hover:shadow-emerald-500/10 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-emerald-500/10 transition-colors"></div>
              <div className="w-12 h-12 bg-emerald-500/20 rounded-2xl flex items-center justify-center text-emerald-400 mb-4 group-hover:scale-110 transition-transform">
                <Activity size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">التخصصات</h3>
              <p className="text-sm text-gray-400 mb-4">الجراحة، الأطفال، النساء، الباطنة، والأعصاب.</p>
              <div className="flex items-center text-xs font-bold text-emerald-400 group-hover:translate-x-1 transition-transform">
                <span>فتح القسم</span> <ChevronRight size={14} />
              </div>
            </div>

            {/* Academic */}
            <div 
              onClick={() => navigateToCategory('library')}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-3xl border border-gray-800 hover:border-violet-500/50 hover:shadow-lg hover:shadow-violet-500/10 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-violet-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-violet-500/10 transition-colors"></div>
              <div className="w-12 h-12 bg-violet-500/20 rounded-2xl flex items-center justify-center text-violet-400 mb-4 group-hover:scale-110 transition-transform">
                <GraduationCap size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">الأكاديمية</h3>
              <p className="text-sm text-gray-400 mb-4">البحث العلمي، المكتبة، OSCE، والمجلس الطبي.</p>
              <div className="flex items-center text-xs font-bold text-violet-400 group-hover:translate-x-1 transition-transform">
                <span>فتح القسم</span> <ChevronRight size={14} />
              </div>
            </div>

            {/* Utilities */}
            <div 
              onClick={() => navigateToCategory('calc')}
              className="bg-gradient-to-br from-[#1e293b] to-[#0f172a] p-6 rounded-3xl border border-gray-800 hover:border-slate-500/50 hover:shadow-lg hover:shadow-slate-500/10 transition-all cursor-pointer group relative overflow-hidden"
            >
              <div className="absolute top-0 right-0 w-32 h-32 bg-slate-500/5 rounded-full -mr-16 -mt-16 blur-2xl group-hover:bg-slate-500/10 transition-colors"></div>
              <div className="w-12 h-12 bg-slate-500/20 rounded-2xl flex items-center justify-center text-slate-400 mb-4 group-hover:scale-110 transition-transform">
                <LayoutGrid size={28} />
              </div>
              <h3 className="text-xl font-bold text-white mb-2">الأدوات المساندة</h3>
              <p className="text-sm text-gray-400 mb-4">المترجم، نمط الحياة، الأخلاقيات، والتقارير.</p>
              <div className="flex items-center text-xs font-bold text-slate-400 group-hover:translate-x-1 transition-transform">
                <span>فتح القسم</span> <ChevronRight size={14} />
              </div>
            </div>

          </div>
        )}

        {/* Quick Access List for Mobile */}
        <div className="md:hidden space-y-3 animate-fade-up" style={{ animationDelay: '0.4s' }}>
           <h3 className="text-white font-bold text-sm px-2">الوصول السريع</h3>
           <div className="flex gap-3 overflow-x-auto pb-4 scrollbar-none">
              <QuickBtn icon={Zap} label="Flash Mode" onClick={() => {}} color="text-yellow-400" />
              <QuickBtn icon={Brain} label="Deep Think" onClick={() => {}} color="text-purple-400" />
              <QuickBtn icon={Stethoscope} label="Diagnosis" onClick={() => onNavigate('diagnosis')} color="text-indigo-400" />
              <QuickBtn icon={Search} label="Drugs" onClick={() => onNavigate('drugs')} color="text-emerald-400" />
           </div>
        </div>

      </div>
    </div>
  );
};

const QuickBtn = ({ icon: Icon, label, onClick, color }: any) => (
  <button onClick={onClick} className="flex flex-col items-center justify-center bg-[#1e293b] border border-gray-700 rounded-xl p-3 min-w-[80px] hover:bg-white/5 transition-colors">
     <Icon className={color} size={20} />
     <span className="text-[10px] text-gray-400 mt-2 font-medium">{label}</span>
  </button>
);
