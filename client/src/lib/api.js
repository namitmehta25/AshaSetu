export function getApiBaseUrl() {
  const envUrl = import.meta.env.VITE_API_URL
  if (envUrl && typeof envUrl === 'string' && envUrl.trim().length > 0) return envUrl
  return '/api'
}

export async function postJson(path, payload) {
  const base = getApiBaseUrl()
  const url = `${base}${path.startsWith('/') ? path : `/${path}`}`
  const res = await fetch(url, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload),
  })
  const data = await res.json().catch(() => null)
  if (!res.ok) {
    const message = data?.message || `Request failed with status ${res.status}`
    const error = new Error(message)
    error.status = res.status
    error.data = data
    throw error
  }
  return data
}


