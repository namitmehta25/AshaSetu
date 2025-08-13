import React from 'react'

export default function Results({ answers, results, onRestart }) {
  const items = results?.schemes || []
  const hasItems = items.length > 0
  const apiError = results?.error

  return (
    <main className="max-w-6xl mx-auto px-4 py-10">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Suggested Schemes</h2>
        <button onClick={onRestart} className="px-4 py-2 rounded-lg border dark:border-slate-700 dark:text-slate-100">Start Over</button>
      </div>
      {apiError && (
        <div className="mt-8 bg-red-50 border border-red-200 text-red-800 rounded-2xl p-6 dark:bg-red-900/30 dark:border-red-900 dark:text-red-200">
          We couldn't reach the matching service. Please ensure the server is running at http://localhost:5000 and try again.
        </div>
      )}
      {!hasItems && !apiError && (
        <div className="mt-8 bg-white border rounded-2xl p-6 dark:bg-slate-900 dark:border-slate-800">
          <div className="text-slate-700 font-medium dark:text-slate-200">No schemes found</div>
          <div className="text-slate-500 text-sm mt-1 dark:text-slate-400">Try adjusting loan amount, sector, or business type.</div>
        </div>
      )}
      {hasItems && (
        <div className="grid md:grid-cols-2 gap-6 mt-8">
          {items.map((s) => (
            <article key={s.name} className="bg-white border rounded-2xl p-6 shadow-sm dark:bg-slate-900 dark:border-slate-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-slate-100">{s.name}</h3>
                <span className="px-3 py-1 rounded-full bg-green-100 text-green-800 text-sm font-medium">{s.eligibilityPercentage}% Eligible</span>
              </div>
              <p className="mt-2 text-slate-600 text-sm dark:text-slate-300">{s.description}</p>
              {s.matchedCriteria?.length > 0 && (
                <div className="mt-3">
                  <div className="text-xs uppercase tracking-wide text-slate-500 dark:text-slate-400">Matched Criteria</div>
                  <div className="mt-1 flex flex-wrap gap-2">
                    {s.matchedCriteria.map((c) => (
                      <span key={c} className="px-2 py-1 rounded-md bg-brand-50 text-brand-800 text-xs border border-brand-100 dark:bg-brand-900/40 dark:text-brand-200 dark:border-brand-800">{c}</span>
                    ))}
                  </div>
                </div>
              )}
              {s.applyLink && (
                <a href={s.applyLink} target="_blank" rel="noreferrer" className="inline-flex items-center gap-2 mt-4 text-brand-700 hover:text-brand-900 dark:text-brand-300 dark:hover:text-white">
                  Apply / Learn more
                  <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-4 h-4">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 6.75 21 3m0 0v6m0-6h-6M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
                  </svg>
                </a>
              )}
            </article>
          ))}
        </div>
      )}
    </main>
  )
}


