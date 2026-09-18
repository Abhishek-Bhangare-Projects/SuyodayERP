# 🧠 Memory.md — Agent Context File
## Suryoday Industries ERP (React Frontend)

> **Purpose**: This file holds persistent memory of all key decisions, architecture, conversations, and project context for any AI agent (new or continuing) working on this codebase. Always read this file first before making changes.

---

## 📌 Project Identity

| Field             | Value                                          |
|-------------------|------------------------------------------------|
| **Project Name**  | Suryoday Industries ERP                        |
| **Type**          | Frontend Web App (React + TypeScript)          |
| **Root Path**     | `c:\Users\sai\Desktop\SuyodayERP\`             |
| **Dev Server**    | `http://localhost:5173` (Vite, `npm run dev`)  |
| **Entry Point**   | `src/main.tsx` → `src/App.tsx`                 |
| **Default Login** | `admin@suryoday.com` / any password (dev mode) |
| **Post-login URL**| `/master/dashboard`                            |

---

## 🏗️ Tech Stack

| Layer           | Technology                                      |
|-----------------|-------------------------------------------------|
| UI Framework    | React 18/19 + TypeScript + Vite                |
| Component Lib   | Material-UI (MUI) v6                           |
| State Mgmt      | Redux Toolkit (`authSlice`)                    |
| Routing         | React Router v6                                |
| Forms           | React Hook Form                                |
| HTTP Client     | Axios (custom `axiosClient.ts` with interceptor)|
| Date Handling   | Day.js                                         |
| Dev Server Port | 5173                                           |

---

## 📁 Critical File Locations

| File / Folder                                          | Purpose                                            |
|--------------------------------------------------------|----------------------------------------------------|
| `src/pages/master/dashboard/DashboardSideDrawer.tsx`  | **Main ERP Sidebar Navbar** — all menus live here  |
| `src/routes/routes.tsx`                               | **All app routes** — 44 ERP routes registered      |
| `src/pages/master/dashboard/DashboardLayout.tsx`      | App shell layout (top bar + sidebar + `<Outlet>`)  |
| `src/pages/master/login/Login.tsx`                    | Login page with sliding background images          |
| `src/pages/Navbar/`                                   | **All ERP module page stubs** (ready to implement) |
| `src/icons/Icons.ts`                                  | All MUI icon imports & named keys                  |
| `src/muiComponents/`                                  | Shared atomic MUI wrappers (always use these)      |
| `src/commonComponents/`                               | High-level shared UI (Catalog, FormBuilder, etc.)  |
| `src/redux/authSlice.ts`                              | Auth state: token, user, logout action             |
| `src/theme/theme.ts`                                  | Brand colors, typography, component overrides      |
| `src/hooks/usePermission.ts`                          | RBAC: `canRead`, `canCreate`, etc.                 |
| `src/axios/apiClient.ts`                              | REST helpers: `get`, `post`, `put`, `patch`, `del` |
| `src/url/url.ts`                                      | All backend API endpoint constants                 |
| `old_project/Index.md`                                | Original PHP ERP navigation reference (source of truth for menu structure) |
| `CHANGES.md`                                          | Full project architecture & changelog              |

---

## 🧭 Navbar Architecture

The sidebar is driven by the `erpNavigation: MenuItem[]` array in `DashboardSideDrawer.tsx`. It is a flat array of top-level items that may contain `children[]`.

### Menu Structure (Admin / Head Office)
```
Dashboard          → /master/dashboard
Master ▼           (12 children)
  ├ Po Item Master        → /master/po-item
  ├ Item Master           → /master/item
  ├ Item Category         → /master/item-category
  ├ Unit Master           → /master/unit
  ├ PO Master             → /master/po
  ├ pur customers Master  → /master/pur-customers
  ├ Hsn Master            → /master/hsn
  ├ Employee              → /master/employee
  ├ Supplier Details      → /master/supplier-details
  ├ Customer Master       → /master/customer
  ├ PO Closing            → /master/po-closing
  └ Add Bom               → /master/add-bom
Inward             → /inward
Purchase ▼         (4 children)
  ├ Purchase Inward       → /purchase/inward
  ├ Purchase order        → /purchase/order
  ├ Purchase Return       → /purchase/return
  └ Purchases Outword     → /purchase/outward
OutWard            → /outward
Reports ▼          (12 children)
  ├ Po Stock                          → /reports/po-stock
  ├ Datewise Po Stock                 → /reports/datewise-po-stock
  ├ Purchase Stock                    → /reports/purchase-stock
  ├ Outword summary Report            → /reports/outward-summary
  ├ Itemwise Outword summary Report   → /reports/itemwise-outward-summary
  ├ Inword summary Report             → /reports/inward-summary
  ├ Itemwise Inword summary Report    → /reports/itemwise-inward-summary
  ├ Itemwise Purchase summary Report  → /reports/itemwise-purchase-summary
  ├ Purchase summary Report           → /reports/purchase-summary
  ├ Customer Details                  → /reports/customer-details
  ├ Payment Received Report           → /reports/payment-received
  └ Outstanding payment report        → /reports/outstanding-payment
Setting ▼          (4 children)
  ├ Create User       → /setting/create-user
  ├ Tally Export      → /setting/tally-export
  ├ Barcode Print     → /setting/barcode-print
  └ Company Details   → /setting/company-details
Accounting ▼       (10 children)
  ├ Customer Payment Received Entry   → /accounting/customer-payment-received
  ├ Customer Entry                    → /accounting/customer-entry
  ├ Supplier Ledger                   → /accounting/supplier-ledger
  ├ Account                           → /accounting/account
  ├ Deposite Voucher                  → /accounting/deposit-voucher
  ├ Withdraw Voucher                  → /accounting/withdraw-voucher
  ├ Expences Details                  → /accounting/expenses-details
  ├ Customer Quotation                → /accounting/customer-quotation
  ├ Customer Ledger Record            → /accounting/customer-ledger-record
  └ Supplier Ledger Record            → /accounting/supplier-ledger-record
Sign Out           → dispatches logout() + navigate('/login')
```

### Sidebar Behaviors
- **Collapsible**: Sidebar width toggles between 280px (expanded) and 76px (icon-only).
- **Auto-expand**: Parent section auto-opens when current route matches a child path (`useEffect` + `location.pathname`).
- **Live Search**: TextField in sidebar header filters all menu items in real-time.
- **Child count badge**: `Chip` shows number of sub-items per expandable group.
- **Tooltip on collapse**: Hovering a collapsed icon shows the label.
- **Active state**: Blue highlight on current route, dot bullet on active child.
- **Mobile**: `variant="temporary"` on screens smaller than `md` breakpoint.

---

## 📄 Pages Folder Convention

All ERP module pages live under `src/pages/Navbar/` with this hierarchy:
```
src/pages/Navbar/<section>/<moduleName>/<ComponentName>.tsx
```

**Examples:**
- `src/pages/Navbar/master/poItemMaster/PoItemMaster.tsx`
- `src/pages/Navbar/reports/outwardSummary/OutwardSummaryReport.tsx`
- `src/pages/Navbar/accounting/depositVoucher/DepositVoucher.tsx`

> ⚠️ Do NOT put new module pages in `src/pages/master/`, `src/pages/accounting/` etc. — those old patterns were cleaned up. All new module pages go under `src/pages/Navbar/<section>/`.

### Relative Import Depth
Pages under `Navbar/<section>/<module>/` are **4 levels deep** from `src/`:
```ts
import MuiBox from '../../../../muiComponents/MuiBox';
import { Icons } from '../../../../icons/Icons';
```

---

## 🔌 Routing Convention

All routes are registered in `src/routes/routes.tsx`. The route tree structure:
```
/ → redirect to /login
/login → <Login />
[PrivateRoute]
  └── [DashboardLayout]   (top bar + sidebar shell)
      ├── /master/dashboard
      ├── /master/*         (12 routes)
      ├── /inward
      ├── /purchase/*       (4 routes)
      ├── /outward
      ├── /reports/*        (12 routes)
      ├── /setting/*        (4 routes)
      └── /accounting/*     (10 routes)
/* → <NotFound />
```

> **Rule**: Every time a new page is created under `src/pages/Navbar/`, its route must be added to `routes.tsx` under the `<DashboardLayout>` group.

---

## 🎨 Design System Rules

### Colors (from `src/theme/theme.ts`)
| Token               | Value       | Usage                    |
|---------------------|-------------|--------------------------|
| `primary.main`      | `#0284c7`   | Suryoday Brand Blue      |
| `primary.dark`      | `#0369a1`   | Hover states             |
| `secondary.main`    | `#f59e0b`   | Sunrise Amber accents    |
| `background.default`| `#f8fafc`   | App background           |
| `text.primary`      | `#0f172a`   | Headings                 |
| `text.secondary`    | `#64748b`   | Subtext, labels          |

### MUI Component Usage Rules
- **NEVER** use raw MUI components directly. Always use the wrappers from `src/muiComponents/`.
- Use `MuiBox` (not `Box`), `MuiButton` (not `Button`), `MuiTextInput` (not `TextField`), etc.
- Exception: Simple layout-only components like `Typography`, `Collapse`, `List`, `ListItemButton` may be used directly.

### Icon Usage
All icons come from `src/icons/Icons.ts`:
```ts
import { Icons } from '../../../../icons/Icons';
const MyIcon = Icons.dashboardIcon;
return <MyIcon fontSize="small" />;
```

---

## 🔐 Authentication Flow

1. User submits login form → `loginUserAPI()` called
2. On success → `dispatch(setCredentials({ token, user }))` → stored in Redux + localStorage
3. Navigate to `/master/dashboard`
4. `PrivateRoute` checks `token` from Redux; if missing → redirect to `/login`
5. On 401 from API → `axiosClient.ts` interceptor auto-dispatches `logout()` + redirect
6. "Sign Out" button in sidebar → `dispatch(logout())` + `navigate('/login')`

### User object shape (from Redux `authSlice`):
```ts
{
  fullName: string;
  email: string;
  role: 'SUPER_ADMIN' | 'ADMIN' | string;
  permissions?: string[];  // e.g. ['dashboard:read', 'master:*']
}
```

### Permission check:
```ts
const { canRead, canCreate } = usePermission();
if (canRead('po_item')) { ... }
```
> In dev mode, `SUPER_ADMIN` role bypasses all permission checks.

---

## 📦 How to Implement a New Page (Step-by-Step)

When the user says "implement the [X] page":

1. **Find the stub** → `src/pages/Navbar/<section>/<module>/<Component>.tsx`
2. **The route already exists** in `routes.tsx` — do not add a duplicate
3. **The sidebar link already exists** in `DashboardSideDrawer.tsx` — do not modify
4. **Build the page**:
   - For list/catalog view: wrap `<DesktopCatalog>` from `src/commonComponents/catalog/`
   - For create/edit forms: use `<FormBuilder>` + `<FormCardSection>` from `src/commonComponents/form/`
5. **Create API file** → `<Component>API.ts` beside the component (use `apiClient` helpers)
6. **Create entity types** → `<Component>Entity.ts` beside the component

---

## 🗂️ Source Reference (Old PHP Project)

The `old_project/Index.md` file contains the complete menu analysis of the original PHP ERP system. It documents:
- All navigation routes from `navigation.php`
- Role-based nav: **Admin** (`branchid <= 0`) vs **Branch** (`branchid > 0`)
- Original PHP filenames mapped to their functional purpose

> This file is the **source of truth** for understanding what each ERP module is supposed to do. Consult it before implementing any module's business logic.

---

## 🗓️ Session History

| Date         | What Happened                                                                              |
|--------------|--------------------------------------------------------------------------------------------|
| 2026-09-17 AM | Session 1: Project bootstrapped. Login page designed (split-screen with sliding images). Dashboard with KPI cards, pipeline chart, distribution card, and activity feed built. |
| 2026-09-17 PM | Session 2: `old_project/Index.md` analyzed. Full ERP navbar built in `DashboardSideDrawer.tsx` with all 7 menu sections, submenus, search, auto-expand, and sign-out. 44 page stubs created. Routes registered. Icons.ts expanded. |
| 2026-09-17 PM | Session 3: All 44 stub files reorganized from scattered directories into `src/pages/Navbar/<section>/` hierarchy. Import paths corrected. Old directories deleted. `routes.tsx` imports updated. 0 TypeScript errors. `CHANGES.md` and `Memory.md` created/updated. |

---

## ⚠️ Known Conventions & Gotchas

1. **Dashboard route** is at `/master/dashboard`, not `/dashboard`. The sidebar navigates there.
2. **`DashboardLayout` is NOT under `/master/`** in the route tree — it wraps all protected routes at the top level.
3. **Old page directories** (`src/pages/accounting/`, `src/pages/inward/`, etc.) have been **deleted**. All module pages are under `src/pages/Navbar/`.
4. **`master/` folder** still contains `login/` and `dashboard/` — these are core layout components, not navbar module pages.
5. **Imports in Navbar pages** are 4 levels deep from `src/`: `../../../../muiComponents/...`
6. **Never import directly from MUI** in page files — always use `src/muiComponents/` wrappers.
7. **`erpNavigation`** (the sidebar menu array) is exported from `DashboardSideDrawer.tsx`. Do not create a separate navigation config file.
8. **TypeScript strict mode** is on. All props must be typed. No `any` unless absolutely necessary.
