import { usePermission } from '../hooks/usePermission';
import type { MenuResource } from './helperFunctions';

type PermissionFns = Pick<
  ReturnType<typeof usePermission>,
  'canRead' | 'canCreate' | 'canUpdate' | 'canDelete' | 'canImport' | 'canExport'
>;

export const getCatalogPermissions = (
  resource: MenuResource,
  permissions: PermissionFns
) => ({
  canView: permissions.canRead(resource as string),
  canEdit: permissions.canUpdate(resource as string),
  canDelete: permissions.canDelete(resource as string),
  canAdd: permissions.canCreate(resource as string),
  canImport: permissions.canImport(resource as string),
  canExport: permissions.canExport(resource as string),
});

export default getCatalogPermissions;
