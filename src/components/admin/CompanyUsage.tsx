import { useState } from "react";
import { MonthSelect } from "./Invoices";
import { UsageChart, InvoiceStatusChart } from "./Charts";
export default function CompanyUsage() {
  const [month, setMonth] = useState("September 2026");
  return (
    <div className="admin-page-enter">
      <section className="admin-heading">
        <div>
          <h1>Company Usage</h1>
          <p>Invoice activity and payment performance across your companies.</p>
        </div>
        <MonthSelect value={month} onChange={setMonth} />
      </section>
      {month === "September 2026" ? (
        <div className="admin-charts-grid admin-usage-charts">
          <UsageChart />
          <InvoiceStatusChart />
        </div>
      ) : (
        <section className="admin-empty admin-chart-panel">
          <h2>No usage records</h2>
          <p>No usage report is available for {month}.</p>
        </section>
      )}
    </div>
  );
}
