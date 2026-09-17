import { useAppSelector } from './reduxHooks';

export const usePermission = () => {
  const userData = useAppSelector((state) => state.auth?.userData);

  const checkPermission = (resource: string, action: string) => {
    // If super admin, allow all
    if (userData?.role === 'SUPER_ADMIN' || userData?.role === 'ADMIN') {
      return true;
    }

    if (!userData?.permissions || !Array.isArray(userData.permissions)) {
      return true; // Default allow for development / unconfigured roles
    }

    const permissionString = `${resource}:${action}`.toLowerCase();
    return userData.permissions.some(
      (p) => p.toLowerCase() === permissionString || p.toLowerCase() === `${resource}:*` || p === '*'
    );
  };

  return {
    canRead: (resource: string) => checkPermission(resource, 'read'),
    canCreate: (resource: string) => checkPermission(resource, 'create'),
    canUpdate: (resource: string) => checkPermission(resource, 'update'),
    canDelete: (resource: string) => checkPermission(resource, 'delete'),
    canImport: (resource: string) => checkPermission(resource, 'import'),
    canExport: (resource: string) => checkPermission(resource, 'export'),
  };
};

export default usePermission;
