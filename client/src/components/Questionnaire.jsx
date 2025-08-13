import React, { useMemo, useState } from 'react'
import { getApiBaseUrl } from '../lib/api.js'

const QUESTIONS = [
  {
    key: 'gender',
    label: 'Gender of the primary founder',
    type: 'select',
    options: ['Female', 'Male', 'Other/Prefer not to say'],
    required: true,
    defaultValue: 'Female',
  },
  {
    key: 'age',
    label: 'Age of the primary founder',
    type: 'number',
    min: 18,
    max: 75,
    required: true,
  },
  {
    key: 'state',
    label: 'Location (State) of the business',
    type: 'select',
    options: [
      'Andhra Pradesh','Arunachal Pradesh','Assam','Bihar','Chhattisgarh','Goa','Gujarat','Haryana','Himachal Pradesh','Jharkhand','Karnataka','Kerala','Madhya Pradesh','Maharashtra','Manipur','Meghalaya','Mizoram','Nagaland','Odisha','Punjab','Rajasthan','Sikkim','Tamil Nadu','Telangana','Tripura','Uttar Pradesh','Uttarakhand','West Bengal','Andaman and Nicobar Islands','Chandigarh','Dadra and Nagar Haveli and Daman and Diu','Delhi','Jammu and Kashmir','Ladakh','Lakshadweep','Puducherry'
    ],
    required: true,
  },
  {
    key: 'sector',
    label: 'Business Sector/Industry',
    type: 'select',
    options: ['Food Service', 'Manufacturing', 'Technology', 'Services', 'Trade', 'Retail', 'Agriculture', 'Handicrafts'],
    required: true,
  },
  {
    key: 'businessType',
    label: 'Business Type',
    type: 'select',
    options: ['Sole Proprietorship', 'MSME', 'Startup', 'Partnership', 'Private Limited', 'LLP', 'Small Business', 'Self-Help Group'],
    required: true,
  },
  {
    key: 'yearsInBusiness',
    label: 'Years in Business',
    type: 'number',
    min: 0,
    max: 50,
    required: true,
  },
  {
    key: 'loanAmount',
    label: 'Loan Amount Required (₹)',
    type: 'number',
    min: 0,
    step: 1000,
    required: true,
  },
]

export default function Questionnaire({ initialValues = {}, onBack, onSubmit, onSubmitResults }) {
  const [stepIndex, setStepIndex] = useState(0)
  const [values, setValues] = useState(() => ({
    gender: 'Female',
    ...initialValues,
  }))
  const [errors, setErrors] = useState({})
  const [loading, setLoading] = useState(false)
  const current = QUESTIONS[stepIndex]

  const isLast = stepIndex === QUESTIONS.length - 1

  function validateField(key, value) {
    const q = QUESTIONS.find(x => x.key === key)
    if (!q) return null
    if (q.required && (value === '' || value == null)) return 'This field is required'
    if (q.type === 'number') {
      const n = Number(value)
      if (Number.isNaN(n)) return 'Enter a valid number'
      if (q.min != null && n < q.min) return `Must be at least ${q.min}`
      if (q.max != null && n > q.max) return `Must be at most ${q.max}`
    }
    return null
  }

  function next() {
    const err = validateField(current.key, values[current.key])
    if (err) {
      setErrors(prev => ({ ...prev, [current.key]: err }))
      return
    }
    setErrors(prev => ({ ...prev, [current.key]: null }))
    if (isLast) {
      setLoading(true)
      fetchResults(values)
    } else {
      setStepIndex(i => i + 1)
    }
  }

  function back() {
    if (stepIndex === 0) {
      onBack?.()
    } else {
      setStepIndex(i => i - 1)
    }
  }

  async function fetchResults(payload) {
    const base = getApiBaseUrl() || '/api'
    const url = `${base}/schemes`.replace(/\/+schemes$/, '/schemes')
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      })
      const data = await res.json()
      onSubmitResults?.(payload, data)
    } catch (e) {
      onSubmitResults?.(payload, { count: 0, schemes: [], error: true })
    } finally {
      setLoading(false)
    }
  }

  function renderInput(q) {
    const common = 'w-full rounded-lg border border-slate-300 bg-white px-3 py-2 focus:outline-none focus:ring-2 focus:ring-brand-300 dark:bg-slate-900 dark:border-slate-700 dark:text-slate-100'
    const value = values[q.key] ?? ''
    if (q.type === 'select') {
      return (
        <select
          className={common}
          value={value}
          onChange={e => setValues(v => ({ ...v, [q.key]: e.target.value }))}
        >
          <option value="" disabled>Select</option>
          {q.options.map(opt => <option key={opt} value={opt}>{opt}</option>)}
        </select>
      )
    }
    if (q.type === 'number') {
      return (
        <input
          type="number"
          className={common}
          value={value}
          min={q.min}
          max={q.max}
          step={q.step || 1}
          onChange={e => setValues(v => ({ ...v, [q.key]: e.target.value === '' ? '' : Number(e.target.value) }))}
        />
      )
    }
    return (
      <input
        type="text"
        className={common}
        value={value}
        placeholder={q.placeholder}
        onChange={e => setValues(v => ({ ...v, [q.key]: e.target.value }))}
      />
    )
  }

  return (
    <main className="max-w-2xl mx-auto px-4 py-8">
      <div className="bg-white border rounded-2xl shadow-sm p-6 dark:bg-slate-900 dark:border-slate-800">
        <div className="text-sm text-slate-500 dark:text-slate-400">Step {stepIndex + 1} of {QUESTIONS.length}</div>
        <h2 className="text-2xl font-bold text-slate-900 mt-1 dark:text-slate-100">{current.label}</h2>
        <div className="mt-4">
          {renderInput(current)}
          {errors[current.key] && (
            <div className="mt-2 text-sm text-red-600">{errors[current.key]}</div>
          )}
        </div>
        <div className="mt-6 flex items-center justify-between">
          <button onClick={back} className="px-4 py-2 rounded-lg border dark:border-slate-700 dark:text-slate-100" disabled={loading}>Back</button>
          <button onClick={next} className="px-5 py-2.5 rounded-lg bg-brand-600 text-white font-medium hover:bg-brand-700 disabled:opacity-60" disabled={loading}>
            {loading ? 'Finding matches…' : (isLast ? 'See Results' : 'Next')}
          </button>
        </div>
      </div>
    </main>
  )
}


