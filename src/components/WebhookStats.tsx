export default function WebhookStats() {
  return (
    <div style={{ background: '#f9fafb', borderRadius: 12, padding: 24 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>Webhook Activity</h3>
      <p style={{ color: '#666', fontSize: 14 }}>
        Connect to a running Reputation Indexer API and Redis instance to see live webhook processing stats.
      </p>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
        {[
          { label: 'PRs Processed', value: '—' },
          { label: 'Queue Depth', value: '—' },
          { label: 'Jobs Completed', value: '—' },
          { label: 'Failed Jobs', value: '—' },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 18, fontWeight: 600 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
