import { Building2, CircleCheck, PlusCircle, TriangleAlert, Truck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useAdmin } from "./AdminShell";
import { InvoiceStatusChart, UsageChart } from "./Charts";
export default function Dashboard() {
  const { companies, addCompany } = useAdmin();
  const added = companies.length - 11;
  const stats = [
    { title: "Total Companies", value: (1245 + added).toLocaleString(), icon: Building2 },
    { title: "Active Companies", value: (896 + added).toLocaleString(), icon: CircleCheck },
    {
      title: "Total Drivers",
      value: (
        2305 + companies.slice(11).reduce((sum, company) => sum + company.drivers, 0)
      ).toLocaleString(),
      icon: Truck,
    },
    { title: "Suspended", value: "89", icon: TriangleAlert, warning: true },
  ];
  return (
    <div className="admin-page-enter">
      <section className="admin-heading">
        <div>
          <h1>Good morning, Admin</h1>
          <p>
            Monitor your Expense Manager platform, multi-tenant database clusters, and tenant
            <br className="admin-desktop-break" /> operational activity across all active logistics
            partitions.
          </p>
        </div>
        <Button className="admin-add-company" onClick={addCompany}>
          <PlusCircle size={17} />
          Add Company
        </Button>
      </section>
      <div className="admin-stat-grid">
        {stats.map(({ title, value, icon: Icon, warning }) => (
          <article className={`admin-stat ${warning ? "is-warning" : ""}`} key={title}>
            <div>
              <h2>{title}</h2>
              <strong>{value}</strong>
            </div>
            <span className="admin-stat-icon">
              <Icon size={20} />
            </span>
          </article>
        ))}
      </div>
      <div className="admin-charts-grid">
        <UsageChart />
        <InvoiceStatusChart />
      </div>
    </div>
  );
}
