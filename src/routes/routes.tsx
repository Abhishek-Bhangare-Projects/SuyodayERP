import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import PrivateRoute from './PrivateRoutes';
import Login from '../pages/master/login/Login';
import DashboardLayout from '../pages/master/dashboard/DashboardLayout';
import Dashboard from '../pages/master/dashboard/Dashboard';
import NotFound from '../pages/notFound/NotFound';

// ─── Master Module ────────────────────────────────────────────────────────────
import PoItemMaster       from '../pages/Navbar/master/poItemMaster/PoItemMaster';
import ItemMaster         from '../pages/Navbar/master/itemMaster/ItemMaster';
import ItemCategory       from '../pages/Navbar/master/itemCategory/ItemCategory';
import UnitMaster         from '../pages/Navbar/master/unitMaster/UnitMaster';
import PoMaster           from '../pages/Navbar/master/poMaster/PoMaster';
import PurCustomersMaster from '../pages/Navbar/master/purCustomersMaster/PurCustomersMaster';
import HsnMaster          from '../pages/Navbar/master/hsnMaster/HsnMaster';
import EmployeeMaster     from '../pages/Navbar/master/employee/EmployeeMaster';
import SupplierDetails    from '../pages/Navbar/master/supplierDetails/SupplierDetails';
import CustomerMaster     from '../pages/Navbar/master/customerMaster/CustomerMaster';
import PoClosing          from '../pages/Navbar/master/poClosing/PoClosing';
import AddBom             from '../pages/Navbar/master/addBom/AddBom';

// ─── Inward Module ───────────────────────────────────────────────────────────
import InwardEntry from '../pages/Navbar/inward/inwardEntry/InwardEntry';

// ─── Purchase Module ─────────────────────────────────────────────────────────
import PurchaseInward    from '../pages/Navbar/purchase/purchaseInward/PurchaseInward';
import PurchaseOrder     from '../pages/Navbar/purchase/purchaseOrder/PurchaseOrder';
import PurchaseReturn    from '../pages/Navbar/purchase/purchaseReturn/PurchaseReturn';
import PurchasesOutward  from '../pages/Navbar/purchase/purchasesOutward/PurchasesOutward';

// ─── OutWard Module ──────────────────────────────────────────────────────────
import OutwardEntry from '../pages/Navbar/outward/outwardEntry/OutwardEntry';

// ─── Reports Module ──────────────────────────────────────────────────────────
import PoStockReport                  from '../pages/Navbar/reports/poStock/PoStockReport';
import DatewisePoStockReport          from '../pages/Navbar/reports/datewisePoStock/DatewisePoStockReport';
import PurchaseStockReport            from '../pages/Navbar/reports/purchaseStock/PurchaseStockReport';
import OutwardSummaryReport           from '../pages/Navbar/reports/outwardSummary/OutwardSummaryReport';
import ItemwiseOutwardSummaryReport   from '../pages/Navbar/reports/itemwiseOutwardSummary/ItemwiseOutwardSummaryReport';
import InwardSummaryReport            from '../pages/Navbar/reports/inwardSummary/InwardSummaryReport';
import ItemwiseInwardSummaryReport    from '../pages/Navbar/reports/itemwiseInwardSummary/ItemwiseInwardSummaryReport';
import ItemwisePurchaseSummaryReport  from '../pages/Navbar/reports/itemwisePurchaseSummary/ItemwisePurchaseSummaryReport';
import PurchaseSummaryReport          from '../pages/Navbar/reports/purchaseSummary/PurchaseSummaryReport';
import CustomerDetailsReport          from '../pages/Navbar/reports/customerDetails/CustomerDetailsReport';
import PaymentReceivedReport          from '../pages/Navbar/reports/paymentReceived/PaymentReceivedReport';
import OutstandingPaymentReport       from '../pages/Navbar/reports/outstandingPayment/OutstandingPaymentReport';

// ─── Setting Module ──────────────────────────────────────────────────────────
import CreateUser     from '../pages/Navbar/setting/createUser/CreateUser';
import TallyExport    from '../pages/Navbar/setting/tallyExport/TallyExport';
import BarcodePrint   from '../pages/Navbar/setting/barcodePrint/BarcodePrint';
import CompanyDetails from '../pages/Navbar/setting/companyDetails/CompanyDetails';

// ─── Accounting Module ───────────────────────────────────────────────────────
import CustomerPaymentReceived  from '../pages/Navbar/accounting/customerPaymentReceived/CustomerPaymentReceived';
import CustomerLedgerEntry      from '../pages/Navbar/accounting/customerEntry/CustomerLedgerEntry';
import SupplierLedger           from '../pages/Navbar/accounting/supplierLedger/SupplierLedger';
import AccountMaster            from '../pages/Navbar/accounting/accountMaster/AccountMaster';
import DepositVoucher           from '../pages/Navbar/accounting/depositVoucher/DepositVoucher';
import WithdrawVoucher          from '../pages/Navbar/accounting/withdrawVoucher/WithdrawVoucher';
import ExpensesDetails          from '../pages/Navbar/accounting/expensesDetails/ExpensesDetails';
import CustomerQuotation        from '../pages/Navbar/accounting/customerQuotation/CustomerQuotation';
import CustomerLedgerRecord     from '../pages/Navbar/accounting/customerLedgerRecord/CustomerLedgerRecord';
import SupplierLedgerRecord     from '../pages/Navbar/accounting/supplierLedgerRecord/SupplierLedgerRecord';

export const AppRoutes: React.FC = () => {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<Login />} />

      {/* ── Protected Layout Shell ─────────────────────────────────────────── */}
      <Route element={<PrivateRoute />}>
        <Route element={<DashboardLayout />}>

          {/* Dashboard */}
          <Route path="/master/dashboard" element={<Dashboard />} />

          {/* ── Master ─────────────────────────────────────────────────────── */}
          <Route path="/master/po-item"          element={<PoItemMaster />} />
          <Route path="/master/item"             element={<ItemMaster />} />
          <Route path="/master/item-category"    element={<ItemCategory />} />
          <Route path="/master/unit"             element={<UnitMaster />} />
          <Route path="/master/po"               element={<PoMaster />} />
          <Route path="/master/pur-customers"    element={<PurCustomersMaster />} />
          <Route path="/master/hsn"              element={<HsnMaster />} />
          <Route path="/master/employee"         element={<EmployeeMaster />} />
          <Route path="/master/supplier-details" element={<SupplierDetails />} />
          <Route path="/master/customer"         element={<CustomerMaster />} />
          <Route path="/master/po-closing"       element={<PoClosing />} />
          <Route path="/master/add-bom"          element={<AddBom />} />

          {/* ── Inward ─────────────────────────────────────────────────────── */}
          <Route path="/inward" element={<InwardEntry />} />

          {/* ── Purchase ───────────────────────────────────────────────────── */}
          <Route path="/purchase/inward"  element={<PurchaseInward />} />
          <Route path="/purchase/order"   element={<PurchaseOrder />} />
          <Route path="/purchase/return"  element={<PurchaseReturn />} />
          <Route path="/purchase/outward" element={<PurchasesOutward />} />

          {/* ── OutWard ────────────────────────────────────────────────────── */}
          <Route path="/outward" element={<OutwardEntry />} />

          {/* ── Reports ────────────────────────────────────────────────────── */}
          <Route path="/reports/po-stock"                    element={<PoStockReport />} />
          <Route path="/reports/datewise-po-stock"           element={<DatewisePoStockReport />} />
          <Route path="/reports/purchase-stock"              element={<PurchaseStockReport />} />
          <Route path="/reports/outward-summary"             element={<OutwardSummaryReport />} />
          <Route path="/reports/itemwise-outward-summary"    element={<ItemwiseOutwardSummaryReport />} />
          <Route path="/reports/inward-summary"              element={<InwardSummaryReport />} />
          <Route path="/reports/itemwise-inward-summary"     element={<ItemwiseInwardSummaryReport />} />
          <Route path="/reports/itemwise-purchase-summary"   element={<ItemwisePurchaseSummaryReport />} />
          <Route path="/reports/purchase-summary"            element={<PurchaseSummaryReport />} />
          <Route path="/reports/customer-details"            element={<CustomerDetailsReport />} />
          <Route path="/reports/payment-received"            element={<PaymentReceivedReport />} />
          <Route path="/reports/outstanding-payment"         element={<OutstandingPaymentReport />} />

          {/* ── Setting ────────────────────────────────────────────────────── */}
          <Route path="/setting/create-user"    element={<CreateUser />} />
          <Route path="/setting/tally-export"   element={<TallyExport />} />
          <Route path="/setting/barcode-print"  element={<BarcodePrint />} />
          <Route path="/setting/company-details" element={<CompanyDetails />} />

          {/* ── Accounting ─────────────────────────────────────────────────── */}
          <Route path="/accounting/customer-payment-received"  element={<CustomerPaymentReceived />} />
          <Route path="/accounting/customer-entry"             element={<CustomerLedgerEntry />} />
          <Route path="/accounting/supplier-ledger"            element={<SupplierLedger />} />
          <Route path="/accounting/account"                    element={<AccountMaster />} />
          <Route path="/accounting/deposit-voucher"            element={<DepositVoucher />} />
          <Route path="/accounting/withdraw-voucher"           element={<WithdrawVoucher />} />
          <Route path="/accounting/expenses-details"           element={<ExpensesDetails />} />
          <Route path="/accounting/customer-quotation"         element={<CustomerQuotation />} />
          <Route path="/accounting/customer-ledger-record"     element={<CustomerLedgerRecord />} />
          <Route path="/accounting/supplier-ledger-record"     element={<SupplierLedgerRecord />} />

        </Route>
      </Route>

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
};

export default AppRoutes;
