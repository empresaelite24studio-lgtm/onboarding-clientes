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


function App() {
  const { currentPhase } = useWorkshopStore()


  const renderPhase = () => {
    switch (currentPhase) {
      case 0: return <LandingPage key="0" />
      case 1: return <ClientSelection key="1" />
      case 2: return <Phase1Form key="2" />
      case 3: return <Phase1Words key="3" />
      case 4: return <Phase1Story key="4" />
      case 5: return <Phase1Profile key="5" />
      case 6: return <Phase2Intro key="6" />
      case 7: return <Phase2Explorer key="7" />
      case 8: return <Phase2Moodboard key="8" />
      case 9: return <Phase2Phrase key="9" />
      case 10: return <Phase3Intro key="10" />
      case 11: return <Phase3Sketch key="11" />
      case 12: return <Phase3Routine key="12" />
      case 13: return <Phase3Keywords key="13" />
      case 14: return <Phase3Purpose key="14" />
      case 15: return <TimelinePhase key="15" />
      case 16: return <Phase5Intro key="16" />
      case 17: return <Phase5Form key="17" />
      case 18: return <Phase6Intro key="18" />
      case 19: return <Phase6Meditation key="19" />
      case 20: return <Phase6Vision key="20" />
      case 21: return <Phase6ArchResult key="21" />
      case 22: return <FinalVoting key="22" />
      case 23: return <CompletionScreen key="23" />
      case 50: return <EliteTalentFlow key="50" />
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
      </main>
    </div>
  )
}

export default App
