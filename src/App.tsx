import { AnimatePresence } from 'framer-motion'
import { useWorkshopStore } from './store/useWorkshopStore'
import LandingPage from './components/Phase0/LandingPage'
import ClientSelection from './components/Phase0/ClientSelection'
import Phase1Form from './components/Phase1/Phase1Form'
import Phase1Words from './components/Phase1/Phase1Words'
import Phase1Story from './components/Phase1/Phase1Story'
import Phase1Profile from './components/Phase1/Phase1Profile'
import Phase2Intro from './components/Phase2/Phase2Intro'
import Phase2Explorer from './components/Phase2/Phase2Explorer'
import Phase2Moodboard from './components/Phase2/Phase2Moodboard'
import Phase2Phrase from './components/Phase2/Phase2Phrase'
import Phase3Intro from './components/Phase3/Phase3Intro'
import Phase3Sketch from './components/Phase3/Phase3Sketch'
import Phase3Routine from './components/Phase3/Phase3Routine'
import Phase3Keywords from './components/Phase3/Phase3Keywords'
import Phase3Purpose from './components/Phase3/Phase3Purpose'
import TimelinePhase from './components/Phase4/TimelinePhase'
import Phase5Intro from './components/Phase5/Phase5Intro'
import Phase5Form from './components/Phase5/Phase5Form'
import Phase6Intro from './components/Phase6/Phase6Intro'
import Phase6Meditation from './components/Phase6/Phase6Meditation'
import Phase6Vision from './components/Phase6/Phase6Vision'
import Phase6ArchResult from './components/Phase6/Phase6ArchResult'
import FinalVoting from './components/Phase7/FinalVoting'
import CompletionScreen from './components/Completion/CompletionScreen'
import EliteTalentFlow from './components/EliteTalent/EliteTalentFlow'
import ParticleBackground from './components/UI/ParticleBackground'
import FloatingAudio from './components/UI/FloatingAudio'
import { useEffect, useState } from 'react'

function App() {
  const { currentPhase } = useWorkshopStore()


  const renderPhase = () => {
    switch (currentPhase) {
      case 0: return <LandingPage key="l" />
      case 1: return <EliteTalentFlow key="etf" />
      default: return <LandingPage key="def" />
    }
  }

  return (
    <div className="min-h-screen bg-brand-black text-white relative selection:bg-brand-gold selection:text-brand-black overflow-x-hidden">
      <ParticleBackground />

      <main className="relative z-10 min-h-screen">
        <AnimatePresence mode="wait">
          {renderPhase()}
        </AnimatePresence>
        <FloatingAudio />
      </main>
    </div>
  )
}

export default App
