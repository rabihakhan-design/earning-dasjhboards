import { createContext, useContext, useEffect, useRef, useState, type ReactNode } from "react";
import { Link, useRouterState } from "@tanstack/react-router";
import {
  Bell,
  Building2,
  ChartNoAxesCombined,
  ChevronDown,
  ClipboardList,
  FileText,
  LayoutDashboard,
  Menu,
  PlusCircle,
  Search,
  Settings2,
  ShieldCheck,
  Truck,
  X,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { initialCompanies, initialInvoices, type Company, type Invoice } from "./data";

type AdminContextValue = {
  companies: Company[];
  invoices: Invoice[];
  globalSearch: string;
  addCompany: () => void;
  markPaid: (id: string) => void;
};
const AdminContext = createContext<AdminContextValue | null>(null);
export function useAdmin() {
  const context = useContext(AdminContext);
  if (!context) throw new Error("Admin controls require AdminShell");
  return context;
}
export function ProfileAvatar() {
  return (
    <span className="admin-avatar" aria-hidden="true">
      HK
      <span />
    </span>
  );
}
const navigation = [
  { to: "/" as const, label: "Dashboard", icon: LayoutDashboard },
  { to: "/companies" as const, label: "Companies", icon: Building2 },
  { to: "/company-usage" as const, label: "Company Usage", icon: ChartNoAxesCombined },
  { to: "/invoices" as const, label: "Invoices", icon: ClipboardList },
  { to: "/outstanding-accounts" as const, label: "Outstanding Accounts", icon: FileText },
];
export default function AdminShell({ children }: { children: ReactNode }) {
  const pathname = useRouterState({ select: (state) => state.location.pathname });
  const [mobileMenu, setMobileMenu] = useState(false);
  const [globalSearch, setGlobalSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const searchRef = useRef<HTMLInputElement>(null);
  const [companies, setCompanies] = useState(initialCompanies);
  const [invoices, setInvoices] = useState(initialInvoices);
  const [companyOpen, setCompanyOpen] = useState(false);
  const [profileOpen, setProfileOpen] = useState(false);
  const [notificationCount, setNotificationCount] = useState(3);
  const [notice, setNotice] = useState("");
  const searchResults = companies
    .filter((company) =>
      `${company.name} ${company.email}`.toLowerCase().includes(globalSearch.trim().toLowerCase()),
    )
    .slice(0, 5);
  useEffect(() => {
    function focusSearch(event: KeyboardEvent) {
      if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === "k") {
        event.preventDefault();
        searchRef.current?.focus();
      }
      if (event.key === "Escape") setSearchOpen(false);
    }
    document.addEventListener("keydown", focusSearch);
    return () => document.removeEventListener("keydown", focusSearch);
  }, []);
  function submitCompany(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const name = String(form.get("name") ?? "").trim();
    const email = String(form.get("email") ?? "").trim();
    if (!name || !email) return;
    setCompanies((previous) => [
      ...previous,
      {
        id: `c${Date.now()}`,
        name,
        email,
        drivers: Number(form.get("drivers") ?? 0),
        status: "Active",
      },
    ]);
    setCompanyOpen(false);
    setNotice(`${name} added to this session.`);
  }
  function markPaid(id: string) {
    setInvoices((previous) =>
      previous.map((invoice) =>
        invoice.id === id ? { ...invoice, status: "Paid", outstanding: 0 } : invoice,
      ),
    );
    setNotice("Invoice marked as paid for this session.");
  }
  return (
    <AdminContext.Provider
      value={{
        companies,
        invoices,
        globalSearch,
        addCompany: () => setCompanyOpen(true),
        markPaid,
      }}
    >
      <div className="admin-app">
        {mobileMenu && (
          <div className="admin-mobile-overlay" onClick={() => setMobileMenu(false)} />
        )}
        <aside className={`admin-sidebar ${mobileMenu ? "is-open" : ""}`}>
          <Link to="/" className="admin-brand" onClick={() => setMobileMenu(false)}>
            {pathname === "/" || pathname === "/company-usage"
              ? "Earnings Dashboard"
              : "Super Admin"}
          </Link>
          <nav className="admin-nav" aria-label="Main navigation">
            {navigation.map(({ to, label, icon: Icon }) => (
              <Button
                key={to}
                asChild
                variant="ghost"
                className={`admin-nav-link ${pathname === to ? "is-active" : ""}`}
              >
                <Link
                  to={to}
                  aria-current={pathname === to ? "page" : undefined}
                  onClick={() => setMobileMenu(false)}
                >
                  <Icon size={19} />
                  {label}
                </Link>
              </Button>
            ))}
          </nav>
          <div className="admin-sidebar-bottom">
            <Button variant="ghost" className="admin-account" onClick={() => setProfileOpen(true)}>
              <ProfileAvatar />
              <span className="admin-account-text">
                <strong>Hifza Kanwal</strong>
                <small>
                  <i />
                  Root Admin
                </small>
              </span>
              <Settings2 size={17} />
            </Button>
          </div>
        </aside>
        <div className="admin-workspace">
          <header className="admin-topbar">
            <Button
              size="icon"
              variant="ghost"
              className="admin-menu-toggle"
              aria-label={mobileMenu ? "Close navigation" : "Open navigation"}
              onClick={() => setMobileMenu(!mobileMenu)}
            >
              {mobileMenu ? <X /> : <Menu />}
            </Button>
            <div className="admin-global-search">
              <Search size={17} />
              <input
                ref={searchRef}
                aria-label="Search across companies and invoices"
                placeholder="Search tenants, databases, drivers, jobs..."
                value={globalSearch}
                onFocus={() => setSearchOpen(true)}
                onBlur={() => setSearchOpen(false)}
                onChange={(event) => {
                  setGlobalSearch(event.target.value);
                  setSearchOpen(true);
                }}
              />
              <kbd>⌘K</kbd>
              {searchOpen && globalSearch.trim() && (
                <div className="admin-search-results">
                  {searchResults.map((company) => (
                    <Link
                      key={company.id}
                      to="/companies"
                      onMouseDown={(event) => event.preventDefault()}
                      onClick={() => setSearchOpen(false)}
                    >
                      <Building2 size={15} />
                      {company.name}
                    </Link>
                  ))}
                  <Link
                    to="/invoices"
                    onMouseDown={(event) => event.preventDefault()}
                    onClick={() => setSearchOpen(false)}
                  >
                    <FileText size={15} />
                    Search invoices for “{globalSearch}”
                  </Link>
                </div>
              )}
            </div>
            <div className="admin-topbar-actions">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="admin-notification"
                    aria-label={`Notifications, ${notificationCount} unread`}
                  >
                    <Bell size={20} />
                    {notificationCount > 0 && <span>{notificationCount}</span>}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="admin-surface admin-notifications" align="end">
                  <DropdownMenuLabel>Notifications</DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/outstanding-accounts">3 accounts flagged for review</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/invoices">September invoices are ready</Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link to="/companies">Company directory updated</Link>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem onSelect={() => setNotificationCount(0)}>
                    Mark all as read
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
              <Button
                variant="ghost"
                className="admin-top-profile"
                onClick={() => setProfileOpen(true)}
              >
                <ProfileAvatar />
                <span>
                  <strong>Hifza Kanwal</strong>
                  <small>Super Admin</small>
                </span>
                <ChevronDown size={14} />
              </Button>
            </div>
          </header>
          <main className="admin-main">
            {notice && (
              <div className="admin-notice" role="status">
                <ShieldCheck size={17} />
                {notice}
                <Button
                  size="icon"
                  variant="ghost"
                  aria-label="Dismiss notification"
                  onClick={() => setNotice("")}
                >
                  <X size={15} />
                </Button>
              </div>
            )}
            {children}
          </main>
          <footer className="admin-footer">
            <span>© 2026 Earnings Dashboard</span>
            <span>
              All systems operational <i />
            </span>
          </footer>
        </div>
      </div>
      <Dialog open={companyOpen} onOpenChange={setCompanyOpen}>
        <DialogContent className="admin-surface admin-dialog">
          <DialogHeader>
            <DialogTitle>Add company</DialogTitle>
            <DialogDescription>Create a company in this preview session.</DialogDescription>
          </DialogHeader>
          <form className="admin-company-form" onSubmit={submitCompany}>
            <label>
              Company name
              <input name="name" placeholder="e.g. Northstar Logistics" required maxLength={80} />
            </label>
            <label>
              Email address
              <input type="email" name="email" placeholder="accounts@company.com" required />
            </label>
            <label>
              Number of drivers
              <input type="number" name="drivers" min="0" max="10000" defaultValue={0} required />
            </label>
            <Button type="submit">
              <PlusCircle />
              Add company
            </Button>
          </form>
        </DialogContent>
      </Dialog>
      <Dialog open={profileOpen} onOpenChange={setProfileOpen}>
        <DialogContent className="admin-surface admin-dialog">
          <DialogHeader>
            <DialogTitle>Admin profile</DialogTitle>
            <DialogDescription>Your workspace account</DialogDescription>
          </DialogHeader>
          <div className="admin-profile-details">
            <ProfileAvatar />
            <strong>Hifza Kanwal</strong>
            <span>Super Admin · Root Admin</span>
            <p>
              <ShieldCheck size={18} />
              Full workspace access
            </p>
            <p>
              <Truck size={18} />
              Expense Manager platform
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </AdminContext.Provider>
  );
}
