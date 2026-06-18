import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer,
  PieChart, Pie, Cell, Legend,
} from 'recharts'

const COLORS = ['#2563eb', '#16a34a', '#dc2626', '#ca8a04', '#8b5cf6']

interface Props {
  data: {
    contributor: string
    scorecard: {
      total_pull_requests: number
      total_reviews: number
      total_bug_reports: number
      avg_approval_time_hours: number
      bug_resolution_rate: number
      merge_rate: number
      code_quality_score: number
    }
    computed_at: string
  }
}

export default function ScorecardView({ data }: Props) {
  const { contributor, scorecard, computed_at } = data

  const barData = [
    { metric: 'PRs', value: scorecard.total_pull_requests },
    { metric: 'Reviews', value: scorecard.total_reviews },
    { metric: 'Bugs Filed', value: scorecard.total_bug_reports },
  ]

  const pieData = [
    { name: 'Code Quality', value: scorecard.code_quality_score },
    { name: 'Remaining', value: 100 - scorecard.code_quality_score },
  ]

  return (
    <div style={{ background: '#f9fafb', borderRadius: 12, padding: 24 }}>
      <h2 style={{ margin: '0 0 4px' }}>{contributor}</h2>
      <p style={{ color: '#666', fontSize: 13, margin: '0 0 20px' }}>
        Computed: {new Date(computed_at).toLocaleString()}
      </p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#374151' }}>Activity Breakdown</h3>
          <ResponsiveContainer width="100%" height={200}>
            <BarChart data={barData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="metric" />
              <YAxis />
              <Tooltip />
              <Bar dataKey="value" fill="#2563eb" radius={[4, 4, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>

        <div>
          <h3 style={{ margin: '0 0 12px', fontSize: 14, color: '#374151' }}>Code Quality Score</h3>
          <ResponsiveContainer width="100%" height={200}>
            <PieChart>
              <Pie data={pieData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} dataKey="value" startAngle={90} endAngle={-270}>
                {pieData.map((_, i) => <Cell key={i} fill={COLORS[i]} />)}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginTop: 20 }}>
        {[
          { label: 'Avg Approval Time', value: `${scorecard.avg_approval_time_hours.toFixed(1)}h` },
          { label: 'Bug Resolution Rate', value: `${scorecard.bug_resolution_rate.toFixed(1)}%` },
          { label: 'Merge Rate', value: `${scorecard.merge_rate.toFixed(1)}%` },
        ].map(s => (
          <div key={s.label} style={{ background: '#fff', borderRadius: 8, padding: 12, textAlign: 'center' }}>
            <div style={{ fontSize: 20, fontWeight: 600 }}>{s.value}</div>
            <div style={{ fontSize: 12, color: '#666' }}>{s.label}</div>
          </div>
        ))}
      </div>
    </div>
  )
}
