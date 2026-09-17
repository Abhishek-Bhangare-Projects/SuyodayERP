import React from 'react';
import DesktopCatalog, { type CatalogPageProps } from './DesktopCatalog';

export type { CatalogPageProps };

export const CatalogPage: React.FC<CatalogPageProps> = (props) => {
  return <DesktopCatalog {...props} />;
};

export default CatalogPage;
