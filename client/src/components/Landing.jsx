import React from 'react'

export default function Landing({ onGetStarted }) {
  const tiles = [
    { title: 'Profile', caption: 'Founder & location' },
    { title: 'Business', caption: 'Sector & type' },
    { title: 'Funding', caption: 'Needed amount' },
    { title: 'Results', caption: 'Matched schemes' },
  ]

  return (
    <main>
      {/* Hero */}
      <section className="max-w-6xl mx-auto px-4 py-16 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-slate-900 dark:text-slate-100">
            Discover the right government grants for your business
          </h1>
          <p className="mt-4 text-lg text-slate-600 dark:text-slate-300">
            Asha Setu matches Indian entrepreneurs and MSMEs with relevant schemes and programs—fast.
          </p>
          <div className="mt-8 flex items-center gap-4">
            <button
              onClick={onGetStarted}
              className="px-5 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 shadow"
            >
              Get Started
            </button>
            <a href="#how" className="text-brand-700 hover:text-brand-900 dark:text-brand-300 dark:hover:text-white">How it works</a>
          </div>
        </div>
        <div className="bg-white rounded-2xl shadow-xl p-6 border dark:bg-slate-900 dark:border-slate-800">
          <div className="grid grid-cols-2 gap-4">
            {tiles.map((t) => (
              <div key={t.title} className="rounded-xl bg-gradient-to-br from-brand-100 to-white border p-4 dark:from-slate-800 dark:to-slate-900 dark:border-slate-700">
                <div className="text-sm font-semibold text-slate-800 dark:text-slate-100">{t.title}</div>
                <div className="text-xs text-slate-500 dark:text-slate-400">{t.caption}</div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-sm text-slate-500 dark:text-slate-400">Takes under 2 minutes.</div>
        </div>
      </section>

      {/* How it works */}
      <section id="how" className="bg-white/60 border-t dark:bg-slate-900/60 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">How it works</h2>
          <div className="mt-8 grid md:grid-cols-3 gap-6">
            <div className="rounded-xl border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
              <div className="text-brand-700 font-semibold dark:text-brand-300">1. Tell us about your business</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Answer a few quick questions about founder, location, sector, and funding needs.</p>
            </div>
            <div className="rounded-xl border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
              <div className="text-brand-700 font-semibold dark:text-brand-300">2. We match schemes</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Our eligibility engine scores programs against your profile.</p>
            </div>
            <div className="rounded-xl border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
              <div className="text-brand-700 font-semibold dark:text-brand-300">3. Review and apply</div>
              <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">View details, matched criteria, and official apply links.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Why GrantGenie */}
      <section id="why" className="max-w-6xl mx-auto px-4 py-14">
        <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Why GrantGenie</h2>
        <div className="mt-8 grid md:grid-cols-3 gap-6">
          <div className="rounded-xl border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
            <div className="text-slate-900 font-semibold dark:text-slate-100">Fast and simple</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">Spend minutes, not days, to find programs that fit your profile.</p>
          </div>
          <div className="rounded-xl border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
            <div className="text-slate-900 font-semibold dark:text-slate-100">Clear eligibility</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">See a transparent eligibility percentage and matched criteria.</p>
          </div>
          <div className="rounded-xl border bg-white p-6 dark:bg-slate-900 dark:border-slate-800">
            <div className="text-slate-900 font-semibold dark:text-slate-100">Built to grow</div>
            <p className="mt-2 text-sm text-slate-600 dark:text-slate-300">We start with available datasets and will expand to more segments over time.</p>
          </div>
        </div>
      </section>

      {/* Sample programs */}
      <section id="samples" className="bg-white/60 border-t dark:bg-slate-900/60 dark:border-slate-800">
        <div className="max-w-6xl mx-auto px-4 py-14">
          <h2 className="text-2xl md:text-3xl font-bold text-slate-900 dark:text-slate-100">Explore popular programs</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {['Stand-Up India', 'MUDRA', 'PMEGP', 'SIDBI Schemes', 'State Initiatives'].map((tag) => (
              <span key={tag} className="px-3 py-1.5 rounded-full bg-brand-50 text-brand-800 border border-brand-100 text-sm dark:bg-brand-900/40 dark:text-brand-200 dark:border-brand-800">{tag}</span>
            ))}
          </div>
          <div className="mt-8">
            <button onClick={onGetStarted} className="px-5 py-3 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 shadow">
              Find my matches
            </button>
          </div>
        </div>
      </section>
    </main>
  )
}


