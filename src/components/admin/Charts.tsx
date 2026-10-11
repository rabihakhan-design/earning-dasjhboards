import {
  Bar,
  BarChart,
  CartesianGrid,
  LabelList,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { usageData } from "./data";
export function UsageChart() {
  return (
    <section className="admin-chart-panel">
      <h2>Company Usage (Total Invoices)</h2>
      <div
        className="admin-bar-chart"
        role="img"
        aria-label="Company invoice usage: Company B has the highest usage at 490 invoices."
      >
        <ResponsiveContainer width="100%" height="100%">
          <BarChart
            data={usageData}
            margin={{ top: 24, right: 6, left: -15, bottom: 5 }}
            barSize={34}
          >
            <CartesianGrid stroke="var(--admin-grid)" strokeDasharray="2 3" />
            <XAxis
              dataKey="name"
              axisLine={{ stroke: "var(--admin-muted)" }}
              tickLine={false}
              tick={{ fill: "var(--admin-text)", fontSize: 11 }}
              interval={0}
            />
            <YAxis
              domain={[100, 500]}
              ticks={[100, 200, 300, 400, 500]}
              axisLine={false}
              tickLine={false}
              tick={{ fill: "var(--admin-muted)", fontSize: 12 }}
            />
            <Tooltip
              cursor={{ fill: "var(--admin-soft)" }}
              content={({ active, payload }) =>
                active && payload?.[0] ? (
                  <div className="admin-chart-tooltip">
                    <strong>{String(payload[0].payload.name)}</strong>
                    <span>{payload[0].value} invoices</span>
                  </div>
                ) : null
              }
            />
            <Bar
              dataKey="invoices"
              fill="var(--admin-bar)"
              radius={[1, 1, 0, 0]}
              isAnimationActive={false}
            >
              <LabelList dataKey="label" position="top" fill="var(--admin-muted)" fontSize={10} />
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="admin-chart-legend">
        <i />
        Total Invoices
      </div>
    </section>
  );
}
export function InvoiceStatusChart() {
  return (
    <section className="admin-donut-panel">
      <h2>Invoice Status (All Companies)</h2>
      <div
        className="admin-donut"
        role="img"
        aria-label="1,248 invoices: 982 on time, 78.7 percent; 266 late, 21.3 percent."
      >
        <div>
          <span>Total Invoices</span>
          <strong>1,248</strong>
        </div>
      </div>
      <div className="admin-donut-legend">
        <div>
          <span>
            <i className="on-time" />
            On Time 982
          </span>
          <small>(78.7%)</small>
        </div>
        <div>
          <span>
            <i className="late" />
            Late
          </span>
          <small>(21.3%)</small>
        </div>
      </div>
    </section>
  );
}
