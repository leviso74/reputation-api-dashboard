import { useState, useEffect } from 'react'
import ScorecardView from './components/ScorecardView'
import WebhookStats from './components/WebhookStats'
import TopContributors from './components/TopContributors'

const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3000/api/v1'

export default function App() {
  const [searchHandle, setSearchHandle] = useState('')
  const [scorecard, setScorecard] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [health, setHealth] = useState<'checking' | 'ok' | 'error'>('checking')

  useEffect(() => {
    fetch(`${API_BASE.replace('/api/v1', '')}/health`)
      .then(r => r.json())
      .then(() => setHealth('ok'))
      .catch(() => setHealth('error'))
  }, [])

  async function searchContributor() {
    if (!searchHandle.trim()) return
    setLoading(true)
    setError('')
    setScorecard(null)
    try {
      const res = await fetch(`${API_BASE}/contributors/${encodeURIComponent(searchHandle)}/scorecard`)
      if (!res.ok) {
        const body = await res.json()
        throw new Error(body.error || 'Not found')
      }
      setScorecard(await res.json())
    } catch (e: any) {
      setError(e.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div style={{ maxWidth: 1200, margin: '0 auto', padding: 24, fontFamily: 'system-ui, sans-serif' }}>
      <header style={{ marginBottom: 32 }}>
        <h1 style={{ margin: 0 }}>GitHub Reputation Indexer</h1>
        <p style={{ color: '#666', margin: '4px 0 0' }}>
          API Status: <span style={{ color: health === 'ok' ? '#16a34a' : health === 'error' ? '#dc2626' : '#ca8a04' }}>
            {health}
          </span>
        </p>
      </header>

      <div style={{ display: 'flex', gap: 24, marginBottom: 32 }}>
        <input
          value={searchHandle}
          onChange={e => setSearchHandle(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && searchContributor()}
          placeholder="Enter GitHub handle..."
          style={{ flex: 1, padding: '10px 16px', fontSize: 16, borderRadius: 8, border: '1px solid #d0d0d0' }}
        />
        <button onClick={searchContributor} disabled={loading}
          style={{ padding: '10px 24px', fontSize: 16, borderRadius: 8, border: 'none', background: '#2563eb', color: '#fff', cursor: 'pointer' }}>
          {loading ? 'Searching...' : 'Search'}
        </button>
      </div>

      {error && <div style={{ padding: 16, background: '#fef2f2', borderRadius: 8, marginBottom: 24, color: '#dc2626' }}>{error}</div>}

      {scorecard && <ScorecardView data={scorecard} />}

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24, marginTop: 32 }}>
        <WebhookStats />
        <TopContributors />
      </div>
    </div>
  )
}
