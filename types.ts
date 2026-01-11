
export interface Message {
  id: string;
  role: 'user' | 'model';
  content: string;
  timestamp: Date;
  isThinking?: boolean;
  thinkingText?: string; // New field for the collapsible thinking process
  groundingSources?: GroundingSource[];
  image?: string;
  modelUsed?: string;
}

export interface GroundingSource {
  title: string;
  uri: string;
}

export type ModelMode = 
  | 'gemini-3-pro-preview'
  | 'gemini-3-flash-preview'
  | 'gemini-2.5-pro'
  | 'gemini-flash-latest'
  | 'gemini-flash-lite-latest'
  | 'gemini-2.5-flash'
  | 'gemini-2.5-flash-lite'
  | 'gemini-2.0-flash';

export type CategoryType = 'clinical' | 'specialty' | 'academic' | 'utilities';

export type AppTab = 
  | 'dashboard' | 'diagnosis' | 'drugs' | 'library' | 'scribe' | 'board' 
  | 'simplifier' | 'osce' | 'triage' | 'research' | 'lab' | 'sbar' 
  | 'algorithm' | 'radiology' | 'procedure' | 'lifestyle' | 'toxicology' 
  | 'translator' | 'evidence' | 'pediatric' | 'surgery' | 'calc' 
  | 'derma' | 'psych' | 'quiz' | 'surg_strategy' | 'mnm' | 'op_note' 
  | 'detective' | 'antibiotic'
  | 'ventilator' | 'ortho' | 'neuro' | 'onco' | 'heme' 
  | 'fluids' | 'ophtha' | 'dental' | 'ethics' | 'stats'
  // New Expansion Pack (10 Features)
  | 'gene' | 'trauma' | 'ecg' | 'obgyn' | 'rehab' 
  | 'vax' | 'burn' | 'nephro' | 'forensic' | 'travel';

export interface ChatState {
  messages: Message[];
  isLoading: boolean;
  error: string | null;
  mode: ModelMode;
}
