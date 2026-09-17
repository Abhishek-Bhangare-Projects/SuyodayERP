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
    │   └── Icons.ts                # Centralized MUI Icon dictionary
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
    │   │       ├── DashboardSideDrawer.tsx  # Collapsible ERP navigation drawer
    │   │       ├── DashboadAPI.ts           # Dashboard analytics API & mock fallback
    │   │       ├── DashboardEntity.ts       # TypeScript interfaces for dashboard data
    │   │       └── dashboardComponents/
    │   │           ├── DashboardKPISection.tsx          # Real-time KPI stat cards
    │   │           ├── ERPPipelineCard.tsx              # Manufacturing batch pipeline tracker
    │   │           ├── OperationsDistributionCard.tsx   # Inventory category breakdown
    │   │           └── RecentActivityCard.tsx           # Plant & audit log activity feed
    │   └── notFound/
    │       └── NotFound.tsx        # 404 Error fallback page
    │
    ├── redux/
    │   └── authSlice.ts            # Authentication state, tokens, and user profile slice
    │
    ├── routes/
    │   ├── PrivateRoutes.tsx       # Auth guard for protected routes
    │   └── routes.tsx              # App routing tree (public login, master layout, 404)
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
3. **Icons**: Set up centralized [Icons.ts](file:///c:/Users/sai/Desktop/SuyodayERP/src/icons/Icons.ts) covering action icons, navigation, and ERP industrial domains.

### C. Standardized Atomic Components (`src/muiComponents/`)
- All 20 base MUI wrapper components created to ensure consistent padding, borders, shadows, and TypeScript interfaces across the entire codebase.

### D. Reusable Enterprise Common Components (`src/commonComponents/`)
- **Data Catalog (`DesktopCatalog.tsx`)**: Search debounce, server/client pagination, custom row actions (view, edit, delete, extra action buttons), and confirmation dialogs.
- **Dynamic Form Engine (`FormBuilder.tsx` & `FormCardSection.tsx`)**: Auto-manages `add`, `edit`, and `view` modes with `react-hook-form` validation, error mapping, and loading state overlays.
- **File Upload (`DocumentUpload.tsx`)**: File picker with preview dialog for documents, images, and videos.
- **Infinite Scroll (`InfiniteScroll.tsx`)**: Viewport observer for progressive loading.

### E. Authentication & Navigation
- **Redux Auth**: Token storage in `localStorage`, user session state, and automatic logout upon 401 response in `axiosClient.ts`.
- **Login Screen**: Split-screen design with Suryoday Industries hero branding, validation, and demo/live login dispatch.
- **Dashboard & Drawer**: Collapsible responsive navigation drawer with role-based visibility, top bar with user profile dropdown, and modular cockpit KPI widgets.

---

## 4. How to Add Future Modules / Pages

When implementing upcoming ERP pages (e.g., *Products*, *Inventory*, *Manufacturing*, *Users*):
1. **Create Page Folder**: Under `src/pages/master/<ModuleName>/`
2. **Use Common Components**:
   - For listing screens: Use `<DesktopCatalog ... />` or `<CatalogPage ... />`.
   - For create/edit screens: Use `<FormBuilder ... />` with `<FormCardSection>`.
3. **Add Route**: Register the route in [src/routes/routes.tsx](file:///c:/Users/sai/Desktop/SuyodayERP/src/routes/routes.tsx) under the `<DashboardLayout>` child routes.
4. **Add Navigation Link**: Add item in `erpNavigationSections` within [DashboardSideDrawer.tsx](file:///c:/Users/sai/Desktop/SuyodayERP/src/pages/master/dashboard/DashboardSideDrawer.tsx).
