import { useState } from "react";
import { useAdmin } from "./AdminShell";
import { MonthSelect, StatusBadge } from "./Invoices";
import { formatMoney, outstandingAccounts } from "./data";
export default function OutstandingAccounts() {
  const [month, setMonth] = useState("September 2026");
  const { globalSearch } = useAdmin();
  const rows =
    month === "September 2026"
      ? outstandingAccounts.filter((account) =>
          account.company.toLowerCase().includes(globalSearch.toLowerCase().trim()),
        )
      : [];
  return (
    <div className="admin-page-enter">
      <section className="admin-heading admin-outstanding-heading">
        <div>
          <div className="admin-title-row">
            <h1>Companies with 1+ Months Outstanding</h1>
            <span className="admin-flag-tag">3 Flagged</span>
          </div>
          <p>
            Tenants with unpaid balances exceeding 90 days. Flagged for review
            <br className="admin-desktop-break" /> and contractual limit restrictions.
          </p>
        </div>
        <MonthSelect value={month} onChange={setMonth} />
      </section>
      <section className="admin-table-panel admin-outstanding-panel">
        <div className="admin-table-scroll">
          <table className="admin-table admin-outstanding-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Outstanding Period</th>
                <th>Total Balance</th>
                <th>Payment Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((account) => (
                <tr key={account.id}>
                  <td>
                    <strong>{account.company}</strong>
                  </td>
                  <td>
                    <strong className={`text-${account.status.toLowerCase()}`}>
                      {account.period} Months
                    </strong>
                    <small>Since {account.since}</small>
                  </td>
                  <td className={`admin-balance text-${account.status.toLowerCase()}`}>
                    {formatMoney(account.balance)}
                  </td>
                  <td>
                    <StatusBadge status={account.status} />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && (
            <div className="admin-empty">
              <h2>No outstanding accounts</h2>
              <p>No records match the selected month or search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
