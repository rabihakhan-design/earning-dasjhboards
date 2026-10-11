# Earnings Dashboard — Super Admin UI

Pages: Dashboard (/), Companies, Company Usage, Invoices, Outstanding Accounts.

## Run in VS Code
1. Install Node.js 20+ (https://nodejs.org)
2. Extract the ZIP, then VS Code > File > Open Folder
3. Terminal: `npm install`
4. `npm run dev` then open http://localhost:8080

Build: `npm run build`

Stack: TanStack Start + React 19, Tailwind v4, shadcn/ui, Recharts. Demo data lives in `src/components/admin/data.ts` (session only, not persisted).
