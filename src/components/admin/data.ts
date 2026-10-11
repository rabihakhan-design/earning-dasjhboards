export type PaymentStatus = "Paid" | "Due" | "Overdue";
export type Invoice = {
  id: string;
  company: string;
  month: string;
  amount: number;
  dueDate: string;
  status: PaymentStatus;
  outstanding: number;
};
export type Company = {
  id: string;
  name: string;
  email: string;
  drivers: number;
  status: "Active" | "Suspended";
};
export const initialCompanies: Company[] = [
  {
    id: "c1",
    name: "XYZ Transport",
    email: "accounts@xyztransport.com",
    drivers: 142,
    status: "Active",
  },
  { id: "c2", name: "UBK Towing", email: "accounts@ubktowing.com", drivers: 86, status: "Active" },
  ...Array.from({ length: 9 }, (_, i): Company => ({
    id: `c${i + 3}`,
    name: `Company ${String.fromCharCode(65 + i)}`,
    email: `accounts@company${String.fromCharCode(97 + i)}.com`,
    drivers: 48 + i * 12,
    status: i === 5 ? "Suspended" : "Active",
  })),
];
const amounts = [2450, 3280, 1850, 4120, 1940, 5600, 2800];
const dates = [
  "May 31, 2015",
  "August 2, 2013",
  "October 30, 2017",
  "December 29, 2012",
  "August 24, 2013",
  "April 28, 2016",
  "May 20, 2015",
];
export const initialInvoices: Invoice[] = Array.from({ length: 48 }, (_, i) => {
  const status: PaymentStatus = i % 3 === 0 ? "Paid" : i % 3 === 1 ? "Due" : "Overdue";
  const amount = amounts[i % amounts.length] ?? 2450;
  return {
    id: `INV-2026-09-${String(i + 1).padStart(3, "0")}`,
    company:
      i < 7
        ? "XYZ Transport"
        : i < 14
          ? "UBK Towing"
          : `Company ${String.fromCharCode(65 + (i % 9))}`,
    month: i < 35 ? "September 2026" : "August 2026",
    amount,
    dueDate: dates[i % dates.length] ?? "May 31, 2015",
    status,
    outstanding: status === "Paid" ? 0 : amount,
  };
});
export const usageData = [
  { name: "Company A", invoices: 340, label: "370%" },
  { name: "Company B", invoices: 490, label: "500%" },
  { name: "Company C", invoices: 425, label: "470%" },
  { name: "Company D", invoices: 178, label: "98%" },
  { name: "Company E", invoices: 332, label: "365%" },
  { name: "Company F", invoices: 156, label: "244%" },
  { name: "Company G", invoices: 422, label: "450%" },
  { name: "Company H", invoices: 315, label: "320%" },
  { name: "Company I", invoices: 310, label: "310%" },
];
export const outstandingAccounts = Array.from({ length: 6 }, (_, i) => ({
  id: `out-${i}`,
  company: "UBK Towing",
  period: i % 3 === 0 ? 4 : i % 3 === 1 ? 3 : 5,
  since: i % 3 === 0 ? "June 2026" : i % 3 === 1 ? "July 2026" : "May 2026",
  balance: i % 3 === 0 ? 9840 : i % 3 === 1 ? 6420 : 14200,
  status: (i % 3 === 0 ? "Overdue" : i % 3 === 1 ? "Paid" : "Due") as PaymentStatus,
}));
export const customerPayments = ["A", "B", "C", "D", "E", "F", "I", "J", "K", "L", "M"].map(
  (letter, i) => ({
    name: `Company ${letter}`,
    amount: [647, 837, 423, 950, 947, 635, 966, 312, 423, 960, 643][i] ?? 647,
  }),
);
export const formatMoney = (amount: number) =>
  new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(amount);
export function filterInvoices(invoices: Invoice[], query: string, company: string, month: string) {
  const terms = query.trim().toLowerCase().split(/\s+/).filter(Boolean);
  return invoices.filter(
    (invoice) =>
      (company === "all" || invoice.company === company) &&
      (month === "all" || invoice.month === month) &&
      terms.every((term) => `${invoice.id} ${invoice.company}`.toLowerCase().includes(term)),
  );
}
export function paginate<T>(items: T[], page: number, size = 7) {
  return items.slice((page - 1) * size, page * size);
}
