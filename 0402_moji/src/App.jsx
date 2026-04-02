import React, { useState } from 'react'
import { useProgress } from './hooks/useProgress.js'
import HomeScreen from './components/HomeScreen.jsx'
import ChartScreen from './components/ChartScreen.jsx'
import IntroScreen from './components/IntroScreen.jsx'
import FinaleScreen from './components/FinaleScreen.jsx'
import LessonScreen from './components/lesson/LessonScreen.jsx'

export default function App() {
  const [view, setView] = useState({ screen: 'home', lessonId: null })
  const progressApi = useProgress()

  const navigate = (screen, lessonId = null) => setView({ screen, lessonId })
  const goHome = () => setView({ screen: 'home', lessonId: null })

  const { screen, lessonId } = view

  return (
    <div className="app-shell">
      {screen === 'home' && (
        <HomeScreen
          progress={progressApi.progress}
          onNavigate={navigate}
          onReset={progressApi.resetAll}
        />
      )}
      {screen === 'chart' && (
        <ChartScreen onBack={goHome} />
      )}
      {screen === 'intro' && (
        <IntroScreen onBack={goHome} onStartLesson={() => navigate('lesson', 1)} />
      )}
      {screen === 'lesson' && (
        <LessonScreen
          lessonId={lessonId}
          progressApi={progressApi}
          onBack={goHome}
          onNext={() => {
            const nextId = lessonId + 1
            if (nextId === 9) navigate('finale')
            else navigate('lesson', nextId)
          }}
        />
      )}
      {screen === 'finale' && (
        <FinaleScreen onBack={goHome} />
      )}
    </div>
  )
}
