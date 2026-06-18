export default function TopContributors() {
  return (
    <div style={{ background: '#f9fafb', borderRadius: 12, padding: 24 }}>
      <h3 style={{ margin: '0 0 16px', fontSize: 16 }}>Top Contributors</h3>
      <p style={{ color: '#666', fontSize: 14 }}>
        Search for a contributor above to view their full scorecard. Top contributors will appear here once the database has data.
      </p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
        {[1, 2, 3].map(i => (
          <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 12, padding: 10, background: '#fff', borderRadius: 8 }}>
            <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e5e7eb', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 12, color: '#9ca3af' }}>
              #{i}
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: 13, color: '#9ca3af' }}>—</div>
              <div style={{ fontSize: 11, color: '#d0d0d0' }}>No data yet</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
