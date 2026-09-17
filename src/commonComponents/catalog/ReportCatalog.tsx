import React from 'react';
import CatalogPage, { type CatalogPageProps } from './CatalogPage';

export type ReportCatalogProps = Omit<CatalogPageProps, 'isReport' | 'onDelete' | 'isDeleteRecord' | 'canDelete'>;

export const ReportCatalog: React.FC<ReportCatalogProps> = (props) => {
  return (
    <CatalogPage
      {...props}
      isReport
      isDeleteRecord={false}
      canDelete={false}
      onDelete={undefined}
    />
  );
};

export default ReportCatalog;
