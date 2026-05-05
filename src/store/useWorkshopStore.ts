import { create } from 'zustand'
import { persist } from 'zustand/middleware'

export interface WorkshopState {
  currentPhase: number;
  clientInfo: {
    fullName: string;
    date: string;
    type: 'persona' | 'empresa' | 'colaborador' | null;
  };
  phase1: {
    selectedWords: string[];
    reflections: Record<string, string>;
    iaReflection?: string;
  };
  phase2: {
    selectedImages: any[];
    imageEmotions: Record<string, string>;
    integrativePhrase: string;
  };
  phase3: {
    canvasBase64?: string;
    routine: Record<string, string>;
    emotionalKeywords: string[];
    purposeSpaces: Record<string, string>;
    mainEmotion: string;
    mainEmotionDrawing?: string;
  };
  phase4: {
    places: Array<{
      id: string;
      name: string;
      year: string;
      keyword: string;
      memory: string;
      sensory: string;
      drawing?: string;
    }>;
  };
  phase5: {
    objectName: string;
    history: string;
    description: string;
    emotion: string;
    livingRole: string;
    extraObject: string;
    drawing?: string;
    uploadedImage?: string;
    iaVision?: string;
  };
  phase6: {
    dreamDrawing?: string;
    narratedText: string;
    iaVision?: string;
  };
  phase7: {
    votes: Record<string, string[]>;
    finalComments: string;
  };
  
  // Actions
  setPhase: (phase: number) => void;
  setClientInfo: (info: Partial<WorkshopState['clientInfo']>) => void;
  setPhase1: (data: Partial<WorkshopState['phase1']>) => void;
  setPhase2: (data: Partial<WorkshopState['phase2']>) => void;
  setPhase3: (data: Partial<WorkshopState['phase3']>) => void;
  updatePlace: (placeId: string, data: any) => void;
  addPlace: () => void;
  setPhase5: (data: Partial<WorkshopState['phase5']>) => void;
  setPhase6: (data: Partial<WorkshopState['phase6']>) => void;
  setPhase7: (data: Partial<WorkshopState['phase7']>) => void;
  resetSession: () => void;
}

export const useWorkshopStore = create<WorkshopState>()(
  persist(
    (set) => ({
      currentPhase: 0,
      clientInfo: {
        fullName: '',
        date: new Date().toISOString().split('T')[0],
        type: null,
      },
      phase1: {
        selectedWords: [],
        reflections: {},
      },
      phase2: {
        selectedImages: [],
        imageEmotions: {},
        integrativePhrase: '',
      },
      phase3: {
        routine: {},
        emotionalKeywords: Array(5).fill(''),
        purposeSpaces: {},
        mainEmotion: '',
      },
      phase4: {
        places: [],
      },
      phase5: {
        objectName: '',
        history: '',
        description: '',
        emotion: '',
        livingRole: '',
        extraObject: '',
      },
      phase6: {
        narratedText: '',
      },
      phase7: {
        votes: {},
        finalComments: '',
      },

      setPhase: (phase) => set({ currentPhase: phase }),
      setClientInfo: (info) => set((state) => ({ clientInfo: { ...state.clientInfo, ...info } })),
      setPhase1: (data) => set((state) => ({ phase1: { ...state.phase1, ...data } })),
      setPhase2: (data) => set((state) => ({ phase2: { ...state.phase2, ...data } })),
      setPhase3: (data) => set((state) => ({ phase3: { ...state.phase3, ...data } })),
      addPlace: () => set((state) => ({
        phase4: {
          places: [...state.phase4.places, {
            id: Math.random().toString(36).substr(2, 9),
            name: '',
            year: '',
            keyword: '',
            memory: '',
            sensory: '',
          }]
        }
      })),
      updatePlace: (id, data) => set((state) => ({
        phase4: {
          places: state.phase4.places.map(p => p.id === id ? { ...p, ...data } : p)
        }
      })),
      setPhase5: (data) => set((state) => ({ phase5: { ...state.phase5, ...data } })),
      setPhase6: (data) => set((state) => ({ phase6: { ...state.phase6, ...data } })),
      setPhase7: (data) => set((state) => ({ phase7: { ...state.phase7, ...data } })),
      resetSession: () => {
        localStorage.removeItem('workshop-storage');
        set({
          currentPhase: 0,
          clientInfo: { fullName: '', date: new Date().toISOString().split('T')[0], type: null },
          phase1: { selectedWords: [], reflections: {} },
          phase2: { selectedImages: [], imageEmotions: {}, integrativePhrase: '' },
          phase3: { routine: {}, emotionalKeywords: Array(5).fill(''), purposeSpaces: {}, mainEmotion: '' },
          phase4: { places: [] },
          phase5: { objectName: '', history: '', description: '', emotion: '', livingRole: '', extraObject: '' },
          phase6: { narratedText: '' },
          phase7: { votes: {}, finalComments: '' },
        });
      },
    }),
    {
      name: 'workshop-storage',
    }
  )
)
