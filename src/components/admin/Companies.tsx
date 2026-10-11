import { useState } from "react";
import { Building2, PlusCircle, Search } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "./AdminShell";
export default function Companies() {
  const { companies, addCompany, globalSearch } = useAdmin();
  const [query, setQuery] = useState("");
  const rows = companies.filter((company) =>
    `${company.name} ${company.email}`
      .toLowerCase()
      .includes(`${query} ${globalSearch}`.trim().toLowerCase()),
  );
  return (
    <div className="admin-page-enter">
      <section className="admin-heading">
        <div>
          <h1>Companies</h1>
          <p>Manage companies across your logistics platform.</p>
        </div>
        <Button onClick={addCompany}>
          <PlusCircle />
          Add Company
        </Button>
      </section>
      <section className="admin-filters">
        <label className="admin-invoice-search">
          <Search size={16} />
          <input
            aria-label="Search companies"
            value={query}
            onChange={(event) => setQuery(event.target.value)}
            placeholder="Search by company or email..."
          />
        </label>
        <span className="admin-directory-count">{rows.length} companies</span>
      </section>
      <section className="admin-table-panel">
        <div className="admin-table-scroll">
          <table className="admin-table admin-companies-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Email address</th>
                <th>Drivers</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              {rows.map((company) => (
                <tr key={company.id}>
                  <td>
                    <div className="admin-company-name">
                      <Building2 size={18} />
                      <strong>{company.name}</strong>
                    </div>
                  </td>
                  <td>{company.email}</td>
                  <td>{company.drivers}</td>
                  <td>
                    <span
                      className={`admin-status ${company.status === "Active" ? "status-paid" : "status-overdue"}`}
                    >
                      <i />
                      {company.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {!rows.length && (
            <div className="admin-empty">
              <h2>No companies found</h2>
              <p>No records match your search.</p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}
