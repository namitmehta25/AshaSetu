import React, { useEffect, useMemo, useState } from 'react'
import Logo from './assets/logo1.png'
import Landing from './components/Landing.jsx'
import Questionnaire from './components/Questionnaire.jsx'
import Results from './components/Results.jsx'

export default function App() {
  const [step, setStep] = useState('landing')
  const [answers, setAnswers] = useState({})
  const [results, setResults] = useState(null)
  const [theme, setTheme] = useState(() => {
    const saved = localStorage.getItem('theme')
    if (saved) return saved
    const prefersDark = window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches
    return prefersDark ? 'dark' : 'light'
  })

  useEffect(() => {
    const root = document.documentElement
    if (theme === 'dark') root.classList.add('dark')
    else root.classList.remove('dark')
    localStorage.setItem('theme', theme)
  }, [theme])

  const page = useMemo(() => {
    if (step === 'landing') {
      return <Landing onGetStarted={() => setStep('questions')} />
    }
    if (step === 'questions') {
      return (
        <Questionnaire
          initialValues={answers}
          onBack={() => setStep('landing')}
          onSubmit={(vals) => {
            setAnswers(vals)
            setStep('results')
          }}
          onSubmitResults={(vals, apiResults) => {
            setAnswers(vals)
            setResults(apiResults)
            setStep('results')
          }}
        />
      )
    }
    return <Results answers={answers} results={results} onRestart={() => { setAnswers({}); setResults(null); setStep('landing') }} />
  }, [step, answers, results])

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-50 to-white dark:from-slate-900 dark:to-slate-950">
      <nav className="w-full border-b bg-white/60 backdrop-blur sticky top-0 z-10 dark:bg-slate-900/60 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <img src={Logo} alt="Asha Setu" className="w-8 h-8" />
            <span className="text-lg font-semibold text-slate-800 dark:text-slate-100">Asha Setu</span>
          </div>
          <div className="flex items-center gap-3">
            <a href="#how" className="text-sm text-brand-700 hover:text-brand-900 dark:text-brand-300 dark:hover:text-white">How it works</a>
            <button
              aria-label="Toggle theme"
              onClick={() => setTheme(t => t === 'dark' ? 'light' : 'dark')}
              className="w-9 h-9 rounded-full border grid place-items-center bg-white hover:bg-slate-50 dark:bg-slate-800 dark:border-slate-700 dark:hover:bg-slate-700"
            >
              {theme === 'dark' ? (
                // Sun icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-yellow-400">
                  <path d="M12 18a6 6 0 1 0 0-12 6 6 0 0 0 0 12Zm0 4a1 1 0 0 1-1-1v-1a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm0-18a1 1 0 0 1-1-1V2a1 1 0 1 1 2 0v1a1 1 0 0 1-1 1Zm10 9a1 1 0 0 1-1 1h-1a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1ZM4 12a1 1 0 0 1-1 1H2a1 1 0 1 1 0-2h1a1 1 0 0 1 1 1Zm13.657 6.657a1 1 0 0 1-1.414 1.414l-.707-.707a1 1 0 1 1 1.414-1.414l.707.707Zm-10.606 0 .707.707A1 1 0 1 1 6.343 21.48l-.707-.707a1 1 0 1 1 1.414-1.414ZM17.657 6.343a1 1 0 0 1 0-1.414l.707-.707a1 1 0 1 1 1.414 1.414l-.707.707a1 1 0 0 1-1.414 0ZM4.636 5.636 3.93 4.93A1 1 0 1 1 5.343 3.52l.707.707A1 1 0 1 1 4.636 5.636Z" />
                </svg>
              ) : (
                // Moon icon
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-5 h-5 text-slate-800">
                  <path d="M21 12.79A9 9 0 1 1 11.21 3a7 7 0 1 0 9.79 9.79Z" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>
      {page}
      <footer className="py-8 text-center text-sm text-slate-500 dark:text-slate-400">Made for India • Asha Setu</footer>
    </div>
  )
}


