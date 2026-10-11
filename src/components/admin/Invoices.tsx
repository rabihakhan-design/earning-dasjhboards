import { useState } from "react";
import {
  Building2,
  CalendarDays,
  ChevronDown,
  ChevronLeft,
  ChevronRight,
  Download,
  MoreVertical,
  Search,
  CircleCheck,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useAdmin } from "./AdminShell";
import {
  customerPayments,
  filterInvoices,
  formatMoney,
  paginate,
  type Invoice,
  type PaymentStatus,
} from "./data";
export function StatusBadge({ status }: { status: PaymentStatus }) {
  return (
    <span className={`admin-status status-${status.toLowerCase()}`}>
      <i />
      {status}
    </span>
  );
}
export function MonthSelect({
  value,
  onChange,
  all = false,
}: {
  value: string;
  onChange: (value: string) => void;
  all?: boolean;
}) {
  return (
    <label className="admin-select">
      <CalendarDays size={16} />
      <select
        aria-label="Select month"
        value={value}
        onChange={(event) => onChange(event.target.value)}
      >
        {all && <option value="all">All months</option>}
        <option>September 2026</option>
        <option>August 2026</option>
        <option>July 2026</option>
      </select>
      <ChevronDown size={14} />
    </label>
  );
}
function exportInvoice(invoice: Invoice) {
  const contents = `Invoice,Company,Month,Amount,Due date,Status,Outstanding\n${invoice.id},${invoice.company},${invoice.month},${invoice.amount},"${invoice.dueDate}",${invoice.status},${invoice.outstanding}\n`;
  const url = URL.createObjectURL(new Blob([contents], { type: "text/csv;charset=utf-8;" }));
  const link = document.createElement("a");
  link.href = url;
  link.download = `${invoice.id.toLowerCase()}.csv`;
  link.click();
  URL.revokeObjectURL(url);
}
export default function Invoices() {
  const { invoices, globalSearch, markPaid } = useAdmin();
  const [query, setQuery] = useState("");
  const [company, setCompany] = useState("all");
  const [month, setMonth] = useState("all");
  const [page, setPage] = useState(1);
  const [detail, setDetail] = useState<Invoice | null>(null);
  const filtered = filterInvoices(invoices, `${query} ${globalSearch}`.trim(), company, month);
  const pageCount = Math.max(1, Math.ceil(filtered.length / 7));
  const currentPage = Math.min(page, pageCount);
  const rows = paginate(filtered, currentPage);
  return (
    <div className="admin-page-enter">
      <section className="admin-heading admin-invoice-heading">
        <div>
          <div className="admin-title-row">
            <h1>Invoices</h1>
            <span className="admin-info-tag">
              <CalendarDays size={13} />
              Monthly invoices are automatically generated.
            </span>
          </div>
          <p>Monthly invoices and payment status</p>
        </div>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="secondary" className="admin-payment-select">
              <CalendarDays size={15} />
              Old customer on time payment
              <ChevronDown size={14} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="admin-surface admin-customer-payments" align="end">
            {customerPayments.map((payment) => (
              <DropdownMenuItem
                key={payment.name}
                onSelect={() => {
                  setCompany(payment.name);
                  setPage(1);
                }}
              >
                <span>{payment.name}</span>
                <strong>{formatMoney(payment.amount)}</strong>
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
      </section>
      <section className="admin-filters" aria-label="Invoice filters">
        <label className="admin-select">
          <Building2 size={16} />
          <select
            aria-label="Filter by company"
            value={company}
            onChange={(event) => {
              setCompany(event.target.value);
              setPage(1);
            }}
          >
            <option value="all">All Companies</option>
            {Array.from(new Set(invoices.map((invoice) => invoice.company))).map((name) => (
              <option key={name}>{name}</option>
            ))}
          </select>
          <ChevronDown size={14} />
        </label>
        <MonthSelect
          value={month}
          all
          onChange={(value) => {
            setMonth(value);
            setPage(1);
          }}
        />
        <label className="admin-invoice-search">
          <Search size={16} />
          <input
            aria-label="Search invoices"
            placeholder="Search by invoice # or company..."
            value={query}
            onChange={(event) => {
              setQuery(event.target.value);
              setPage(1);
            }}
          />
          {query && (
            <Button
              variant="ghost"
              size="icon"
              aria-label="Clear search"
              onClick={() => setQuery("")}
            >
              <span>×</span>
            </Button>
          )}
        </label>
      </section>
      <section className="admin-table-panel">
        <div className="admin-table-scroll">
          <table className="admin-table admin-invoices-table">
            <thead>
              <tr>
                <th>Company</th>
                <th>Invoice #</th>
                <th>Month</th>
                <th>Amount</th>
                <th>Due Date</th>
                <th>Payment Status</th>
                <th>Outstanding</th>
                <th>
                  <span className="sr-only">Actions</span>
                </th>
              </tr>
            </thead>
            <tbody>
              {rows.map((invoice) => (
                <tr key={invoice.id}>
                  <td>{invoice.company}</td>
                  <td>
                    <Button
                      variant="link"
                      className="admin-invoice-id"
                      onClick={() => setDetail(invoice)}
                    >
                      {invoice.id}
                    </Button>
                  </td>
                  <td>{invoice.month}</td>
                  <td className="admin-number">{formatMoney(invoice.amount)}</td>
                  <td>{invoice.dueDate}</td>
                  <td>
                    <StatusBadge status={invoice.status} />
                  </td>
                  <td className={`admin-balance text-${invoice.status.toLowerCase()}`}>
                    {formatMoney(invoice.outstanding)}
                  </td>
                  <td>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button
                          variant="ghost"
                          size="icon"
                          aria-label={`Actions for ${invoice.id}`}
                        >
                          <MoreVertical size={17} />
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent className="admin-surface" align="end">
                        <DropdownMenuItem onSelect={() => setDetail(invoice)}>
                          View invoice
                        </DropdownMenuItem>
                        <DropdownMenuItem onSelect={() => exportInvoice(invoice)}>
                          <Download />
                          Download CSV
                        </DropdownMenuItem>
                        {invoice.status !== "Paid" && (
                          <DropdownMenuItem onSelect={() => markPaid(invoice.id)}>
                            <CircleCheck />
                            Mark as paid
                          </DropdownMenuItem>
                        )}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          {rows.length === 0 && (
            <div className="admin-empty">
              <Search size={28} />
              <h2>No invoices found</h2>
              <p>There are no matching records.</p>
              <Button
                variant="outline"
                onClick={() => {
                  setQuery("");
                  setCompany("all");
                  setMonth("all");
                  setPage(1);
                }}
              >
                Reset filters
              </Button>
            </div>
          )}
        </div>
        <div className="admin-pagination">
          <span>
            {filtered.length
              ? `Showing ${(currentPage - 1) * 7 + 1} to ${Math.min(currentPage * 7, filtered.length)} of ${filtered.length} invoices`
              : "0 invoices"}
          </span>
          <div>
            <Button
              variant="ghost"
              size="icon"
              aria-label="Previous page"
              disabled={currentPage === 1}
              onClick={() => setPage(currentPage - 1)}
            >
              <ChevronLeft />
            </Button>
            {Array.from({ length: pageCount }, (_, i) => i + 1)
              .filter(
                (number) =>
                  number === 1 || number === pageCount || Math.abs(number - currentPage) <= 1,
              )
              .map((number, index, numbers) => (
                <span className="admin-page-number" key={number}>
                  {index > 0 && number - (numbers[index - 1] ?? 0) > 1 && (
                    <span className="admin-page-ellipsis">…</span>
                  )}
                  <Button
                    variant={number === currentPage ? "default" : "ghost"}
                    size="icon"
                    aria-label={`Page ${number}`}
                    aria-current={number === currentPage ? "page" : undefined}
                    onClick={() => setPage(number)}
                  >
                    {number}
                  </Button>
                </span>
              ))}
            <Button
              variant="ghost"
              size="icon"
              aria-label="Next page"
              disabled={currentPage === pageCount}
              onClick={() => setPage(currentPage + 1)}
            >
              <ChevronRight />
            </Button>
          </div>
        </div>
      </section>
      <Dialog
        open={detail !== null}
        onOpenChange={(open) => {
          if (!open) setDetail(null);
        }}
      >
        <DialogContent className="admin-surface admin-dialog">
          <DialogHeader>
            <DialogTitle>Invoice details</DialogTitle>
            <DialogDescription>{detail?.id}</DialogDescription>
          </DialogHeader>
          {detail && (
            <>
              <dl className="admin-invoice-details">
                <dt>Company</dt>
                <dd>{detail.company}</dd>
                <dt>Month</dt>
                <dd>{detail.month}</dd>
                <dt>Amount</dt>
                <dd>{formatMoney(detail.amount)}</dd>
                <dt>Due date</dt>
                <dd>{detail.dueDate}</dd>
                <dt>Status</dt>
                <dd>
                  <StatusBadge status={detail.status} />
                </dd>
                <dt>Outstanding</dt>
                <dd>{formatMoney(detail.outstanding)}</dd>
              </dl>
              <Button onClick={() => exportInvoice(detail)}>
                <Download />
                Download invoice
              </Button>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}
