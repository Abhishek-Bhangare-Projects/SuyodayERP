# Suryoday Industries ERP - Project Setup & Architecture Documentation

## 1. Overview

This document provides a comprehensive log of the project initialization, folder structure, and common reusable component ecosystem built for the **Suryoday Industries ERP** frontend application.

The project is built on **React 18/19**, **TypeScript**, **Vite**, **Material-UI (MUI)**, **Redux Toolkit**, **React Router v6**, **React Hook Form**, and **Axios**, adapting and modernizing reusable design patterns and common components from our prior reference projects.

---

## 2. Directory Structure

```
SuyodayERP/
├── .gitignore                      # Git ignored files (node_modules, dist, .env, etc.)
├── index.html                      # HTML entry point with Plus Jakarta Sans & Inter typography
├── package.json                    # Project dependencies & build scripts
├── tsconfig.json                   # Root TypeScript project reference
├── tsconfig.app.json               # Frontend application TypeScript configuration
├── tsconfig.node.json              # Vite/Node TypeScript configuration
├── vite.config.ts                  # Vite config with '@/' path aliases
├── CHANGES.md                      # Project setup & architectural changes documentation
├── Memory.md                       # Agent memory file: full project context for AI agents
├── old_project/
│   └── Index.md                    # Original PHP navigation analysis & route mapping reference
└── src/
    ├── App.tsx                     # Main router wrapper component
    ├── main.tsx                    # Application bootstrap with Redux, Theme, and Query providers
    ├── index.css                   # Global reset and custom scrollbar styles
    ├── vite-env.d.ts               # Vite client environment definitions
    │
    ├── assets/                     # Static images, brand logos, and icons
    │
    ├── axios/                      # HTTP client configuration
    │   ├── apiClient.ts            # Convenient REST helper (get, post, put, patch, delete)
    │   └── axiosClient.ts          # Axios instance with auth bearer token interceptor & 401 redirect
    │
    ├── commonComponents/           # High-level business & enterprise components
    │   ├── DeleteConfimationDialog.tsx  # Modal confirmation dialog for delete operations
    │   ├── DocumentUpload.tsx           # File uploader with preview modal (PDF, images, video)
    │   ├── InfiniteScroll.tsx           # Intersection-observer scroll loader
    │   ├── catalog/
    │   │   ├── CatalogPage.tsx     # Generic wrapper for catalog tables
    │   │   ├── DesktopCatalog.tsx  # Full-featured DataGrid catalog (debounce search, paging, actions)
    │   │   └── ReportCatalog.tsx   # Read-only reporting data grid
    │   └── form/
    │       ├── FormBuilder.tsx     # Schema-driven multi-section dynamic form engine
    │       ├── FormCardSection.tsx # Card container for form field groupings
    │       └── types.ts            # Form builder and section type contracts
    │
    ├── hooks/                      # Custom application hooks
    │   ├── reduxHooks.ts           # Typed `useAppDispatch` and `useAppSelector`
    │   └── usePermission.ts        # RBAC resource-action permission validator
    │
    ├── icons/
    │   └── Icons.ts                # Centralized MUI Icon dictionary (expanded with ERP icons)
    │
    ├── muiComponents/              # Standardized atomic MUI wrapper components
    │   ├── MuiAccordian.tsx        # Styled expandable accordion
    │   ├── MuiAppBar.tsx           # Enterprise top bar with profile dropdown & notification badge
    │   ├── MuiAvatar.tsx           # User avatar with initial generator
    │   ├── MuiBox.tsx              # Box container
    │   ├── MuiButton.tsx           # Primary/outlined action button
    │   ├── MuiCard.tsx             # Standardized rounded card
    │   ├── MuiCheckBox.tsx         # Checkbox with label integration
    │   ├── MuiChip.tsx             # Rounded tag chip
    │   ├── MuiDatePicker.tsx       # Dayjs localization-integrated date picker
    │   ├── MuiDrawer.tsx           # Sidebar drawer wrapper
    │   ├── MuiGrid.tsx             # Responsive grid container/item (MUI Grid2)
    │   ├── MuiIconButton.tsx       # Icon button with tooltip wrapper
    │   ├── MuiLoader.tsx           # Centered circular loader
    │   ├── MuiMultiSelect.tsx      # Checkbox multi-select dropdown with chip display
    │   ├── MuiNumberInput.tsx      # Numeric text input with decimal/min/max constraints
    │   ├── MuiPopUp.tsx            # Centered modal popup dialog
    │   ├── MuiSearchSelect.tsx     # Autocomplete searchable single-select
    │   ├── MuiSnackbar.tsx         # Toast notification alert banner
    │   ├── MuiStack.tsx            # Flexbox stack helper
    │   └── MuiTextInput.tsx        # Clean input with leading whitespace protection
    │
    ├── pages/
    │   ├── master/
    │   │   ├── login/
    │   │   │   ├── Login.tsx       # Branded Suryoday ERP split-screen login
    │   │   │   └── LoginAPI.ts     # Login API call handler
    │   │   └── dashboard/
    │   │       ├── Dashboard.tsx            # Cockpit operations overview page
    │   │       ├── DashboardLayout.tsx      # Master layout shell with top bar and responsive drawer
    │   │       ├── DashboardSideDrawer.tsx  # Full ERP sidebar with all 7 menu sections, search, submenus
    │   │       ├── DashboadAPI.ts           # Dashboard analytics API & mock fallback
    │   │       ├── DashboardEntity.ts       # TypeScript interfaces for dashboard data
    │   │       └── dashboardComponents/
    │   │           ├── DashboardKPISection.tsx          # Real-time KPI stat cards
    │   │           ├── ERPPipelineCard.tsx              # Manufacturing batch pipeline tracker
    │   │           ├── OperationsDistributionCard.tsx   # Inventory category breakdown
    │   │           └── RecentActivityCard.tsx           # Plant & audit log activity feed
    │   │
    │   ├── Navbar/                 # ★ NEW — All ERP module page stubs (see section 5 for full tree)
    │   │   ├── master/             # 12 sub-modules
    │   │   ├── inward/             # 1 sub-module
    │   │   ├── purchase/           # 4 sub-modules
    │   │   ├── outward/            # 1 sub-module
    │   │   ├── reports/            # 12 sub-modules
    │   │   ├── setting/            # 4 sub-modules
    │   │   └── accounting/         # 10 sub-modules
    │   │
    │   └── notFound/
    │       └── NotFound.tsx        # 404 Error fallback page
    │
    ├── redux/
    │   └── authSlice.ts            # Authentication state, tokens, and user profile slice
    │
    ├── routes/
    │   ├── PrivateRoutes.tsx       # Auth guard for protected routes
    │   └── routes.tsx              # Full ERP routing tree — 44 routes across 7 modules
    │
    ├── store/
    │   └── store.ts                # Redux Toolkit store setup
    │
    ├── theme/
    │   └── theme.ts                # Custom Suryoday Industries ERP palette & component overrides
    │
    ├── url/
    │   └── url.ts                  # Centralized API endpoint routing constants
    │
    └── utils/
        ├── CatalogPermission.ts    # Helper to map permissions to catalog actions
        ├── helperFunctions.ts      # String sanitizers, currency formatters, date parsers
        └── media.ts                # Media URL resolver
```

---

## 3. Summary of Changes Made

### A. Environment & Build Configuration
1. Created `package.json` with scripts for `dev`, `build`, `lint`, and `preview`.
2. Created `tsconfig.json`, `tsconfig.app.json` (with `@/*` path mapping and `vite/client` types), and `tsconfig.node.json`.
3. Created `vite.config.ts` configured for port `5173`.
4. Created `.gitignore` ignoring build directories, node modules, environment files, and IDE caches.

### B. UI Foundation & Theme
1. **Design System**: Implemented [theme.ts](file:///c:/Users/sai/Desktop/SuyodayERP/src/theme/theme.ts) with Suryoday Brand Blue (`#0284c7`), Sunrise Amber (`#f59e0b`), Slate text hierarchy, and custom component style overrides.
2. **Typography**: Configured Google Fonts *Plus Jakarta Sans* and *Inter* in `index.html` and `index.css`.
3. **Icons**: Centralized [Icons.ts](file:///c:/Users/sai/Desktop/SuyodayERP/src/icons/Icons.ts) — extended in Session 3 with ERP-domain icons (`inwardIcon`, `purchaseIcon`, `outwardIcon`, `reportsIcon`, `accountingIcon`, `logoutIcon`, `qrCodeIcon`, `bankIcon`, etc.).

### C. Standardized Atomic Components (`src/muiComponents/`)
- All 20 base MUI wrapper components created to ensure consistent padding, borders, shadows, and TypeScript interfaces across the entire codebase.

### D. Reusable Enterprise Common Components (`src/commonComponents/`)
- **Data Catalog (`DesktopCatalog.tsx`)**: Search debounce, server/client pagination, custom row actions (view, edit, delete, extra action buttons), and confirmation dialogs.
- **Dynamic Form Engine (`FormBuilder.tsx` & `FormCardSection.tsx`)**: Auto-manages `add`, `edit`, and `view` modes with `react-hook-form` validation, error mapping, and loading state overlays.
- **File Upload (`DocumentUpload.tsx`)**: File picker with preview dialog for documents, images, and videos.
- **Infinite Scroll (`InfiniteScroll.tsx`)**: Viewport observer for progressive loading.

### E. Authentication & Navigation
- **Redux Auth**: Token storage in `localStorage`, user session state, and automatic logout upon 401 response in `axiosClient.ts`.
- **Login Screen**: Split-screen design with Suryoday Industries hero branding, sliding background images, validation, and demo/live login dispatch.
- **Dashboard & Drawer**: Collapsible responsive navigation drawer with role-based visibility, top bar with user profile dropdown, and modular cockpit KPI widgets.

### F. ★ Full ERP Navbar — Session 2 & 3 (2026-09-17)

> **Source Reference**: `old_project/Index.md` — Analyzed the original PHP-based Retailminds ERP navigation (`navigation.php`) and mapped all menu headers, sub-items, and target routes to the new React architecture.

#### F.1 — DashboardSideDrawer Rebuild
The old placeholder `erpNavigationSections` array was fully replaced with a production-ready `erpNavigation: MenuItem[]` array covering **7 top-level menu sections** with **44 navigable routes**:

| Menu Section   | Sub-Items | Route Prefix       |
|----------------|-----------|--------------------|
| Dashboard      | –         | `/master/dashboard`|
| Master         | 12        | `/master/*`        |
| Inward         | –         | `/inward`          |
| Purchase       | 4         | `/purchase/*`      |
| OutWard        | –         | `/outward`         |
| Reports        | 12        | `/reports/*`       |
| Setting        | 4         | `/setting/*`       |
| Accounting     | 10        | `/accounting/*`    |

New features added to the sidebar:
- **Live Search Filter**: `TextField` in the sidebar that filters both top-level and sub-items in real-time.
- **Auto-expand**: Parent section auto-expands when the current route matches a child path (via `useEffect` + `location.pathname`).
- **Sub-item count badge**: `Chip` showing number of children per accordion group.
- **Active state indicator**: Dot bullet for active child, highlighted parent.
- **Tooltip support**: Shows label on hover when sidebar is collapsed.
- **Sign Out button**: Bottom-pinned with `logout` Redux dispatch + redirect to `/login`.

#### F.2 — Page Stub Files Created (44 files)
All pages created as simple heading-only TSX stubs for future implementation, organized under `src/pages/Navbar/`:

```
src/pages/Navbar/
├── master/           (12 files)
│   ├── poItemMaster/     PoItemMaster.tsx
│   ├── itemMaster/       ItemMaster.tsx
│   ├── itemCategory/     ItemCategory.tsx
│   ├── unitMaster/       UnitMaster.tsx
│   ├── poMaster/         PoMaster.tsx
│   ├── purCustomersMaster/ PurCustomersMaster.tsx
│   ├── hsnMaster/        HsnMaster.tsx
│   ├── employee/         EmployeeMaster.tsx
│   ├── supplierDetails/  SupplierDetails.tsx
│   ├── customerMaster/   CustomerMaster.tsx
│   ├── poClosing/        PoClosing.tsx
│   └── addBom/           AddBom.tsx
├── inward/           (1 file)
│   └── inwardEntry/      InwardEntry.tsx
├── purchase/         (4 files)
│   ├── purchaseInward/   PurchaseInward.tsx
│   ├── purchaseOrder/    PurchaseOrder.tsx
│   ├── purchaseReturn/   PurchaseReturn.tsx
│   └── purchasesOutward/ PurchasesOutward.tsx
├── outward/          (1 file)
│   └── outwardEntry/     OutwardEntry.tsx
├── reports/          (12 files)
│   ├── poStock/                      PoStockReport.tsx
│   ├── datewisePoStock/              DatewisePoStockReport.tsx
│   ├── purchaseStock/                PurchaseStockReport.tsx
│   ├── outwardSummary/               OutwardSummaryReport.tsx
│   ├── itemwiseOutwardSummary/       ItemwiseOutwardSummaryReport.tsx
│   ├── inwardSummary/                InwardSummaryReport.tsx
│   ├── itemwiseInwardSummary/        ItemwiseInwardSummaryReport.tsx
│   ├── itemwisePurchaseSummary/      ItemwisePurchaseSummaryReport.tsx
│   ├── purchaseSummary/              PurchaseSummaryReport.tsx
│   ├── customerDetails/              CustomerDetailsReport.tsx
│   ├── paymentReceived/              PaymentReceivedReport.tsx
│   └── outstandingPayment/           OutstandingPaymentReport.tsx
├── setting/          (4 files)
│   ├── createUser/       CreateUser.tsx
│   ├── tallyExport/      TallyExport.tsx
│   ├── barcodePrint/     BarcodePrint.tsx
│   └── companyDetails/   CompanyDetails.tsx
└── accounting/       (10 files)
    ├── customerPaymentReceived/ CustomerPaymentReceived.tsx
    ├── customerEntry/           CustomerLedgerEntry.tsx
    ├── supplierLedger/          SupplierLedger.tsx
    ├── accountMaster/           AccountMaster.tsx
    ├── depositVoucher/          DepositVoucher.tsx
    ├── withdrawVoucher/         WithdrawVoucher.tsx
    ├── expensesDetails/         ExpensesDetails.tsx
    ├── customerQuotation/       CustomerQuotation.tsx
    ├── customerLedgerRecord/    CustomerLedgerRecord.tsx
    └── supplierLedgerRecord/    SupplierLedgerRecord.tsx
```

#### F.3 — Routes Updated (`src/routes/routes.tsx`)
- All 44 module routes registered under the `<DashboardLayout />` shell.
- All imports updated to point to `src/pages/Navbar/` hierarchy.
- TypeScript compiles with **0 errors**.

---

## 4. Route Reference Table

| Route Path                                 | Component                        | Module     |
|--------------------------------------------|----------------------------------|------------|
| `/master/dashboard`                        | `Dashboard`                      | Dashboard  |
| `/master/po-item`                          | `PoItemMaster`                   | Master     |
| `/master/item`                             | `ItemMaster`                     | Master     |
| `/master/item-category`                    | `ItemCategory`                   | Master     |
| `/master/unit`                             | `UnitMaster`                     | Master     |
| `/master/po`                               | `PoMaster`                       | Master     |
| `/master/pur-customers`                    | `PurCustomersMaster`             | Master     |
| `/master/hsn`                              | `HsnMaster`                      | Master     |
| `/master/employee`                         | `EmployeeMaster`                 | Master     |
| `/master/supplier-details`                 | `SupplierDetails`                | Master     |
| `/master/customer`                         | `CustomerMaster`                 | Master     |
| `/master/po-closing`                       | `PoClosing`                      | Master     |
| `/master/add-bom`                          | `AddBom`                         | Master     |
| `/inward`                                  | `InwardEntry`                    | Inward     |
| `/purchase/inward`                         | `PurchaseInward`                 | Purchase   |
| `/purchase/order`                          | `PurchaseOrder`                  | Purchase   |
| `/purchase/return`                         | `PurchaseReturn`                 | Purchase   |
| `/purchase/outward`                        | `PurchasesOutward`               | Purchase   |
| `/outward`                                 | `OutwardEntry`                   | OutWard    |
| `/reports/po-stock`                        | `PoStockReport`                  | Reports    |
| `/reports/datewise-po-stock`               | `DatewisePoStockReport`          | Reports    |
| `/reports/purchase-stock`                  | `PurchaseStockReport`            | Reports    |
| `/reports/outward-summary`                 | `OutwardSummaryReport`           | Reports    |
| `/reports/itemwise-outward-summary`        | `ItemwiseOutwardSummaryReport`   | Reports    |
| `/reports/inward-summary`                  | `InwardSummaryReport`            | Reports    |
| `/reports/itemwise-inward-summary`         | `ItemwiseInwardSummaryReport`    | Reports    |
| `/reports/itemwise-purchase-summary`       | `ItemwisePurchaseSummaryReport`  | Reports    |
| `/reports/purchase-summary`                | `PurchaseSummaryReport`          | Reports    |
| `/reports/customer-details`                | `CustomerDetailsReport`          | Reports    |
| `/reports/payment-received`                | `PaymentReceivedReport`          | Reports    |
| `/reports/outstanding-payment`             | `OutstandingPaymentReport`       | Reports    |
| `/setting/create-user`                     | `CreateUser`                     | Setting    |
| `/setting/tally-export`                    | `TallyExport`                    | Setting    |
| `/setting/barcode-print`                   | `BarcodePrint`                   | Setting    |
| `/setting/company-details`                 | `CompanyDetails`                 | Setting    |
| `/accounting/customer-payment-received`    | `CustomerPaymentReceived`        | Accounting |
| `/accounting/customer-entry`               | `CustomerLedgerEntry`            | Accounting |
| `/accounting/supplier-ledger`              | `SupplierLedger`                 | Accounting |
| `/accounting/account`                      | `AccountMaster`                  | Accounting |
| `/accounting/deposit-voucher`              | `DepositVoucher`                 | Accounting |
| `/accounting/withdraw-voucher`             | `WithdrawVoucher`                | Accounting |
| `/accounting/expenses-details`             | `ExpensesDetails`                | Accounting |
| `/accounting/customer-quotation`           | `CustomerQuotation`              | Accounting |
| `/accounting/customer-ledger-record`       | `CustomerLedgerRecord`           | Accounting |
| `/accounting/supplier-ledger-record`       | `SupplierLedgerRecord`           | Accounting |

---

## 5. How to Add Future Modules / Pages

When implementing upcoming ERP pages (building on the existing stubs):
1. **Open the stub** under `src/pages/Navbar/<section>/<moduleName>/<Component>.tsx`
2. **Implement the UI** using:
   - Listing screens: `<DesktopCatalog ... />` or `<CatalogPage ... />`
   - Create/edit screens: `<FormBuilder ... />` with `<FormCardSection>`
3. **Route is already registered** in [src/routes/routes.tsx](file:///c:/Users/sai/Desktop/SuyodayERP/src/routes/routes.tsx) — no changes needed.
4. **Sidebar link is already present** in [DashboardSideDrawer.tsx](file:///c:/Users/sai/Desktop/SuyodayERP/src/pages/master/dashboard/DashboardSideDrawer.tsx) — no changes needed.
5. **Add API file** as `<ModuleName>API.ts` alongside the component.
6. **Add entity types** as `<ModuleName>Entity.ts` alongside the component.

---

## 6. Changelog

| Date         | Session | Changes                                                                         |
|--------------|---------|---------------------------------------------------------------------------------|
| 2026-09-17   | 1       | Project init, theme, MUI components, auth, login, dashboard KPI widgets         |
| 2026-09-17   | 2       | Full ERP navbar built from `old_project/Index.md`, 44 route stubs created       |
| 2026-09-17   | 3       | All Navbar pages reorganized into `src/pages/Navbar/` hierarchy, routes updated |
