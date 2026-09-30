# Navigation Architecture & Routing Index

## 📌 Overview
This document analyzes [navigation.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/includes/navigation.php), which acts as the central menu and routing dispatch bar across the Retailminds ERP application.

### Session Role-Based Routing Architecture
Routing is conditionally rendered based on `$_SESSION['branchid']`:
1. **Branch Role (`$_SESSION['branchid'] > 0`)**: Tailored, streamlined navigation for branch-level operators (invoices, branch purchases, branch counter sales, local stock reports).
2. **Admin / Head Office Role (`$_SESSION['branchid'] <= 0` / Default)**: Full ERP access covering Master setup, Inward, Purchase workflows, Outward billing, Reports suite, Settings, and Complete Accounting ledger modules.

---

## 🧭 1. Admin / Head Office Navigation Flow (`branchid <= 0`)

| Menu Header | Menu Item Label | Target File / Route | Functional Purpose |
| :--- | :--- | :--- | :--- |
| **Dashboard** | Dashboard | [index.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/index.php) | Dashboard & summary overview |
| **Master** | Po Item Master | [record_POitem.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_POitem.php) | Manage purchase order raw items / materials |
| | Item Master | [record_item.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_item.php) | Finished & retail item catalog master |
| | Item Category | [icategory.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/icategory.php) | Product category hierarchy |
| | Unit Master | [unit.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/unit.php) | Units of measurement (KG, Ltr, Pcs, etc.) |
| | PO Master | [weightmaster.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/weightmaster.php) | Purchase order & packaging weight specifications |
| | pur customers Master | [frm_branchmster.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/frm_branchmster.php) | Branch master / purchase party setup |
| | Hsn Master | [hsnmaster.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/hsnmaster.php) | GST HSN / SAC codes & tax rates |
| | Employee | [employee.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/employee.php) | Staff & worker records |
| | Supplier Details | [record_supplier.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_supplier.php) | Vendor & supplier directory |
| | Customer Master | [record_customer.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_customer.php) | Customer client database |
| | PO Closing | [closing_po.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/closing_po.php) | Force close completed/pending PO orders |
| | Add Bom | [record_bomitem.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_bomitem.php) | Bill of Materials (BOM) recipe creation |
| **Inward** | Inward | [record_poinward.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_poinward.php) | Goods Receipt / PO inward material entry records |
| **Purchase** | Purchase Inward | [record_purinward.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_purinward.php) | Purchase inward invoice entries |
| | Purchase order | [record_purOrder.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_purOrder.php) | Issue new POs & view PO history |
| | Purchase Return | [purchasreturn.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/purchasreturn.php) | Debit note / goods return to supplier |
| | Purchases Outword | [record_brnchout.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_brnchout.php) | Dispatch stock / branch outward transfer |
| **OutWard** | OutWard | [record_salecounter.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_salecounter.php) | Sales counter, cash memo & GST outward billing |
| **Reports** | Po Stock | [report_Postock.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_Postock.php) | Current inventory level for raw PO materials |
| | Datewise Po Stock | [report_postockreg.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_postockreg.php) | Date-range filtered PO raw material ledger |
| | Purchase Stock | [report_stock.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_stock.php) | General warehouse purchase stock report |
| | Outword summary Report | [out_summaryreport.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/out_summaryreport.php) | Aggregated outward dispatches & sales summary |
| | Itemwise Outword summary Report | [itemwiseout_summaryreport.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/itemwiseout_summaryreport.php) | Outward delivery breakdown by product SKU |
| | Inword summary Report | [inword_summaryreport.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/inword_summaryreport.php) | Aggregated goods receipt & inward summary |
| | Itemwise Inword summary Report | [itemwiseinward_summaryreport.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/itemwiseinward_summaryreport.php) | Inward receiving breakdown by product SKU |
| | Itemwise Purchase summary Report | [itemwisepurch_summaryreport.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/itemwisepurch_summaryreport.php) | Supplier purchase history item-by-item |
| | Purchase summary Report | [purchaseinward_summaryreport.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/purchaseinward_summaryreport.php) | Total vendor bill & purchase invoice summary |
| | Customer Details | [report_customer.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_customer.php) | Customer directory, contact & transaction logs |
| | Payment Received Report | [report_paymentreceived.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_paymentreceived.php) | Collections and receipts audit log |
| | Outstanding payment report | [report_Outstanding_payment.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_Outstanding_payment.php) | Accounts receivable / dues collection report |
| **Setting** | Create User | [frmuser.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/frmuser.php) | User management & access credentials |
| | Tally Export | `#` (Static/Placeholder) | Accounting integration export link |
| | Barcode Print | [frm_bargen.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/frm_bargen.php) | Barcode label generation utility |
| | Company Details | [frm_comdetails.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/frm_comdetails.php) | Business profile, tax registration & address |
| **Accounting** | Customer Payment Received Entry | [cust_payreceved.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/cust_payreceved.php) | Cash/Bank receipt voucher against customers |
| | Customer Entry | [cust_ledger_entry.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/cust_ledger_entry.php) | Customer manual debit/credit journal adjustment |
| | Supplier Ledger | [supplier_ledger.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/supplier_ledger.php) | Vendor ledger statement & settlement |
| | Account | [account_master.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/account_master.php) | Chart of accounts & account heads master |
| | Deposite Voucher | [deposit_v.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/deposit_v.php) | Bank/Cash deposit entry |
| | Withdraw Voucher | [withdraw_v.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/withdraw_v.php) | Bank/Cash withdrawal entry |
| | Expences Details | [expence_d.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/expence_d.php) | Operating expenses logging & breakdown |
| | Customer Quotation | [cust_quot.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/cust_quot.php) | Sales quotations and price estimates |
| | Customer Ledger Record | [record_custledger.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_custledger.php) | Customer statement statements & records log |
| | Supplier Ledger Record | [record_suppledger.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_suppledger.php) | Supplier balance statement & transaction log |
| **Auth / User** | Sign Out | [logout.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/logout.php) | Destroys active session & returns to login |

---

## 🏢 2. Branch Navigation Flow (`branchid > 0`)

| Menu Header | Menu Item Label | Target File / Route | Functional Purpose |
| :--- | :--- | :--- | :--- |
| **Brand / Home** | Retailminds / Home | [index.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/index.php) | Branch dashboard |
| **Direct Tab** | New Invoices | [record_invioces.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_invioces.php) | Branch billing & invoice generation |
| **Direct Tab** | Branch Purchase | [record_branpur.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_branpur.php) | Purchases received from Head Office / suppliers |
| **Direct Tab** | Sale | [record_brnsalecounter.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/record_brnsalecounter.php) | Branch point-of-sale counter transactions |
| **Reports** | Customer Bills | `#` (Static/Placeholder) | Quick bill view |
| | Stock | [report_brnstock.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_brnstock.php) | Branch localized stock availability |
| | Stock With Imei no | [report_imeino.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_imeino.php) | Serial/IMEI tracking for serialized items |
| | Customer Details | [report_customer.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_customer.php) | Branch customer registry |
| | Billwise Sale Report | [report_billwse.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_billwse.php) | Branch sales partitioned by invoice bill number |
| | Datewise Sale Report | [report_datewise.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_datewise.php) | Branch sales partitioned by date |
| | itemwise Sale Report | [report_itemwise.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_itemwise.php) | Branch sales partitioned by item SKU |
| | Profit & Loss Report | [report_profitloss.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/report_profitloss.php) | Local branch P&L assessment |
| **Auth / User** | Sign Out | [logout.php](file:///c:/Users/sai/Downloads/Surya%20Bhau/portal.sanvisofts.com/logout.php) | Branch session termination |

---

## 📊 3. Quantitative Summary of Routes & Files

- **Total Unique Active Target Files in Navbar**: 54 PHP Scripts
- **Active Navigation Top-Level Sections**:
  1. `Master` (12 routes)
  2. `Inward` (1 route)
  3. `Purchase` (4 routes)
  4. `OutWard` (1 route)
  5. `Reports` (12 routes Admin / 7 routes Branch)
  6. `Setting` (4 routes)
  7. `Accounting` (10 routes)
  8. `Direct Branch Tabs` (3 routes)
  9. `Common System Links` (Home: `index.php`, Auth: `logout.php`)

---

## 🔄 4. Application Flow & Routing Paradigm
1. **Direct File-Based Dispatch**: Each navbar link maps directly to a standalone PHP script in the root directory rather than a central front-controller (`index.php?page=...`).
2. **Session Guarding**: Each target script typically includes authentication checks (verifying `$_SESSION['login_user']` and `$_SESSION['branchid']`).
3. **Include Pattern**: The target pages re-include `includes/navigation.php` along with header/footer layouts to render this consistent navbar across views.
